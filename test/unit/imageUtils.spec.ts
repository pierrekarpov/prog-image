import { downloadImageFromString, getFileNameFromFilePath, downloadImageFromURL, findFormatId, processChildImage } from '../../src/utils/imageUtils'
import sinon from 'sinon';
import * as nodeBase64Image from 'node-base64-image';
import { FormatType, FormatTypeList } from '../../src/enums/FormatType';
import { Media } from '../../src/db/models/Media';
import _ from 'lodash';
const http = require('http')
const https = require('https');
var jimp = require('jimp');

describe('imageUtils', () => {
    let sandbox: sinon.SinonSandbox = sinon.createSandbox();
    let decodeStub;
    let httpStub;
    let httpsStub;
    let jimpStub;
    let mediaStub;

    const childMedia = {
        id: 2,
        mediaSetId: 1,
        data: {},
        formatTypeId: 1,
        statusTypeId: 4,
    }


    beforeEach(async () => {
        sandbox = sinon.createSandbox();
        decodeStub = sandbox.stub(nodeBase64Image, 'decode').resolves();
        httpStub = sandbox.stub(http, 'request').returns({ end: () => { } });
        httpsStub = sandbox.stub(https, 'request').returns({ end: () => { } });
        jimpStub = sandbox.stub(jimp, 'read').resolves({ write: (_path) => { } });
        mediaStub = sandbox.stub(Media, 'create').resolves(childMedia as any)
    })

    afterEach(() => {
        sandbox.restore();
    });

    describe('downloadImageFromString', () => {
        it('should call decode', async () => {
            await downloadImageFromString('', '', '')
            expect(decodeStub.calledOnce).toBe(true);
        })
    })

    describe('getFileNameFromFilePath', () => {
        const fileName = 'image.jpg'

        it('should return the file name', async () => {
            const filePath = `test/${fileName}`
            const returnedFileName = getFileNameFromFilePath(filePath)
            expect(returnedFileName).toEqual(fileName);
        })
        it('should return the file name even if only file path is provided', async () => {
            const filePath = `${fileName}`
            const returnedFileName = getFileNameFromFilePath(filePath)
            expect(returnedFileName).toEqual(fileName);
        })
        it('should return empty string when empty string is provided', async () => {
            const filePath = ``
            const returnedFileName = getFileNameFromFilePath(filePath)
            expect(returnedFileName).toEqual('');
        })
    })

    describe('findFormatId', () => {
        const fileName = 'image.jpg'
        it('should return for uppercase', async () => {
            const formatId = findFormatId('PNG')
            expect(formatId).toEqual(FormatType.PNG);
        })

        it('should return for all types', async () => {
            const mapping = {
                [FormatType.JPEG]: 'jpeg',
                [FormatType.BMP]: 'bmp',
                [FormatType.PNG]: 'png',
                [FormatType.TIFF]: 'tiff',
                [FormatType.GIF]: 'gif',
            }
            FormatTypeList.forEach(ft => {
                const formatId = findFormatId(mapping[ft])
                expect(formatId).toEqual(ft);
            })
        })


    })

    describe('downloadImageFromURL', () => {
        it('should call http request by default', async () => {
            downloadImageFromURL('', '')
            expect(httpStub.calledOnce).toBe(true);
            expect(httpsStub.calledOnce).toBe(false);
        })
        it('should call https request if url is https', async () => {
            downloadImageFromURL('https://example.com', '')
            expect(httpStub.calledOnce).toBe(false);
            expect(httpsStub.calledOnce).toBe(true);
        })
    })

    describe('processChildImage', () => {
        const mediaSetId = 1
        const filepath = ''
        const formatTypeId = 1

        it('should return a child with same set id', async () => {

            const newChild = await processChildImage(mediaSetId, filepath, formatTypeId)
            expect(newChild.id).toBe(childMedia.id);
            expect(newChild.mediaSetId).toBe(childMedia.mediaSetId);
        })
        it('should call jimp', async () => {
            await processChildImage(mediaSetId, filepath, formatTypeId)
            expect(jimpStub.calledOnce).toBe(true);
        })

        it('should call db', async () => {
            await processChildImage(mediaSetId, filepath, formatTypeId)
            expect(mediaStub.calledOnce).toBe(true);
        })
    })
})