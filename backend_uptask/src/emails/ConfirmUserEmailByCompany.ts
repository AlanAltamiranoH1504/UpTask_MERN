import nodemailer, {Transporter, SendMailOptions} from "nodemailer";
import {EmailConfirmUserByCompany} from "../types";

export const confirm_user_email_by_company = async (data: EmailConfirmUserByCompany) => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: +process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const email_options: SendMailOptions = {
        from: process.env.EMAIL_APP,
        to: data.email_user,
        subject: data.subject,
        text: data.subject,
        html : `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #e0e0e0;">
                <h2 style="color: #2c3e50; margin-bottom: 20px;">Hola ${data.email_user},</h2>
                
                <p style="font-size: 16px; color: #333; line-height: 1.6;">
                    Tu usuario ha sido confirmado en <strong>UpTask</strong> por parte de tu empresa.
                </p>
                
                <p style="font-size: 16px; color: #333; line-height: 1.6;">
                    Anteriormente recibiste un correo de confirmación de cuenta. Si aún no has confirmado tu registro, por favor hazlo para comenzar a colaborar en los proyectos de tu empresa.
                </p>
                
                <p style="font-size: 14px; color: #666; line-height: 1.5; margin-bottom: 30px;">
                    Si no reconoces esta solicitud, puedes ignorar este mensaje sin problema.
                </p>
                
                <p style="font-size: 12px; color: #999; text-align: center; margin-top: 40px;">
                    &copy; ${new Date().getFullYear()} UpTask. Todos los derechos reservados.
                </p>
            </div>
        `
    };
    await transporter.sendMail(email_options);
}