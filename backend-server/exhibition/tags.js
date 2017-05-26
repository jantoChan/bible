'use strict'
const AV = require('leanengine')
const Tag = new AV.Query('Tag');

const pub={};
pub.tags = async(req, res) => {
  console.log(Tag.find());
  const queryTags = () => {
    return Tag.find()
  }

  try {
    const data = await queryTags();

    if (data) {
      console.log(data);
       res.json(data);
    } else {
      throw new Error("can not find tags")
    }
  } catch (error) {

  }
}
 
module.exports=pub;