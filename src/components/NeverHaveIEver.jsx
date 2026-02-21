import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Target } from 'lucide-react';

export const NeverHaveIEver = ({ onBack }) => {
    const { t } = useTranslation();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPrompt, setCurrentPrompt] = useState('');

    const startGame = () => {
        setIsPlaying(true);
        nextQuestion();
    };

    const nextQuestion = () => {
        const prompts = t('neverhave.prompts', { returnObjects: true });
        // avoid same prompt back to back, though random is fine for now
        let randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        while (randomPrompt === currentPrompt && prompts.length > 1) {
            randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        }
        setCurrentPrompt(randomPrompt);
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1 }
    };

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
                        <Target size={64} color="#b388ff" style={{ marginBottom: '1rem' }} />
                        <h2 className="title-main" style={{ fontSize: '2.5rem', background: 'linear-gradient(to right, #ffffff, #b388ff)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                            {t('menu.game_never_have_i_ever')}
                        </h2>
                        <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-secondary)' }}>
                            {t('neverhave.rules')}
                        </p>
                        <button onClick={startGame} style={{ background: '#b388ff', color: '#000', border: 'none' }}>
                            {t('common.start')}
                        </button>
                        <button onClick={onBack} style={{ background: 'transparent' }}>
                            {t('common.back')}
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="flex-center"
                        style={{ flex: 1, width: '100%' }}
                    >
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                            <h2 style={{
                                fontSize: '2.5rem',
                                textAlign: 'center',
                                color: '#b388ff',
                                fontWeight: 900,
                                textShadow: '0 0 20px rgba(179, 136, 255, 0.3)',
                                lineHeight: 1.4
                            }}>
                                {currentPrompt}
                            </h2>
                        </div>

                        <button
                            onClick={nextQuestion}
                            style={{ background: '#b388ff', color: 'black' }}
                        >
                            {t('neverhave.next_prompt')}
                        </button>
                        <button onClick={onBack} style={{ background: 'transparent', color: 'var(--text-secondary)' }}>
                            {t('common.back')}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
