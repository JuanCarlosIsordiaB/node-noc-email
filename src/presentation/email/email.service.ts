import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor ( private readonly logRepository: LogRepository){}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      const log = new LogEntity ({
        level: LogSeverityLevel.low,
        message: `Email sent to ${to}`,
        origin: "email.service.ts",
      })
      this.logRepository.saveLog({})

      return true;
    } catch (error) {
      const log = new LogEntity ({
        level: LogSeverityLevel.low,
        message: `Email wasnt to ${to}`,
        origin: "email.service.ts",
      })
      console.log("Error sending email", error);
      return false;
    }
  }

  async sendEmailWithFilesSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = "<h1>Logs del servidor</h1>";

    const attachments: Attachment[] = [
      {
        filename: "logs-all.log",
        path: "./logs/logs-all.log",
      },
      {
        filename: "logs-high.log",
        path: "./logs/logs-high.log",
      },
      {
        filename: "logs-medium.log",
        path: "./logs/logs-medium.log",
      },
    ];


    return this.sendEmail({to, subject, htmlBody, attachments});
  }
}
