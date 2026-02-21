const LoginForm = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            username: formData.get("username"),
            password: formData.get("userpw")
        };

        const response = await fetch("http://localhost:8080/login", {
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
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="이메일" />
            <input type="password" name="userpw" placeholder="비밀번호" />
            <button type="submit">확인</button>
        </form>
    );
};

export default LoginForm;