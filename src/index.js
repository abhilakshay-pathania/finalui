import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import LineChart from "./components/LineChart/LineChart";
class App extends Component {
    //intervalID;

    constructor() {
        super();
        this.state = {
            millData: [],
            ballmillData: [],
            val : [],
            val2 : [],
            val3 : []
        }
    }


    formatData(millData,key,key1) {
        const temp=[];
        for(let i = 0; i < millData.length; i++)
        {
            temp[i] = {"name": millData[i][key1].slice(17,25) ,"value":millData[i][key]};
        }
        //console.log("xxabc",temp);
        return temp;
    }
/*    componentWillUnmount() {
        clearInterval(this.intervalID);

    }*/

    componentWillMount() {
        axios.get(`http://192.168.29.156:5000/api/ballmill`)
            .then(res => {
                const millData = res.data;
                this.setState({millData});
                this.state.val=this.formatData(millData["ballmill"],"seperator_power","created_on");
                this.state.val2=this.formatData(millData["ballmill"],"seperator_speed","created_on");
                this.state.val3=this.formatData(millData["ballmill"],"total_fresh_feed","created_on");

            })
        //this.intervalID=setInterval(this.formatData.bind(this),5000);
        //setTimeout(this.formatData,5000);
    }

    //start

    componentDidMount() {
        axios.get(`http://192.168.29.156:5000//api/ballmill`)
            .then(res => {
                const millData = res.data;
                this.setState({millData});
                this.state.val=this.formatData(millData["ballmill"],"seperator_power","created_on");
                this.state.val2=this.formatData(millData["ballmill"],"seperator_speed","created_on");
                this.state.val3=this.formatData(millData["ballmill"],"total_fresh_feed","created_on");
            })
        //this.intervalID=setInterval(this.formatData.bind(this),5000);
    }
    render() {
        const data3= this.state.val;
        const data2 = this.state.val2;
        const data = this.state.val3;
        //const data = [{"name":1,"value":30.222},{"name":2,"value":40.333},{"name":3,"value":50.24},{"name":4,"value":90.99},{"name":5,"value":20.56}];
        //const data2 = [{"name":3,"value":2.222},{"name":4,"value":4.333},{"name":5,"value":90.24},{"name":6,"value":90.99},{"name":7,"value":20.56}]
        return (
            <div >
                <h1>Poc Data</h1>
                <h2>Graph 1</h2>
                <LineChart id={"abc"} data={data} ></LineChart>
                <h2>Graph 2</h2>
                <LineChart id={"cde"} data={data2} ></LineChart>
                <h2>Graph 3</h2>
                <LineChart id={"dfe"} data={data3} ></LineChart>
            </div>
        );
    }
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

