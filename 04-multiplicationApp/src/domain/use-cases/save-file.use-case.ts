import fs from 'fs';

export interface SaveFileUseCase {

    execute: (options: Options) => boolean;
}


export interface Options {

    fileContent: string;
    fileName: string;
    filePath: string;
}

export class SaveFile implements SaveFileUseCase {

    constructor() {

    }

    execute({ fileContent, fileName, filePath }: Options) {

        try {

            fs.mkdirSync(filePath, { recursive: true }); // crear la carpeta
            fs.writeFileSync(`${filePath}/${fileName}`, fileContent);


            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    };

}