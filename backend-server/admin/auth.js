'use strict'

const fetch = require('node-fetch');
const GITHUB_CLIENT_ID = "574b4707eb7c5011c7e0";
const GITHUB_CLIENT_SECRET = "25bc929871115cb7e14c948bdb31d16f5a0e5bfd";

const OAuth= {
  getToken: async(req, res) => {
    let params= {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: req.body.code
    };

    await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then(res => {
            return res.text();
        })
        .then(body => {
            const args = body.split('&');
            let bodyObj={};
            for(var i=0; i<args.length; i++){
              let arg = args[i].split('=');
              bodyObj[arg[0]]= arg[1];
            }
            // console.log(access_token);
            res.json(bodyObj);
        })
  } 
}

module.exports=OAuth;