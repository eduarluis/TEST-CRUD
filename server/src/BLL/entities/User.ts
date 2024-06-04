/* The above TypeScript class defines a User model with properties for id, name, email, password,
phone, and status using Sequelize for database operations. */
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: User.USER_TABLE_NAME,
})
export class User extends Model {
    public static USER_TABLE_NAME = "users";
    public static USER_ID = "id";
    public static USER_NAME = "name";
    public static USER_EMAIL = "email";
    public static USER_PASSWORD = "password";
    public static USER_PHONE = "phone";
    public static USER_STATUS = "status";

    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        field: User.USER_ID,
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        field: User.USER_NAME,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        field: User.USER_EMAIL,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        field: User.USER_PASSWORD,
    })
    password!: string;

    @Column({
        type: DataType.STRING,
        field: User.USER_PHONE,
    })
    phone!: string;

    @Column({
        type: DataType.BOOLEAN,
        field: User.USER_STATUS,
        defaultValue: true,
    })
    status!: boolean;
}
