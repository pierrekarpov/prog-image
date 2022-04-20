import * as Sequelize from 'sequelize';
import { ImageAttributes, ImageInstance } from '../src/db/models/Image';
import { FormatInstance, FormatAttributes } from '../src/db/models/Format';
import { StatusInstance, StatusAttributes } from '../src/db/models/Status';

export interface DBInterface {
    sequelize: Sequelize.Sequelize;
    Sequelize: Sequelize.SequelizeStatic;
    Image: Sequelize.Model<ImageInstance, ImageAttributes>;
    Format: Sequelize.Model<FormatInstance, FormatAttributes>;
    Status: Sequelize.Model<StatusInstance, StatusAttributes>;
}
