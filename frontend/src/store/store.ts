import { Session } from "../models/Session";

let session: Session | null = null

export function saveSession(value: Session) {
    const jsonString = JSON.stringify(value)
    sessionStorage.setItem('session', jsonString)
    session = value
}

export function removeSession() {
    sessionStorage.removeItem('session')
}

export function getSession(): Session {
    if (session) {
        return session
    }
    const jsonString = sessionStorage.getItem('session')
    if (!jsonString) {
        throw new Error("session not found")
    }
    const parsedObject = JSON.parse(jsonString);
    session = new Session(parsedObject.id, parsedObject.player, parsedObject.lobby, parsedObject.game)
    return session
}
