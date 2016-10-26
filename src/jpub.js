;(function($,window,document,undefined){
    "use strict";
    /**
     * 构造函数
     */
    var jPub=function(ele, opt){
        this.$element=ele;
        this.defaults={
            // 'type':'manual',
            'isScroll':false,
            'bg':true,
            'bg_color':'rgba(0,0,0,0.5)',
            'form_padding_top':'30%',
            'animate_in':0,
            'animate_out':0,
            'close_mode':1,//1-背景区域点击关闭 2-背景右上角有个× 3-指定关闭tag
            'close_tag':undefined,//close_mode-3指定的tag
            // 'bg_op':0.6,
            'show_pre_func':undefined,//show之前执行方法
            'show_pre_param':undefined,
            'show_after_func':undefined,//show之后执行方法
            'show_after_param':undefined,
            'hide_pre_func':undefined,//hide之后执行方法
            'hide_pre_param':undefined,
            'hide_after_func':undefined,//hide之后执行方法
            'hide_after_param':undefined,

        };
        this.form_info={
            $w:ele.width(),
            $h:ele.height(),
        };
        //create方法参数
        this.defaults_2={
            'tag_id':'jpub_auto_form',
            'parent_tag':'body',
        };
        this.options = $.extend({},this.defaults, opt);
        this.options_2 = $.extend({},this.defaults_2, opt);
    };
    jPub.prototype =  {
        show:function(){
            funcs.show_pre_func(this);
            funcs.showBgDiv(this);
            funcs.showForm(this);
            return this;
        },
        create:function(){
            var a= "<div class='jpub-' id="+this.options_2.tag_id+">好哈哈哈哈哈</div>";
            $("body").append(a);
            return $("#"+this.options_2.tag_id);
        },
    };
    /**
     * 处理方法
     */
    var funcs={
        // 背景层处理
        showBgDiv:function(jPub){
            var that=this;
            if (jPub.options.bg===true) {
                //插入背景层
                var bgDiv='<div id="jpub-bg">';
                    bgDiv+='</div>';
                    bgDiv+='<button class="jpub-close-span">Close</button>';

                $("html>body:eq(0)").append(bgDiv);
                // 添加背景层样式
                var jubBg=$("#jpub-bg");
                jubBg.addClass('jpub-bg');
                jubBg.css({
                    'background-color':jPub.options.bg_color,
                    // 'opacity':ele.options.bg_op,
                });
                //绑定背景层隐藏方法
                switch (jPub.options.close_mode) {
                    case 1:
                        $(".jpub-close-span").remove();
                        jubBg.click(function(){
                            that.hide_pre_func(jPub);
                            that.hide(jPub,jPub.$element,jPub.options.animate_out,false,that.hide_after_func);
                            that.hide(jPub,$(this),undefined,true);
                            that.unBindScroll(jPub);

                        });
                        break;
                    case 2:
                        $(".jpub-close-span").click(function(){
                            that.hide_pre_func(jPub);
                            that.hide(jPub,jPub.$element,jPub.options.animate_out,false,that.hide_after_func);
                            that.hide(jPub,$("#jpub-bg"),undefined,true);
                            $(".jpub-close-span").unbind();
                            that.hide(jPub,$(this),undefined,true);

                        });
                        break;
                    case 3:
                        $(".jpub-close-span").remove();
                        $(jPub.options.close_tag).click(function(){
                            that.hide_pre_func(jPub);
                            that.hide(jPub,jPub.$element,jPub.options.animate_out,false,that.hide_after_func);
                            that.hide(jPub,$("#jpub-bg"),undefined,true);
                            $(jPub.options.close_tag).unbind();
                        });
                    break;

                }
                that.isScroll(jPub);
                //渐入
                jubBg.fadeIn();
            }
            return jPub;
        },
        /**
         * jPub jPub对象
         * $ele jquery对象
         * mode 动画模式
         * isDel,是否隐藏时移除对象
         * callBackFn 回调函数
         */
        hide:function(jPub,$ele,mode,isDel,callBackFn){
            this.animate_out(jPub,$ele,mode,isDel,callBackFn);
            return $ele;
        },
        showForm:function(jPub){
            var that=this;
            jPub.$element.css({
                'display':'block',
                'position':'fixed',
                'top':'100%',
                'left':'0',
                'z-index':2014,
            });
            that.animate_in(jPub,jPub.$element,jPub.options.animate_in,that.show_after_func);
            return jPub;
        },
        isScroll:function(jPub){
            // TODO: 电脑端
            if(jPub.options.isScroll===false){
                $("body").bind("touchmove",function(event){
                    event.preventDefault();
                    // $("body").unbind("touchmove");
                });
            }
        },
        unBindScroll:function(ele){
            $("body").unbind("touchmove");
        },
        /**
         * jPub jPub对象
         * $ele jquery对象
         * mode 动画入场方向暂时上右下左 1234
         */
        animate_in:function(jPub,$ele,mode,callBackFn){
            // TODO: 动画 从中间展开
            switch (mode) {
                case 0:
                    $ele.addClass('jpub-center1');
                    $ele.css({
                        'top':jPub.options.form_padding_top,
                        'width':0,
                        'height':0,
                    });

                    $ele.animate({
                        'width':jPub.form_info.$w,
                        'height':jPub.form_info.$h,
                    },function(){
                        callBackFn(jPub);
                    });
                    break;
                case 1:
                    $ele.addClass('jpub-center1');
                    $ele.css({
                        'top':'-100%',
                    });
                    $ele.animate({
                        'top':jPub.options.form_padding_top,
                    },function(){
                        callBackFn(jPub);
                    });
                    break;
                case 2:
                    $ele.addClass('jpub-center2');
                    $ele.css({
                        'top':jPub.options.form_padding_top,
                        'left':'100%'
                    });
                    $ele.animate({
                        'left':'50%',
                    },function(){
                        callBackFn(jPub);
                    });
                    break;
                case 3:
                    $ele.addClass('jpub-center1');
                    $ele.css({
                        'top':'100%',
                    });
                    $ele.animate({
                        'top':jPub.options.form_padding_top,
                    },function(){
                        callBackFn(jPub);
                    });
                    break;
                case 4:
                    $ele.addClass('jpub-center2');
                    $ele.css({
                        'top':jPub.options.form_padding_top,
                        'left':'-100%'
                    });
                    $ele.animate({
                        'left':'50%',
                    },function(){
                        callBackFn(jPub);
                    });
                    break;
                default:
                    $ele.css({
                        'top':jPub.options.form_padding_top,
                        'left':'-100%'
                    });
                    $ele.addClass('jpub-center1');
                    $ele.fadeIn(function(){
                        callBackFn(jPub);
                    });
                    break;
            }

        },
        /**
         * jPub jPub对象
         * $ele jquery对象
         * mode 动画入场方向暂时上右下左 1234
         * isDel,是否隐藏时移除对象
         * callBackFn回调函数
         */
        animate_out:function(jPub,$ele,mode,isDel,callBackFn){
            switch (mode) {
                case 0:
                    $ele.animate({
                        // 'top':'-100%',
                        'width':'0',
                        'height':'0',
                    },function(){
                        $ele.hide();
                        $ele.css({
                            width:jPub.form_info.$w,
                            height:jPub.form_info.$h,
                        });
                        var a=isDel===true?$ele.remove():'';
                            a=callBackFn===undefined?'':callBackFn(jPub);
                    });
                    break;
                case 1:
                    $ele.animate({
                        'top':'-100%',
                    },function(){
                        var a=isDel===true?$ele.remove():'';
                            a=callBackFn===undefined?'':callBackFn(jPub);
                    });
                    break;
                case 2:
                    $ele.animate({
                        'left':'100%',
                    },function(){
                        var a=isDel===true?$ele.remove():'';
                        a=callBackFn===undefined?'':callBackFn(jPub);
                    });
                    break;
                case 3:
                    $ele.animate({
                        'top':'100%',
                    },function(){
                        var a=isDel===true?$ele.remove():'';
                        a=callBackFn===undefined?'':callBackFn(jPub);
                    });
                    break;
                case 4:
                    $ele.animate({
                        'left':'-100%',
                    },function(){
                        var a=isDel===true?$ele.remove():'';
                        a=callBackFn===undefined?'':callBackFn(jPub);
                    });
                    break;
                default:
                    $ele.fadeOut(function(){
                        var a=isDel===true?$ele.remove():'';
                        a=callBackFn===undefined?'':callBackFn(jPub);
                    });

            }
            // $ele.hide();

        },
        show_pre_func:function(jPub){
            // var fn = window[jPub.options.show_pre_func];
            var fn = jPub.options.show_pre_func;
                if(typeof fn === 'function') {
                    fn(jPub.options.show_pre_param);
            }
        },
        show_after_func:function(jPub){
            var fn = jPub.options.show_after_func;
                if(typeof fn === 'function') {
                    fn(jPub.options.show_after_param);
            }
        },
        hide_pre_func:function(jPub){
            var fn = jPub.options.hide_pre_func;
                if(typeof fn === 'function') {
                    fn(jPub.options.hide_pre_param);
            }
        },
        hide_after_func:function(jPub){
            var fn = jPub.options.hide_after_func;
                if(typeof fn === 'function') {
                    fn(jPub.options.hide_after_param);
            }
        },
    };
    /**
     * 绑定新插件方法
     */
    $.fn.jShow=function(options){
        var jpub=new jPub(this,options);
        return jpub.show();
    };
    // $.fn.jCreateForm=function(options){
    //     var jpub=new jPub(this,options);
    //     return jpub.create();
    // };
    $.extend({
        jCreateForm:function(options){
            var jpub=new jPub(this,options);
            return jpub.create();
        }
    });
})(jQuery,window,document);
