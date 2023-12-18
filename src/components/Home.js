// Home.js
import React from 'react';
import { popPlaylist, rapPlaylist,electroPlaylist } from '../musicTracks';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const playlists = [
    { name: 'Pop', playlist: popPlaylist },
    { name: 'Rap', playlist: rapPlaylist },
    { name: 'Electro', playlist: electroPlaylist },
  ];
  const navigate = useNavigate();
  const handlePlaylistClick = (playlist) => {
    navigate('/BlindTest', { state: { playlist: playlist } });
  };
  return (
    <div>
      <h1>BlindTest</h1>
      <p>Bienvenue sur notre application BlindTest!</p>
      <h1>Choisissez une playlist</h1>
      {playlists.map((playlist) => (
      <button key={playlist.name} onClick={() => handlePlaylistClick(playlist.playlist)}>
        Playlist {playlist.name}
      </button>
    ))}

    </div>
  );
};

export default Home;
