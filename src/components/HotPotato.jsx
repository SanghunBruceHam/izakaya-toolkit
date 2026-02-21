import { useState, useEffect, useRef } from 'react';

const CATEGORIES = [
    "Name 3 Fast Food Chains",
    "Name a famous bald person",
    "Say a word that rhymes with 'Drink'",
    "Name a country in South America",
    "Name 3 brands of beer",
    "Name a movie starring Tom Cruise",
    "Say a popular Gen Z slang word",
    "Name an animal that starts with 'B'",
    "Name a social media app",
    "Say a famous quote from a movie"
];

export const HotPotato = ({ onBack }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [category, setCategory] = useState("");
    const [exploded, setExploded] = useState(false);

    const timerRef = useRef(null);

    const startGame = () => {
        // Random timer between 10 and 25 seconds
        const randomTime = Math.floor(Math.random() * 15) + 10;
        setTimeLeft(randomTime);
        setCategory(CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]);
        setIsPlaying(true);
        setExploded(false);
    };

    const passPotato = () => {
        if (exploded) return;
        setCategory(CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]);
    };

    useEffect(() => {
        if (isPlaying && timeLeft > 0) {
            timerRef.current = setTimeout(() => {
                setTimeLeft(t => t - 1);
            }, 1000);
        } else if (isPlaying && timeLeft === 0) {
            setExploded(true);
            setIsPlaying(false);
            // Haptic feedback if available
            if (navigator.vibrate) {
                navigator.vibrate([200, 100, 200, 100, 500]);
            }
        }

        return () => clearTimeout(timerRef.current);
    }, [isPlaying, timeLeft]);

    // Determine shake intensity based on time left
    const getShakeClass = () => {
        if (!isPlaying) return "";
        if (timeLeft <= 3) return "shake flash-red";
        if (timeLeft <= 5) return "shake";
        return "";
    };

    return (
        <div className={`container flex-center ${getShakeClass()}`} style={{
            backgroundColor: exploded ? 'var(--neon-red)' : 'var(--bg-color)',
            transition: 'background-color 0.1s'
        }}>

            {!isPlaying && !exploded ? (
                <div className="flex-center" style={{ flex: 1, width: '100%' }}>
                    <h2 className="title text-cyan">The Hot Potato</h2>
                    <p style={{ textAlign: 'center', marginBottom: '2rem', padding: '0 1rem' }}>
                        When the timer starts, shout the answer to the prompt on the screen. Then, tap the giant button and hand the phone to the next person before it explodes!
                    </p>
                    <button onClick={startGame} style={{ backgroundColor: 'var(--neon-cyan)', color: 'black' }}>
                        START BOMB
                    </button>
                    <button onClick={onBack} style={{ marginTop: 'auto', backgroundColor: 'transparent', border: '1px solid var(--surface-color)' }}>
                        Back to Menu
                    </button>
                </div>
            ) : exploded ? (
                <div className="flex-center" style={{ flex: 1, width: '100%' }}>
                    <h1 style={{ fontSize: '5rem', fontWeight: 900, color: 'black', textTransform: 'uppercase', textAlign: 'center' }}>
                        BOOM!
                    </h1>
                    <h2 style={{ fontSize: '3rem', color: 'black', textAlign: 'center', margin: '2rem 0' }}>
                        DRINK!
                    </h2>
                    <button onClick={startGame} style={{ backgroundColor: 'black', color: 'var(--neon-red)' }}>
                        Play Again
                    </button>
                    <button onClick={onBack} style={{ backgroundColor: 'transparent', border: '2px solid black', color: 'black' }}>
                        Menu
                    </button>
                </div>
            ) : (
                <div className="flex-center" style={{ flex: 1, width: '100%', padding: '1rem' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h2 style={{
                            fontSize: '2.5rem',
                            textAlign: 'center',
                            color: timeLeft <= 5 ? 'var(--neon-red)' : 'var(--text-primary)',
                            textShadow: timeLeft <= 5 ? '0 0 10px rgba(255,51,51,0.5)' : 'none'
                        }}>
                            {category}
                        </h2>
                    </div>

                    <button
                        onClick={passPotato}
                        style={{
                            width: '100%',
                            height: '40vh',
                            fontSize: '3rem',
                            backgroundColor: 'var(--neon-cyan)',
                            color: 'black',
                            borderRadius: '24px',
                            boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)'
                        }}
                    >
                        PASS!
                    </button>
                </div>
            )}
        </div>
    );
};
