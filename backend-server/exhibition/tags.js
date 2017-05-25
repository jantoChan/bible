'use strict'
const request = require('superagent');
const md5=require('md5');
const now=Date.now();
const appkey='szT60BVfg8Bf6I9z1vvBFOTf';
const sign=md5(now+appkey);

var async = require('asyncawait/async');
var await = require('asyncawait/await');


const pub={};
pub.tags = async(req, res) => {
  const queryTags = () => {
    const query = new AV.Query('Tags')
    return query.find()
  }

  try {
    const data = await queryTags();

    if (data) {
       res.writeHead(200, {'Content-Type': 'application/json'});
       res.end(JSON.stringify(data));

    } else {
      throw new Error("can not find tags")
    }
  } catch (error) {

  }
}
 


module.exports=pub;