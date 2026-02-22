import { useState } from "react";

const AddProductForm = ()=>{

    const [input, setInput] = useState({});

    const observeInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

    }

    return (<>
        <h1>관리자 페이지</h1>
        <br />
        <label htmlFor="productName">상품명:
            <input type="text" name="productName" id="productName" onChange={observeInput} />
        </label>
        <label htmlFor="productQuantity">수량:
            <input type="number" name="productQuantity" id="productQuantity" onChange={observeInput} />
        </label><br />

        <button class="btn btn-primary">저장</button>
        <button type="button">추가</button>

    </>)

}

export default AddProductForm;