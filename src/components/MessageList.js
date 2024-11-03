
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesArray);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Daftar Pesan</h2>
      {messages.map((msg) => (
        <div key={msg.id} className="p-4 bg-white rounded-lg shadow-lg space-y-3 border border-gray-200">
          <p className="text-gray-700"><strong>Kepada:</strong> {msg.recipient}</p>
          <p className="text-gray-700"><strong>Pesan:</strong> {msg.message}</p>
          <p className="text-gray-700"><strong>Lagu:</strong> {msg.song.name} - {msg.song.artist}</p>
          
          {msg.song.image && (
            <img 
              src={msg.song.image} 
              alt={`${msg.song.name} by ${msg.song.artist}`} 
              className="w-full h-40 object-cover rounded-lg"
            />
          )}
          
          <a 
            href={msg.song.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block text-blue-500 hover:text-blue-600 mt-2 underline"
          >
            Dengarkan di Spotify
          </a>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
