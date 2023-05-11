const saveMonster = async (state, monster) => {
    const { conn, writeLog } = state;

    writeLog("\tSalvando monstro no banco");
};

module.exports = {
    saveMonster,
};
