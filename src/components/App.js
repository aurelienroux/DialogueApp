//Libs
import React, { Component } from 'react';
import socket from '../socket';

//Import Components
import HeaderTabs from './HeaderTabs'

//CSS
const compStyle={
  display: "flex",
  fontFamily: "Roboto",
  height: "100vh",
  margin: "0 auto",
  maxWidth: "700px",
  overflow: "auto"
}

//Main Component
class App extends Component {
  state={
      conversations: [
        // {
        //   id: 'first Id',
        //   user_id: 'firstuser_Id',
        //   state: {
        //   },
        //   messages: [
        //     {
        //       user_id: 'patient',
        //       message: 'hello, how are you ^',
        //       sender: 'user',
        //       time: '2017-01-01 15:05:25' // use the moment library (npm) .fromNow()
        //     },
        //     {
        //       user_id: 'nurse',
        //       message: 'sending you some questions that are soooooo long that it just doenst make sense!!!',
        //       sender: 'app',
        //       time: '2017-01-01 15:05:25'
        //     },
        //     {
        //       user_id: 'patienttwo',
        //       message: 'i<ll look at that',
        //       sender: 'user',
        //       time: '2017-01-01 15:05:25'
        //     },
        //     {
        //       user_id: 'patientthree',
        //       message: 'hello, how are you ^',
        //       sender: 'user',
        //       time: '2017-01-01 15:05:25' // use the moment library (npm) .fromNow()
        //     },
        //     {
        //       user_id: 'patientbutapp',
        //       message: 'hello, how are you ^',
        //       sender: 'app',
        //       time: '2017-01-01 15:05:25' // use the moment library (npm) .fromNow()
        //     },
        //   ]
        // },
        // {
        //   id: 'second Id',
        //   user_id: 'seconduser_Id',
        //   state: {
        //     needsHuman: true,
        //     questions: [
        //       {
        //         askFriendly:"Do you smoke ?",
        //         ask: 'do_you_smoke',
        //         accept: ['affirmative'],
        //         isAsking: false,
        //         answer: '1 pack a day'
        //       },
        //       {
        //         ask: 'do_you_have_allergies',
        //         accept: ['affirmative'],
        //         isAsking: false,
        //         answer: "not that I know of"
        //       },
        //       {
        //         ask: 'do_you_smoke_again',
        //         accept: ['affirmative'],
        //         isAsking: true
        //       }
        //     ]
        //   },
        //   messages: [
        //     {
        //       user_id: 'patient',
        //       message: 'hello second conversation',
        //     },
        //     {
        //       user_id: 'app',
        //       message: 'i will send you some questions'
        //     }
        //   ]
        // },
        // {
        //   id: 'thirdtId',
        //   user_id: 'thirduser_Id',
        //   state: {
        //     needsHuman: false,
        //     questions: [
        //       {
        //         askFriendly: 'Do you smoke?',
        //         ask: 'do_you_smoke',
        //         accept: ['affirmative', 'decline', 'do_you_smoke_answer'],
        //         answer: '1 pack a day',
        //         isAsking: false,
        //       },
        //       {
        //         askFriendly: 'Do you take any medications?',
        //         ask: 'any_medications',
        //         accept: ['affirmative', 'decline','medication_answer'],
        //         answer: '1 pack a day',
        //         isAsking: false,
        //       },
        //       {
        //         askFriendly: 'Do you have any allergies?',
        //         ask: 'any_allergies',
        //         accept: ['affirmative', 'decline', 'allergies_answer'],
        //         isAsking: true,
        //       },
        //       {
        //         askFriendly: 'Do you have insurance?',
        //         ask: 'any_insurance',
        //         accept: ['affirmative', 'decline','insurance_answer']
        //       },
        //       {
        //         askFriendly: 'Do you live in Montreal?',
        //         ask: 'in_what_city',
        //         accept: ['affirmative', 'decline','city_answer']
        //       }
        //     ]
        //   },
        //   messages: [
        //     {
        //       user_id: 'patient',
        //       message: 'hello',
        //     },
        //     {
        //       user_id: 'nurse',
        //       message: 'i will send you some questions'
        //     }
        //   ]
        // },
        // {
        //   id: 'fourthtId',
        //   user_id: 'thirduser_Id',
        //   state: {
        //     needsHuman: true,
        //     questions: [
        //       {
        //         ask: 'do_you_smoke'
        //       }
        //     ]
        //   },
        //   messages: [
        //     {
        //       user_id: 'patient',
        //       message: 'hello',
        //     },
        //     {
        //       user_id: 'nurse',
        //       message: 'i will send you some questions'
        //     }
        //   ]
        // },
        // {
        //   id: 'fifthtId',
        //   user_id: 'thirduser_Id',
        //   state: {
        //     needsHuman: true,
        //     questions: [
        //       {
        //         ask: 'do_you_smoke'
        //       }
        //     ]
        //   },
        //   messages: [
        //     {
        //       user_id: 'patient',
        //       message: 'hello',
        //     },
        //     {
        //       user_id: 'nurse',
        //       message: 'i will send you some questions'
        //     }
        //   ]
        // }
      ]
    }

  componentDidMount(){
    fetch('https://triage-project.herokuapp.com/conv')
    .then(res => res.json())
    .then(conversations => {

      /*
      1. Loop thru the conversations and add any new converstaions to the component state
      2. For each conversation we receive, make a new AJAX call to fetch the current messages
      3. Each time we receive a list of messages for one conversation, process the list with
         the same logic as the transmit_message event.
      4. Update the new component state and re-render
      */
      // conversations.map(function(conv){
      //   this.state.conversations = [...this.state.conversations, conv]
      // })
      //
      // conversations.forEach(function(conv){
      //   fetch(?)
      //   .then()
      // })

    });

    //This will be fired when the server detects a new message from the patient or the bot or the nurse
    socket.on('transmit_message', data => {
      console.log('TRANSMIT MESSAGE', data);
      /*
      1. Extract the convId from the data.
      2. Check in the state if we already have a conversation with that convId
        2a. If we do assign it to the variable theConversation
        2b. If we don't, create a new theConversation var and "push" it to the conversations array
      3. No matter how we got here, we now have a theConversation variable. Extract the messages key
      4. "Push" the new message to the messages of theConversation, in the correct sort order
      5. Update the new component state, and re-render
      */
      let userId = data.user_id;
      let theConversation =  this.state.conversations.find(function(conv){
          return userId === conv.user_id
      })
      if( !theConversation ){
        theConversation = {
          user_id: data.user_id,
          messages: [],
          state: {}
        }
        this.state.conversations = [...this.state.conversations, theConversation]
      }
      theConversation.messages.push(data)
      this.forceUpdate()
    });

    // This will be fired when the server detects a change of conversation state
    socket.on('transmit_state', data => {
      console.log('TRANSMIT STATE', data);
      /*
      1. Extract the convId from the data.
      2. Check in the state if we already have a conversation with that convId
        2a. If we do assign it to the variable theConversation
        2b. If we don't, create a new theConversation var and "push" it to the conversations array
      3. No matter how we got here, we now have a theConversation variable. Extract the state key
      4. "Override" the old conversation state with the new conversation state
      5. Update the new component state, and re-render
      */
      let userId = data.user_id
      let theConversation = this.state.conversations.find(function(conv){
        return userId = conv.user_id
      })
      if( !theConversation ){
        theConversation = {
          user_id: data.user_id,
          messages: [],
          state: data.state
        }
        this.state.conversations = [...this.state.conversations, theConversation]
      }
      theConversation.state = data.state
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div style={compStyle}>
        <HeaderTabs conversations={this.state.conversations} />
      </div>
    );
  }
}

export default App;
