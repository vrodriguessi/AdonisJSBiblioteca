import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Livro from 'App/Models/Livro'

export default class Pessoa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public image: string

  @manyToMany(() => Livro, {
    pivotTable: 'emprestimo_livros',
    localKey: 'id',
    pivotForeignKey: 'pessoa_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'livro_id',
  })
  public livros: ManyToMany<typeof Livro>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
