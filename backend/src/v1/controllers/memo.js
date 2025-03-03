const Memo = require("../models/memo");

exports.create = async (req, res) => {
  try {
    const memoCount = await Memo.find().countDocuments();

    // メモ新規作成
    const memo = await Memo.create({
      user: req.user._id, 
      position: memoCount > 0 ? memoCount : 0, 
    });

    res.status(201).json(memo);
  } catch (err){
    console.error("メモ作成中のエラー:", err); 
    res.status(500).json({ message: "サーバーエラーが発生しました。" }); 
  }
};

exports.getAll = async (req, res) => {
  try {
    const memos = await Memo.find({user: req.user._id}).sort("-position");
    res.status(200).json(memos);
  } catch (err){
    console.error("メモ取得中のエラー:", err); 
    res.status(500).json({ message: "サーバーエラーが発生しました。" }); 
  }
};

exports.getOne = async (req, res) => {
  const {memoId} = req.params;
  try {
    const memo = await Memo.findOne({user : req.user._id, _id: memoId});
    if(!memo) return res.status(404).json("メモが存在しません");
    res.status(200).json(memo);
  } catch (err){
    console.error("メモ取得中のエラー:", err); 
    res.status(500).json({ message: "サーバーエラーが発生しました。" }); 
  }
};

exports.update = async (req, res) => {
  const {memoId} = req.params;
  const { title, discription } = req.body;
  try {
    
    if(title === "")req.body.title = "無題";
    if(discription === "")
      req.body.title = "自由に記入してください";
    
    const memo = await Memo.findOne({user : req.user._id, _id: memoId});
    if(!memo) return res.status(404).json("メモが存在しません");

    const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
      $set: req.body,
    })

    res.status(200).json(updatedMemo);
  } catch (err){
    console.error("メモ取得中のエラー:", err); 
    res.status(500).json({ message: "サーバーエラーが発生しました。" }); 
  }
};

exports.delete = async (req, res) => {
  const {memoId} = req.params;
  try {
    const memo = await Memo.findOne({user : req.user._id, _id: memoId});
    if(!memo) return res.status(404).json("メモが存在しません");

    await Memo.deleteOne({_id: memoId});
    res.status(200).json("メモを削除しました");
  } catch (err){
    console.error("メモ削除中のエラー:", err); 
    res.status(500).json({ message: "サーバーエラーが発生しました。" }); 
  }
};