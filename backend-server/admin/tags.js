'use strict'
const AV = require('leanengine')
const url = require('url')
const QueryMap= new AV.Query('ArticleTagMap');
const QueryArticle= new AV.Query('Article');

 // 声明类型
const Tag = AV.Object.extend('Tag');
const QueryTag = new AV.Query('Tag');

const pub={
  tagList: async(req, res) => {

    // 构建内嵌查询
    QueryTag.find();

    let queryTags = () => {
      return QueryTag.find();
    }

    try {
      let data = await queryTags();

      if (data) {
        res.json(data);
      } else {
        throw new Error("can not find tags")
      }
    } catch (error) {

    }
  },
  tagAdd: async(req, res) => {
    let tagClass = new Tag();
    let url_param=req.body;

    let addTags = () => {
      tagClass.set('name', url_param.name);
      tagClass.set('value', url_param.value);

      return tagClass.save()
    }

    try {
      let data = await addTags();

      if (data) {
        res.json(data);
      } else {
        throw new Error("can not insert tags!");
      }
    } catch (error) {

    }
  },
  tagDelete: async(req, res) => {
    let tagClass=new Tag();
    let url_param=req.body;
    let tagDeleteList=[];

    let deleteTags = () => {
      //构建数组
      for(var i=0; i<url_param.tags.length; i++) {
        let curTag = url_param.tags[i];
        let tag = AV.Object.createWithoutData('Tag', curTag);
          tagDeleteList.push(tag);
      }
      return AV.Object.destroyAll(tagDeleteList);
    }

    try {
      let data = await deleteTags();

      if (data) {
        res.json(data);
      } else {
        throw new Error("can not delete tags!");
      }
    } catch (error) {
        console.log('error', error);
    }
  },
  tagDetail: async(req, res) => {
    let url_param=url.parse(req.url, true).query;
    let tagInstance=  AV.Object.createWithoutData('Tag', url_param.id);
    QueryMap.equalTo('tag', tagInstance);
    QueryMap.include('article');
    QueryMap.descending('createdAt');

    try{

      QueryMap.find().then(function(articleList) {
        articleList.forEach(function(articleEle) {
          articleEle.set('article', articleEle.get('article') ? articleEle.get('article').toJSON() : null);
        });
      res.json(articleList);
      }).catch(function(err){
      //返回错误给客户端
      });
      //include无效
    } catch (error) {

    }
  }
};
 
module.exports=pub;