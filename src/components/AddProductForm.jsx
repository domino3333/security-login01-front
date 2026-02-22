import { useState } from "react";

const AddProductForm = () => {
    const [input, setInput] = useState({});

    const observeInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const submitProduct = async () => {
        try {
            const res = await fetch("http://localhost:8080/admin/product/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(input)
            });

            if (res.ok) {
                alert("상품 추가 완료!");
                setInput({});
            } else {
                alert("상품 추가 실패!");
            }
        } catch (err) {
            console.error(err);
            alert("서버 오류 발생");
        }
    };
    return (
        <div className="container mt-4">
            <h1>관리자 페이지</h1>

            <div className="mb-3">
                <label htmlFor="productName" className="form-label">상품명:</label>
                <input
                    type="text"
                    name="productName"
                    id="productName"
                    className="form-control"
                    onChange={observeInput}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="productQuantity" className="form-label">수량:</label>
                <input
                    type="number"
                    name="productQuantity"
                    id="productQuantity"
                    className="form-control"
                    onChange={observeInput}
                />
            </div>

            <button className="btn btn-primary" onClick={submitProduct}>추가</button>
        </div>
    );
};

export default AddProductForm;