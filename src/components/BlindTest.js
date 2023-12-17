import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { musicTracks } from '../musicTracks';

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
    const [userAnswer, setUserAnswer] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const audioRef = useRef();

    // Utilisez useMemo pour calculer la liste mélangée une fois
    const shuffledMusicTracks = useMemo(() => shuffle(musicTracks), []);

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
                answer: userAnswer,
                musicId: shuffledMusicTracks[currentQuestion].id,
                correctAnswer: shuffledMusicTracks[currentQuestion].title,
            },
        ];

        // Mettez à jour l'état avec les nouvelles réponses
        setUserAnswers(newAnswers);

        // Passez à la question suivante
        if (currentQuestion < shuffledMusicTracks.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setUserAnswer(''); // Réinitialise la réponse utilisateur pour la nouvelle question
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
            <h1>BlindTest - Devinez le titre de la musique</h1>
            {currentQuestion < shuffledMusicTracks.length && (
                <div>
                    <h2>Question {currentQuestion + 1}</h2>
                    <p>Écoutez l'extrait musical :</p>
                    {/* Ajoutez ici le lecteur audio avec la source de l'extrait musical */}
                    <audio
                        controls
                        autoPlay
                        ref={audioRef}
                        src={shuffledMusicTracks[currentQuestion].source}
                        onPlay={handleAudioPlay} // Gérer la lecture audio lors de l'interaction de l'utilisateur
                    ></audio>

                    <label htmlFor="userAnswer">Votre réponse :</label>
                    <input
                        type="text"
                        id="userAnswer"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                    />
                    <button onClick={handleAnswer}>Valider</button>
                </div>
            )}
        </div>
    );
};

export default BlindTest;
