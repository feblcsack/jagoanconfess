
import React, { useState, useEffect } from 'react';
import { sendMessage } from '../firebaseActions';
import { searchSpotifyTracks } from '../spotifyService';

const SendSongForm = () => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [songQuery, setSongQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const [songResults, setSongResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!songQuery) {
      setSongResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchSpotifyTracks(songQuery);
      setSongResults(results);
      setIsSearching(false);
    }, 300); 

    return () => clearTimeout(delayDebounceFn); 
  }, [songQuery]);

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    setSongResults([]);
    setSongQuery(song.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSong) return;

    const songData = {
      name: selectedSong.name,
      artist: selectedSong.artists[0].name,
      url: selectedSong.external_urls.spotify,
      image: selectedSong.album.images[0]?.url,
    };
    await sendMessage(recipient, message, songData);
    setRecipient('');
    setMessage('');
    setSongQuery('');
    setSelectedSong(null);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">Kirim Lagu</h2>
      
      <input
        type="text"
        placeholder="penerima"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      
      <textarea
        placeholder="pesan"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      
      <div className="relative">
        <input
          type="text"
          placeholder="cari lagunya!!"
          value={songQuery}
          onChange={(e) => setSongQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {isSearching && <p className="text-sm text-gray-500">Mencari...</p>}
        
        {songResults.length > 0 && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {songResults.map((song) => (
              <div
                key={song.id}
                onClick={() => handleSelectSong(song)}
                className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={song.album.images[0]?.url}
                  alt={`${song.name} album cover`}
                  className="w-12 h-12 rounded-lg object-cover mr-3"
                />
                <div>
                  <p className="font-semibold text-gray-800">{song.name}</p>
                  <p className="text-sm text-gray-600">{song.artists[0].name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
      >
        Kirim Lagu
      </button>
    </form>
  );
};

export default SendSongForm;
