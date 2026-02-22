import React from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import '../css/AdminNavBar.css'; // 아래 CSS 적용
import { Link } from 'react-router-dom';

const AdminNavBar = () => {
  return (
    <>
    <h1>관리자 페이지</h1>
    <div className="admin-navbar">
      <Dropdown as={ButtonGroup} className="nav-item">
        <Dropdown.Toggle variant="light">상품</Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-on-hover">
          <Dropdown.Item as={Link} to="/admin/product/add">추가</Dropdown.Item>
          <Dropdown.Item as={Link} to="/admin/product/">삭제</Dropdown.Item>
          <Dropdown.Item as={Link} to="/admin/product/">업데이트</Dropdown.Item>
          <Dropdown.Item as={Link} to="/admin/product/">조회</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown as={ButtonGroup} className="nav-item">
        <Dropdown.Toggle variant="light">회원</Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-on-hover">
          <Dropdown.Item as={Link} to="/admin//add">추가</Dropdown.Item>
          <Dropdown.Item as={Link} to="/admin//">삭제</Dropdown.Item>
          <Dropdown.Item as={Link} to="/admin//">업데이트</Dropdown.Item>
          <Dropdown.Item as={Link} to="/admin//">조회</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <button className="btn btn-light nav-item">통계</button>
      <button className="btn btn-light nav-item">로그</button>
    </div>
    </>
  );
};

export default AdminNavBar;