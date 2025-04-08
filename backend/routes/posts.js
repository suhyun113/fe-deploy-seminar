const express = require("express");
const pool = require("../db/db");

const router = express.Router();

// 전체 게시글 조회
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM posts ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "서버 오류" });
    }
});

// 게시글 하나 조회
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "게시글 없음" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "서버 오류" });
    }
});

// 게시글 작성
router.post("/", async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *",
            [title, content, author]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "게시글 작성 실패" });
    }
});

// 게시글 수정
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const result = await pool.query(
            "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *",
            [title, content, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "게시글 없음" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "게시글 수정 실패" });
    }
});

// 게시글 삭제
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "게시글 없음" });
        res.json({ message: "삭제 완료", deleted: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: "게시글 삭제 실패" });
    }
});

module.exports = router;
