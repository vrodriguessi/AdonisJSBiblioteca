import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EmprestimoLivros extends BaseSchema {
  protected tableName = 'emprestimo_livros'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('livro_id').unsigned().references('id').inTable('livros')
      table.integer('pessoa_id').unsigned().references('id').inTable('pessoas')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
