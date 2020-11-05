import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.decimal('cost').notNullable();

        table.integer('category_id')
            .notNullable()
            .references('id')
            .inTable('categories')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('products');
}