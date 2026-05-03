const express = require("express");
const app = express();
const PORT = 3000;

// JSON 데이터 해석을 위한 설정
app.use(express.json());
// public 폴더의 파일들을 웹에 노출
app.use(express.static("public"));

// 임시 데이터 저장소 (배열)
let gameSettings = [];

// [POST] 데이터 저장 API
app.post("/api/settings", (req, res) => {
  const newSetting = req.body;
  gameSettings.push(newSetting);
  console.log("현재 저장된 데이터 리스트:", gameSettings);
  res.json({ message: "성공적으로 서버에 저장되었습니다!" });
});

// [GET] 데이터 불러오기 API
app.get("/api/settings", (req, res) => {
  res.json(gameSettings);
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다 🚀`);
});
