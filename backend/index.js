const express = require("express");
const cors = require("cors");
const postsRouter = require("./routes/posts");
const pool = require("./db/db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/posts", postsRouter);

app.get("/", (req, res) => {
    res.send("✅ 게시판 백엔드 서버 작동 중!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});



// DB 연결 테스트
app.get("/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows[0]);
    } catch (error) {
        console.error("DB 연결 실패", error);
        res.status(500).send("DB 연결 실패");
    }
});