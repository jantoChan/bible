'use strict'
const AV = require('leanengine')

 // 声明类型
const Tag = AV.Object.extend('Tag');
const QueryTag = new AV.Query('Tag');
const QueryArticle = new AV.Query('Article');
const tagClass = new Tag();

const pub={
  tagList: async(req, res) => {

    // 构建内嵌查询
    QueryTag.find();

    // 执行内嵌操作
    query.matchesQuery('targetTodoFolder', innerQuery);
    query.find().then(function (results) {
       // results 就是符合超过 20 个赞的 TodoFolder 这一条件的 Comment 对象集合
    }, function (error) {
    });

    const queryTags = () => {
      QueryTag.find().then(

      );
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