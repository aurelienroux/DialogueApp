//Libs
import React, { Component } from 'react'
import Paper from 'material-ui/Paper';

//CSS
const compStyle={
  backgroundColor: "#E0E0E0",
  display: "flex",
  flexDirection: "row",
  flexGrow: "1",
  padding: "1vw",
  border: "2px solid coral"
}

const childStyle={
  display: "flex",
  flex: "1",
  margin: "1vw",
}

//Import Components
import ChatBox from './ChatBox'
import GeneralForm from './GeneralForm'

//Main Component
class ChatContainer extends Component {
  render(){
    return(
      <div style={compStyle} >
        <Paper style={childStyle}>
          <ChatBox conversation={this.props.conversation} />
        </Paper>
        <Paper style={childStyle}>
          <GeneralForm conversation={this.props.conversation} />
        </Paper>
      </div>
    )
  }
}

export default ChatContainer
