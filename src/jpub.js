// TODO: click 用 one 删除bind
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
            // 'bg':true,
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
            'ok_btn':'.jpub-btn-ok',
            'cancel_btn':'.jpub-btn-cancel',
            'ok_func':funcs.testFunc,
            // 'cancel_func':funcs.testFunc,
            'ok_func_param':undefined,
            // 'cancel_func_param':undefined,

        };
        if(ele instanceof jQuery){
            this.form_info={
                $w:ele.width(),
                $h:ele.height(),
            };
        }

        //create方法参数
        this.defaults_2={
            'tag_id':'jpub_auto_form',
            'parent_tag':'body',
            'ok_text':'Ok',
            'cancel_text':'Cancel',
            'content':'Information you want to show'
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
            var str="    <div class=\"jpub-target jpub-div\" id="+this.options_2.tag_id+">";
                str+="        <div class=\"jpub-main-head\"></div>";
                str+="        <div class=\"jpub-main-body\">"+this.options_2.content+"</div>";
                str+="        <div class=\"jpub-main-foot\">";
                str+="            <button class=\"jpub-btn jpub-btn-cancel\">"+this.options_2.cancel_text+"</button>";
                str+="            <button class=\"jpub-btn jpub-btn-ok\">"+this.options_2.ok_text+"</button>";
                str+="        </div>";
                str+="    </div>";

            $(this.options_2.parent_tag).append(str);
            return $(this.options_2.parent_tag);
        },
    };
    /**
     * 处理方法
     */
    var funcs={
        // 背景层处理
        testFunc:function(){
            alert("Please bind functions by adding options:'ok_func',cancel_func' ");
        },
        showBgDiv:function(jPub){
            var that=this;
            // if (jPub.options.bg===true) {
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
                    that.bindHideTag(jPub,"#jpub-bg");
                    break;
                case 2:
                    that.bindHideTag(jPub,".jpub-close-span");
                    break;
                case 3:
                    that.bindHideTag(jPub,jPub.options.close_tag);
                    break;
                default:

            }
            that.bindBtn(jPub);
            that.isScroll(jPub);
            //渐入
            jubBg.fadeIn();
            // }
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
            // jPub.$element.css({
            //     'display':'block',
            //     'position':'fixed',
            //     'top':'100%',
            //     'left':'0',
            //     'z-index':2014,
            // });
            jPub.$element.addClass('jpub-form');
            that.animate_in(jPub,jPub.$element,jPub.options.animate_in,that.show_after_func);
            return jPub;
        },

        /**
         * 绑定确定，取消按钮
         *
         */
        bindBtn:function(jPub){
            var that=this;
            if (jPub.options.ok_btn!==undefined) {
                $(jPub.options.ok_btn).click(function(){
                    jPub.options.ok_func(jPub.options.ok_func_param);
                });
            }
            if (jPub.options.cancel_btn!==undefined) {
                that.bindHideTag(jPub,jPub.options.cancel_btn);
                // $(jPub.options.cancel_btn).click(function(){
                //     jPub.options.cancel_func();
                // });
            }
        },
        /**
         * 绑定隐藏弹出层的selector
         */
        bindHideTag:function(jPub,tag){
            var that=this;
            if(tag!=".jpub-close-span"){
                $(".jpub-close-span").remove();
            }
            $(tag).click(function(){
                that.hide_pre_func(jPub);
                that.hide(jPub,jPub.$element,jPub.options.animate_out,false,that.hide_after_func);
                that.hide(jPub,$("#jpub-bg"),undefined,true);
                that.unBindScroll(jPub);
                $(this).unbind();
                if(tag==".jpub-close-span"){
                    that.hide(jPub,$(this),undefined,true);
                }
                that.unbindBtn(jPub);//解绑ok cancel
            });
        },
        unbindBtn:function(jPub){
            if (jPub.options.ok_btn!==undefined) {
                $(jPub.options.ok_btn).unbind();
            }
            if (jPub.options.cancel_btn!==undefined) {
                $(jPub.options.cancel_btn).unbind();
            }
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
            var length='';//左右移动距离
            $ele.css({
                'display':'block'
            });
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
                        // 'top':jPub.form_info.$h/10
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
                    // $ele.addClass('jpub-center2');
                    $ele.css({
                        'top':jPub.options.form_padding_top,
                        // 'left':'100%'
                        'left':$(document).width()
                    });
                    length=$(document).width()/2-$ele.width()/2;
                    $ele.animate({
                        // 'left':'50%',
                        'left':length,
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
                    // $ele.addClass('jpub-center2');
                    $ele.css({
                        'top':jPub.options.form_padding_top,
                        'left':'-100%'
                    });
                    length=$(document).width()/2-$ele.width()/2;

                    $ele.animate({
                        'left':length,
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
            var length=$(document).width();
            switch (mode) {
                case 0:
                    $ele.animate({
                        // 'top':'-100%',//nice
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
                        'top':'-110%',
                    },function(){
                        var a=isDel===true?$ele.remove():'';
                            a=callBackFn===undefined?'':callBackFn(jPub);
                    });
                    break;
                case 2:
                    $ele.animate({
                        'left':'110%',
                    },function(){
                        var a=isDel===true?$ele.remove():'';
                        a=callBackFn===undefined?'':callBackFn(jPub);
                    });
                    break;
                case 3:
                    $ele.animate({
                        'top':'110%',
                    },function(){
                        var a=isDel===true?$ele.remove():'';
                        a=callBackFn===undefined?'':callBackFn(jPub);
                    });
                    break;
                case 4:
                    $ele.animate({
                        'left':'-110%',
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
