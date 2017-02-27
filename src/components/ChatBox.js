//Libs
import React, { Component } from 'react'
var moment = require('moment');

//WebSocket
import socket from '../socket';

//Material UI
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';

//CSS
const compStyle={
  display: "flex",
  flex: "1",
  flexDirection: "column",
}

const userStyle={
  backgroundColor: "#80DEEA",
  margin: "1em 0 1em 0.5em",
  padding: "0.5vh 0.5em",
  width: "75%"
}

const appStyle={
  alignSelf: "flex-end",
  backgroundColor: "#E0E0E0",
  margin: "1em 0.5em 1em 0",
  padding: "0.5vh 0.5em",
  textAlign: "right",
  width: "75%"
}

const chatBoxLimitStyle={
  display: "flex",
  flexDirection: "column",
  height: "400px",
  overflow: "auto"
}

const timestampStyle={
  fontSize: "0.65em",
  margin: "0.5em"
}

//Main Component
class ChatBox extends Component {
  sendChatResponse(e){
    e.preventDefault();
    let val = this.refs.inputField.input.value
    socket.emit(
      'send_human_message',
      {
        user_id: this.props.conversation.user_id,
        message: val
      }
    );
    this.refs.inputField.input.value = "";
    console.log("chat response " + val);
  }

  render(){
    const messages = this.props.conversation.messages;
    const convItem = messages.map(function(message, idx){
      if(message.sender === 'app'){
        let messageTime = message.time
        return (
          <Paper
            style={appStyle}
            zDepth={2}
            key={idx}
            children={
              <div>
                <p>{message.message}</p>
                <p style={timestampStyle} >{message.time}</p>
                {/*
                <p style={timestampStyle} >{moment().format()}</p>
                <p style={timestampStyle} >{moment().startOf('hour').fromNow()}</p>
                <p style={timestampStyle} >{moment().startOf('day').fromNow()}</p>
                <p style={timestampStyle} >{moment().startOf('minute').fromNow()}</p>
                */}
                <p style={timestampStyle} >
                  <FontIcon
                    className="material-icons"
                    style={{
                      fontSize: "1.75em",
                    }}
                    >timer</FontIcon>
                  {moment().startOf({messageTime}).fromNow()}
                 </p>
              </div>
            }
          />
        )
      } else {
        let messageTime = message.time
        return (
          <Paper
            style={userStyle}
            zDepth={2}
            key={idx}
            children={
              <div>
                <p>{message.message}</p>
                <p style={timestampStyle} >{message.time}</p>
                <p style={timestampStyle} >
                  <FontIcon
                    className="material-icons"
                    style={{
                      fontSize: "1.75em"
                    }}
                   >timer</FontIcon>
                  {moment().startOf({messageTime}).fromNow()}
                </p>
              </div>
            }
          />
        )
      }
    })

    return(
      <div style={compStyle}>
        <div
          style={{
            backgroundColor: "#00bcd4",
            fontSize: "14px",
            padding: "1em",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          <FontIcon
            className="material-icons"
            style={{
              color: "rgba(255,255,255, 0.7)",
            }}
          >forum</FontIcon>
        </div>

        <div style={chatBoxLimitStyle}>
          {convItem}
        </div>

        <Divider />
        <div style={{padding:"0.5em"}}>

          <form onSubmit={this.sendChatResponse.bind(this)}>
            <TextField
              floatingLabelText="Type question here"
              fullWidth={true}
              id="inputField"
              ref="inputField"
              // multiLine={true}
              style={{margin:"5px 0 20px"}}
            />

            {/* <input type="text" style={{border:"1px solid tomato"}} ref="inputTest"></input> */}
            {/* <button onClick={this.sendChatResponse.bind(this)}>click</button> */}

            <RaisedButton
              fullWidth={true}
              icon={<FontIcon className="material-icons">done</FontIcon>}
              label="Confirm"
              onClick={this.sendChatResponse.bind(this)}
              primary={true}
            />
          </form>
        </div>
      </div>
    )
  }
}

export default ChatBox;
