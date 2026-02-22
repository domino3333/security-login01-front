import { useNavigate } from "react-router";



const MainPage = () => {

    const nav = useNavigate();

    const handleLogout = async () => {
        await fetch("http://localhost:8080/api/logout", {
            method: "POST",
            credentials: "include" // 쿠키 전송
        });
        alert("로그아웃 완료!");
        nav('/') // 로그인 페이지로 이동
    };

    return (
        <>
        <h1>메인페이지</h1>
        <button onClick={handleLogout}>로그아웃</button>
        </>
    );
};

export default MainPage;