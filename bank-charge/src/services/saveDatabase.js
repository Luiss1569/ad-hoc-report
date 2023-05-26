const Monster = require("../database/dao/monster");
const Skill = require("../database/dao/skill");
const Speed = require("../database/dao/speed");

const saveInDatabase = async (state, _monster) => {
  const { conn, writeLog } = state;

  writeLog("\tIniciando transação");

  const transaction = await conn.transaction();

  try {
    const monster = await Monster.add(state, _monster, transaction);

    const skill = await Skill.add(state, _monster.skill, transaction);

    const speed = await Speed.add(state, _monster.speed, transaction);

    await monster.setSkill(skill, { transaction });
    await monster.setSpeed(speed, { transaction });

    monster.save({ transaction });

    await transaction.commit();

    writeLog(
      `Todos os dados do monstro ${_monster.slug} salvo com sucesso`.green
    );
  } catch (error) {
    await transaction.rollback();
    writeLog(`Erro: ${error.message}`.red);
    writeLog(`Erro: ${JSON.stringify(error, 0, 2)}`.red);
    throw new Error(writeLog(`Erro ao salvar monstro ${_monster.slug}`.orange));
  }
};

module.exports = saveInDatabase;
