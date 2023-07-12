import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'livros'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.string('description')
      table.string('image')
      table.integer('available_copies')
        table
          .integer('library_id')
          .unsigned()
          .references('bibliotecas.id')
          .onDelete('CASCADE')
        table
          .integer('pessoa_id')
          .unsigned()
          .references('pessoas.id')
          .onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
