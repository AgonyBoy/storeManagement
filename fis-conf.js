var path= require("path")
//去掉注释
fis.config.set('settings.optimizer.clean-css.keepSpecialComments', 0);
//css自动厂商前缀
fis.config.set("modules.preprocessor.css", "cssprefixer");
// 使用 depscombine 是因为，在配置 pack 的时候，命中的文件其依赖也会打包进来。
fis.config.set('modules.packager', 'depscombine');

fis.config.set('pack', {
  //pack1. 公共样式
  'css/common.css': [
    'components/**.css',
    'static/**.css'
  ],
  //pack2. 公共js
  'js/common.js': [
    'static/js/*.js',
    'components/**.js'
  ]
});

//server端的静态目录配置
fis.config.set('statics','/assets');

fis.config.merge({
  
  roadmap : {
    // domain : '/smp',
    path : [
      {
        //排除组件中的less,md和json类型的文件
        reg: /^\/components\/.*\.(?:less|md|json)$/i,
        release: false
      },
      {
        reg: /^\/components\/(.*)$/i,
        isMod: false,
        release: '${statics}/components/$1'
      },
      
      {
        reg: /^\/static\/libs\/common\.js$/i,
        isMod: false,
        release: '${statics}/${namespace}/libs/common.js'
      },
      {
        reg: /^\/static\/(.*)$/i,
        isMod: false,
        release: '${statics}/$1'
      },
      {
        reg: /^\/_webapp\/.*$/i,
        release: false
      }
    ]
  }
});

// js 模板支持
fis.config.set('modules.parser.tmpl', 'utc');
fis.config.set('roadmap.ext.tmpl', 'js');
