import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import App from "./App";
import axios from "axios";
import BrokersComponent from "./brokers.component";
import StockComponent from "./stock.component";


function BasicExample() {
    return (<BrowserRouter>
        <div>
            <ul>
                <li><Link to="/">Brokers</Link></li>
                <li><Link to="/stock">Stocks</Link></li>
            </ul>
            <hr/>
            <Routes>
                <Route exact path="/" element={<BrokersComponent id="home" />}/>
                <Route path="/stock" element = {<StockComponent/>}/>
                <Route path="*" element = {<NoMatch/>}/>
            </Routes>
        </div>
    </BrowserRouter>);
}

function Home() {

    const [post, setPost] = React.useState([]);

    React.useEffect(() => {
        axios.get("http://localhost:8080/getAllBrokers").then((response) => {
            setPost(response.data)
        }
        );


    }, []);

    console.log(post)
    // const [users, setUsers] = useState([])
    //
    // useEffect(() => {
    //     (async () => {
    //         const data = await fetch(endpoint)
    //             .then(res => res.json())
    //
    //         setUsers(data)
    //     })()
    // }, [])
    // return <div>
    //         <Broker value=post></Broker>
    // </div>
}

function Broker(props){
    return
        <h3> {props.value.id} </h3>
}




function About() {
    return <div><h3>About</h3></div>
}

function NoMatch() {
    return <div><h3>No match!</h3></div>
}

export default BasicExample;
//ReactDOM.render(<BasicExample/>, document.getElementById('root'));