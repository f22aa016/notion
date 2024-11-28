const JWT = require("jsonwebtoken");
const User = require("../models/user")
// クライアントから渡されたJWTが正常か検証
const tokenDecode = (req) => {
    const beareHeader = req.headers["authorizasion"];
    if (beareHeader) {
        const bearer = beareHeader.split(" ")[1];
        try {
            const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
            return decodedToken;
        } catch (error) {
            return false;
        }
    } else {
        return false;
    }
};

//JWT認証をするためのミドルウェア
exports.verifyToken = async(req, res, next) => { 
    const tokenDecoded = tokenDecode(req);
    if(tokenDecoded){
        //そのJWTと一致するユーザーを探してくる
        const user = await User.findById(tokenDecoded.id);
        if(!user){
            return res.status(401).json("JWTと一致するユーザーが見つかりません");
        }
        req.user = user;
        next();
    }else{
        return res.status(401).json("tokenDecodedがありません")
    }
};
