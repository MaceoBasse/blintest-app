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
    const score = userAnswers.reduce((totalScore, answer) => {
        let tempScore = totalScore;
        if (answer.userTitle.toLowerCase() === answer.correctAnswer.toLowerCase()) {
            tempScore += 1;
        }
        if (answer.userAuthor.toLowerCase() === answer.correctAuthor.toLowerCase()) {
            tempScore += 1;
        }
        return tempScore;
    }, 0);

    // Affichage du score et des réponses
    return (
        <div>
            {userAnswers.map((answer, index) => (
                <div key={index}>
                    <section class="bg-white">
                        <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                            <div class="mx-auto max-w-3xl text-center">
                                <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl" >Résultats du BlindTest</h1>
                                <p class="text-3xl font-bold text-gray-900 sm:text-4xl">Votre score est de {score} sur {userAnswers.length * 2}</p>
                                <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Question: {answer.question}</h2>
                            </div>
                            <div class="mt-8 sm:mt-12">
                                <dl class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div class="flex flex-col  rounded-lg border border-gray-100 px-4 py-8 text-center">
                                        <dt class="flex flex-wrap order-last text-lg font-medium text-gray-500 justify-center">Votre réponse pour le nom de la musique: 
                                            <span class="text-4xl font-extrabold text-blue-600 md:text-5xl">
                                                {answer.userTitle}
                                            </span>
                                        </dt>
                                    </div>
                                    <div class="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                                    <dt class="flex flex-wrap order-last text-lg font-medium text-gray-500 justify-center">Réponse correcte : 
                                        <span class="text-4xl font-extrabold text-blue-600 md:text-5xl">
                                            {answer.correctAnswer}
                                        </span>
                                    </dt>
                                    </div>
                                </dl>
                            </div>
                            <div class="mt-8 sm:mt-12">
                                <dl class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div class="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                                    <dt class="flex flex-wrap order-last text-lg font-medium text-gray-500 justify-center">Votre réponse pour le nom de l'auteur : 
                                        <span class="text-4xl font-extrabold text-blue-600 md:text-5xl">
                                            {answer.userAuthor}
                                        </span>
                                    </dt>
                                    </div>

                                    <div class="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                                    <dt class="flex flex-wrap order-last text-lg font-medium text-gray-500 justify-center">Réponse correcte :
                                        <span class="text-4xl font-extrabold text-blue-600 md:text-5xl">
                                            {answer.correctAuthor}
                                        </span>
                                    </dt>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </section>
                </div>
            ))}
            <div className='w-full flex justify-center'>
                <button
                    class="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                    onClick={() => navigate('/')}
                    >
                <span class="absolute -start-full transition-all group-hover:start-4">
                        <svg
                            class="h-5 w-5 rtl:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M7 16l-4-4m0 0l4-4m-4 4h18"
                            />
                        </svg>
                    </span>
                    <span class="text-sm font-medium transition-all group-hover:ms-4"> Retour à l'accueil </span>
                </button>
            </div>
            
        </div>
    );
}

export default Results;