import {useEffect, useState} from "react";
import LineChart from "./line.component";
import {CategoryScale, Chart, registerables} from "chart.js";


const StockComponent = () => {
    const [stocks, setStocks] = useState([])

    useEffect(() => {

        (async () => {
            const data = await fetch("http://localhost:8080/getStock")
                .then(res => res.json())

            setStocks(data)

        })()
    }, [])


    if (stocks?.length) {
        console.log(stocks)
        return (
            <div>
                <h1>GET DATA:</h1>

                <div>
                    {stocks.map(stock => {

                        return <Stock key={stock.id} value={stock}></Stock>
                    })}

                </div>
            </div>
        )
    }

    return <h1> Bad</h1>

}
Chart.register(CategoryScale);
Chart.register(...registerables);

function Stock(props) {
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClickClose = () => {
        setOpen(false)
    }

    const [chartData, setChartData] = useState({
        labels: props.value.data.map((data) => data.Date),
        datasets: [
            {
                label: "Users Gained ",
                data: props.value.data.map((data) => data.Open.match(/(\d+)/)[0]),
                borderColor: "black",
                borderWidth: 2
            }
        ]
    });

    //console.log(props.value.data.map((data) => data.Date))

    // useEffect(()=>{
    //     const ctx = document.getElementById("myChart")
    //     const labels = ['10/6/2021', '10/7/2021', '10/8/2021', '10/11/2021', '10/12/2021', '10/13/2021', '10/14/2021', '10/15/2021', '10/18/2021', '10/19/2021', '10/20/2021', '10/21/2021', '10/22/2021', '10/25/2021', '10/26/2021', '10/27/2021', '10/28/2021', '10/29/2021', '11/1/2021', '11/2/2021', '11/3/2021', '11/4/2021', '11/5/2021'];
    //     const values = [139.47, 143.06, 144.03, 142.27, 143.23, 141.24, 142.11, 143.77, 143.45, 147.01, 148.7, 148.81, 149.69, 148.68, 149.33, 149.36, 149.82, 147.22, 148.99, 148.66, 150.39, 151.58, 151.89]
    //     const data = {
    //         labels: labels,
    //         datasets: [{
    //             label: 'AAPL',
    //             backgroundColor: 'rgb(255, 99, 132)', borderColor: 'rgb(255, 99, 132)', data: values,
    //         }]
    //     }
    //     const myChart = new Chart(ctx, {
    //         type: 'line',
    //         data
    //     });
    // })



    return (
        <>
            <div>
                {props.value.id}
                {props.value.name}
            </div>
            <button onClick={handleClickOpen}>График</button>
            {open ? <div>
                <LineChart chartData={chartData}></LineChart>
                <button onClick={handleClickClose}>Close</button>
            </div>
            : null
            }

        </>
    )
}

export default StockComponent