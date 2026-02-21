export const MainMenu = ({ onSelectGame }) => {
    return (
        <div className="container flex-center">
            <h1 className="title">
                Izakaya <br />
                <span className="text-pink">Toolkit</span>
            </h1>

            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                Pick your poison.
            </p>

            <button onClick={() => onSelectGame('hotpotato')} style={{ borderLeft: '4px solid var(--neon-cyan)' }}>
                The Hot Potato
            </button>
            <button onClick={() => onSelectGame('interrogator')} style={{ borderLeft: '4px solid var(--neon-yellow)' }}>
                The Interrogator
            </button>
            <button onClick={() => onSelectGame('roulette')} style={{ borderLeft: '4px solid var(--neon-red)' }}>
                Russian Roulette
            </button>
        </div>
    );
};
