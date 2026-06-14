import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'pt', label: 'Português (Angola)' },
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
      onChange={(e) => i18n.changeLanguage(e.target.value)}
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
