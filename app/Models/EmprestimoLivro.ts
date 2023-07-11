import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Livro from './Livro'

export default class EmprestimoLivro extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public livroID: number

  @column()
  public pessoaID: number

  @column()
  public title: string

  @belongsTo(() => Livro)
  public livro: BelongsTo<typeof Livro>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
