/**
 * Created by sandrastoicescu on 24/11/2017.
 */

/* Have a module header available for easy reference */
/* eslint-disable no-use-before-define */
module.exports = {
  performQueries,
  extractOrderBy,
  applyPagination,
  extractQueryFilters,
};
/* eslint-enable no-use-before-define */

async function performQueries({ query, countQuery }, selectFields) {
  return Promise.all([query.select(selectFields), countQuery])
    .then(([queryResult, countQueryResult]) => ({ queryResult, countQueryResult: countQueryResult.count }));
}

/**
 * Extracts order-by clause from a dataTable query
 * @param dataTable the DataTable query
 * @param query the Knex query object
 * @returns {*} the Knex query object, with added order-by clause
 */
function extractOrderBy(dataTable, query) {
  if (!dataTable || !dataTable.sort || !dataTable.sort.field || dataTable.sort.field === '') {
    if (!dataTable || !dataTable.pagination || !dataTable.pagination.field || dataTable.pagination.sort === '') {
      return query;
    }

    return query.orderBy(dataTable.pagination.field, dataTable.pagination.sort || 'asc NULLS LAST');
  }

  return query.orderBy(dataTable.sort.field, dataTable.sort.sort || 'asc NULLS LAST');
}

function applyPagination(dataTable, query) {
  const countQuery = query.clone().modify((qb) => qb.count().first());

  if (!dataTable || !dataTable.pagination) {
    return { query, countQuery };
  }

  const q = query.limit(dataTable.pagination.perpage).offset((dataTable.pagination.page - 1) * dataTable.pagination.perpage);

  return { query: extractOrderBy(dataTable, q), countQuery };
}

/**
 * Extracts the query filters from a dataTable query
 * @param dataTable the dataTable query
 * @param query the Knex query object
 * @param freeTextSearchColumns An array of columns that the free text search will be performed on
 * @returns {*} the Knex query object, with added filters
 */
function extractQueryFilters(dataTable, query, freeTextSearchColumns = []) {
  if (!dataTable || !dataTable.query) {
    return query;
  }

  if (dataTable.query.free_text_search && freeTextSearchColumns) {
    // eslint-disable-next-line no-param-reassign
    query = query.where(function freeTextSearchQuery() {
      return freeTextSearchColumns.reduce((q, colName) => q.orWhere(colName, 'ILIKE', `%${dataTable.query.free_text_search}%`), this);
    });
  }

  return Object.keys(dataTable.query)
    .reduce((q, key) => {
      if (key === 'free_text_search') {
        return q;
      }

      if (typeof dataTable.query[key] === 'string' && dataTable.query[key].toLowerCase() === 'is not null') {
        return q.whereNotNull(key);
      }

      if (typeof dataTable.query[key] === 'string' && dataTable.query[key].toLowerCase() === 'is null') {
        return q.whereNull(key);
      }

      return q.where(key, dataTable.query[key]);
    }, query);
}
