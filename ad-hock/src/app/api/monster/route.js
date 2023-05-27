import pgConnection from "../../../database";

export async function GET(request) {
  const sequelize = await pgConnection.connect();

  const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  const data = await response.json();

  return {
    status: 200,
    body: data,
  };
}
