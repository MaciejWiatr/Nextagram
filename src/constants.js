export const backendURL =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:8000"
        : process.env.NEXT_PUBLIC_BACKEND_URL;

export const apiURL = `${backendURL}/api/`;

export const loginUrl = `${apiURL}accounts/login/`;
