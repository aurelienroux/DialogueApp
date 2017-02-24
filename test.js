
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
    });

    // This will be fired when the server detects a new message from the patient or the bot or the nurse
    socket.on('transmit_message', data => {
      /*
      1. Extract the convId from the data.
      2. Check in the state if we already have a conversation with that convId
        2a. If we do assign it to the variable theConversation
        2b. If we don't, create a new theConversation var and "push" it to the conversations array
      3. No matter how we got here, we now have a theConversation variable. Extract the messages key
      4. "Push" the new message to the messages of theConversation, in the correct sort order
      5. Update the new component state, and re-render
      */

      

    });

    // This will be fired when the server detects a change of conversation state
    socket.on('transmit_state', () => {
      /*
      1. Extract the convId from the data.
      2. Check in the state if we already have a conversation with that convId
        2a. If we do assign it to the variable theConversation
        2b. If we don't, create a new theConversation var and "push" it to the conversations array
      3. No matter how we got here, we now have a theConversation variable. Extract the state key
      4. "Override" the old conversation state with the new conversation state
      5. Update the new component state, and re-render
      */





    });
  }
