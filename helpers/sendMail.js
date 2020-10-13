const readFile = require('../Emails/readFile');

const sendVerificationEmail = (file,subject,sendTo,sendFrom,link) => {
    var emailToBeSent = sendTo;
    readFile(file,'utf8').then(data => data.replace(/{{action_url}}/g, link))
    .then(data => { 
        const mailjet = require ('node-mailjet')
        //TODO CREATE ENV VARIABLES FOR THESE
        .connect('6a70ff05e25cee934b538f3d9e1206c2', 'a8ba1ef910de95c06b1aa2df70a4c2dd')
        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
            "Messages":[
                {
                "From": {
                    "Email": sendFrom,
                    "Name": "Niall"
                },
                "To": [
                    {
                    "Email": sendTo,
                    "Name": "Niall"
                    }
                ],
                "Subject": subject,
                "TextPart": "My first Mailjet email",
                "HTMLPart": data,
                "CustomID": "AppGettingStartedTest"
                }
            ]
        })
        request
        .then((result) => {
            console.log(result.body);
            console.log("email sent");
        })
        .catch((err) => {
            console.log(err.statusCode)
        });
    })      .catch((err) => {
        console.log(err)
    });;
    
}

module.exports = {sendVerificationEmail}
