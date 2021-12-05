import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "../../components/table";
import "./index.less";
// import { column, tableData } from "../../data";

function User() {
    const navigate = useNavigate();
    const [column, setColumn] = useState(
        JSON.parse(localStorage.getItem("userTableColumn"))
    );
    const [userTableData, setUserTableData] = useState(
        JSON.parse(localStorage.getItem("userTableData"))
    );

    // 编辑和删除操作
    const operatorData = (operator, index) => {
        const name = userTableData[index - 1].name;
        if (operator === "删除") {
            if (confirm(`确定删除 “${name}” 吗？`)) {
                let arr = [...userTableData];
                arr.splice(index - 1, 1);
                localStorage.setItem("userTableData", JSON.stringify(arr));
                setUserTableData(arr);
            }
        } else if (operator === "编辑") {
            console.log("编辑的用户是：" + name + "，序号是：" + index);
            navigate('addUser', {state: {index: index}});
        }
    };

    return (
        <>
            <div className="user">
                <div className="title">
                    <h2>用户管理</h2>
                    <Link className="addUserBtn" to="addUser">
                        添加用户
                    </Link>
                </div>
                <Table
                    column={column}
                    tableData={userTableData}
                    operatorData={operatorData}
                ></Table>
            </div>
        </>
    );
}

export default User;
