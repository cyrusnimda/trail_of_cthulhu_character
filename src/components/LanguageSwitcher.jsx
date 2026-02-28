import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 rounded text-xs transition-colors ${i18n.language === 'en'
                        ? 'bg-gold-500 text-void-950 font-bold'
                        : 'text-parchment-400 hover:text-gold-400'
                    }`}
            >
                EN
            </button>
            <span className="text-void-600 text-xs">|</span>
            <button
                onClick={() => changeLanguage('es')}
                className={`px-2 py-1 rounded text-xs transition-colors ${i18n.language === 'es'
                        ? 'bg-gold-500 text-void-950 font-bold'
                        : 'text-parchment-400 hover:text-gold-400'
                    }`}
            >
                ES
            </button>
        </div>
    );
}
