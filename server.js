const express = require('express');
const bodyParser = require('body-parser');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
require('dotenv').config();

const app = express();
const PORT = 3000;

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`
    <h2>Subscribe to DEV@Deakin</h2>
    <form action="/subscribe" method="POST">
      <input type="email" name="email" placeholder="Enter your email" required />
      <button type="submit">Subscribe</button>
    </form>
  `);
});

app.post('/subscribe', (req, res) => {
    const email = req.body.email;

    mg.messages
        .create(process.env.MAILGUN_DOMAIN, {
            from: 'DEV@Deakin <mailgun@' + process.env.MAILGUN_DOMAIN + '>',
            to: [email],
            subject: 'Welcome to DEV@Deakin!',
            text: 'Thanks for subscribing to DEV@Deakin!',
            html: '<strong>Welcome to DEV@Deakin! 🎉</strong>',
        })
        .then(msg => {
            console.log('✅ Email sent:', msg);
            res.send('✅ Welcome email sent via Mailgun!');
        })
        .catch(err => {
            console.error('❌ Error:', err);
            res.status(500).send('❌ Failed to send email.');
        });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
