const { getSpell } = require("../services/api");

const formatterMonster = async (writeLog, monster) => {
  const monsterCollums = [
    "name",
    "size",
    "type",
    "subtype",
    "group",
    "groupp",
    "strength",
    "constitution",
    "dexterity",
    "actions",
    "intelligence",
    "wisdom",
    "charisma",
    "strength_save",
    "dexterity_save",
    "constitution_save",
    "intelligence_save",
    "wisdom_save",
    "charisma_save",
    "perception",
    "damage_vulnerabilities",
    "damage_resistances",
    "damage_immunities",
    "condition_immunities",
    "senses",
    "spell_list",
    "languages",
    "cr",
    "legendary_desc",
    "legendary_actions",
    "page_no",
    "img_main",
    "slug",
    "speed",
    "skills",
    "special_abilities",
    "spells",
  ];
  writeLog("\tFormatando monstro");
  delete monster.document__slug;
  delete monster.document__title;
  delete monster.document__license_url;
  delete monster.document__url;
  for (var action of monster.actions) {
    action.description = action.desc;
    delete action.desc;
  }
  for (var specialAbility of monster.special_abilities) {
    specialAbility.description = specialAbility.desc;
    delete specialAbility.desc;
  }
  for (const key in monster) {
    if (!monsterCollums.includes(key)) {
      delete monster[key];
    }
    if (key == "group") {
      monster.groupp = monster[key];
      delete monster[key];
    }
  }

  monster.spell_list = (
    await Promise.all(
      monster.spell_list.map(async (spell) => {
        const data = getSpell(writeLog, spell);
        await delay(250);

        return data;
      })
    )
  ).map((spell) => {
    spell.description = spell.desc;
    delete spell.desc;
    return spell;
  });

  return monster;
};

module.exports = {
  formatterMonster,
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
