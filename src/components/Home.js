// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>BlindTest</h1>
      <p>Bienvenue sur notre application BlindTest!</p>
      <p>
        Commencez le test dès maintenant en cliquant sur le bouton ci-dessous.
      </p>
      <Link to="/blindtest">
        <button>Commencer le test</button>
      </Link>
    </div>
  );
};

export default Home;
