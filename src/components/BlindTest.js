import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { musicTracks } from '../musicTracks';
const BlindTest = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const audioRef = useRef();

    // const musicTracks = useMemo(() => [
    //     {
    //         id: 1,
    //         title: "Shape of You",
    //         source: "/music/Ed Sheeran - Shape of You.mp3",
    //     },
    //     {
    //         id: 2,
    //         title: "Despacito",
    //         source: "/music/Luis Fonsi - Despacito ft. Daddy Yankee.mp3",
    //     }
    // ], []);

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
                musicId: musicTracks[currentQuestion].id,
                correctAnswer: musicTracks[currentQuestion].title,
            },
        ];

        // Mettez à jour l'état avec les nouvelles réponses
        setUserAnswers(newAnswers);

        // Passez à la question suivante
        if (currentQuestion < musicTracks.length - 1) {
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
        if (audioRef.current) {
            // Imprimez les informations sur la piste musicale actuelle
            console.log("Current Music Track:", {
                id: musicTracks[currentQuestion].id,
                title: musicTracks[currentQuestion].title,
                source: musicTracks[currentQuestion].source,
            });
            // Mettez à jour la source de l'audio et jouez l'audio
            // audioRef.current.src = musicTracks[currentQuestion].source;
            // audioRef.current.play();
        }
    }, [currentQuestion]);

    return (
        <div>
            <h1>BlindTest - Devinez le titre de la musique</h1>
            {currentQuestion < musicTracks.length && (
                <div>
                    <h2>Question {currentQuestion + 1}</h2>
                    <p>Écoutez l'extrait musical :</p>
                    {/* Ajoutez ici le lecteur audio avec la source de l'extrait musical */}
                    <audio
                        controls
                        autoPlay
                        ref={audioRef}
                        src={musicTracks[currentQuestion].source}
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