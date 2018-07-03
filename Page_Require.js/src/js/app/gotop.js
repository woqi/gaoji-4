define(['jquery'], function($){
    var _Gotop = (function(){
        function GoTop(ct,target){
            this.ct = $('.gotop')
            this.target = $('<a href="" class="target">Go Top</a>')
            this.creatNode()
            this.bindEvent()
            
          }
          GoTop.prototype.bindEvent = function(){
            var self = this
            
            this.target.click(function(click){
              $('body').animate({scrollTop: 0},200)
            })
            
            $(window).scroll(function(e){
              if($(this).scrollTop()>100){
                self.target.show()
              }else{
                self.target.hide()
              }
            })
          }
          
          GoTop.prototype.creatNode = function(){
            this.ct.append(this.target)
            this.target.hide()
            console.log(this)
          }
    
          return{
            init: function($ct){
                new GoTop($ct);    
            }
        }
    })()
    return _Gotop
    //_Gotop.init($('.gotop'))
})

