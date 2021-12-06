import React, { useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Home from "./view/home";
import User from "./view/user";
import AddEditUser from "./view/user/addEdituser";
import JumpWait from "./components/jumpwait";
import NoMatch from "./view/nomatch/NoMatch";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="user" element={<User />} />
                <Route path="user/addUser" element={<AddEditUser />} />
                <Route path="/jumpWait" element={<JumpWait />} />
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    );
}

function Layout() {
    const [menuNum, setMenuNum] = useState(1);

    return (
        <>
            <div className="header">
                <Link className="logo" to="/">
                    Task
                </Link>
                <div className="nav">
                    <Link
                        to="/"
                        className={menuNum === 1 ? "index" : ""}
                        onClick={() => setMenuNum(1)}
                    >
                        首页
                    </Link>
                    <Link
                        to="/user"
                        className={menuNum === 2 ? "userManage" : ""}
                        onClick={() => setMenuNum(2)}
                    >
                        用户管理
                    </Link>
                </div>
            </div>
            <div className="container">
                <Outlet />
            </div>
        </>
    );
}

export default App;
