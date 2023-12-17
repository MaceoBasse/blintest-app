// Results.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Results() {
    const location = useLocation();
    const userAnswers = location.state.userAnswers;
    const navigate = useNavigate();
    // Si aucune réponse n'a été enregistrée, affichez un message d'erreur
    if (!userAnswers || !userAnswers.length) {
        return <p>Aucune réponse n'a été enregistrée. Veuillez retourner au quiz et sélectionner une réponse.</p>;
    }

    // Calcul du score
    const score = userAnswers.reduce((score, answer) => {
        if (answer.answer.toLowerCase() === answer.correctAnswer.toLowerCase()) {
            return score + 1;
        }
        return score;
    }, 0);

    // Affichage du score et des réponses
    return (
        <div>
            <h1>Résultats du BlindTest</h1>
            <p>Votre score est de {score} sur {userAnswers.length}.</p>
            <h2>Vos réponses :</h2>
            {userAnswers.map((answer, index) => (
                <div key={index}>
                    <p>Question: {answer.question}</p>
                    <p>Votre réponse: {answer.answer}</p>
                    <p>Réponse correcte: {answer.correctAnswer}</p>
                </div>
            ))}
            <button onClick={() => navigate('/')}>Retour à l'accueil</button>
        </div>
    );
}

export default Results;