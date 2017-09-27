/*
  博客展示页api
 */

// 所有 API 的路由

'use strict';

const router = require('express').Router();
// const config = require('../config');

// 添加一个模块
// const content = require('./content')
const tags = require('../admin/tags')
const articles = require('../admin/articles')
const files = require('../admin/files')
const githubs = require('../admin/githubs');
// const comments = require('./comments')


// 一个 API 路由下的 hello 接口，访问 /api/hello
// router.get('/hello', content.hello);

// 博客文章列表
router.get('/file/list', files.list);
// router.get('/article/:id', content.article)

//article
router.get('/article', articles.articleList);
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


//githubs 
router.get('/github/login', githubs.login);
router.get('/github/access_token', githubs.getToken);
router.post('/github/user', githubs.getUser);

module.exports = router;