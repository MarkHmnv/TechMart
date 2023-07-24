export const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join(''),
    );

    return JSON.parse(jsonPayload);
}

export const isExpired = (token) => {
    const { exp } = parseJwt(token);
    if (!exp) {
        return false;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= exp;
}