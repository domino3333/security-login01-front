import { useNavigate } from "react-router";


const LoginForm = () => {

    const nav = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            username: formData.get("username"),
            password: formData.get("password")
        };

        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include" // 세션 or 쿠키 쓸 경우 중요
        });

        if (!response.ok) {
            alert("로그인 실패");
            return;
        }

        const result = await response.json();
        console.log(result);
        // HttpOnly 쿠키라 JS에서는 토큰 확인 불가
        // 그냥 로그인 성공 메시지만 보고 페이지 이동
        alert("로그인 성공!");
        nav("/MainPage"); // 메인 페이지 이동
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="이메일" />
            <input type="password" name="password" placeholder="비밀번호" />
            <button type="submit">확인</button>
        </form>
    );
};

export default LoginForm;