'use strict'
const AV = require('leanengine')

 // 声明类型
const Article = AV.Object.extend('Article');
const QueryArticle = new AV.Query('Article');

const pub={
  list: (req, res) => {
    QueryArticle.addDescending('createdAt');
    
    QueryArticle.find().then(function(articles) {
      let list={},
      dateNav= [];

     articles.forEach(function(article) {
        let dateItem= article.get('date');
        if (dateNav.indexOf(dateItem) > -1) {
          list[dateItem]['value'].push(article);
        }else{
          list[dateItem]={
            value: [article],
            name: dateItem
          };
          dateNav.push(dateItem);
        }
     });
     res.json(list);
    })
  }
}

module.exports=pub;