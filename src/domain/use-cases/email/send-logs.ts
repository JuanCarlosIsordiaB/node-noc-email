import { EmailService } from "../../../presentation/email/email.service";
import { LogRepository } from "../../repository/log.repository";


interface SendLogEmailUseCase {
    execute: (to: string | string[])

}

export class SendEmailLogs implements SendLogEmailUseCase{


    cosntructor(
        private readonly emailService: EmailService,
        private readonly LogRepository: LogRepository
    ){}

    async execute(to: string | string[]): Promise<boolean> {

        try {
            const sent = await this.emailService.sendEmailWithFilesSystemLogs(to);
            if (!sent) {
                throe new Error('Error sending email');
            }
        } catch (error) {
            
        }
        return true;
    }
}