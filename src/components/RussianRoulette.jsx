import { useState, useEffect } from 'react';

const NUM_CHAMBERS = 6;

export const RussianRoulette = ({ onBack }) => {
    const [chambers, setChambers] = useState([]);
    const [bombIndex, setBombIndex] = useState(-1);
    const [gameOver, setGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = () => {
        // Array of false (safe) values
        const newChambers = Array(NUM_CHAMBERS).fill(false);
        // Pick one random chamber to be the bomb
        const randomBomb = Math.floor(Math.random() * NUM_CHAMBERS);

        setChambers(newChambers);
        setBombIndex(randomBomb);
        setGameOver(false);
        setIsPlaying(true);
    };

    const fireChamber = (index) => {
        if (gameOver || chambers[index]) return; // Already fired or game over

        const newChambers = [...chambers];
        newChambers[index] = true; // Mark as fired
        setChambers(newChambers);

        if (index === bombIndex) {
            // BOOM
            setGameOver(true);
            if (navigator.vibrate) {
                navigator.vibrate([1000]);
            }
        } else {
            // Safe click
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        }
    };

    return (
        <div className={`container flex-center ${gameOver ? 'flash-red' : ''}`} style={{
            backgroundColor: gameOver ? 'var(--neon-red)' : 'var(--bg-color)',
            transition: 'background-color 0.1s'
        }}>
            {!isPlaying ? (
                <div className="flex-center" style={{ flex: 1, width: '100%' }}>
                    <h2 className="title text-red">Russian Roulette</h2>
                    <button onClick={resetGame} style={{ backgroundColor: 'var(--neon-red)', color: 'black' }}>
                        LOAD GUN
                    </button>
                    <button onClick={onBack} style={{ marginTop: 'auto', backgroundColor: 'transparent', border: '1px solid var(--surface-color)' }}>
                        Menu
                    </button>
                </div>
            ) : (
                <div className="flex-center" style={{ flex: 1, width: '100%', padding: '1rem' }}>

                    {gameOver ? (
                        <div className="flex-center" style={{ flex: 1, width: '100%' }}>
                            <h1 style={{ fontSize: '4rem', fontWeight: 900, color: 'black', textTransform: 'uppercase', textAlign: 'center' }}>
                                YOU LOSE!
                            </h1>
                            <h2 style={{ fontSize: '3rem', color: 'black', textAlign: 'center', margin: '1rem 0 3rem 0' }}>
                                TAKE A SHOT!
                            </h2>
                            <button
                                onClick={resetGame}
                                style={{
                                    backgroundColor: 'black',
                                    color: 'var(--neon-red)',
                                    border: '2px solid black'
                                }}
                            >
                                Reload
                            </button>
                        </div>
                    ) : (
                        <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h2 className="text-red" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                Take turns tapping...
                            </h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '1rem',
                                width: '100%',
                                maxWidth: '400px',
                                margin: '0 auto'
                            }}>
                                {chambers.map((isFired, index) => (
                                    <button
                                        key={index}
                                        onClick={() => fireChamber(index)}
                                        disabled={isFired}
                                        style={{
                                            aspectRatio: '1',
                                            margin: '0',
                                            borderRadius: '50%',
                                            backgroundColor: isFired ? 'var(--bg-color)' : 'var(--surface-color)',
                                            border: isFired ? '2px solid #333' : '2px solid var(--neon-red)',
                                            color: isFired ? '#333' : 'var(--text-primary)',
                                            fontSize: '2rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: isFired ? 'none' : '0 0 10px rgba(255, 51, 51, 0.2)'
                                        }}
                                    >
                                        {isFired ? 'X' : '?'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={onBack}
                        style={{
                            marginTop: '2rem',
                            backgroundColor: 'transparent',
                            border: '1px solid var(--surface-color)',
                            color: gameOver ? 'black' : 'var(--text-secondary)'
                        }}
                    >
                        Quit to Menu
                    </button>
                </div>
            )}
        </div>
    );
};
