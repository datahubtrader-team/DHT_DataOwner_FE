var testEmails = require('../constants/email.js');

let test1 = 'shahid@codeforgeek.co.uk';

if (testEmails.validateemailformat(test1)) {
    console.log(true + " - Valid email");
} else {
    console.log(false + " - Invalid email");
}