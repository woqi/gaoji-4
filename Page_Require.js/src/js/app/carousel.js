define(['jquery'],function($){
    var _Carousel = (function(){
        
        function Carousel($ct) {
            this.$ct = $ct;
            this.init();
            this.bind();
            this.autoPlay();
        }
    
        Carousel.prototype.init = function() {
            var $imgCt = this.$imgCt = this.$ct.find('.img-ct'),
                $preBtn = this.$preBtn = this.$ct.find('.btn-pre'),
                $nextBtn = this.$nextBtn = this.$ct.find('.btn-next'),
                $bullet = this.$bullet = this.$ct.find('.bullet'),
                $bullets = this.$bullets = this.$ct.find('.bullet>li'),
                $imgs = this.$imgs = this.$ct.find('.img-ct>li')
    
            var $firstImg = $imgCt.find('li').first(),
                $lastImg = $imgCt.find('li').last()
    
            this.$imgWidth = $imgs.width()
    
            // console.log(this.$imgWidth)
            // console.log($imgs)
    
            this.curPageIndex = 0
            this.imgLength = $imgCt.children().length
            this.isAnimate = false
            this.$firstImg = $firstImg
    
            $imgCt.prepend($lastImg.clone())
            $imgCt.append($firstImg.clone())
    
            $imgCt.width($firstImg.width() * $imgCt.children().length)
            $imgCt.css({
                'left': -this.$imgWidth
            })
    
        }
    
        Carousel.prototype.bind = function() {
            var _this = this;
            this.$preBtn.on('click', function(e) {
                e.preventDefault();
                _this.playPre();
            })
    
            this.$nextBtn.on('click', function(e) {
                e.preventDefault();
                _this.playNext();
            })
    
            this.$bullets.on('click',function(){
                var index = $(this).index()
                console.log(index)
    
                if(index > _this.curPageIndex){
                    _this.playNext(index - _this.curPageIndex)
                }else if(index < _this.curPageIndex){
                    _this.playPre(_this.curPageIndex - index)
                }
            })
    
        }
    
        Carousel.prototype.playPre = function() {
            var _this = this;
            if (this.isAnimate) return;
            this.isAnimate = true;
            this.$imgCt.animate({
                left: '+='+this.$imgWidth
            }, function() {
                _this.curPageIndex--;
                if (_this.curPageIndex < 0) {
                    _this.$imgCt.css('left', -(_this.imgLength * _this.$firstImg.width()));
                    _this.curPageIndex = _this.imgLength - 1
                }
            })
            this.isAnimate = false;
            this.setBullet()
        }
    
        Carousel.prototype.playNext = function() {
            var _this = this;
            if (this.isAnimate) return;
            this.isAnimate = true;
            this.$imgCt.animate({
                left: '-='+this.$imgWidth
            }, function() {
                _this.curPageIndex++;
                if (_this.curPageIndex === _this.imgLength) {
                    _this.$imgCt.css({
                        'left': -_this.$imgWidth
                    })
                    _this.curPageIndex = 0
                }
            })
            _this.isAnimate = false;
            _this.setBullet();
        }
    
        Carousel.prototype.setBullet = function() {
            this.$bullet.children()
                .removeClass('active')
                .eq(this.curPageIndex)
                .addClass('active')
        }
    
        Carousel.prototype.autoPlay = function(){
            var _this = this
            setInterval(function(){
                this.playNext()
                }.bind(_this),3000)
        }
        return{
            init: function($ct){
                $ct.each(function(index, node){
                    new Carousel($(node));
                })
            }
        }
    })()
    return _Carousel
    //_Carousel.init($('.carousel'))
})

