import rest from "./rest";

export const login = async (credentials) => rest.post('/auth/login', credentials);