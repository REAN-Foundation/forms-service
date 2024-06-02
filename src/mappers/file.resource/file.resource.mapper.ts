import { FileResourceResponseDto } from '../../domain.types/general/file.resource.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class FileResourceMapper {

    static toResponseDto = (record: any): FileResourceResponseDto => {
        if (record == null) {
            return null;
        }
        const dto: FileResourceResponseDto = {
            id               : record.id,
            StorageKey       : record.StorageKey,
            OriginalFilename : record.OriginalFilename,
            DownloadCount    : record.DownloadCount,
            MimeType         : record.MimeType,
            Public           : record.Public,
            Size             : record.Size,
            Tags             : record.Tags,
            UploadedBy       : null,
            CreatedAt        : record.CreatedAt,
            UpdatedAt        : record.UpdatedAt,
        };
        return dto;
    };

    // static toFileVersionDto = (fileVersion ?: FileResourceVersion, sanitize = false): FileResourceMetadata => {

    //     if (fileVersion == null){
    //         return null;
    //     }

    //     var url = ConfigurationManager.BaseUrl + '/file-resources/' + fileVersion.ResourceId + '/download-by-version-name/' + fileVersion.Version;

    //     var v: FileResourceMetadata = {
    //         VersionId    : fileVersion.id,
    //         ResourceId   : fileVersion.ResourceId,
    //         Version      : fileVersion.Version,
    //         FileName     : fileVersion.FileName,
    //         MimeType     : fileVersion.MimeType,
    //         OriginalName : fileVersion.OriginalFileName,
    //         Size         : fileVersion.SizeInKB,
    //         StorageKey   : fileVersion.StorageKey,
    //         Url          : url
    //     };

    //     if (sanitize) {
    //         v.StorageKey = null;
    //     }

    //     return v;
    // };


}
