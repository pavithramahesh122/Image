/// <reference types="multer" />
import { AppService } from './app.service';
import { SampleDto } from './sample.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    sayHello(): string;
    uploadFile(body: SampleDto, file: Express.Multer.File): {
        body: SampleDto;
        file: string;
    };
    uploadFileAndPassValidation(body: SampleDto, file?: Express.Multer.File): {
        body: SampleDto;
        file: string;
    };
    uploadFileAndFailValidation(body: SampleDto, file: Express.Multer.File): {
        body: SampleDto;
        file: string;
    };
}
