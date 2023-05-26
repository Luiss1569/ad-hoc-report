const{Monster} = require('../models/monsters');
const skills = require('../models/skills');
const add = async (state, monster, transaction) => {
  const { conn } = state;
  const speed = await conn.models.speed.create(monster.speed)
  const skill = await conn.models.skills.create(monster.skills)
  const created = await conn.models.monsters.findOrCreate({
    where: {
      slug: monster.slug,
    },
    defaults: {
      name: monster.name,
      size: monster.size,
      type: monster.type,
      subtype: monster.subtype,
      groupp: monster.groupp,
      strength: monster.strength,
      dexterity: monster.dexterity,
      constitution: monster.constitution,
      intelligence: monster.intelligence,
      wisdom: monster.wisdom  ,
      charisma: monster.charisma,
      strength_save: monster.strength_save,
      dexterity_save: monster.dexterity_save,
      constitution_save: monster.constitution_save,
      intelligence_save: monster.intelligence_save,
      wisdom_save: monster. wisdom_save,
      perception: monster.perception,
      damage_vulnerabilities : monster.damage_vulnerabilities ,
      damage_resistances : monster.damage_resistances ,
      damage_immunities : monster.damage_immunities ,
      condition_immunities : monster.condition_immunities ,
      senses : monster.senses ,
      languages : monster.languages ,
      challenge_rating : monster.cr ,
      legendary_desc : monster.legendary_desc ,
      page_no : monster.page_no ,
      img_main : monster.img_main ,
      charisma_save: monster. charisma_save,
      description: monster.description,
      slug: monster.slug,
      speed_id: speed.id,
      skill_id: skill.id,
      include: [conn.models.speed, conn.models.skills]
    },
    transaction,
  });
 
  return created;
};

module.exports = {
  add,
};
