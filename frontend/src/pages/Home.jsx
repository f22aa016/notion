import React, { useState } from "react";
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import memoApi from "../api/memoApi"; // Ensure this is correctly implemented

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createMemo = async () => {
    try {
      setLoading(true);
      const res = await memoApi.create();
        navigate(`/memo/${res._id}`);
    } catch (err) {
      console.error("Error creating memo:", err);
      // Replace alert with a better error notification system (e.g., Snackbar)
      alert("メモの作成中にエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        onClick={createMemo}
        loading={loading}
        disabled={loading} // Disable button while loading
      >
        最初のメモを作成
      </LoadingButton>
    </Box>
  );
}

export default Home;
