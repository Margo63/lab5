import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";



const TradingComponent = () => {

    const listTradings = useSelector(state => state.listTrading)
    const [intervalID, setIntervalID] = useState(0)

    const [stocks, setStocks] = useState([])
    const [trading, setTrading] = useState([])
    const [speed, setSpeed] = useState(0)
    const [change, setChange] = useState(0)

    //const [trading, setTrading] = useState([])
    //let trading=[];
    let indexData = 0;


    useEffect(() => {

        (async () => {
            const data = await fetch("http://localhost:8080/getStock")
                .then(res => res.json())


            setStocks(data)
            let tr = []
            listTradings.forEach((el)=>{
                const index = data.map((g) => {
                    return g.id;
                }).indexOf(el);
                if(index>-1){
                    tr.push({ id: data[index].id, name: data[index].name, prices: data[index].data })
                    // setTrading([
                    //     ...trading,
                    //     { id: data[index].id, name: data[index].name }
                    // ]);
                    //
                    // console.log(el, [
                    //     ...trading,
                    //     { id: data[index].id, name: data[index].name }
                    // ])

                }

            })

            setTrading(tr)

        })()
    }, [])


    const clickStart = ()=>{
        console.log("start")
        //setTrading([])
        console.log(trading)
        setIntervalID(setInterval(()=>{
            // console.log()
            // setTrading([])
            //
            // listTradings.forEach((el)=>{
            //     const index = stocks.map((g) => {
            //         return g.id;
            //     }).indexOf(el);
            //     if(index>-1){
            //
            //         setTrading([
            //             ...trading,
            //             { id: stocks[index].id, name: stocks[index].name }
            //         ]);
            //
            //         console.log(el, trading)
            //         // console.log([...trading, {
            //         //     "id":stocks[index].id,
            //         //     "name":stocks[index].name,
            //         //     "price":stocks[index].data[indexData].Open
            //         // }])
            //
            //         // trading[stocks[index].id] = {
            //         //     "name":stocks[index].name,
            //         //     "price":stocks[index].data[indexData].Open
            //         // }
            //         // trading = [...trading, {
            //         //     "name":stocks[index],
            //         //     "price":stocks[index].data[indexData].Open
            //         // }]
            //     }
            //
            //     // setTrading(trading[el] = {
            //     //     "name":stocks[index],
            //     //     "price":stocks[index].data[indexData].Open
            //     // }
            //     // )
            //
            //     // setTrading(trading[]({
            //     //     "name":stocks[index],
            //     //     "id":el,
            //     //     "price":stocks[index].data[indexData].Open
            //     // }))
            //     //trade[el] = stocks[index].data[indexData].Open;
            // })
            // //setTrading(getData())
            //
            // console.log(trading)

            if(indexData<1250)
                indexData+=1;

            setChange(indexData)

        },speed))

    }
    const clickStop = () => {

        clearInterval(intervalID)
        setIntervalID(null)
    }
    const setSpeedChange = (e) => {
        setSpeed(e.target.value)
    }

    if (stocks?.length) {
        //console.log(stocks)
        return (
            <div>
                <div>
                    <input type="date"/>
                    <label>Дата начала</label>
                </div>
                <div>
                    <input type="number" onChange={ setSpeedChange} value={speed}/>
                    <label>Скорость</label>
                </div>

                <button onClick={clickStart}>START</button>
                <button onClick={clickStop}>STOP</button>
                <h1>Trading data:</h1>
                <div>
                    {

                        <ul>
                            {trading.map(trad => (
                                <li key={trad.id}>{
                                    trad.prices[change].Open
                                }</li>
                            ))}
                        </ul>

                        // (trading&&change)?(
                        // trading.map((el)=>{
                        //     console.log(el)
                        //     return <div key={el.key}>
                        //                      {el.key}
                        //                      <></>
                        //                      {el.value}
                        //                  </div>
                        // })
                        //     ):
                        //     (<div>Wait</div>)

                        // stocks.map((el)=>{
                        //     if(listTradings.includes(el.id)){
                        //         return <div>
                        //             {el.name}
                        //             <></>
                        //             {el.data[indexData].Open}
                        //         </div>
                        //     }
                        //
                        // })
                    }


                </div>
            </div>
        )
    }

    return <h1> Wait</h1>

}



export default TradingComponent;