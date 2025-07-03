const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Einfaches Basic Auth Middleware
function basicAuth(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Bitte anmelden"');
    return res.status(401).send('Authentication required.');
  }

  // Base64 decode: "username:password"
  const base64Credentials = auth.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  // Prüfe Benutzername und Passwort gegen Umgebungsvariablen
  if (
    username === process.env.BASIC_AUTH_USER &&
    password === process.env.BASIC_AUTH_PASS
  ) {
    return next();
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="Bitte anmelden"');
    return res.status(401).send('Authentication required.');
  }
}

// Route mit Basic Auth schützen
app.post('/send', basicAuth, async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ error: 'Alle Felder sind erforderlich.' });
  }

  try {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: "securesmtp.t-online.de",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Kontaktformular: ${subject}`,
      text: `Von: ${email}\n\n${message}`,
    };

    const mailConfirmation = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Vielen Dank für deine Nachricht: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <p>Hallo,</p>
          <p>vielen Dank, dass du mich kontaktiert hast. Ich habe deine Nachricht erhalten und werde mich so schnell wie möglich bei dir melden.</p>
          <p>Deine Nachricht:</p>
          <blockquote style="border-left: 4px solid #ccc; margin: 0 0 1em 0; padding-left: 1em; color: #555;">
            ${message.replace(/\n/g, '<br>')}
          </blockquote>
          <p>Falls du weitere Fragen hast, kannst du jederzeit auf diese E-Mail antworten.</p>
          <p>Beste Grüße<br>Tilo</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 2em 0;" />
          <small style="color: #999;">
            Hinweis: Dies ist eine automatisch generierte Bestätigung.
          </small>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailConfirmation);

    return res.status(200).json({ message: 'E-Mails wurden erfolgreich versendet' });
  } catch (error) {
    console.error('Fehler beim E-Mail-Versand:', error);
    return res.status(500).json({ error: 'E-Mail-Versand fehlgeschlagen' });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
