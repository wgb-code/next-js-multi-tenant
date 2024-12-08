import 'server-only';
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export type User = {
    sub: number;
    username: string;
    tenanId: string;
}

const secret = '12345678901234567890123456789012';
const ttl    = 60 * 60 * 24 * 7;

export async function getSession() {
    const cookieStore = await cookies()

    return getIronSession<{token: string}>(cookieStore, {
        password: secret,
        cookieName: 'auth',
        ttl,
        cookieOptions: {
            httpOnly: true,
            secure: false, //Prod = true, development (Non-HTTPS) = false
            sameSite: "lax",
            maxAge: (ttl === 0 ? 2147483647 : ttl) - 60,
            path: "/"
        }
    })
}

export async function saveSession(token: string) {
    const session = await getSession()
    session.token = token
    await session.save()
}

export function destroySession() {
    
}

export function getUser() {

}