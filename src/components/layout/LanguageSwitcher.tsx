import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'pt', label: 'Portuguese - Português' },
  { code: 'pt-BR', label: 'Português (Brasil)' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => {
        const lang = e.target.value;
        i18n.changeLanguage(lang);
        localStorage.setItem("ks_help_language", lang);
        document.documentElement.lang = lang;
      }}
      aria-label="Idioma / Language"
      style={{
        background: '#0e0e10',
        color: '#efeff1',
        border: '1px solid #3a3a3d',
        borderRadius: 6,
        padding: '6px 10px',
        fontSize: 13,
        fontFamily: 'inherit',
        cursor: 'pointer',
      }}
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
