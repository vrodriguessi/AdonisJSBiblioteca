import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Livro from 'App/Models/Livro'


export default class Biblioteca extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @hasMany(() => Livro, {
    foreignKey: 'library_id',
  })
  public livros: HasMany<typeof Livro>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
