export const LANG_COOKIE = "autech_lang";
export const LANG_STORAGE = "autech_lang";
export const DEFAULT_LANG = "es";

export function parseLang(value) {
  return value === "es" || value === "en" ? value : DEFAULT_LANG;
}

export function langCookieValue(lang) {
  return `${LANG_COOKIE}=${parseLang(lang)};path=/;max-age=31536000;SameSite=Lax`;
}
