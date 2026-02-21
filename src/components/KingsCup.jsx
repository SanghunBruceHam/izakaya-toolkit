import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Club } from 'lucide-react';

export const KingsCup = ({ onBack }) => {
    const { t } = useTranslation();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentCardKey, setCurrentCardKey] = useState(null);
    const [kingsDrawn, setKingsDrawn] = useState(0);

    const cardKeys = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    const startGame = () => {
        setIsPlaying(true);
        setKingsDrawn(0);
        setCurrentCardKey(null);
    };

    const drawCard = () => {
        if (kingsDrawn >= 4) return;

        const randomKey = cardKeys[Math.floor(Math.random() * cardKeys.length)];
        setCurrentCardKey(randomKey);

        if (randomKey === "K") {
            const newDrawn = kingsDrawn + 1;
            setKingsDrawn(newDrawn);
            if (newDrawn === 4) {
                if (navigator.vibrate) navigator.vibrate([500, 200, 500, 200, 1000]);
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1 }
    };

    const isGameOver = kingsDrawn >= 4;
    const currentCardData = currentCardKey ? t(`kingscup.cards.${currentCardKey}`, { returnObjects: true }) : null;

    return (
        <div className="container flex-center" style={{ padding: '1rem', height: '100dvh' }}>
            <AnimatePresence mode="wait">
                {!isPlaying ? (
                    <motion.div
                        key="start"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="flex-center glass-card"
                        style={{ flex: 1, justifyContent: 'center' }}
                    >
                        <Club size={64} color="#00e676" style={{ marginBottom: '1rem' }} />
                        <h2 className="title-main" style={{ fontSize: '3rem', background: 'linear-gradient(to right, #ffffff, #00e676)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                            {t('menu.game_kings_cup')}
                        </h2>
                        <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-secondary)' }}>
                            {t('kingscup.rules')}
                        </p>
                        <button onClick={startGame} style={{ background: '#00e676', color: '#000', border: 'none' }}>
                            {t('common.start')}
                        </button>
                        <button onClick={onBack} style={{ background: 'transparent' }}>
                            {t('common.back')}
                        </button>
                    </motion.div>
                ) : isGameOver ? (
                    <motion.div
                        key="gameover"
                        initial={{ scale: 0, opacity: 0, rotate: 180 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        className="flex-center"
                        style={{ flex: 1, width: '100%', background: 'rgba(0, 230, 118, 0.2)', borderRadius: '32px', border: '2px solid #00e676' }}
                    >
                        <h1 style={{ fontSize: '4rem', fontWeight: 900, color: '#00e676', textShadow: '0 0 20px #00e676', textAlign: 'center' }}>
                            {t('kingscup.game_over')}
                        </h1>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '3rem', textAlign: 'center', padding: '0 1rem' }}>
                            {t('kingscup.game_over_msg')}
                        </h2>
                        <button onClick={startGame} style={{ background: 'white', color: '#00e676' }}>
                            {t('common.start')}
                        </button>
                        <button onClick={onBack} style={{ background: 'transparent' }}>
                            {t('common.back')}
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="play"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="flex-center"
                        style={{ flex: 1, width: '100%' }}
                    >

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: 'auto', marginTop: '1rem' }}>
                            {[1, 2, 3, 4].map(idx => (
                                <div key={idx} style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    background: kingsDrawn >= idx ? '#00e676' : 'var(--glass-border)',
                                    boxShadow: kingsDrawn >= idx ? '0 0 10px #00e676' : 'none',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 'bold', color: kingsDrawn >= idx ? '#000' : 'rgba(255,255,255,0.3)'
                                }}>K</div>
                            ))}
                        </div>

                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                            <AnimatePresence mode="wait">
                                {currentCardKey ? (
                                    <motion.div
                                        key={currentCardKey + Math.random()} // Force re-animation even on same card draw
                                        initial={{ scale: 0.5, rotateY: 90, opacity: 0 }}
                                        animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                                        exit={{ scale: 0.5, y: -100, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 150 }}
                                        className="glass-card flex-center"
                                        style={{
                                            width: '280px',
                                            height: '400px',
                                            background: 'white',
                                            padding: '1rem',
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        {/* Card Corner Index */}
                                        <div style={{ position: 'absolute', top: '1rem', left: '1rem', color: '#e53935', fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>
                                            {currentCardKey}
                                        </div>
                                        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', color: '#e53935', fontSize: '2rem', fontWeight: 900, lineHeight: 1, transform: 'rotate(180deg)' }}>
                                            {currentCardKey}
                                        </div>

                                        {/* Center Content */}
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                            <h2 style={{ color: '#000', fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>
                                                {currentCardData.title}
                                            </h2>
                                            <p style={{ color: '#333', fontSize: '1.1rem', fontWeight: 500 }}>
                                                {currentCardData.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div style={{ width: '280px', height: '400px', border: '2px dashed var(--glass-border)', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <p style={{ color: 'var(--text-secondary)' }}>No Card Drawn</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={drawCard}
                            style={{ background: '#00e676', color: 'black', marginTop: 'auto', marginBottom: '1rem' }}
                        >
                            <Club size={24} />
                            {t('kingscup.draw_card')}
                        </button>
                        <button onClick={onBack} style={{ background: 'transparent', color: 'var(--text-secondary)', marginTop: 0 }}>
                            {t('common.back')}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
