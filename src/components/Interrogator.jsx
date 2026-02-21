import { useState } from 'react';

const QUESTIONS = [
    "Who is most likely to text their ex tonight?",
    "Who has the worst taste in music?",
    "Who is the biggest lightweight?",
    "Who would die first in a horror movie?",
    "Who is most likely to get arrested for something stupid?",
    "Who spends the most time on their phone?",
    "Who has the wildest dating history?",
    "Who is the worst driver?",
    "Who is most likely to become a millionaire by accident?",
    "Who is the most dramatic?",
    "Who is secretly judging everyone right now?",
    "Who is most likely to fake sick to get out of plans?",
];

export const Interrogator = ({ onBack }) => {
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);

    const startGame = () => {
        setIsPlaying(true);
        nextQuestion();
    };

    const nextQuestion = () => {
        const randomIdx = Math.floor(Math.random() * QUESTIONS.length);
        setCurrentQuestion(QUESTIONS[randomIdx]);
    };

    return (
        <div className="container flex-center">
            {!isPlaying ? (
                <div className="flex-center" style={{ flex: 1, width: '100%' }}>
                    <h2 className="title text-yellow">The Interrogator</h2>
                    <p style={{ textAlign: 'center', marginBottom: '2rem', padding: '0 1rem' }}>
                        A question will appear. On the count of 3, everyone points at the person who fits the description best.
                        <br /><br />
                        <strong>The person with the most fingers pointed at them drinks!</strong>
                    </p>
                    <button onClick={startGame} style={{ backgroundColor: 'var(--neon-yellow)', color: 'black' }}>
                        START
                    </button>
                    <button onClick={onBack} style={{ marginTop: 'auto', backgroundColor: 'transparent', border: '1px solid var(--surface-color)' }}>
                        Back to Menu
                    </button>
                </div>
            ) : (
                <div className="flex-center" style={{ flex: 1, width: '100%', padding: '1rem' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h2 style={{
                            fontSize: '2.5rem',
                            textAlign: 'center',
                            color: 'var(--neon-yellow)',
                            textShadow: '0 0 10px rgba(255, 255, 0, 0.3)'
                        }}>
                            {currentQuestion}
                        </h2>
                    </div>

                    <button
                        onClick={nextQuestion}
                        style={{
                            width: '100%',
                            padding: '2rem',
                            backgroundColor: 'var(--surface-color)',
                            color: 'var(--text-primary)',
                            borderBottom: '4px solid var(--neon-yellow)'
                        }}
                    >
                        NEXT QUESTION
                    </button>
                    <button onClick={onBack} style={{ marginTop: '1rem', backgroundColor: 'transparent', border: '1px solid var(--surface-color)', padding: '1rem' }}>
                        Menu
                    </button>
                </div>
            )}
        </div>
    );
};
