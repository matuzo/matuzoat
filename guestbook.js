const axios = require('axios');
const fs = require('fs');

const form_id = '5c5e9b789ae4f40008e8c761';
const access_token = process.env.NETLIFY_TOKEN;

const guestbook = {
  submissions: []
}

// Make a request for a user with a given ID
axios.get(`https://api.netlify.com/api/v1/forms/${form_id}/submissions/?access_token=${access_token}`)
  .then(function (response) {
    // handle success
    guestbook.submissions = response.data;

    fs.writeFileSync('./src/pages/guestbook/guestbook.json', JSON.stringify(guestbook));
    
    console.log("*** File written successfully");
    console.log(guestbook.submissions)


  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
