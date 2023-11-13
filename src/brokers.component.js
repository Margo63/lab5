// import React from "react";
// import axios from "axios";
//
// export class BrokersComponent extends React.Component {
//     constructor(props) {
//         super(props); // Настройка свойств в конструкторе // Состояние
//         this.state = {text:""}
//         //this.state = {class: "off", label: "Нажми",text: "", outtext: ""};
//         // this.state= {text: "", outtext: ""}
//         this.onChange = this.onChange.bind(this)
//         //this.onSubmit = this.onSubmit.bind(this)
// // Привязка контекста функции
//         //this.toggle = this.toggle.bind(this);
//         //call()
//     }
//
//
//
//
//     render() {
//         return (
//             <div>
//
//                 {this.state.text}
//             </div>
//
//         );
//     }
//
//     onChange(e) {
//         let value = e.target.value
//         this.setState({text: value})
//     }
//
//
// }
//
// // function call(){
// //     useEffect(() => {
// //         axios.get("http://localhost:8080/getAllBrokers").then((response) => {
// //                 this.onChange(response.data)
// //             }
// //         );
// //
// //
// //     }, []);
// // }

import {useEffect, useState} from 'react'
import axios from "axios";
import useFetch from "./useFetch";


const endpoint = 'http://localhost:8080/getAllBrokers'

const BrokersComponent = () => {
    const [users, setUsers] = useState([])
    const [load, setLoad] = useState(false)

    //if(!load){
    useEffect(() => {
        if (!load)
            (async () => {
                const data = await fetch(endpoint)
                    .then(res => res.json())

                setUsers(data)
                setLoad(true)
            })()
    }, [])
    // }


    if (users?.length) {
        console.log(users)
        return (
            <div style={{paddingLeft: 20}}>
                <h1>Brokers:</h1>
                <AddBroker></AddBroker>

                <div>
                    {users.map(user => {
                        return <Broker key={user.id} value={user}></Broker>
                    })}

                </div>
            </div>
        )
    }

    return <h1> Bad</h1>

}

function AddBroker() {
    const [openAdd, setOpenAdd] = useState(false);

    const [inputBalance, setInputBalance] = useState(0);
    const [inputNickname, setInputNickname] = useState("");
    const [inputName, setInputName] = useState("");

    const handleClickToOpenAdd = () => {
        setOpenAdd(true);
    };
    const handleToCloseAdd = async () => {
        console.log("new value" + inputName)

        if (inputName && inputNickname)

            try {
                const response = await fetch("http://localhost:8080/postBroker", {
                    method: "POST",
                    body: JSON.stringify({
                        "id": inputNickname,
                        "name": inputName,
                        "balance": inputBalance
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    ,
                });

                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                }

                const result = await response.json();

                //console.log('result is: ', JSON.stringify(result, null, 4));
                if (result.mes === "success")

                    console.log(result);
            } catch (err) {
                console.log(err.message);
            }

        setOpenAdd(false)
    }
    const onChangeBalance = (e) => {
        setInputBalance(e.target.value)
    }
    const onChangeNickname = (e) => {
        setInputNickname(e.target.value)
    }
    const onChangeName = (e) => {
        setInputName(e.target.value)
    }

    return (
        <>
            <button onClick={handleClickToOpenAdd}
                    style={{background: "#FF4B3A", borderRadius: 10, fontSize: 20, color: "white"}}> Add
            </button>
            <dialog open={openAdd} style={{borderColor: "gray", borderRadius: 10, fontSize: 20}}>
                <p>Add broker</p>
                <form>
                    <input type="text" value={inputNickname}
                           placeholder="nickname" onChange={onChangeNickname} style={{fontSize: 18}}/>
                    <input type="text" value={inputName}
                           placeholder="name" onChange={onChangeName} style={{fontSize: 18}}/>
                    <input type="number" value={inputBalance}
                           placeholder="Введите баланс" onChange={onChangeBalance} style={{fontSize: 18}}/>
                    <button
                        onClick={handleToCloseAdd}
                        color="primary" autoFocus style={{fontSize: 18}}>
                        Добавить
                    </button>
                </form>


            </dialog>
        </>
    )
}

function Broker(props) {
    const [open, setOpen] = useState(false);

    const [inputText, setInputText] = useState(0);

    const handleClickToOpen = () => {
        setOpen(true);
    };


    // const Load = (id) =>{
    //     const [mes] = usePutBroker("http://localhost:8080/changeBroker/"+id)
    //     console.log("mes"+mes)
    // }
    //
    // const usePutBroker = (url) => {
    //     const [state, setState] = useState([null])
    //
    //     useEffect(() => {
    //         axios.put(url, {"balance":inputText}).then((response) => {
    //                 setState(response.data)
    //             }
    //         );
    //     }, []);
    //
    //     return state
    // };

    const handleToClose = async (e) => {
        console.log(e.target.value)
        console.log("new value" + inputText)

        try {
            const response = await fetch("http://localhost:8080/changeBroker/" + e.target.value, {
                method: "PUT",
                body: JSON.stringify({"balance": inputText}),
                headers: {
                    'Content-Type': 'application/json'
                }
                ,
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();

            //console.log('result is: ', JSON.stringify(result, null, 4));
            if (result.mes === "success")

                console.log(result);
        } catch (err) {
            console.log(err.message);
        }

        setOpen(false);
    };
    const handleToDelete = async (e) => {
        console.log(e.target.value)
        console.log("new value" + inputText)

        try {
            const response = await fetch("http://localhost:8080/deleteBroker/" + e.target.value, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();

            //console.log('result is: ', JSON.stringify(result, null, 4));
            if (result.mes === "success")

                console.log(result);
        } catch (err) {
            console.log(err.message);
        }

        setOpen(false);
        window.location = "http://localhost:3000"
    };
    const onChange = (e) => {
        let value = e.target.value

        setInputText(value)
    }

    return (
        <div style={{background: "#FF4B3A", padding: 10, borderRadius: 10, margin: 10, color: "white", fontSize: 20}}>
            <p> {props.value.name}</p>
            <p> {props.value.balance}</p>
            <button onClick={handleClickToOpen} style={{fontSize: 20}}> Change</button>
            <button onClick={handleToDelete} value={props.value.id} style={{fontSize: 20}}> Delete</button>
            <dialog open={open} style={{borderColor: "gray", borderRadius: 10}}>
                <p> Изменить баланс пользователя: {props.value.name}</p>
                <form>
                    <input type="number" value={inputText}
                           placeholder="Введите баланс" onChange={onChange} style={{fontSize: 18}}/>
                    <button value={props.value.id}
                            onClick={handleToClose}
                            color="primary" autoFocus style={{fontSize: 18}}>
                        Изменить
                    </button>
                </form>


            </dialog>

        </div>

    )
}

export default BrokersComponent