/*

1. npm init -y
2. install express()
3. import Express into this file
4. create our App express object
5. create a web server
6. set up routes
*/
const express= require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');

const app = express();

//Set Handlebars as the Express enginge for the app
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



//load static resources
app.use(express.static("public"));

//interpreting url-encoded forms - tells express to make form data available via req.body in every request
app.use(bodyParser.urlencoded({ extended: false}))


app.get("/",(req,res)=>{
  

    res.render("home",{
        title:"Home Page"
    });

});



//Show sms page
app.get("/sendtext",(req,res)=>{

    res.render("sms",{
        title:"Sms Page"
    });
});



app.post("/sendText", (req, res)=>{

    //console.log(`Phone Number : ${req.body.phoneNo}`);
    //console.log(`User message : ${req.body.message}`);
    const errors = [];

    if(req.body.phoneNo =="") {
        errors.push("You must enter a phone number");
    }

    if(req.body.message == "") {
        errors.push("You must enter text message");
    }
    if(errors.length > 0) {
        res.render("sms", {
            title: "Sms Page",
            errorMessages: errors
        });
    }

    else 
    {
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
        const accountSid = '';
        const authToken = '';
        const client = require('twilio')(accountSid, authToken);

        client.messages
        .create({
            body: `${req.body.message}`,
            from: '',
            to: `${req.body.phoneNo}`
        })
        .then(message => {
            
            console.log(message.sid)
            //this part will only be executed if the message is sent (if the previous is executed)
            res.redirect("/");
        
        });
    }
//.then catches a "promise"
      
    });


const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=>
{
        console.log(`Web application is up and running!!!`);
});