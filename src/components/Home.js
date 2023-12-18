// Home.js
import React from 'react';
import { popPlaylist, rapPlaylist,electroPlaylist } from '../musicTracks';
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
      <button onClick={() => handlePlaylistClick(popPlaylist)}>Playlist Pop</button>
      <button onClick={() => handlePlaylistClick(rapPlaylist)}>Playlist Rap</button>
      <button onClick={() => handlePlaylistClick(electroPlaylist)}>Playlist Electro</button>

    </div>
  );
};

export default Home;
