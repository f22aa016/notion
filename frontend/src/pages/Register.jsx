import { Box, TextField, Button } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link, useNavigate } from "react-router-dom"
import authApi from '../api/outhApi';

const Register = () => {
    const navigate = useNavigate();

    const [usernameErrText, setUsernameErrText] = useState("");
    const [passwordErrText, setPasswordErrText] = useState("");
    const [confirmErrText, setConfirmErrText] = useState("");
    const [loading ,setLoding] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUsernameErrText("");
        setPasswordErrText("");
        setConfirmErrText("");

        // 入力欄の文字列を取得
        const data = new FormData(e.target);
        const username = data.get("username")
        const password = data.get("password")
        const confirmPassword = data.get("confirmPassword")
        console.log(username);
        console.log(password);
        console.log(confirmPassword);

        let error = false;

        if(username === ""){
            error = true;
            setUsernameErrText("名前を入力してください");
        }
        if(password === ""){
            error = true;
            setPasswordErrText("パスワードを入力してください");
        }
        if(confirmPassword === ""){
            error = true;
            setConfirmErrText("確認用パスワードを入力してください");
        }
        if(password !== confirmPassword){
            error = true;
            setConfirmErrText("パスワードと確認用パスワードが異なります");
        }
        if(error)return

        setLoding(true);

        //新規登録APIを叩く
        try {
            const res = await authApi.register({ 
                username, 
                password, 
                confirmPassword,
            });
            setLoding(false);
            localStorage.setItem("token", res.token);
            console.log("新規登録が成功しました");
            navigate("/")
        } catch (err) {
            const errors = err.data.errors;
            console.log(errors);
            errors.forEach((err) => {
                if(err.path === "username"){
                    setUsernameErrText(err.msg);
                }
                if(err.path === "password"){
                    setPasswordErrText(err.msg);
                }
                if(err.path === "confirmPassword"){
                    setConfirmErrText(err.msg);
                }
            });
            setLoding(false);
        }
    }
    return (
        <>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    fullWidth
                    id="username"
                    label="名前"
                    margin="normal"
                    name="username"
                    required
                    helperText={usernameErrText}
                    error={usernameErrText !== ""}
                    disabled={loading}
                />
                <TextField
                    fullWidth
                    id="password"
                    label="パスワード"
                    margin="normal"
                    name="password"
                    type="password"
                    required
                    helperText={passwordErrText}
                    error={passwordErrText !== ""}
                    disabled={loading}
                />
                <TextField
                    fullWidth
                    id="confirmPassword"
                    label="確認用パスワード"
                    margin="normal"
                    name="confirmPassword"
                    type="password"
                    required
                    helperText={confirmErrText}
                    error={confirmErrText !== ""}
                    disabled={loading}
                />
                <LoadingButton
                    sx={{ mt: 3, mb: 2 }}
                    fullWidth
                    type="submit"
                    loading={loading}
                    coler="primary"
                    variant="outlined"
                >
                    アカウント作成
                </LoadingButton>
            </Box>
            <Button component={Link} to="../login">
                すでにアカウントを持っていますか？ログイン
            </Button>
        </>
    )
}

export default Register