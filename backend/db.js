const assert = require("assert");
const Reader = require('@maxmind/geoip2-node').Reader;

let _db;

/**
 * Initialize the database connection as a singleton
 * @return {void}
 */
async function initDb() {
  if (_db) {
    console.warn("Database has already been initialized!");
    return _db;
  }

  const options = {};

  _db = await Reader.open('./GeoLite2-City.mmdb', options);
}

/**
 * Get the existing database connection
 * @return {Object}
 */
function getDb() {
  assert.ok(_db, "Database has not been initialized. Please call initDb() first.");
  return _db;
}

module.exports = {
  getDb,
  initDb
};