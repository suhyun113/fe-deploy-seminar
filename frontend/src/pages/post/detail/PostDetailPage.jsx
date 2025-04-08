import "./PostDetailPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById, updatePost, deletePost } from "../../../apis/posts";


function PostDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    useEffect(() => {
        getPostById(id)
            .then(data => {
                setPost(data);
                setEditTitle(data.title);
                setEditContent(data.content);
            })
            .catch(err => console.error("❌ 게시글 로드 실패", err));
    }, [id]);

    const handleUpdate = async () => {
        try {
            const updated = await updatePost(id, {
                title: editTitle,
                content: editContent,
            });
            setPost(updated);
            setIsEditing(false);
            alert("✅ 수정 완료");
        } catch (err) {
            alert("❌ 수정 실패");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await deletePost(id);
                alert("🗑️ 삭제 완료");
                navigate("/");
            } catch (err) {
                alert("❌ 삭제 실패");
            }
        }
    };

    if (!post) return <div className="loading-text">⏳ 로딩 중...</div>;

    return (
        <div className="detail-container">
            {isEditing ? (
                <>
                    <input
                        className="edit-title-input"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                    />
                    <textarea
                        className="edit-content-textarea"
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                    />
                </>
            ) : (
                <>
                    <h1 className="detail-title">{post.title}</h1>
                    <div className="detail-meta">
                        <span>✍️ {post.author}</span>
                        <span>📅 {new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-content">{post.content}</div>
                </>
            )}

            <div className="detail-actions">
                {isEditing ? (
                    <>
                        <button className="edit-btn" onClick={handleUpdate}>💾 저장</button>
                        <button className="cancel-btn" onClick={() => setIsEditing(false)}>❌ 취소</button>
                    </>
                ) : (
                    <>
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>✏️ 수정</button>
                        <button className="delete-btn" onClick={handleDelete}>🗑️ 삭제</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default PostDetailPage;
