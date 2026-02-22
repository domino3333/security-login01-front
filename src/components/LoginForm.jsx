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

        // 로그인 요청
        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include" // 쿠키 전송
        });

        if (!response.ok) {
            alert("로그인 실패");
            return;
        }

        // 권한 확인 API 호출
        const meResponse = await fetch("http://localhost:8080/api/me", {
            method: "GET",
            credentials: "include" // 쿠키 전송
        });

        if (!meResponse.ok) {
            alert("권한 확인 실패");
            return;
        }

        const userInfo = await meResponse.json();
        console.log(userInfo);

        // ADMIN 권한 있으면 admin 페이지, 없으면 일반 main 페이지
        if (userInfo.roles.includes("ADMIN")) {
            nav("/admin");
        } else {
            nav("/MainPage");
        }
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