import rest from "./rest";

export const boards = async () => rest.get('/board');
export const createBoard = async (body) => rest.authPost('/board', body);
export const getCategories = async () => rest.get('/dictionaries/categories');
export const getIcons = async () => rest.get('/dictionaries/board-icons');