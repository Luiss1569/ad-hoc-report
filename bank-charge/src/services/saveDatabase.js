const Monster = require("../database/dao/monster");
const Skill = require("../database/dao/skill");
const Speed = require("../database/dao/speed");
const Actions = require("../database/dao/actions");
const SpecialAbilities = require("../database/dao/specialAbilities");
const SpellList = require("../database/dao/spellsList");
const Reactions = require("../database/dao/reactions");

const saveInDatabase = async (state, _monster) => {
  const { conn, writeLog } = state;

  writeLog("\tIniciando transação");

  const transaction = await conn.transaction();

  try {
    const monster = await Monster.add(state, _monster, transaction);
    const skill = await Skill.add(state, _monster.skills, transaction);
    const speed = await Speed.add(state, _monster.speed, transaction);
    const actions = await Actions.includes(
      state,
      _monster.actions,
      transaction
    );
    const specialAbilities = await SpecialAbilities.includes(
      state,
      _monster.special_abilities,
      transaction
    );
    const spellList = await SpellList.includes(
      state,
      _monster.spell_list,
      transaction
    );
    const reactions = await Reactions.includes(
      state,
      _monster.reactions,
      transaction
    );

    await monster.setSkill(skill, { transaction });
    await monster.setSpeed(speed, { transaction });
    await monster.setActions(actions, { transaction });
    await monster.setSpecial_abilities(specialAbilities, { transaction });
    await monster.setSpells_lists(spellList, { transaction });
    await monster.setReactions(reactions, { transaction });

    monster.save({ transaction });

    await transaction.rollback();

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
