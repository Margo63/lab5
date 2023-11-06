import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import App from "./App";

function BasicExample() {
    return (<BrowserRouter>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            <hr/>
            <Routes>
                <Route exact path="/" element={<Home/>}/>


                <Route path="/about" element = {<About/>}/>

                <Route path="*" element = {<NoMatch/>}/>

            </Routes>
        </div>
    </BrowserRouter>);
}

function Home() {
    return <div><h3>Home</h3></div>
}

function About() {
    return <div><h3>About</h3></div>
}

function NoMatch() {
    return <div><h3>No match!</h3></div>
}

export default BasicExample;
//ReactDOM.render(<BasicExample/>, document.getElementById('root'));