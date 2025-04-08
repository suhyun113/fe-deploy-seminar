const API_URL = process.env.REACT_APP_API_URL;



// 게시글 목록 가져오기
export async function getPosts() {
    const res = await fetch(`${API_URL}/posts`);
    if (!res.ok) throw new Error("게시글 목록 불러오기 실패");
    return res.json();
}

// 특정 게시글 가져오기 
export async function getPostById(id) {
    const res = await fetch(`${API_URL}/posts/${id}`);
    if (!res.ok) throw new Error("게시글 불러오기 실패");
    return res.json();
}

// 게시글 작성
export async function createPost({ title, content }) {
    const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
    });
    if (!res.ok) throw new Error("게시글 작성 실패");
    return res.json();
}

// 게시글 수정
export async function updatePost(id, { title, content }) {
    const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
    });
    if (!res.ok) throw new Error("게시글 수정 실패");
    return res.json();
}

// 게시글 삭제
export async function deletePost(id) {
    const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("게시글 삭제 실패");
    return res.json();
}