import { UploadedFile } from "express-fileupload";
import path from 'path';
import fs from 'fs';
import { CustomError } from "../../domain";
import { UuidAdapter } from "../../config/uuid.adapter";


export class FileUploadService {


    constructor(private readonly uuid = UuidAdapter.getId) {

    }

    private checkFolder(folderPath: string) {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    }


    async uploadFile(
        file: UploadedFile,
        folder: string = "uploads",
        validExtension: string[] = ["png", "jpg", "jpeg", "gif"]
    ) {

        try {

            console.log({ file })

            const ext = file.mimetype.split('/').at(1) || '';
            const destination = path.resolve(__dirname, '../../../', folder);
            this.checkFolder(destination);


            if (!validExtension.includes(ext)) throw CustomError.badRequest("Invalid image type");

            const fileName = `/${this.uuid()}.${ext}`;
            file.mv(destination + fileName);

            return { fileName };

        } catch (error) {
            console.log({ error });
            throw error;
        }

    }

    async uploadFileMultiple(
        files: UploadedFile[],
        folder: string = "uploads",
        validExtension: string[] = ["png", "jpg", "jpeg", "gif"]
    ) {
        console.log({ files })
        const fileNames = await Promise.all(
            files.map(file => {
                console.log({ file })
                return this.uploadFile(file, folder, validExtension)
            })
        )

        return fileNames;

    }

}