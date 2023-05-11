const prompt = require("prompt-sync")();

function getInputsInitial() {
  const page = {};

  const current = prompt("Digite o numero inicial pagina (Default: 1): ");
  const end = prompt("Digite a pagina limite (Default: Infinity): ");
  const limit = prompt(
    "Digite o limite de registros por pagina (Default: 10): "
  );

  page.current = Number(current) || 1;
  page.end = Number(end) || Infinity;
  page.limit = Number(limit) || 10;

  return {
    page,
  };
}

module.exports = {
  getInputsInitial,
};
