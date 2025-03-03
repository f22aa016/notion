import { Box, TextField, Button } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link, useNavigate } from "react-router-dom"
import authApi from '../api/outhApi';

const Login = () => {
    const navigate = useNavigate();

    const [usernameErrText, setUsernameErrText] = useState("");
    const [passwordErrText, setPasswordErrText] = useState("");
    const [loading ,setLoding] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUsernameErrText("");
        setPasswordErrText("");

        // 入力欄の文字列を取得
        const data = new FormData(e.target);
        const username = data.get("username")
        const password = data.get("password")
        console.log(username);
        console.log(password);

        let error = false;

        if(username === ""){
            error = true;
            setUsernameErrText("名前を入力してください");
        }
        if(password === ""){
            error = true;
            setPasswordErrText("パスワードを入力してください");
        }
        if(error)return

        setLoding(true);

        //新規登録APIを叩く
        try {
            const res = await authApi.login({ 
                username, 
                password, 
            });
            setLoding(false);
            localStorage.setItem("token", res.token);
            console.log("ログインに成功しました");
            navigate("/")
        } catch (err) {
            console.log(err);
            const errors = err.data.errors;
            console.log(errors);
            errors.forEach((err) => {
                if(err.param === "username"){
                    setUsernameErrText(err.msg);
                }
                if(err.param === "password"){
                    setPasswordErrText(err.msg);
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
                <LoadingButton
                    sx={{ mt: 3, mb: 2 }}
                    fullWidth
                    type="submit"
                    loading={loading}
                    coler="primary"
                    variant="outlined"
                >
                    ログイン
                </LoadingButton>
            </Box>
            <Button component={Link} to="../register">
                アカウントを持っていませんか？新規登録
            </Button>
        </>
    )
}

export default Login