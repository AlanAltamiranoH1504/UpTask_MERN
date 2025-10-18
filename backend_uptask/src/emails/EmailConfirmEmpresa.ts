import nodemailer, {Transporter, SendMailOptions} from "nodemailer";
import {EmailConfirmEmpresa} from "../types";

export const email_confirm_empresa = async (data: EmailConfirmEmpresa) => {
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
        to: data.email_empresa,
        subject: data.subject,
        text: data.subject,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #e0e0e0;">
                <h2 style="color: #2c3e50; margin-bottom: 20px;">Hola ${data.nombre_empresa},</h2>
                <p style="font-size: 16px; color: #333; line-height: 1.6;">
                    Un usuario ha solicitado unirse a <strong>UpTask</strong> para colaborar con <strong>${data.nombre_empresa}</strong>.
                </p>
                <p style="font-size: 16px; color: #333; line-height: 1.6;">
                    Para activar su cuenta, confirma su identidad y asígnale un rol desde tu panel de administración.  
                    Sus datos son los siguientes:
                </p>
                <ul style="font-size: 16px; color: #2c3e50; line-height: 1.6; margin-left: 20px; margin-bottom: 20px;">
                    <li><strong>Email:</strong> ${data.email_usuario}</li>
                    <li><strong>ID de usuario:</strong> ${data.id_ususario}</li>
                </ul>
                <p style="font-size: 14px; color: #666; line-height: 1.5; margin-bottom: 30px;">
                    Si no reconoces esta solicitud, puedes ignorar este mensaje sin problema.
                </p>
                <p style="font-size: 12px; color: #999; text-align: center; margin-top: 40px;">
                    &copy; ${new Date().getFullYear()} UpTask. Todos los derechos reservados.
                </p>
            </div>
        `
    }
    await transporter.sendMail(email_options);
}