import _ from "lodash";

export const sortByKeys = (object) => {
  const keys = Object.keys(object);
  const sortedKeys = _.sortBy(keys);

  return _.fromPairs(
    _.map(sortedKeys, (key) => {
      let value = object[key];
      if (typeof object[key] === "object" && !(object[key] instanceof Array)) {
        value = sortByKeys(value);
      }
      return [key, value];
    })
  );
};
