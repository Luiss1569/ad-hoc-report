const formatterMonster = (writeLog, monster) => {
  monsterCollums=['name','size','type','subtype','group', 'groupp','strength','constitution','dexterity',
  'intelligence','wisdom','charisma','strength_save','dexterity_save','constitution_save','intelligence_save',
  'wisdom_save','charisma_save','perception','damage_vulnerabilities','damage_resistances','damage_immunities',
  'condition_immunities','senses','languages','cr','legendary_desc','legendary_actions','page_no',
  'img_main', 'slug','speed','skills','special_abilities','spells']
  writeLog("\tFormatando monstro");
  delete monster.document__slug
  delete monster.document__title
  delete monster.document__license_url
  delete monster.document__url
  for(var action of monster.actions){
    action.description = action.desc;
    delete action.desc;
  }
  for(var specialAbility of monster.special_abilities){
    specialAbility.description = specialAbility.desc;
    delete specialAbility.desc;
  }
  for(const key in monster){
    if(!monsterCollums.includes(key)){
      delete monster[key]
    }
    if(key == 'group'){
      monster.groupp = monster[key]
      delete monster[key]
    }
  }
  return monster;
};

module.exports = {
  formatterMonster,
};
