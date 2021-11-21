const express = require('express')
const app =express()
const path = require('path')
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { resolveSoa } = require('dns');
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
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
app.get('/collections',(req,res)=>{
    res.sendFile(path.join(__dirname+'/collections.html'))
})
app.post('/send',(req,res)=>{
    console.log(req.body);
    console.log('In send');
        const message = {
            from: 'pulkitjangid420@gmail.com', 
            to: 'pulkitjangid420@gmail.com',        
            subject: 'Enquiry about the company',       
            html:`
                  Name :- ${req.body.name}<br>
                  Phone :-  ${req.body.phone}<br>
                  Message :-  ${req.body.message}<br>
                  Email Id :-${req.body.email}<br>
                  `,
            attachments: [
                { // Use a URL as an attachment
                  filename: 'artigiano.png',
                  path: './public/images/art_logo.png'
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
app.listen(process.env.PORT || 5000,()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})