import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript";
import { FormatType } from "./FormatType";
import { StatusType } from "./StatusType";
import { MediaSet } from "./MediaSet";

@Table({
    timestamps: false,
    tableName: "Media",
})
export class Media extends Model {
    @Column({
        type: DataType.JSON,
        allowNull: false,
    })
    data!: any;

    @ForeignKey(() => MediaSet)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'media_set_id'
    })
    mediaSetId!: number;

    @ForeignKey(() => StatusType)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'status_type_id'
    })
    statusTypeId!: number;


    @ForeignKey(() => FormatType)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'format_type_id'
    })
    formatTypeId!: number;

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