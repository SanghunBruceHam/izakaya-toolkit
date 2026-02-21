import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Flame, Hand, Users, Target, Club } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export const MainMenu = ({ onSelectGame }) => {
    const { t, i18n } = useTranslation();
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const menuRef = useRef(null);

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'ko', label: '한국어' },
        { code: 'ja', label: '日本語' },
        { code: 'zh-CN', label: '简体中文' },
        { code: 'zh-TW', label: '繁體中文' }
    ];

    const changeLanguage = (code) => {
        i18n.changeLanguage(code);
        setShowLanguageMenu(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowLanguageMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div className="container flex-center" style={{ position: 'relative' }}>

            {/* Top Bar for Settings */}
            <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ position: 'absolute', top: '2rem', right: '1.5rem', zIndex: 10 }}
            >
                <button
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    style={{
                        padding: '0.75rem',
                        width: 'auto',
                        borderRadius: '50%',
                        aspectRatio: '1',
                        margin: 0,
                        background: showLanguageMenu ? 'var(--glass-highlight)' : 'var(--glass-bg)'
                    }}
                >
                    <Globe size={24} color="var(--text-primary)" />
                </button>

                <AnimatePresence>
                    {showLanguageMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                            style={{
                                position: 'absolute',
                                top: '110%',
                                right: 0,
                                background: 'var(--bg-gradient-1)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '16px',
                                padding: '0.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        margin: 0,
                                        fontSize: '1rem',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: i18n.language === lang.code ? 'var(--accent-primary)' : 'transparent',
                                        whiteSpace: 'nowrap',
                                        justifyContent: 'flex-start'
                                    }}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex-center"
                style={{ width: '100%', flex: 1 }}
            >
                <motion.h1 variants={itemVariants} className="title-main">
                    {t('menu.title')}
                </motion.h1>

                <motion.p variants={itemVariants} className="subtitle-main">
                    {t('menu.subtitle')}
                </motion.p>

                <motion.div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectGame('bomb31')}
                        style={{ borderLeft: '4px solid var(--accent-primary)', fontSize: '1.1rem', padding: '1rem' }}
                    >
                        <Flame size={24} color="var(--accent-primary)" />
                        {t('menu.game_31bomb')}
                    </motion.button>

                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectGame('nunchitap')}
                        style={{ borderLeft: '4px solid var(--accent-secondary)', fontSize: '1.1rem', padding: '1rem' }}
                    >
                        <Hand size={24} color="var(--accent-secondary)" />
                        {t('menu.game_nunchitap')}
                    </motion.button>

                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectGame('vibevote')}
                        style={{ borderLeft: '4px solid var(--accent-warn)', fontSize: '1.1rem', padding: '1rem' }}
                    >
                        <Users size={24} color="var(--accent-warn)" />
                        {t('menu.game_vibevote')}
                    </motion.button>

                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectGame('neverhave')}
                        style={{ borderLeft: '4px solid #b388ff', fontSize: '1.1rem', padding: '1rem' }}
                    >
                        <Target size={24} color="#b388ff" />
                        {t('menu.game_never_have_i_ever')}
                    </motion.button>

                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectGame('kingscup')}
                        style={{ borderLeft: '4px solid #00e676', fontSize: '1.1rem', padding: '1rem' }}
                    >
                        <Club size={24} color="#00e676" />
                        {t('menu.game_kings_cup')}
                    </motion.button>

                </motion.div>
            </motion.div>
        </div>
    );
};
