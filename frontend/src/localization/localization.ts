import { LOCALES_DIR } from "../constants/directories"

let translations: Record<string, string> = {}

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

export async function i18n(key: string): Promise<string> {
    if (!translations[key]) {
        console.warn(`translation key ${key} not found`)
        return key
    }
    return translations[key]
}
