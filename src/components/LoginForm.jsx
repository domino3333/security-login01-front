import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const LoginForm = () => {
    const nav = useNavigate();
    const { setUser } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            username: formData.get("username"),
            password: formData.get("password")
        };

        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });

        if (!response.ok) {
            alert("로그인 실패");
            return;
        }

        // 권한 정보 가져오기
        const meResponse = await fetch("http://localhost:8080/api/give/me/admin", {
            method: "GET",
            credentials: "include"
        });

        if (!meResponse.ok) {
            alert("권한 확인 실패");
            return;
        }

        const userInfo = await meResponse.json();
        setUser({ email: userInfo.email, roles: userInfo.roles });

        // 권한에 따라 이동
        if (userInfo.roles.includes("ADMIN")) nav("/admin");
        else nav("/MainPage");
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