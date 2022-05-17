const PAGINATION_DEFAULT = 25
const PAGINATION_LIMIT = 100
const PAGE_DEFAULT = 1

const queryHandler = async (queryObject) => {
  let query = {}
  let projection = {}
  let page = PAGE_DEFAULT

  const sort = {}
  const options = {}

  options['limit'] = PAGINATION_DEFAULT

  options['skip'] = (page * PAGINATION_DEFAULT) - PAGINATION_DEFAULT

  if (queryObject.noPg !== undefined && queryObject.noPg === '1') {
    delete options['limit']
    delete options['skip']
  }

  options['count'] = true

  if (queryObject.q) {
    try {
      query = JSON.parse(queryObject.q)
      if (queryObject.rgxArr) {
        let rgxArr
        try {
          rgxArr = JSON.parse(queryObject.rgxArr)
        } catch (e) {
          throw new Error('Bad Request')
        }

        for (key of Object.keys(query)) {
          if (rgxArr.includes(key) && query[key].length) {
            const regElm = []
            query[key].forEach(el => {
              regElm.push(new RegExp(el, "i"))
            })
            query[key] = regElm
          }
        }

      }
    } catch (e) {
      throw new Error('Bad Request')
    }
  }

  if (queryObject.v) {
    try {
      projection = JSON.parse(queryObject.v)
    } catch (e) {
      throw new Error('Bad Request')
    }
    projection['created_on'] = 1
    projection['updated_on'] = 1
    projection['created_by'] = 1
    projection['updated_by'] = 1
  }

  if (queryObject.lmt) {
    if (parseInt(queryObject.lmt) > PAGINATION_LIMIT) {
      options['limit'] = PAGINATION_LIMIT
    } else {
      options['limit'] = parseInt(queryObject.lmt)
    }
  }

  if (!queryObject.noPg && queryObject.pg) {
    page = queryObject.pg
    options['skip'] = (page - 1) * options['limit']
  }

  if (queryObject.srt) {
    let sorts = queryObject.srt.split(',')
    for (let i = 0; i < sorts.length; i++) {
      const parts = sorts[i].split(':')
      sort[parts[0]] = parts[1] === '-1' ? -1 : 1
    }

    options['sort'] = sort
  }

  // console.log(options)

  return { query, projection, options, page: parseInt(page) }
}

const getCollectionData = async (collection, queryObject) => {
  const { query, projection, options } = await queryHandler(queryObject)

}

module.exports = {
  queryHandler: queryHandler
}