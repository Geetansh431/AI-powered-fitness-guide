import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { i18n } = useTranslation();

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'zh', name: 'Chinese' },
    ];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const changeLanguage = (langCode) => {
        i18n.changeLanguage(langCode);
        setIsOpen(false);
    };

    const currentLanguage = languages.find(lang => lang.code === i18n.language);

    return (
        <div className="relative">
            <motion.button
                className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-zinc-800/50 transition-all duration-300"
                onClick={toggleDropdown}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
            >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">{currentLanguage?.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-zinc-900/98 to-zinc-950/98 backdrop-blur-xl rounded-lg border border-zinc-800/50 shadow-xl shadow-purple-500/5"
                    >
                        <div className="py-2">
                            {languages.map((language) => (
                                <motion.button
                                    key={language.code}
                                    onClick={() => changeLanguage(language.code)}
                                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-zinc-800/50 transition-colors"
                                    whileHover={{ x: 4 }}
                                >
                                    <span>{language.name}</span>
                                    {i18n.language === language.code && (
                                        <Check className="w-4 h-4 text-purple-400" />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;