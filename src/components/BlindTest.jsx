import React, {
  useState, useEffect, useRef, useMemo,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function BlindTest() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userTitle, setUserTitle] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [userAuthor, setUserAuthor] = useState('');
  const [animateOut, setAnimateOut] = useState(false);
  const audioRef = useRef();
  const location = useLocation();
  const { name } = location.state;
  const musicTracks = location.state.playlist;
  console.log(name, 'name');
  const [audioStartTime, setAudioStartTime] = useState(0);

  const shuffledMusicTracks = useMemo(
    () => (musicTracks ? shuffle(musicTracks) : []),
    [musicTracks],
  );

  const getRandomStartTime = () => {
    const maxStartTime = audioRef.current.duration - 30;
    return Math.random() * maxStartTime;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, []);

  const handleAnswer = async () => {
    const newAnswers = [
      ...userAnswers,
      {
        question: currentQuestion,
        userTitle,
        userAuthor,
        musicId: shuffledMusicTracks[currentQuestion].id,
        correctAnswer: shuffledMusicTracks[currentQuestion].title,
        correctAuthor: shuffledMusicTracks[currentQuestion].author,
      },
    ];

    setUserAnswers(newAnswers);

    if (currentQuestion < shuffledMusicTracks.length - 1) {
      setAnimateOut(true);
      setTimeout(() => {
        setAnimateOut(false);
        setCurrentQuestion(currentQuestion + 1);
        setUserTitle('');
        setUserAuthor('');
        setAudioStartTime(0);
      }, 500);
    } else {
      navigate('/results', { state: { userAnswers: newAnswers } });
    }
  };

  const handleAudioPlay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = audioStartTime;
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  };

  useEffect(() => {
    const handleCanPlayThrough = () => {
      if (audioRef.current) {
        const startTime = getRandomStartTime();
        setAudioStartTime(startTime);
        audioRef.current.currentTime = startTime;
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
    };

    const currentAudioRef = audioRef.current;

    if (currentAudioRef) {
      currentAudioRef.src = shuffledMusicTracks[currentQuestion].source;
      currentAudioRef.addEventListener('canplaythrough', handleCanPlayThrough, {
        once: true,
      });
    }

    return () => {
      if (currentAudioRef) {
        currentAudioRef.removeEventListener(
          'canplaythrough',
          handleCanPlayThrough,
        );
      }
    };
  }, [currentQuestion, shuffledMusicTracks]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current.currentTime >= audioStartTime + 30) {
        audioRef.current.pause();
      }
    };

    const currentAudioRef = audioRef.current;

    if (currentAudioRef) {
      currentAudioRef.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        currentAudioRef.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [audioStartTime]);

  return (
    <div>
      {currentQuestion < shuffledMusicTracks.length && (
        <div className="flex flex-col">
          {/* Ajoutez ici le lecteur audio avec la source de l'extrait musical */}
          <header className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="mt-8">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  BlindTest - Devinez le titre de la musique! - Playlist&#160;
                  {name}
                </h1>
                <p className="mt-1.5 text-sm text-gray-500">
                  Question
                  {' '}
                  {currentQuestion + 1}
                  {' '}
                  🚀
                </p>
                <p>Écoutez l&apos;extrait musical :</p>
              </div>
            </div>
          </header>
          <div className={`flex flex-col transition-transform ${animateOut ? '-translate-x-full' : 'translate-x-0'}`}>
            <div className="flex w-full justify-center">
              <audio
                className="w-full m-8"
                controls
                autoPlay
                ref={audioRef}
                onPlay={handleAudioPlay}
              >

                <source
                  src={shuffledMusicTracks[currentQuestion].source}
                  type="audio/mpeg"
                />
                <track kind="captions" />
              </audio>
            </div>

            <label
              htmlFor="userAnswer"
              className="m-8 relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                type="text"
                id="userAnswer"
                value={userTitle}
                onChange={(e) => setUserTitle(e.target.value)}
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 my-2"
                placeholder="Quelle est le titre de cette musique ?"
              />
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Quelle est le titre de cette musique ?
              </span>
            </label>

            <label
              htmlFor="userAuthor"
              className="m-8 relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                type="text"
                id="userAuthor"
                value={userAuthor}
                onChange={(e) => setUserAuthor(e.target.value)}
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 my-2"
                placeholder="Quelle est l'auteur de cette musique ?"
              />
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Quelle est l&apos;auteur de cette musique ?
              </span>
            </label>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="button"
              className="w-40 inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-indigo-500"
              onClick={handleAnswer}
            >
              Valider
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlindTest;
