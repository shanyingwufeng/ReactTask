import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.less";

// 添加和编辑用户页面
function AddEditUser() {
    const [username, setUserName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userTableData, setUserTableData] = useState(
        JSON.parse(localStorage.getItem("userTableData"))
    );

    const navigate = useNavigate();

    // 获取路由参数
    let location = useLocation();
    // console.log(location.state.index);
    if (location.state) {
        // console.log(location.state.index);
        if (username === "" || name === "" || email === "") {
            const index = location.state.index;
            const data = userTableData[index - 1];
            setUserName(data.username);
            setName(data.name);
            setEmail(data.email);
        }
    }

    const focusRef = useRef(null);

    useEffect(() => {
        focusRef.current.focus();
    }, []);

    const handleSubmit = (e) => {
        const user = {
            username: username,
            name: name,
            email: email,
        };
        if (username !== "" && name !== "" && email !== "") {
            addUser(user);
            setUserName("");
            setName("");
            setEmail("");
        }
        e.preventDefault();
    };

    const addUser = (user) => {
        userTableData.map((item) => {
            if (item.username === user.username && item.name === user.name) {
                // 如果用户名和姓名已经存在则执行修改操作
                item.email = user.email;
                let arr = [...userTableData];
                setUserTableData(arr);
                localStorage.setItem("userTableData", JSON.stringify(arr));
            }
        });
        userTableData.push(user);
        let arr = [...userTableData];
        setUserTableData(arr);
        localStorage.setItem("userTableData", JSON.stringify(arr));
        navigate("/jumpWait");
    };

    const handleUserName = (e) => {
        setUserName(e.target.value);
    };
    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const onBack = () => {
        history.back();
    };

    return (
        <div className="addEditUser">
            <div className="title">添加/编辑用户</div>
            <form action="#" onSubmit={handleSubmit}>
                <div>
                    <div className="item">
                        用户名<span className="required">*</span>
                    </div>
                    <input
                        ref={focusRef}
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleUserName}
                    />
                </div>
                <div>
                    <div className="item">
                        姓名<span className="required">*</span>
                    </div>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleName}
                    />
                </div>
                <div>
                    <div className="item">邮箱</div>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleEmail}
                    />
                </div>
                <div className="operator">
                    <button type="submit" className="add">
                        添加
                    </button>
                    <span className="delete" onClick={onBack}>
                        取消
                    </span>
                </div>
            </form>
        </div>
    );
}

export default AddEditUser;
