const nodemailer = require("nodemailer");

export default async function SendEmail() {
  try {
    let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'graceshockers@gmail.com', // generated ethereal user
        pass: 'Catchers', // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Grace Shockers 👻" <graceshockers@gmail.com>', // sender address
      to: "mary510295@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (err) { console.error(err); }
}

// main().catch(console.error);
