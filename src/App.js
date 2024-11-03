
import React from 'react';
import SendSongForm from './components/SendSongForm';
import MessageList from './components/MessageList';

function App() {
  return (
    <div className="App">
      <h1 className=' text-black justify-center flex text-2xl sm:text-5xl md:text-7xl text-bold'>Jagoan Confess</h1>
      <SendSongForm />
      <MessageList />
    </div>
  );
}

export default App;
