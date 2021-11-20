const express = require('express')
const app =express()
const path = require('path')
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config();
app.use(express.json())
const transporter = nodemailer.createTransport({
    host : process.env.HOST,
    port : process.env.PORT_MAIL,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD  
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
            from: 'artigiano_@hotmail.com', // Sender address
            to: 'pulkitjangid420@gmail.com',         // List of recipients
            subject: 'Enquiry about the company', // Subject line
            text:`
                  Name :- ${req.body.name}
                  Phone :-  ${req.body.phone}
                  Message :-  ${req.body.message}
                  Email Id :-${req.body.email}
                  `,
            // attachments: [
            //     { // Use a URL as an attachment
            //       filename: 'angira.png',
            //       path: './public/images/art_logo.png'
            //   }
            // ]
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
app.listen(process.env.PORT || 5000,()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})