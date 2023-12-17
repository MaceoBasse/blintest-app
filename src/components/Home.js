// Home.js
import React from 'react';
import { playlist1, playlist2 } from '../musicTracks';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const handlePlaylistClick = (playlist) => {
    navigate('/BlindTest', { state: { playlist: playlist } });
  };
  return (
    <div>
      <h1>BlindTest</h1>
      <p>Bienvenue sur notre application BlindTest!</p>
      <h1>Choisissez une playlist</h1>
      <button onClick={() => handlePlaylistClick(playlist1)}>Playlist 1</button>
      <button onClick={() => handlePlaylistClick(playlist2)}>Playlist 2</button>
    </div>
  );
};

export default Home;
