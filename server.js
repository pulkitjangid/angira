const express = require('express')
const app =express()
const path = require('path')
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config();
app.use(express.json())
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'pulkitjangid420@gmail.com',
        pass: 'qazwsx@123'
    },
});


transporter.verify().then(console.log('SMTP server connected')).catch(console.error);


app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
})
app.get('/contacts',(req,res)=>{
    res.sendFile(path.join(__dirname+'/contacts.html'));
})
app.get('/about-us',(req,res)=>{
    res.sendFile(path.join(__dirname+'/about-us.html'));
})
app.post('/send',(req,res)=>{
    console.log(req.body);
    console.log('In send');
        const message = {
            from: 'pulkitjangid420@gmail.com', // Sender address
            to: 'pulkitjangid420@gmail.com',         // List of recipients
            subject: 'Enquiry about the company', // Subject line
            html: `<h4>Name :- ${req.body.name}<br><h4>Phone :-  ${req.body.phone}
                    <br><h4>Message :-  ${req.body.message}<br><h4>Email Id :-${req.body.email}</h4>`,
            attachments: [
                { // Use a URL as an attachment
                  filename: 'angira.png',
                  path: 'logo.jpeg'
              }
            ]
        };
        transporter.sendMail(message, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(info);
            }
        });
        res.redirect('/')
    })
app.post('/test',(req,res)=>{
    console.log(req.body);
    res.send("Hi")
})
app.listen(process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})