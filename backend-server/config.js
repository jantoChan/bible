/**
 * 每位工程师都有保持代码优雅的义务
 * Each engineer has a duty to keep the code elegant
 *
 * @author wangxiao
 */

// 所有的配置

'use strict';

let config = {

  // 服务端 host
  host: 'http://localhost:3003',

  // web 开发环境的 host
  webHost: 'http://localhost:8090',

  // 跨域白名单
  whiteOrigins: [
    'http://localhost:8090',
    'http://localhost:3003',
    // 以下两个是在 LeanCloud 中配置的 host，xxx 替换为自己的域名
    'http://stg-bible.leanapp.cn',
    'http://bible.leanapp.cn'
  ]
};

// 判断环境
switch (process.env.LC_APP_ENV) {

  // 当前环境为线上测试环境
  case 'stage':
    config.host = 'http://stg-bible.leanapp.cn';
    config.webHost = 'http://stg-bible.leanapp.cn';
  break;

  // 当前环境为线上正式运行的环境
  case 'production':
    config.host = 'http://bible.leanapp.cn';
    config.webHost = 'http://bible.leanapp.cn';
  break;
}

module.exports = config;