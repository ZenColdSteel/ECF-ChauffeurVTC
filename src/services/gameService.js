import * as gameRepository from "../repositories/gameRepository.js";

export const getGameById = async (body) => {
  const { id } = body;

  const gameFound = await gameRepository.findById(parseInt(id));
  return gameFound;
};

export const createGame = async (body) => {
  const gameData = {
    ...body,
    published_date: new Date(body.published_date),
  };
  return await gameRepository.createGame(gameData);
};
