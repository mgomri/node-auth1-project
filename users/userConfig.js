const knex = require('knex');
const config = require('../knexfile.js');
const db = knex (config.development);

module.exports = {
    add,
    find,
    findById,
    findBy
};

function find() {
    return db('users');
};

function findById(id){
    return db('users')
        .where({ id }).first();
};

function findBy(filter) {
    return db ('users').where(filter);
}


async function add(user) {
    try {
      const [id] = await db("users").insert(user, "id");
  
      return findById(id);
    } catch (error) {
      throw error;
    }
  }

