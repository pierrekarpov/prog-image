import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "FormatTypes",
})
export class FormatType extends Model {
    // @Column({
    //     type: DataType.INTEGER,
    //     allowNull: false,
    //     primaryKey: true,
    // })
    // id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        field: 'created_at'
    })
    createdAt?: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        field: 'updated_at'
    })
    updatedAt?: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        field: 'deleted_at'
    })
    deletedAt?: boolean;
}