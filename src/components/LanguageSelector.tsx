import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSelector.css';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt-BR', label: 'Português', flag: '🇧🇷' },
] as const;

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  const handleSelect = (code: 'en' | 'pt-BR') => {
    setLanguage(code);
    setOpen(false);
  };

  return (
    <div className="language-selector" ref={menuRef}>
      <button 
        className="lang-trigger"
        onClick={() => setOpen(!open)}
        aria-label="Select language"
      >
        <span className="lang-flag" role="img" aria-label={currentLang.label}>{currentLang.flag}</span>
        <span className="lang-label">{currentLang.code === 'en' ? 'EN' : 'PT'}</span>
        <ChevronDown size={14} className={`lang-chevron ${open ? 'open' : ''}`} />
      </button>

      {open && (
        <div className="lang-dropdown">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              className={`lang-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => handleSelect(lang.code)}
            >
              <span className="lang-flag" role="img" aria-label={lang.label}>{lang.flag}</span>
              <span className="lang-name">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
