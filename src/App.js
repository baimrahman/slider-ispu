import React, { Component } from "react";
import { Slider } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import io from "socket.io-client";
import "./App.css";

const appSocket = io("http://103.126.226.54:5555");

const SocketISPU = response => {
  appSocket.on("connect", function() {
    // Connected, let's sign-up for to receive messages for this room
    console.log("Connected to Socket!");
  });

  return appSocket.on("message", response);
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socketData: {
        datetime: 0,
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0,
        value5: 0
      }
    };
  }

  componentDidMount() {
    console.log(this.state.socketData.value);
    SocketISPU(response => {
      if (this.state.socketData) {
        let socketDataTemp = this.state.socketData;
        if (response.datetime !== socketDataTemp.datetime) {
          this.setState({
            socketData: response
          });
          console.log(this.state.socketData.value);
        }
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <Slider value={this.state.socketData.value1} disabled={false} />
          <h1>Value 1 = {this.state.socketData.value1}</h1>
          <Slider value={this.state.socketData.value2} disabled={false} />
          <h1>Value 2 = {this.state.socketData.value2}</h1>
          <Slider value={this.state.socketData.value3} disabled={false} />
          <h1>Value 3 = {this.state.socketData.value3}</h1>
          <Slider value={this.state.socketData.value4} disabled={false} />
          <h1>Value 4 = {this.state.socketData.value4}</h1>
          <Slider value={this.state.socketData.value5} disabled={false} />
          <h1>Value 5 = {this.state.socketData.value5}</h1>
        </div>
      </div>
    );
  }
}

export default App;
