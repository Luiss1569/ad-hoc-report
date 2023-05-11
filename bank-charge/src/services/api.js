const axios = require("axios");

const retryWrapper = (axios, options) => {
  const max_time = options.retry_time;
  const retry_status_code = options.retry_status_code;
  const writeLog = options.writeLog;
  let counter = 0;

  axios.interceptors.response.use(null, (error) => {
    const config = error.config;
    if (counter < max_time && error.response.status != 404) {
      counter++;
      writeLog(
        `[Erro] Fala na requisição: ${error.message} - Tentativa: ${counter}`
      );

      return Promise.resolve(axios(config));
    }
    if (counter === max_time && error.response.status === retry_status_code) {
      config.url = "/monsters";
      return Promise.resolve(axios(config));
    }
    return Promise.reject(error);
  });
};

const api = axios.create({
  baseURL: "https://api.open5e.com",
});

const getMonsters = async (page, writeLog) => {
  const { current, limit } = page;

  writeLog(`Buscando monstros da página ${current}`);
  retryWrapper(api, {
    retry_time: 3,
    writeLog,
  });

  const { data } = await api
    .get("/monsters", {
      params: {
        page: current,
        limit,
      },
    })
    .catch((error) => {
      throw new Error(error.message);
    });

  const { results, ...rest } = data;

  writeLog(`Monstros da página ${current} encontrados: ${results.length}\n`);

  return {
    monsters: results,
    infos: rest,
  };
};

module.exports = {
  getMonsters,
  api,
};
