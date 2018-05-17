'use strict'
const AV = require('leanengine')

 // 声明类型
const Article = AV.Object.extend('Article');
const Article2Tag = AV.Object.extend('ArticleTagMap');
const QueryArticle = new AV.Query('Article');
const QueryTag= new AV.Query('Tag');
const QueryMap= new AV.Query('ArticleTagMap');

const pub={
  addArticle: (param) => {
    let articleClass= new Article();
    articleClass.set({
      'title': param.title,
      'content': param.content,
      'is_issue': param.is_issue,
      'date': param.date,
      'author': param.author
    })
    return articleClass.save();
  },

  updateArticle: (param) => {
    let articleClass= AV.Object.createWithoutData('Article', param.id);
    articleClass.set({
      'title': param.title,
      'content': param.content,
      'is_issue': param.is_issue,
      'date': param.date,
      'author': param.author
    })
    return articleClass.save();
  },

  mapArticleTag: (tagIds, articleObj) => {
    let maplist =[];
    for(let i= 0; i<tagIds.length; i++){
      let article2tagClass= new Article2Tag();  // 构建 Ariticle2Tag 对象
      let articlePointer= AV.Object.createWithoutData('Article', articleObj['id']);
      let tagPointer= AV.Object.createWithoutData('Tag', tagIds[i]);
      article2tagClass.set({
        'article': articlePointer,
        'tag': tagPointer
      })
      maplist.push(article2tagClass);
    }
    return  AV.Object.saveAll(maplist);
  },

  incrementQuote: (tagIds) => {
    let taglist= [];
    QueryTag.find().then(function(tags) {
      tags.forEach(function(tag) {
        let id= tag.get('objectId');
        if(tagIds.indexOf(id) > -1) {
          tag.set('quote', tag.get('quote')+1);
          taglist.push(tag);
        }; 
      });
      return AV.Object.saveAll(taglist);
    })
  },

  decrementQuote: (tagIds) => {
    let taglist= [];
    QueryTag.find().then(function(tags) {
      tags.forEach(function(tag) {
        let id= tag.get('objectId');
        if(tagIds.indexOf(id) > -1) {
          tag.set('quote', tag.get('quote')-1);
          taglist.push(tag);
        }; 
      });
      return AV.Object.saveAll(taglist);
    })
  },

  deleteMap: (id) => {
    let articleInstance=  AV.Object.createWithoutData('Article', id);
    QueryMap.equalTo('article', articleInstance);
    QueryMap.include('tag'); 

    QueryMap.find().then(function(maps) {
      return AV.Object.destroyAll(maps)  
    });
  },

  add: async(req, res) => {
    let param= req.body;
    param.author="janto";
    param.date=new Date().getFullYear();

    try {
      let articleObj = await pub.addArticle(param);
      if (!!param.tags) {
        await pub.mapArticleTag(param.tags, articleObj);
        await pub.incrementQuote(param.tags);
      }
      if (articleObj) {
        res.json(articleObj);
      } else {
        throw new Error("sorry, we've got a problem ~")
      }
    } catch (error) {

    }
  },

  detail: async(req, res) => {
    let param= req.body;
    let getArticle= (id)=> {
      let articleInstance=  AV.Object.createWithoutData('Article', id);
      articleInstance.increment('viewCount', 1);
      articleInstance.fetchWhenSave(true);
      articleInstance.save();
      return QueryArticle.get(id);
    };

    let getTagMap= (id)=> {
      let articleInstance=  AV.Object.createWithoutData('Article', id);
      QueryMap.equalTo('article', articleInstance);
      QueryMap.include(['tag']);
      return QueryMap.find();
    }

    try{
      let param= req.body;
      let articleDetail= await getArticle(param.id);
      console.log(articleDetail);
      let tagList= await getTagMap(param.id);

      //include无效
      //主动序列化 json 列。
      tagList.forEach(function(tagEle){
        tagEle.set('tag', tagEle.get('tag') ?  tagEle.get('tag').toJSON() : null);
      });
      let articleAll={
        'articleDetail': articleDetail,
        'tagList': tagList 
      };

      res.json(articleAll);
    } catch (error) {

    }
  },

  update: async(req, res) => {
    let param= req.body;
    param['author']="janto";
    param['date']=new Date().getFullYear();

    try{
      //reset 重置文章状态
      await pub.decrementQuote(param.tags);
      await pub.deleteMap(param.id);

      let articleObj = await pub.updateArticle(param);

      if (!!param.tags) {
        await pub.mapArticleTag(param.tags, articleObj);
        await pub.incrementQuote(param.tags);
      }
      if (articleObj) {
        res.json(articleObj);
      } else {
        throw new Error("sorry, we've got a problem ~")
      }
    }  catch (error) {
    }
    
  },

  articleList(req ,res) {
      let param= req.body;
      let skip= param.page-1;
      let limit= param.limit;
      console.log(param);
      var now = new Date();
      QueryArticle.lessThanOrEqualTo('createdAt', now);

      QueryArticle.count().then(function(count) {
        QueryArticle.addDescending('createdAt');
        QueryArticle.limit(limit);
        QueryArticle.skip(skip*limit);
        QueryArticle.find().then(function (articles) {
          res.json({
            count: count,
            list: articles
          });
        }, function (error) {
          throw new Error("sorry, we've got a problem ~")
        });
      });
  },

  count(req, res) {
    try{
      QueryArticle.count().then(function(count) {
        res.json({
          count: count
        });
      }).catch(function(err){
      //返回错误给客户端
      });
      //include无效
    } catch (error) {

    }
  }


}

module.exports=pub;