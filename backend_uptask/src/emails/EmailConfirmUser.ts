import {EmailConfirmUser} from "../types";
import nodemailer, {Transporter, SendMailOptions} from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const emailConfirmUser = async (data: EmailConfirmUser)=> {
    const transport: Transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const emailOptions: SendMailOptions = {
        from: process.env.EMAIL_APP,
        to: data.email,
        subject: data.subject,
        text: data.subject,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f8f8f8; border-radius: 10px;">
                <h2 style="color: #2c3e50;">Hola ${data.nombre},</h2>
                <p style="font-size: 16px; color: #333;">
                    Gracias por registrarte en <strong>UpTask</strong>. Para activar tu cuenta, por favor confirma tu dirección de correo electrónico haciendo clic en el siguiente enlace:
                </p>
                <p style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL}/auth/confirmar/${data.token}" 
                       style="display: inline-block; padding: 12px 25px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Confirmar Cuenta
                    </a>
                </p>
                <p style="font-size: 14px; color: #666;">
                    Si tú no creaste esta cuenta, puedes ignorar este mensaje sin problemas.
                </p>
                <p style="font-size: 14px; color: #999; margin-top: 40px;">
                    &copy; ${new Date().getFullYear()} UpTask. Todos los derechos reservados.
                </p>
            </div>
        `
    }
    await transport.sendMail(emailOptions);
}
export default emailConfirmUser;