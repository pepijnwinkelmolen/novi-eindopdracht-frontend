import {jwtDecode} from "jwt-decode";

export function isValidToken(token) {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
    const isExpired = Date.now() > expirationTime;
    return !isExpired;
}