import { LOCALES_DIR } from "../constants/directories"

let translations: Record<string, string> = {}

function getBrowserLocale(): string {
    if (typeof navigator !== 'undefined') {
        return navigator.languages && navigator.languages.length
            ? navigator.languages[0]
            : navigator.language || 'en-US'; // Use navigator.language, and default to 'en-US'
    } else {
        return 'en-US'; // Handle server-side rendering or non-browser environments
    }
}

async function loadTranslations(locale: string): Promise<Record<string, string>> {
    try {
        const response = await fetch(`${LOCALES_DIR}${locale}.json`)
        if (!response.ok) {
            throw new Error(`failed to load translations for ${locale}`)
        }
        return response.json()
    } catch (error) {
        console.error("error loading translations:", error)
        return {}
    }
}

export async function setLocale(locale: string): Promise<void> {
    translations = await loadTranslations(locale)
}

export async function setLocaleAutomatically(): Promise<void> {
    const locale = getBrowserLocale()
    await setLocale(locale)
}

export async function i18n(key: string): Promise<string> {
    if (!translations[key]) {
        console.warn(`translation key ${key} not found`)
        return key
    }
    return translations[key]
}
