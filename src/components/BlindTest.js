import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// Fonction pour mélanger un tableau
function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const BlindTest = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userTitle, setUserTitle] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const [userAuthor, setUserAuthor] = useState('');
    const audioRef = useRef();
    const location = useLocation();
    const musicTracks = location.state.playlist;
    // Utilisez useMemo pour calculer la liste mélangée une fois
    const shuffledMusicTracks = useMemo(() => {
        return musicTracks ? shuffle(musicTracks) : [];
    }, [musicTracks]);

    useEffect(() => {
        // Load the audio when the component mounts
        if (audioRef.current) {
            audioRef.current.load();
        }
    }, []);

    const handleAnswer = async () => {
        // Créez une nouvelle variable pour stocker les nouvelles réponses
        const newAnswers = [
            ...userAnswers,
            {
                question: currentQuestion,
                userTitle: userTitle,
                userAuthor: userAuthor,
                musicId: shuffledMusicTracks[currentQuestion].id,
                correctAnswer: shuffledMusicTracks[currentQuestion].title,
                correctAuthor: shuffledMusicTracks[currentQuestion].author,
            },
        ];

        // Mettez à jour l'état avec les nouvelles réponses
        setUserAnswers(newAnswers);

        // Passez à la question suivante
        if (currentQuestion < shuffledMusicTracks.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setUserTitle('');
            setUserAuthor('');
        } else {
            // Toutes les questions ont été répondues, redirigez l'utilisateur vers la page des résultats
            console.log("All questions answered. Redirecting to results page.");
            console.log("User answers:", newAnswers);
            navigate('/results', { state: { userAnswers: newAnswers } });
        }
    };

    const handleAudioPlay = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(error => {
                console.error("Error playing audio:", error);
            });
        }
    };

    useEffect(() => {
        const handleCanPlayThrough = () => {
            // Play the audio once it's ready
            if (audioRef.current) {
                audioRef.current.play().catch(error => {
                    console.error("Error playing audio:", error);
                });
            }
        };

        // Copy audioRef.current to a variable
        const currentAudioRef = audioRef.current;

        if (currentAudioRef) {
            // Set the new source
            currentAudioRef.src = shuffledMusicTracks[currentQuestion].source;

            // Add an event listener for the canplaythrough event
            currentAudioRef.addEventListener('canplaythrough', handleCanPlayThrough, { once: true });
        }

        return () => {
            // Remove the event listener when the component unmounts or the source changes
            if (currentAudioRef) {
                currentAudioRef.removeEventListener('canplaythrough', handleCanPlayThrough);
            }
        };
    }, [currentQuestion, shuffledMusicTracks]);


    return (
        <div>
            {currentQuestion < shuffledMusicTracks.length && (
                <div className='flex flex-col'>
                    {/* Ajoutez ici le lecteur audio avec la source de l'extrait musical */}
                    <header className="bg-gray-50">
                        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">

                            <div className="mt-8">
                                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">BlindTest - Devinez le titre de la musique!</h1>

                                <p className="mt-1.5 text-sm text-gray-500">
                                    Question {currentQuestion + 1} 🚀
                                </p>
                                <p>Écoutez l'extrait musical :</p>

                            </div>
                        </div>
                    </header>
                    <div className='flex w-full justify-center'>
                        <audio
                            className="w-full m-8"
                            controls
                            autoPlay
                            ref={audioRef}
                            src={shuffledMusicTracks[currentQuestion].source}
                            onPlay={handleAudioPlay} // Gérer la lecture audio lors de l'interaction de l'utilisateur
                        >
                        </audio>
                    </div>


                    <label
                        htmlFor="userAnswer"
                        class="m-8 relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <input
                            type="text"
                            id="userAnswer"
                            value={userTitle}
                            onChange={(e) => setUserTitle(e.target.value)}
                            class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 my-2"
                            placeholder="Quelle est le titre de cette musique ?"
                        />
                        <span
                            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                            Quelle est le titre de cette musique ?
                        </span>
                    </label>

                    <label
                        htmlFor="userAuthor"
                        class="m-8 relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <input
                            type="text"
                            id="userAuthor"
                            value={userAuthor}
                            onChange={(e) => setUserAuthor(e.target.value)}
                            class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 my-2"
                            placeholder="Quelle est l'auteur de cette musique ?"
                        />
                        <span
                            class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                            Quelle est l'auteur de cette musique ?
                        </span>
                    </label>
                    <div className='w-full flex justify-center'>
                        <button
                            className="w-40 inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-indigo-500"
                            onClick={handleAnswer}>
                            Valider
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlindTest;
