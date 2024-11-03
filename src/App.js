
import React from 'react';
import SendSongForm from './components/SendSongForm';
import MessageList from './components/MessageList';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <SendSongForm />
      <MessageList />
    </div>
  );
}

export default App;
