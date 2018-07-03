define(['jquery'],function($){
    var _Waterfall = (function(){

        function Waterfall($ct){
            var $this = this
            this.ct = $ct
            //console.log(this.ct)
            this.init()
            this.start()
            this.ct.find('.more').on('click',function(e){
                e.preventDefault()
                $this.start()
            })
        }
    
        Waterfall.prototype = {
            init: function(){
                var _this = this
                this.perPageCount = 10
                this.curPage = 10    
    
                this.colSumHeight = []
    
                this.nodeCt = this.ct.find('.pic-ct')
                this.node = this.ct.find('.pic-ct .item')
                this.nodeWidth = this.ct.find('.item').outerWidth(true)
                this.colNum = parseInt(this.nodeCt.width()/this.nodeWidth)
                //console.log(this.nodeCt)
                //console.log(this.nodeWidth)
                //console.log(this.node)
                for(var i=0; i<this.colNum; i++){
                    _this.colSumHeight[i] = 0
                }
                this.isDataArrive = true//////
            },
    
            start: function(){
                var _this = this
                _this.getData(function(newsList){
                    _this.isDataArrive = true//////
                    $.each(newsList,function(idx,news){
                        var $node = _this.getNode(news)
                        $node.find('img').on('load',function(){
                            _this.nodeCt.append($node)
                            console.log($node,'已加载..')
                            _this.waterFallPlace($node)
                        })
                    })
                })
                _this.isDataArrive = false/////
    
            },
    
            waterFallPlace: function($node){
                var _this = this 
                var idx = 0
                var minSumHeight = _this.colSumHeight[0]
    
                for(var i=0; i<_this.colSumHeight.length; i++){
                    if(_this.colSumHeight[i] < minSumHeight){
                        idx = i;
                        minSumHeight = _this.colSumHeight[i]
                        }
                    }
                $node.css({
                    left: _this.nodeWidth * idx,
                    top: minSumHeight,
                    opacity: 1
                })
                
                _this.colSumHeight[idx] += $node.outerHeight(true)
                _this.nodeCt.height(Math.max.apply(null,_this.colSumHeight))
            },
    
            getData: function(callback){
                var _this = this
                $.ajax({
                    url: 'http://platform.sina.com.cn/slide/album_tech',
                    dataType: 'jsonp',   
                    jsonp:"jsoncallback",
                    data: {
                        app_key: '1271687855',
                        num: _this.perPageCount,
                        page: _this.curPage
                    }
                }).done(function(ret){
                    if(ret && ret.status && ret.status.code === "0"){
                        callback(ret.data);   
                        _this.curPage++
                    }else{
                    console.log('get error data');
                    }
                })
            },
    
            getNode: function(item){
                var tpl = ''
                tpl += '<li class="item">';
                tpl += ' <a href="'+ item.url +'" class="link"><img src="' + item.img_url + '" alt=""></a>';
                tpl += ' <h4 class="header">'+ item.short_name +'</h4>';
                tpl += '<p class="desp">'+item.short_intro+'</p>';
                tpl += '</li>';
        
                return $(tpl)
            }
    
        }
        return {
            init:function($ct){
                new Waterfall($ct)
            }
        }
    
    })()
    return _Waterfall
    //_Waterfall.init($('.wrap'))

})


