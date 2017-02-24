//Libs
import React, { Component } from 'react'

//WebSocket
import io from "socket.io-client"
let socket = io("https://triage-project.herokuapp.com/")

//Material UI
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

//CSS
const compStyle={
  flex: "1",
  height: "550px",
  padding: "0.5em",
  overflow: "auto"
}

const currentQuestion={
  backgroundColor: "gold",
  marginBottom: "20px"
}

const otherQuestion={
  marginBottom: "20px"
}

//Main Component
class GeneralForm extends Component {


  render(){
    const that = this
    const questions = this.props.conversation.state.questions;
    let questionsRender;
    if(questions){
      questionsRender = questions.map(function(question){
        if(question.isAsking === false){
          return (
            <div key={question.ask} style={otherQuestion} >
              <TextField
                defaultValue={question.answer}
                disabled={true}
                floatingLabelText={question.ask}
                hintText="Disabled Hint Text"
                underlineDisabledStyle={{borderBottom: "1px solid"}}
              />
            </div>
          )
        }
        else if (question.isAsking === true){
          return (
            <div style={currentQuestion} key={question.ask}>
              <TextField
                fullWidth={true}
                errorText="This field is required"
                floatingLabelText={question.ask}
              />
              <RaisedButton
                fullWidth={true}
                icon={<FontIcon className="material-icons">done</FontIcon>}
                label="Confirm"
                onClick={that.socketEmit}
                primary={true}
              />
            </div>
          )
        } else {
          return (
            <div key={question.ask} style={otherQuestion} >
              <TextField
                defaultValue="..."
                disabled={true}
                floatingLabelText={question.ask}
                underlineDisabledStyle={{borderBottom: "1px solid"}}
              />
            </div>
          )
        }
      })//end of map function and questions render
    }else{
      return (
        <div>
          button pour envoyer le formulaire
        </div>
      )
    }

    return (
      <div>
        <div
          style={{
            backgroundColor: "#00bcd4",
            color: "rgba(255,255,255, 0.7)",
            fontSize: "14px",
            padding: "1em",
            textAlign: "center",
            textTransform: "uppercase",
          }}
          >
            <FontIcon
              className="material-icons"
              style={{
                color: "rgba(255,255,255, 0.7)",
              }}
            >assignment</FontIcon>
        </div>
        <div style={compStyle}>
          <form>
            {questionsRender}
          </form>
        </div>

      </div>
    )
  }
}

export default GeneralForm
