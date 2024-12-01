import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Picker from '@emoji-mart/react';

const EmojiPicker = (props) => {
    const [selectedEmoji, setSelectedEmoji] = useState(props.icon || "");
    const [isShowPicker, setIsShowPicker] = useState(false);
    useEffect(() => {
        setSelectedEmoji(props.icon);
    }, [props.icon]);

    // 絵文字選択時に実行される関数
    const selecteEmoji = (e) => {
        const emojiCode = e.unified.split("-");
        let codesArray = [];
        emojiCode.forEach((el) => codesArray.push("0x" + el));
        const emoji = String.fromCodePoint(...codesArray);
        console.log(emoji);
        setIsShowPicker(false)
        props.onChange(emoji);
    };

    const showPicker = () => setIsShowPicker(!isShowPicker);

    return (
        <Box>
            <Typography
                variant="h3"
                fontWeight="700"
                sx={{ cursor: "pointer" }}
                onClick={showPicker}
            >
                {selectedEmoji || "絵文字を選んでください"} {/* 絵文字が選ばれていなければメッセージ表示 */}
            </Typography>
            <Box sx={{
                 display: isShowPicker ? "block" : "none",
                position: "absolute",
                zIndex: "100",
                }}>
                <Picker onEmojiSelect={selecteEmoji} />
            </Box>
        </Box>
    );
};

export default EmojiPicker;
