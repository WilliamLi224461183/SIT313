require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 2525),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

const FROM_EMAIL = process.env.FROM_EMAIL || 'test@example.com';
const FROM_NAME = process.env.FROM_NAME || 'DEV@Deakin';
const PORT = Number(process.env.PORT || 5175);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body || {};
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ ok: false, error: 'Invalid email' });
        }

        await transporter.sendMail({
            from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
            to: email,
            subject: process.env.WELCOME_SUBJECT || 'Welcome!',
            text: process.env.WELCOME_TEXT || 'Thanks for subscribing!',
        });

        res.json({ ok: true });
    } catch (err) {
        console.error('Mailtrap/Nodemailer error:', err?.message || err);
        res.status(500).json({ ok: false, error: 'Failed to send email' });
    }
});

app.get('/', (_req, res) => res.send('API up. Try GET /api/health'));

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
