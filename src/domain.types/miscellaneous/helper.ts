import mime = require('mime-types');
import fs from 'fs';
import path from "path";
import { ExportFormTemplateDto } from '../forms/form.template.domain.types';
// import { ExportFormTemplateDto, TemplateDto } from '../forms/form.template.domain.types';
// import { TimeHelper } from './time.helper';
// import { DateStringFormat } from './time.types';


////////////////////////////////////////////////////////////////////////////

export class Helper {
    public static getMimeType = (pathOrExtension: string): string => {
        const mimeType = mime.lookup(pathOrExtension) || 'text/plain';
        return mimeType;
    };

    public static storeTemplateToFileLocally = async (templateObj: ExportFormTemplateDto): Promise<{ dateFolder: string, filename: string, sourceFileLocation: string }> => {
        const title = templateObj.Template.Title;
        const filename = Helper.strToFilename(title, 'json', '-');
        const tempDownloadFolder = Helper.downloadTemporaryFolder();
        const timestamp = Helper.getTimestamp();
        const dateFolder = Helper.getDateFolder();
        const sourceFolder = path.join(tempDownloadFolder, dateFolder, timestamp);
        const sourceFileLocation = path.join(sourceFolder, filename);

        await fs.promises.mkdir(sourceFolder, { recursive: true });

        const jsonStr = JSON.stringify(templateObj, null, 2);
        fs.writeFileSync(sourceFileLocation, jsonStr);
        await Helper.sleep(500);

        return { dateFolder, filename, sourceFileLocation };
    };

    public static strToFilename = (str: string, extension: string, delimiter: string, limitTo = 32): string => {
        let tmp = str.replace(/ /g, delimiter).substring(0, limitTo);
        const ext = extension.startsWith('.') ? extension : '.' + extension;
        return tmp + ext;
    };

    private static getTimestamp = (): string => {
        return new Date().toISOString().replace(/[:.]/g, '-');
    };

    private static getDateFolder = (): string => {
        return new Date().toISOString().slice(0, 10).replace(/-/g, '_');
    };

    private static downloadTemporaryFolder = (): string => {
        return path.join(process.cwd(), 'tempDownloads');
    };

    public static sleep = (milliseconds: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
}