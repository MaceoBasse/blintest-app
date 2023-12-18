// Results.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import levenshtein from 'fast-levenshtein';

function Results() {
  const location = useLocation();
  const { userAnswers } = location.state;
  const navigate = useNavigate();

  // Si aucune réponse n'a été enregistrée, affichez un message d'erreur
  if (!userAnswers || !userAnswers.length) {
    return (
      <p>
        Aucune réponse n&apos;a été enregistrée. Veuillez retourner au quiz et
        sélectionner une réponse.
      </p>
    );
  }

  // Calcul du score
  const score = userAnswers.reduce((totalScore, answer) => {
    let tempScore = totalScore;
    if (
      levenshtein.get(
        answer.userTitle.toLowerCase(),
        answer.correctAnswer.toLowerCase(),
      ) <= 2
    ) {
      tempScore += 1;
    }
    if (
      levenshtein.get(
        answer.userAuthor.toLowerCase(),
        answer.correctAuthor.toLowerCase(),
      ) <= 2
    ) {
      tempScore += 1;
    }
    return tempScore;
  }, 0);

  // Affichage du score global
  const scoreMessage = `Votre score est de ${score} sur ${
    userAnswers.length * 2
  }`;

  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Résultats du BlindTest
            </h1>
            <p className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {scoreMessage}
            </p>
          </div>
        </div>
      </section>

      {/* Affichage des réponses */}
      {userAnswers.map((answer) => (
        <div key={answer.id}>
          <div>
            <section className="bg-white">
              <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    Question
                    {' '}
                    {answer.question + 1}
                  </h2>
                </div>
                <div className="mt-8 sm:mt-12">
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                      <dt className="flex flex-col order-last text-lg font-medium text-gray-500 justify-center">
                        <span>Votre réponse pour le nom de la musique:</span>
                        <span className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                          {answer.userTitle}
                        </span>
                      </dt>
                    </div>
                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                      <dt className="flex flex-col order-last text-lg font-medium text-gray-500 justify-center">
                        Réponse correcte :
                        <span className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                          {answer.correctAnswer}
                        </span>
                      </dt>
                    </div>
                  </dl>
                </div>
                <div className="mt-8 sm:mt-12">
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                      <dt className="flex flex-col order-last text-lg font-medium text-gray-500 justify-center">
                        Votre réponse pour le nom de l&apos;auteur :
                        <span className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                          {answer.userAuthor}
                        </span>
                      </dt>
                    </div>
                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                      <dt className="flex flex-col order-last text-lg font-medium text-gray-500 justify-center">
                        Réponse correcte :
                        <span className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                          {answer.correctAuthor}
                        </span>
                      </dt>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          </div>
        </div>
      ))}

      {/* Bouton de retour à l'accueil */}
      <div className="w-full flex justify-center mb-10">
        <button
          type="button"
          className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
          onClick={() => navigate('/')}
        >
          <span className="absolute -start-full transition-all group-hover:start-4">
            <svg
              className="h-5 w-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
          </span>
          <span className="text-sm font-medium transition-all group-hover:ms-4 ">
            {' '}
            Retour à l&apos;accueil
            {' '}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Results;
