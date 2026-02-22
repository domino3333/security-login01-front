import { useNavigate } from "react-router";

const LogoutForm = () => {

    const nav = useNavigate();

    const handleLogout = async () => {
        await fetch("http://localhost:8080/api/logout", {
            method: "POST",
            credentials: "include" // 쿠키 전송
        });
        alert("로그아웃 완료!");
        nav('/login')
    };

    return (
        <>
            <button onClick={handleLogout}>로그아웃</button>
        </>
    );
}

export default LogoutForm;
