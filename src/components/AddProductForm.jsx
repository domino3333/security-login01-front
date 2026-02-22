import { useState } from "react";
import { useNavigate } from "react-router";

const AddProductForm = () => {
    const [input, setInput] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const nav = useNavigate();

    const observeInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
       
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            setInput({
                ...input,
                productImage: file
            });
            setImagePreview(URL.createObjectURL(file));
        }
    };



    const submitProduct = async () => {
        try {
            const formData = new FormData();
            formData.append("productName", input.productName || "");
            formData.append("productQuantity", input.productQuantity || 0);
            if (input.productImage) formData.append("productImage", input.productImage);

            const res = await fetch("http://localhost:8080/admin/product/add", {
                method: "POST",
                credentials: "include",
                body: formData // JSON 대신 FormData로 전송
            });

            if (res.ok) {
                alert("상품 추가 완료!");
                setInput({});
                setImagePreview(null);
                 nav('/admin')
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
            <h1>상품 추가 페이지</h1>

            <div className="mb-3">
                <label htmlFor="productImage" className="form-label">상품 이미지:</label>
                <input
                    type="file"
                    name="productImage"
                    id="productImage"
                    className="form-control"
                    onChange={handleImageChange}
                    accept="image/*"
                />
            </div>

            {imagePreview && (
                <div className="mb-3">
                    <img src={imagePreview} alt="미리보기" className="img-thumbnail" style={{ maxWidth: "200px" }} />
                </div>
            )}

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