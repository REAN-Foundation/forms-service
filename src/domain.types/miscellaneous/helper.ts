import mime = require('mime-types');
import fs from 'fs';
import path from "path";
import { ExportFormTemplateDto } from '../forms/form.template.domain.types';
import { TimeHelper } from './time.helper';
import { DateStringFormat } from './time.types';
import { Logger } from '../../common/logger';
import { ApiError } from '../../common/api.error';

////////////////////////////////////////////////////////////////////////////
export class Helper {

    public static getMimeType = (pathOrExtension: string) => {
        var mimeType = mime.lookup(pathOrExtension);
        if (!mimeType) {
            mimeType = 'text/plain';
        }
        return mimeType;
    };

    public static storeTemplateToFileLocally = async (templateObj: ExportFormTemplateDto) => {
        const title = templateObj.Title;
        const filename = Helper.strToFilename(title, 'json', '-');
        const tempDownloadFolder = Helper.DownloadTemporaryFolder();
        const timestamp = TimeHelper.timestamp(new Date());
        const dateFolder = TimeHelper.getDateString(new Date(), DateStringFormat.YYYY_MM_DD);
        const sourceFolder = path.join(tempDownloadFolder, dateFolder, timestamp);
        const sourceFileLocation = path.join(sourceFolder, filename);

        await fs.promises.mkdir(sourceFolder, { recursive: true });

        const jsonObj = Helper.convertToJson(templateObj);
        const jsonStr = JSON.stringify(jsonObj, null, 2);
        fs.writeFileSync(sourceFileLocation, jsonStr);
        await Helper.sleep(500);

        return { dateFolder, filename, sourceFileLocation };
    };


    public static strToFilename = (str: string, extension: string, delimiter: string, limitTo = 32): string => {
        var tmp = str.replace(' ', delimiter);
        tmp = tmp.substring(0, limitTo);
        var ext = extension.startsWith('.') ? extension : '.' + extension;
        return tmp + ext;
    };

    static configuration = process.env.NODE_ENV;

    public static DownloadTemporaryFolder = (): string => {
        var location = Helper.configuration;
        return path.join(process.cwd(), location);
    };

    public static convertToJson = (templateObj: ExportFormTemplateDto): any => {
        try {

            var tmpl = {
                DisplayCode: templateObj.DisplayCode,
                // Version: templateObj.Version,
                Type: templateObj.Type,
                Title: templateObj.Title,
                Description: templateObj.Description,
                // Provider: templateObj.Provider,
                // ProviderAssessmentCode: templateObj.ProviderAssessmentCode,
                // RootNodeDisplayCode: templateObj.RootNodeDisplayCode,
                // Nodes: []

            };

            // for (var nodeObj of templateObj.Nodes) {
            //     const node = AssessmentTemplateFileConverter.nodeToJson(nodeObj);
            //     tmpl.Nodes.push(node);
            // }

            return tmpl;

        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(500, error.message);
        }
    };

    public static sleep = (miliseconds: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, miliseconds);
        });
    };
}