import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environment';


export interface MailInfo {
  mail_cliente: string,
  error: string,
  hour: string,
  site_name: string,
  error_status: string | number
}

@Injectable({
  providedIn: 'root'
})
export class MailServiceService {

  constructor() { }

  public async send(mailInfo: MailInfo){
    emailjs.init(environment.EMAILJS_KEY)
      let response = await emailjs.send("service_cygxo1r","template_gf6h7w9",{
        mail_cliente: mailInfo.mail_cliente,
        site_name: mailInfo.site_name,
        error: mailInfo.error,
        hour: mailInfo.hour,
        error_status: mailInfo.error_status
        });

      return response
  }

}
