const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('spells_list', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "slug_unique"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    higher_level: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    page: {
      type: DataTypes.STRING,
      allowNull: true
    },
    range: {
      type: DataTypes.STRING,
      allowNull: true
    },
    largest_range_sort: {
      type: DataTypes.STRING,
      allowNull: true
    },
    components: {
      type: DataTypes.STRING,
      allowNull: true
    },
    requires_verbal_components: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    requires_somatic_components: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    requires_material_components: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    material: {
      type: DataTypes.STRING,
      allowNull: true
    },
    can_be_cast_as_ritual: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ritual: {
      type: DataTypes.STRING,
      allowNull: true
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true
    },
    concentration: {
      type: DataTypes.STRING,
      allowNull: true
    },
    requires_concentration: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    casting_time: {
      type: DataTypes.STRING,
      allowNull: true
    },
    level: {
      type: DataTypes.STRING,
      allowNull: true
    },
    level_int: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    spell_level: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    school: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dnd_class: {
      type: DataTypes.STRING,
      allowNull: true
    },
    archetype: {
      type: DataTypes.STRING,
      allowNull: true
    },
    circles: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'spells_list',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "slug_unique",
        unique: true,
        fields: [
          { name: "slug" },
        ]
      },
      {
        name: "spells_list_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
