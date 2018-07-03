define(['jquery','app/carousel','app/gotop','app/waterfall-news'],function($, _Carousel, _Gotop, _Waterfall){
    _Carousel.init($('.carousel'));
    _Gotop.init($('.gotop'));
    _Waterfall.init($('.wrap'));


    $(window).on('scroll', function(){
        if ($(this).scrollTop() > 900){
          $('.navbar').css('display', 'none')   
        }
        else{
          $('.navbar').css('display', 'block')
        }
      })

})