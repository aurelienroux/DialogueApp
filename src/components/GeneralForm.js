//Libs
import React, { Component } from 'react'

//WebSocket
import socket from '../socket';

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
  backgroundColor: "#0097A7",
  marginBottom: "20px",
  color: "blue"
}

const otherQuestion={
  marginBottom: "20px"
}

const btn={
  margin: "10px",
}

//Main Component
class GeneralForm extends Component {
  //IS WORKING
  sendQuestions() {
    socket.emit(
      'send_form',
      {user_id: this.props.conversation.user_id}
    );
  }

  //NOT WORKING
  sendHumanResponse(e){
    e.preventDefault()
    socket.emit(
      'send_human_response',
      {
        user_id: this.props.conversation.user_id,
        response: inputField.value,
        // baseType:"baseType here"
      },
    )
    console.log("humanres" + this.refs.inputField.value)
  }

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
              {/* <TextField
                floatingLabelText={question.ask}
                fullWidth={true}
                ref="input"
                style={{margin:"5px 0 20px"}}
              />
              <RaisedButton
                fullWidth={true}
                icon={<FontIcon className="material-icons">done</FontIcon>}
                label="Confirm"
                // onClick={this.sendHumanResponse.bind(this)}
                primary={true}
              /> */}
              <input type="text" ref="inputField"></input>
              <button onClick={that.sendHumanResponse.bind(that)} >click</button>
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
          <div
            style={{
              backgroundColor: "#00bcd4",
              color: "rgba(255,255,255, 0.7)",
              fontSize: "14px",
              padding: "1em",
              textAlign: "center",
              textTransform: "uppercase",
            }}>
              <FontIcon
                className="material-icons"
                style={{
                  color: "rgba(255,255,255, 0.7)",
                }}
                >assignment</FontIcon>
          </div>
          <div style={{marginTop:"50px"}}>
            {/* <button style={btn} onClick={this.sendQuestions.bind(this)}>click here to send questions</button> */}
            <RaisedButton
              fullWidth={false}
              icon={<FontIcon className="material-icons">assignment</FontIcon>}
              label="Click here to send questions"
              onClick={this.sendQuestions.bind(this)}
              primary={true}
              style={btn}
            />
            <RaisedButton
              fullWidth={false}
              icon={<FontIcon className="material-icons">assignment</FontIcon>}
              label="General Questions"
              primary={true}
              style={btn}
              disabled={true}
            />
            <RaisedButton
              fullWidth={false}
              icon={<FontIcon className="material-icons">assignment</FontIcon>}
              label="Allergies Questions"
              primary={true}
              style={btn}
              disabled={true}
            />
          </div>
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
          }}>
            <FontIcon
              className="material-icons"
              style={{color: "rgba(255,255,255, 0.7)"}}>assignment
            </FontIcon>
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
