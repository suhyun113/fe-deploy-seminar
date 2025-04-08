import "./PostWritePage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../../apis/posts";

function PostWritePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await createPost({ title, content });
            alert("✅ 글이 등록되었습니다.");
            navigate("/");
        } catch (err) {
            alert("❌ 등록 실패");
        }
    };

    return (
        <div className="write-container">
            <h1>✏️ 글쓰기</h1>
            <form onSubmit={handleSubmit} className="write-form">
                <input
                    placeholder="제목"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <button type="submit">등록</button>
            </form>
        </div>
    );
}

export default PostWritePage;
