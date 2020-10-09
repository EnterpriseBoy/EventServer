const sgEmail = require("@sendgrid/mail");
sgEmail.setApiKey('EMAIL_SENDING_API_KEY');

const sendVerificationEmail = () => {
    const msg = {
        to: "niall.maguire@zoho.com",
        from: "niall.maguire@zoho.com",
        subject:"Please verify your account",
        text:"please verify your account",
        html:"<strong>please verify your account<strong>"
    }
    console.log("you are in send email");

    sgEmail.send(msg).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    })

}

module.exports = {sendVerificationEmail}
