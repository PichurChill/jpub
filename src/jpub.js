// TODO: 点击按钮后 空格可以触发
;(function($,window,document,undefined){
    "use strict";
    /**
     * 构造函数。
     */
    var jPub=function(ele, opt){
        this.$element=ele;
        this.defaults={
            // 'type':'manual',
            'isScroll':false,
            // 'bg':true,
            'bg_color':'rgba(0,0,0,0.5)',
            'box_padding_top':'30%',
            'animate_in':0,
            'animate_out':0,
            // 'close_mode':1,//1-背景区域点击关闭 2-背景右上角有个× 3-指定关闭tag
            'close_mode':1,//1-bg点击关闭 2-bg不能点击关闭
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
        // if(ele instanceof jQuery){
        //     this.form_info={
        //         $w:ele.width(),
        //         $h:ele.height(),
        //     };
        // }

        //create方法参数
        this.defaults_2={
            'tag_id':'jpub_auto_form',
            'parent_tag':'body',//!!delete
            'head_text':'Notice',
            'ok_text':'OK',
            'cancel_text':'Cancel',
            'content':'Information you want to show'
        };
        this.options = $.extend({},this.defaults, opt);
        this.options_2 = $.extend({},this.defaults_2, opt);
    };
    jPub.prototype =  {
        show:function(){
            funcs.showPreFunc(this);
            funcs.showBgDiv(this);
            funcs.showForm(this);
            return this;
        },
        create:function(){
            var str="    <div class=\"jpub-target jpub-div\" id="+this.options_2.tag_id+">";
                str+="        <div class=\"jpub-main-head\"><p class=\"jpub-main-head-p\">"+this.options_2.head_text+"</p></div>";
                str+="        <div class=\"jpub-main-body\">"+this.options_2.content+"</div>";
                str+="        <div class=\"jpub-main-foot\">";
                str+="            <button class=\"jpub-btn jpub-btn-cancel\">"+this.options_2.cancel_text+"</button>";
                str+="            <button class=\"jpub-btn jpub-btn-ok\">"+this.options_2.ok_text+"</button>";
                str+="        </div>";
                str+="    </div>";

            $(this.options_2.parent_tag).append(str);
            // return $("#"+this.options_2.tag_id);//TODO
            return $(this.options_2.parent_tag);
        },
    };
    /**
     * 主方法
     */
    var funcs={
        // 背景层处理
        testFunc:function(){
            alert("Please bind functions by adding options:'ok_func',cancel_func' ");
        },
        showBgDiv:function(jPub){
            // if (jPub.options.bg===true) {
                //插入背景层
            var bgDiv='<div id="jpub-bg">';
                bgDiv+='</div>';
                // bgDiv+='<button class="jpub-close-span">Close</button>';

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
                    handleFuncs.bindHideTag(jPub,"#jpub-bg");
                    break;
                // case 2:
                //     handleFuncs.bindHideTag(jPub,".jpub-close-span");
                //     break;
                case 2:
                    // handleFuncs.bindHideTag(jPub,jPub.options.close_tag);
                    break;
                default:

            }
            handleFuncs.bindBtn(jPub);
            handleFuncs.isScroll(jPub);
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
            handleFuncs.animateOut(jPub,$ele,mode,isDel,callBackFn);
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
            handleFuncs.animateIn(jPub,jPub.$element,jPub.options.animate_in,that.showAfterFunc);
            return jPub;
        },
        showPreFunc:function(jPub){
            // var fn = window[jPub.options.show_pre_func];
            var fn = jPub.options.show_pre_func;
                if(typeof fn === 'function') {
                    fn(jPub.options.show_pre_param);
            }
        },
        showAfterFunc:function(jPub){
            var fn = jPub.options.show_after_func;
                if(typeof fn === 'function') {
                    fn(jPub.options.show_after_param);
            }
        },
        hidePreFunc:function(jPub){
            var fn = jPub.options.hide_pre_func;
                if(typeof fn === 'function') {
                    fn(jPub.options.hide_pre_param);
            }
        },
        hideAfterFunc:function(jPub){
            var fn = jPub.options.hide_after_func;
                if(typeof fn === 'function') {
                    fn(jPub.options.hide_after_param);
            }
        },
    };
    var handleFuncs={
        /**
         * jPub jPub对象
         * $ele jquery对象
         * mode 动画入场方向暂时上右下左 1234
         */
        animateIn:function(jPub,$ele,mode,callBackFn){
            var animeArr=[0,1,2,3,4];
            $ele.css({
                'display':'block'
            });
            $ele.removeClass (function (index, css) {
                return (css.match (/(^|\s)anime-out-\S+/g) || []).join(' ');
            });
            if($.inArray(mode,animeArr)>-1){
                $ele.css({
                    'top':jPub.options.box_padding_top,
                });
                $ele.addClass('anime-in-'+mode+'');
                this.animateEndOnce($ele,function(){
                     callBackFn(jPub);
                });
            }else{
                $ele.css({
                    'top':jPub.options.box_padding_top,
                });
                $ele.addClass('anime-in-0');
                this.animateEndOnce($ele,function(){
                     callBackFn(jPub);
                });
            }
        },
        /**
         * jPub jPub对象
         * $ele jquery对象
         * mode 动画入场方向暂时上右下左 1234
         * isDel,是否隐藏时移除对象
         * callBackFn回调函数
         */
        animateOut:function(jPub,$ele,mode,isDel,callBackFn){
            var animeArr=[0,1,2,3,4];
            $ele.removeClass (function (index, css) {
                return (css.match (/(^|\s)anime-in-\S+/g) || []).join(' ');
            });
            if($.inArray(mode,animeArr)>-1){
                $ele.addClass('anime-out-'+mode+'');
                this.animateEndOnce($ele,function(){
                        $ele.hide();
                        var a=isDel===true?$ele.remove():'';
                            a=callBackFn===undefined?'':callBackFn(jPub);
                });
            }else{
                // $ele.removeClass('anime-in-0');
                $ele.fadeOut(function(){
                        // $ele.hide();
                        var a=isDel===true?$ele.remove():'';
                            a=callBackFn===undefined?'':callBackFn(jPub);
                });
            }

        },
        /**
         * 绑定确定、取消按钮
         *
         */
        bindBtn:function(jPub){
            if (jPub.options.ok_btn!==undefined) {
                $(jPub.options.ok_btn).one('click',function(){
                    jPub.options.ok_func(jPub.options.ok_func_param);
                });
            }
            if (jPub.options.cancel_btn!==undefined) {
                handleFuncs.bindHideTag(jPub,jPub.options.cancel_btn);
                // $(jPub.options.cancel_btn).one('click',function(){
                //     jPub.options.cancel_func();
                // });
            }
        },
        /**
         * 绑定隐藏弹出层的selector
         */
        bindHideTag:function(jPub,tag){
            var that=this;
            // if(tag!=".jpub-close-span"){
            //     $(".jpub-close-span").remove();
            // }
            $(tag).one('click',function(){
                funcs.hidePreFunc(jPub);
                funcs.hide(jPub,jPub.$element,jPub.options.animate_out,false,funcs.hideAfterFunc);
                funcs.hide(jPub,$("#jpub-bg"),undefined,true);
                handleFuncs.unBindScroll(jPub);
                $(this).unbind();
                // if(tag==".jpub-close-span"){
                //     funcs.hide(jPub,$(this),undefined,true);
                // }
                handleFuncs.unbindBtn(jPub);//解绑ok cancel
            });
        },
        /**
         * 解绑ok cancel
         */
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
         * css animation-end listener
         */
        animateEndOnce:function($dom,callback){
            $dom.one('animationend webkitAnimationEnd oAnimationEnd msAnimationEnd mozAnimationEnd',callback);
        }
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
