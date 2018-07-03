import './css/page.css'
var $ = require('./js/lib/jquery-3.2.1.min');
var _Carousel = require('./js/app/carousel')
var _Gotop = require('./js/app/gotop')
var _Waterfall = require('./js/app/waterfall-news')

_Carousel.init($('.carousel'));
_Gotop.init($('.gotop'));
_Waterfall.init($('.wrap'));

$(window).on('scroll', function(){
    if ($(this).scrollTop() > 900){
      $('.navbar').css('display', 'none')   
    }else{
      $('.navbar').css('display', 'block')
    }
})
console.log('1')
// ,
//     externals: {
//       jquery: 'window.$'
//     },
//     resolve:{
//       alias:{
//           jquery:__dirname+'./js/lib/jquery-3.2.1.min.js'
//       }
//     }
//   }