const STORAGE_KEY = 'kvdl_super_admin_token';

export const getSuperToken = () => {
    if (typeof window === 'undefined') {
        return null;
    }
    return window.localStorage.getItem(STORAGE_KEY);
};

export const setSuperToken = (token) => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.setItem(STORAGE_KEY, token);
};

export const clearSuperToken = () => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.removeItem(STORAGE_KEY);
};

export const isSuperAuthenticated = () => {
    return Boolean(getSuperToken());
};

export const superLogout = () => {
    clearSuperToken();
};
