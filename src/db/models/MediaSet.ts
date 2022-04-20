import { Table, Model, Column, DataType } from "sequelize-typescript";


@Table({
    timestamps: false,
    tableName: "MediaSets",
})
export class MediaSet extends Model {
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