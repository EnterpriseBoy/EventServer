const readFile = require('../Emails/readFile');

const sendVerificationEmail = (file) => {

    readFile(file,'utf8').then(data => {

        const mailjet = require ('node-mailjet')
        .connect('6a70ff05e25cee934b538f3d9e1206c2', 'a8ba1ef910de95c06b1aa2df70a4c2dd')
        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
            "Messages":[
                {
                "From": {
                    "Email": "niall.maguire@topmail.ie",
                    "Name": "Niall"
                },
                "To": [
                    {
                    "Email": "niall.maguire@topmail.ie",
                    "Name": "Niall"
                    }
                ],
                "Subject": "Greetings from Mailjet.",
                "TextPart": "My first Mailjet email",
                "HTMLPart": data,
                "CustomID": "AppGettingStartedTest"
                }
            ]
        })
        
        request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        });

        console.log(data);

    })      .catch((err) => {
        console.log(err)
    });;
    
}

module.exports = {sendVerificationEmail}
