/*
  博客展示页api
 */

// 所有 API 的路由

'use strict';

const router = require('express').Router();

// 添加一个模块
// const content = require('./content')
const tags = require('./admin/tags')
const articles = require('./admin/articles')
const files = require('./admin/files')
// const comments = require('./comments')


// 一个 API 路由下的 hello 接口，访问 /api/hello
// router.get('/hello', content.hello);

// 博客文章列表
router.get('/file/list', files.list);
// router.get('/article/:id', content.article)
router.post('/article/add', articles.add);
router.post('/article/detail', articles.detail);
router.post('/article/update', articles.update);

// tags
router.get('/tags', tags.tagList);
router.get('/tags/detail', tags.tagDetail);
router.post('/tags/add', tags.tagAdd);
router.post('/tags/delete', tags.tagDelete);

// router.get('/tags/:tagId', tags.tagList)

// comments
// router.get('/comments/:articleId', comments.commentsList)

// router.post('/comments/submitComment',comments.submitComment )

module.exports = router;