import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
// import notionLogo from "../../assets/images/notion-logo.png";
import authUtils from '../../utils/authUtils';
import Sideber from '../common/Sideber';
import {useDispatch} from "react-redux";
import { setUser } from '../../redux/features/userSlice';

export const AppLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // JWTを持っているのか確認する
        const checkAuth = async () => {
            // 認証チェック
            const user = await authUtils.isAuthebticated();
            console.log(user)
            if (!user) {
                navigate("/login")
            } else{
                //ユーザーを保存する
                dispatch(setUser(user));
            }
        };
        checkAuth();
    }, [navigate]);

    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <Sideber />
                <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
                    <Outlet />
                </Box>
            </Box>

        </div>

    )
}

export default AppLayout;
