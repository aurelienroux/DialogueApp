//Libs
import React, { Component } from 'react'
var moment = require('moment');

//WebSocket
import io from "socket.io-client"
let socket = io("https://triage-project.herokuapp.com/")

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
  backgroundColor: "steelblue",
  margin: "1em 0",
  padding: "0.5vh 0.5em",
  width: "75%"
}

const appStyle={
  alignSelf: "flex-end",
  backgroundColor: "grey",
  margin: "1em 0",
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
  socketEmit = () => {
    socket.emit('human_message', {message: `${this.refs.input.value}`})
  }
  render(){
    const messages = this.props.conversation.messages;
    const convItem = messages.map(function(message){
      if(message.sender === 'app'){
        let messageTime = message.time
        console.log(messageTime)
        return (
          <Paper
            style={appStyle}
            zDepth={1}
            key={message.user_id}
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
        console.log(messageTime)
        return (
          <Paper
            style={userStyle}
            zDepth={1}
            key={message.user_id}
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
        <TextField
          errorText="This field is required ?? no?"
          floatingLabelText="dynamic ?? must empty after launch"
          fullWidth={true}
          ref="input"
          style={{margin:"5px 0 20px"}}
        />
        <RaisedButton
          icon={<FontIcon className="material-icons">done</FontIcon>}
          label="Confirm"
          onClick={this.socketEmit}
          primary={true}
        />
      </div>
    )
  }
}

export default ChatBox;
