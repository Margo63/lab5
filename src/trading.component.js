import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useConnectSocket} from "./hooks/useConnectSocket";
import {SocketApi} from "./api/socket-api";


const TradingComponent = () => {

    const listTradings = useSelector(state => state.listTrading)
    const [intervalID, setIntervalID] = useState(0)

    const [stocks, setStocks] = useState([])
    const [trading, setTrading] = useState([])
    const [speed, setSpeed] = useState(0)
    const [date, setDate] = useState('')
    const [change, setChange] = useState(0)

    useConnectSocket()
    useEffect(()=>{
        SocketApi.socket.on("trading",(data)=>{
            console.log("trading"+data)
            setChange(data)
        })
    },[])



    useEffect(() => {

        (async () => {
            const data = await fetch("http://localhost:8080/getStock")
                .then(res => res.json())


            setStocks(data)
            let tr = []
            listTradings.forEach((el) => {
                const index = data.map((g) => {
                    return g.id;
                }).indexOf(el);
                if (index > -1) {
                    tr.push({id: data[index].id, name: data[index].name, prices: data[index].data})

                }

            })

            setTrading(tr)

        })()
    }, [])


    const clickStart = () => {
        if(speed>0 && date)
            SocketApi.socket.emit("getData",{date,speed})
        console.log("start")
        console.log(trading)

        // setIntervalID(setInterval(() => {
        //     // console.log()
        //     // setTrading([])
        //     //
        //     // listTradings.forEach((el)=>{
        //     //     const index = stocks.map((g) => {
        //     //         return g.id;
        //     //     }).indexOf(el);
        //     //     if(index>-1){
        //     //
        //     //         setTrading([
        //     //             ...trading,
        //     //             { id: stocks[index].id, name: stocks[index].name }
        //     //         ]);
        //     //
        //     //         console.log(el, trading)
        //     //         // console.log([...trading, {
        //     //         //     "id":stocks[index].id,
        //     //         //     "name":stocks[index].name,
        //     //         //     "price":stocks[index].data[indexData].Open
        //     //         // }])
        //     //
        //     //         // trading[stocks[index].id] = {
        //     //         //     "name":stocks[index].name,
        //     //         //     "price":stocks[index].data[indexData].Open
        //     //         // }
        //     //         // trading = [...trading, {
        //     //         //     "name":stocks[index],
        //     //         //     "price":stocks[index].data[indexData].Open
        //     //         // }]
        //     //     }
        //     //
        //     //     // setTrading(trading[el] = {
        //     //     //     "name":stocks[index],
        //     //     //     "price":stocks[index].data[indexData].Open
        //     //     // }
        //     //     // )
        //     //
        //     //     // setTrading(trading[]({
        //     //     //     "name":stocks[index],
        //     //     //     "id":el,
        //     //     //     "price":stocks[index].data[indexData].Open
        //     //     // }))
        //     //     //trade[el] = stocks[index].data[indexData].Open;
        //     // })
        //     // //setTrading(getData())
        //     //
        //     // console.log(trading)
        //
        //     if (indexData < 1250)
        //         indexData += 1;
        //
        //     setChange(indexData)
        //
        // }, speed*1000))

    }
    const clickStop = () => {
        SocketApi.socket.emit("stop")
        clearInterval(intervalID)
        setIntervalID(null)
        //setChange(0)
    }
    const setSpeedChange = (e) => {
        setSpeed(e.target.value)
    }
    const setDateChange = (e) => {
        setDate(e.target.value)
    }

    if (stocks?.length) {
        //console.log(stocks)
        return (
            <div>
                <div>
                    <input type="date" onChange={setDateChange} value={date}/>
                    <label>Дата начала</label>
                </div>
                <div>
                    <input type="number" onChange={setSpeedChange} value={speed}/>
                    <label>Скорость</label>
                </div>

                <button onClick={clickStart}>START</button>
                <button onClick={clickStop}>STOP</button>
                <h1>Trading data:</h1>
                <div>
                    {
                        (change>0 && date && speed)?(
                            trading.map(trad => (
                                <div key={trad.id} >
                                    <>
                                        {trad.name}
                                        {trad.prices[change].Open}
                                    </>
                                </div>
                            ))
                        ):(<></>)

                    }


                </div>
            </div>
        )
    }

    return <h1> Wait</h1>

}

export default TradingComponent;