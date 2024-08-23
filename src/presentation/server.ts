import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    console.log("Server started...");

    //Mandar email
    const emailService = new EmailService();
    emailService.sendEmail({
      to: "juancarlosisobe@gmail.com",
      subject: "Hola",
      htmlBody: "<h1> Hola </h1>",
    });

    /*
    CronService.createJob(
      '* * * * * *', //'5 * * * * *'
      () => {
        const url = 'https://google.com';
        new CheckService(
          fileSystemLogRepository,
          () => console.log( `${ url } is ok` ),
          ( error ) => console.log( error ),
        ).execute( url );
         //new CheckService().execute( 'http://localhost:3000' );
        
      }
    );
    */
  }
}
