import rest from "./rest";

export const register = async (credentials) => rest.post('/auth/register', credentials);