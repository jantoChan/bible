'use strict'
const AV = require('leanengine')

 // 声明类型
const Tag = AV.Object.extend('Tag');
const QueryTag = new AV.Query('Tag');
const tagClass = new Tag();

const pub={
  tagList: async(req, res) => {

    let url_param=url.parse(req.url, true).query;

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
  },
  tagAdd: async(req, res) => {
    let url_param=req.body;

    const addTags = () => {
      tagClass.set('name', url_param.name);
      tagClass.set('value', url_param.value);

      return tagClass.save()
    }

    try {
      const data = await addTags();

      if (data) {
        console.log(data);
         res.json(data);
      } else {
        throw new Error("can not insert tags");
      }
    } catch (error) {

    }
  }
};

 
module.exports=pub;