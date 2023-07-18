/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {user_id: 1, item_name: 'Apple', description: 'Honey crisp', quantity: 40},
    {user_id: 1, item_name: 'Kiwi', description: 'Fuzzy, green, and yummy', quantity: 22},
    {user_id: 3, item_name: 'Pear', description: 'Just a normal pear', quantity: 6},
  ]);
};
