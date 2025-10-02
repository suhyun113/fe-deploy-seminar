const express = require("express");
const { db } = require("../db/db");

const router = express.Router();

// 전체 게시글 조회
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts ORDER BY id DESC");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

// 게시글 하나 조회
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM posts WHERE id = @id", { id });
    if (result.recordset.length === 0)
      return res.status(404).json({ error: "게시글 없음" });
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

// 게시글 작성
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO posts (title, content) VALUES (@title, @content); SELECT * FROM posts WHERE id = SCOE_IDENTITY();",
      { title, content }
    );
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: "게시글 작성 실패" });
  }
});

// 게시글 수정
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const result = await db.query(
      "UPDATE posts SET title = @title, content = @content WHERE id = @id; SELECT * FROM posts WHERE id = @id;",
      { title, content, id }
    );
    if (result.recordset.length === 0)
      return res.status(404).json({ error: "게시글 없음" });
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: "게시글 수정 실패" });
  }
});

// 게시글 삭제
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM posts OUTPUT DELETED.* WHERE id = @id",
      { id }
    );
    if (result.recordset.length === 0)
      return res.status(404).json({ error: "게시글 없음" });
    res.json({ message: "삭제 완료", deleted: result.recordset[0] });
  } catch (err) {
    res.status(500).json({ error: "게시글 삭제 실패" });
  }
});

module.exports = router;
