/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'Billy', last_name: 'Bob', username: 'bbob', password: '1234'},
    {first_name: 'John', last_name: 'Deer', username: 'jdeer', password: '2345'},
    {first_name: 'Jane', last_name: 'Doe', username: 'jdoe', password: '3456'},
  ]);
};
