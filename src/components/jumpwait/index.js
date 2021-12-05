import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.less";

const JumpWait = () => {
    const navigate = useNavigate();

    const [second, setSecond] = useState(2);

    useEffect(() => {
        let timer = setInterval(() => {
            setSecond(second - 1);
        }, 1000);
        setTimeout(() => {
            navigate("/user");
        }, 2000);
        return () => {
            clearInterval(timer);
        };
    });

    return (
        <div className="jumpWait">
            <span>添加/编辑用户成功，{second}秒后自动跳转.....</span>
        </div>
    );
};

export default JumpWait;
