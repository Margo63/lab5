import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({ chartData }) {
    console.log("in line")
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    return (
        // <div className="chart-container">
        //     <h2 style={{ textAlign: "center" }}>Line Chart</h2>
            <Line
                data={
                chartData
               //      {
               //          labels,
               //          datasets: [
               //              {
               //                  label: 'Dataset 1',
               //                  data: labels.map((elem) => elem.length),
               //                  borderColor: 'rgb(255, 99, 132)',
               //                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
               //              }]}
            }
                options={
                    // {
                    //     responsive: true,
                    //     plugins: {
                    //         legend: {
                    //             position: 'top',
                    //         },
                    //         title: {
                    //             display: true,
                    //             text: 'Chart.js Line Chart',
                    //         },
                    //     },
                    // }
                {
                    plugins: {
                        title: {
                            display: true,
                            text: "Users Gained between 2016-2020"
                        },
                        legend: {
                            display: false
                        }
                    }
                }
            }
            />
       // {/*</div>*/}
    );
}
export default LineChart;