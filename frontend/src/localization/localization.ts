
let translations: Record<string, string> = {}
let localesDir = ''

async function loadTranslations(locale: string): Promise<Record<string, string>> {
    try {
        const response = await fetch(`${localesDir}${locale}.json`)
        if (!response.ok) {
            throw new Error(`failed to load translations for ${locale}`)
        }
        return response.json()
    } catch (error) {
        console.error("error loading translations:", error)
        return {}
    }
}

export function setLocalesDirectory(dir: string) {
    localesDir = dir
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
