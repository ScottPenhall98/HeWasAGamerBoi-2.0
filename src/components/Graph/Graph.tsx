import * as React from 'react';
import Chart from 'chart.js';
import {getData} from './DataManagement' 

class Graph extends React.Component{
    componentDidMount(){
        this.buildGraph()
    }
    buildGraph() {
        let barChartData = getData('./collection.json', false)
        //bad code 
        let canvas = this.refs!.canvas as HTMLCanvasElement;
        let ctx = canvas.getContext('2d')!;
        new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart'
                }
            }
        });

    }
    
    render() {

        return (
            <div className="hello">
                <div className="greeting">
                    <canvas ref={"canvas"} id="canvas" width={1400} height={750}/>
                </div>
            </div>
        );
    }
}

export default Graph