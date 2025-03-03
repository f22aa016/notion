import { Box, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate, useParams } from 'react-router-dom';
import memoApi from '../api/memoApi';
import { useDispatch, useSelector } from "react-redux";
import { setMemo } from '../redux/features/memoSlice';
import EmojiPicker from '../components/common/EmojiPicker';

function Memo() {
    const { memoId } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const memos = useSelector((state) => state.memo.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const timerRef = useRef(null);
    const timeout = 500;

    useEffect(() => {
        const getMemo = async () => {
            try {
                const res = await memoApi.getOne(memoId);
                setTitle(res.title || "");
                setDescription(res.description || "");
                setIcon(res.icon);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    alert("メモが存在しません。");
                } else {
                    alert("メモの取得中にエラーが発生しました。");
                }
            }
        };
        getMemo();
    }, [memoId]);

    const updateTitle = async (e) => {
        clearTimeout(timerRef.current);
        const newTitle = e.target.value;
        setTitle(newTitle);
        timerRef.current = setTimeout(async () => {
            try {
                await memoApi.update(memoId, { title: newTitle });
            } catch (err) {
                alert(err);
            }
        }, timeout);
    };

    const updateDescription = async (e) => {
        clearTimeout(timerRef.current);
        const newDescription = e.target.value;
        setDescription(newDescription);
        timerRef.current = setTimeout(async () => {
            try {
                await memoApi.update(memoId, { description: newDescription });
            } catch (err) {
                alert(err);
            }
        }, timeout);
    };

    const deleteMemo = async () => {
        try {
            const deletedMemo = await memoApi.delete(memoId);
            console.log(deletedMemo);

            const newMemos = memos.filter((e) => e._id !== memoId);
            dispatch(setMemo(newMemos));
            if (newMemos.length === 0) {
                navigate("/memo");
            } else {
                navigate(`/memo/${newMemos[0]._id}`);
            }
        } catch (err) {
            alert(err, "メモの削除中にエラーが発生しました。");
        }
    };

    const onIconChange = async(newIcon) => {
        let temp = [...memos];
        const index = temp.findIndex((e) => e._id === memoId);
        temp[index] = { ...temp[index], icon: newIcon };
        setIcon(newIcon);
        dispatch(setMemo(temp));
        try {
            await memoApi.update(memoId, {icon: newIcon})
        } catch (err) {
            alert(err)
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <IconButton>
                    <StarBorderOutlinedIcon />
                </IconButton>

                <IconButton variant="outlined" color="error" onClick={deleteMemo}>
                    <DeleteOutlineOutlined />
                </IconButton>
            </Box>
            <EmojiPicker icon={icon} onChange={onIconChange}/>

            <Box sx={{ padding: "10px 50px" }}>
                <Box>
                    <TextField
                        onChange={updateTitle}
                        value={title}
                        placeholder="無題"
                        variant="outlined"
                        fullWidth
                        sx={{
                            ".MuiOutlinedInput-input": { padding: 0 },
                            ".MuiOutlinedInput-notchedOutline": { border: "none" },
                            ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
                        }}
                    />
                    <TextField
                        onChange={updateDescription}
                        value={description}
                        placeholder="追加"
                        variant="outlined"
                        fullWidth
                        sx={{
                            ".MuiOutlinedInput-input": { padding: 0 },
                            ".MuiOutlinedInput-notchedOutline": { border: "none" },
                            ".MuiOutlinedInput-root": { fontSize: "1rem" },
                        }}
                    />
                </Box>
            </Box>
        </>
    );
}

export default Memo;
