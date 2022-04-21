
import { Media } from '../db/models/Media';
import { EncodingType } from '../enums/EncodingType';
import { FormatType, FormatTypeList } from '../enums/FormatType';
import { StatusType as StatusTypeEnum } from '../enums/StatusType';

import { decode } from 'node-base64-image';
import * as _ from 'lodash';
const fs = require('fs');
var jimp = require('jimp');

const http = require('http')
const https = require('https');
var Stream = require('stream').Transform;

export async function downloadImageFromURL(url: any, filename: any) {
    return new Promise((resolve: any, reject) => {
        var client = http;
        if (url.toString().indexOf("https") === 0) {
            client = https;
        }

        client.request(url, function (response: any) {
            var data = new Stream();

            response.on('data', function (chunk: any) {
                data.push(chunk);
            });

            response.on('end', function () {
                fs.writeFileSync(filename, data.read());
                resolve()
            });
        }).end();
    })
};





export async function processChildImage(mediaSetId: number, filepath: string, ftid: number): Promise<any> {
    const file = await jimp.read(filepath)
    const outFilePathParts = filepath.split('.')
    outFilePathParts[outFilePathParts.length - 1] = `.${(FormatType[ftid] as string).toLowerCase()}`
    const outFilePath = outFilePathParts.join('')
    file.write(outFilePath)

    const cloudURL = await uploadToCloudStorage(outFilePath)

    const childMedia = {
        mediaSetId,
        data: {
            data: cloudURL,
            type: EncodingType.URL
        },
        formatTypeId: ftid,
        statusTypeId: StatusTypeEnum.Success,
    };

    const newChild = await Media.create(childMedia);
    return newChild
}

export async function downloadImageFromString(str: string, filepath: string, extension: string): Promise<any> {
    await decode(str, { fname: filepath, ext: extension });
}

export async function uploadToCloudStorage(filepath: string): Promise<any> {
    const cloudPrefixUrl = 'http://some-cloud.com'
    const fileName = getFileNameFromFilePath(filepath)
    return `${cloudPrefixUrl}/${fileName}`
}

export function getFileNameFromFilePath(filepath: string) {
    const filepathParts = filepath.split('/')
    return filepathParts[filepathParts.length - 1]

}

export function findFormatId(formatString: string) {
    return _.find(FormatTypeList, (ft) => _.isEqual(FormatType[ft], (formatString as string).toUpperCase()))
}