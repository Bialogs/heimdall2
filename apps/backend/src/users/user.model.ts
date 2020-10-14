import {
  Column,
  Model,
  Table,
  IsEmail,
  Unique,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  DataType,
  Default
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.BIGINT)
  id!: number;

  @Unique
  @IsEmail
  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  firstName!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  lastName!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  organization!: string | null;

  @AllowNull(true)
  @Column(DataType.STRING)
  title!: string | null;

  @AllowNull(false)
  @Column(DataType.STRING)
  encryptedPassword!: string;

  @AllowNull(true)
  @Column(DataType.BOOLEAN)
  forcePasswordChange!: boolean | null;

  @AllowNull(true)
  @Column(DataType.DATE)
  lastLogin!: Date | null;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.BIGINT)
  loginCount!: number;

  @AllowNull(true)
  @Column(DataType.DATE)
  passwordChangedAt!: Date | null;

  @AllowNull(false)
  @Default('user')
  @Column(DataType.STRING)
  role!: string;

  @CreatedAt
  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @AllowNull(false)
  @Column(DataType.DATE)
  updatedAt!: Date;
}
