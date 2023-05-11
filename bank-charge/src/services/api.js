const axios = require("axios");

const api = axios.create({
  baseURL: "https://api.open5e.com",
});

const getMonsters = async (page, writeLog) => {
  const { current, limit } = page;

  writeLog(`Buscando monstros da página ${current}`);

  const { data } = await api
    .get("/monsters", {
      params: {
        page: current,
        limit,
      },
    })
    .catch((error) => {
      writeLog(`[Erro] ${error.message}`);
      throw new Error(error.message);
    });

  const { results, ...rest } = data;

  writeLog(`Monstros da página ${current} encontrados: ${results.length}`);

  return {
    monsters: results,
    infos: rest,
  };
};

module.exports = {
  getMonsters,
  api,
};
