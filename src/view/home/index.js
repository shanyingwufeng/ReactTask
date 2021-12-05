import React from "react";
import "./index.less";

function Home() {
    return (
        <div className="home">
            <div className="title">用户管理-技术栈</div>
            <ul>
                <li>Webpack15</li>
                <li>React17（hooks和函数式组件）</li>
                <li>React-router-dom-v6</li>
                <li>Less</li>
            </ul>
        </div>
    );
}

export default Home;
