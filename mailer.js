const nodemailer = require('nodemailer');

module.exports = class Mailer {
    constructor(params, mail) {
        this.setParams(params);
        this.setMail(mail);

    }

    setParams(params={}) {
        this.params = {
            host: params.host || 'localhost',
            port: params.port || 465,
            secure: params.secure || true,
            auth: params.auth || {},
        }
    }

    setMail(mail={}) {    
        this.mail = {
            from: mail.from || 'Jehona Mailer <>',
            to: mail.to || undefined,
            cc: mail.cc || undefined,
            bcc: mail.bcc || undefined,
            subject: mail.subject || 'Random email from Jehona Mailer',
            text: mail.text || '',
            html: mail.html || '',
            attachments: mail.attachments || undefined
        }
    }

    send(mail) {
        return new Promise((resolve, reject)=>{
            if(mail) this.setMail(mail);

            let transporter = nodemailer.createTransport(this.params)

            transporter.verify()
            .then(r=>{
                transporter.sendMail(this.mail);
                resolve();
            })
            .catch(e=>{
                reject(e)
            });
        

        })
        
    }

}