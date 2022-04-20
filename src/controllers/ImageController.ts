import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import * as _ from 'lodash';
import bluebird from 'bluebird';
import { v4 as uuidv4 } from 'uuid';
import { Media } from '../db/models/Media';
import { FormatType, FormatTypeList } from '../enums/FormatType';
import { StatusType } from '../enums/StatusType';
import { EncodingType } from '../enums/EncodingType';
import { downloadImageFromString, downloadImageFromURL, processChildImage, uploadToCloudStorage } from '../utils/imageUtils';

export default {
    uploadImages: asyncHandler(async (req: Request, res: Response) => {
        const { images } = req.body

        const response = await bluebird.map(images, async (image: any) => {
            const formatType = _.get(image, 'format_type_id', FormatType.JPEG)
            const data = { type: _.get(image, 'type') }
            const media = {
                data,
                formatTypeId: formatType,
                statusTypeId: StatusType.Pending,
            };

            const newMedia = await Media.create(media);

            const formatImagePromise = new Promise(async (resolve, reject) => {
                const newData = { type: _.get(image, 'type') }
                const filepath = `src/tmp/${uuidv4()}.png`

                if (_.get(image, 'type') == EncodingType.URL) {
                    console.log('downloading from url')
                    await downloadImageFromURL('https://onlinewebtutorblog.com/wp-content/uploads/2021/05/cropped-cropped-online-web-tutor-logo.png', filepath);
                    _.set(newData, 'originalURL', _.get(image, 'data'))
                } else if (_.get(image, 'type') == EncodingType.BASE64) {
                    console.log('converting from base 64')
                    await downloadImageFromString(_.get(image, 'data'), filepath, (FormatType[formatType] as string).toLowerCase())
                }

                const cloudURL = await uploadToCloudStorage(filepath)
                _.set(newData, 'data', cloudURL)
                await newMedia.update({ data: newData, statusTypeId: StatusType.Pending })

                console.log('generate different formats')
                const missingFormats = _.filter(FormatTypeList, (ftid: any) => ftid != formatType)
                const childImagePromises = _.map(missingFormats, ftid => {
                    return processChildImage(newMedia.id, filepath, ftid)
                })
                Promise.all(childImagePromises).then(resolve).catch(reject)
            });
            formatImagePromise.then(() => {
                console.log('done processing image')
                newMedia.statusTypeId = StatusType.Success
                newMedia.save()
            }).catch((e) => {
                console.error(e)
                newMedia.statusTypeId = StatusType.Success
                newMedia.save()
            })
            return { id: newMedia.id }
        });
        return res.status(200).json({ images: response });
    }),
    get: asyncHandler(async (req: Request, res: Response) => {
        console.log('hai')
        console.log('req.params', req.params)
        return res.status(200).json({ test: 123456 });
    }),
};
