export function changeQueryParameters(query, queryObject) {
    Object.entries(queryObject).forEach(([key, value]) => {
      if (value) {
        query.set(key, value);
      } else {
        query.delete(key);
      }
    });
    return query.toString();
  }