const { Op } = require("sequelize");

export function convertOperatorToSequelize(operator, field, value) {
  field = `$${field}$`;

  switch (operator) {
    case "contains":
      return { [field]: { [Op.like]: `%${value}%` } };
    case "starts with":
      return { [field]: { [Op.like]: `${value}%` } };
    case "ends with":
      return { [field]: { [Op.like]: `%${value}` } };
    case "not contains":
      return { [field]: { [Op.notLike]: `%${value}%` } };
    case "=":
      return { [field]: { [Op.eq]: value } };
    case "!=":
      return { [field]: { [Op.ne]: value } };
    case ">":
      return { [field]: { [Op.gt]: value } };
    case "<":
      return { [field]: { [Op.lt]: value } };
    case ">=":
      return { [field]: { [Op.gte]: value } };
    case "<=":
      return { [field]: { [Op.lte]: value } };
    default:
      return null;
  }
}

export const convertFilter = (filter) => {
  const { logic, data } = filter;

  const subQuery = data.map((subFilter) => {
    if (subFilter.groupId) {
      return convertFilterToSequelize(subFilter);
    } else {
      const { field, operator, value } = subFilter;
      const convertedOperator = convertOperatorToSequelize(
        operator,
        field.value,
        value
      );
      return convertedOperator;
    }
  });

  return logic === "or" ? { [Op.or]: subQuery } : { [Op.and]: subQuery };
};

export const convertOrders = (conn, orders) => {
  return orders.map(([column, order]) => {
    const table = column.split(".")[0];
    const field = column.split(".")[1];

    if (table === "monsters") {
      return [field, order];
    }

    return [conn.models?.[table], field, order];
  });
};
