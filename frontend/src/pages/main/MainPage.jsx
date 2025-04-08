import "./MainPage.css";
import { useEffect, useState } from "react";
import { getPosts } from "../../apis/posts";
import { Link } from "react-router-dom";

function MainPage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        getPosts()
            .then(data => {
                setPosts(data);
                setError(false); // 에러 없음
            })
            .catch(err => {
                console.error("❌ 게시글 불러오기 실패", err);
                setError(true); // 에러 발생
            });
    }, []);

    return (
        <div className="main-container">
            <header className="main-header">
                <h1>🚀 WAP FE 배포 세미나 실습</h1>
                <Link to="/write" className="write-button">✏️ 글쓰기</Link>
            </header>

            <table className="post-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {error ? (
                        <tr>
                            <td colSpan="3" className="error-row">⚠️ 서버 오류: 게시글을 불러올 수 없습니다. API 주소를 확인해주세요.</td>
                        </tr>
                    ) : posts.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="empty-row">게시글이 없습니다.</td>
                        </tr>
                    ) : (
                        [...posts].reverse().map((post, index) => (
                            <tr key={post.id}>
                                <td>{index + 1}</td>
                                <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
                                <td>{new Date(post.created_at || Date.now()).toLocaleDateString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default MainPage;
