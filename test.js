var a=123567;

$(function(){
    var str="<p>This is a popupbox automatically generated</p>";
    $.jCreateForm({
        'tag_id':'hahaha',
        // 'parent_tag':'#div2',
        'content':str,

    });
    // 按钮1
    $("#show_1").click(function(){

        $("#form_1").jShow(jpub_options);
    });
    // 按钮2
    $("#show_2").click(function(){
        $("#hahaha").jShow({
        });
    });



});
// object
var test={
        param:'show_before',
        abc:function(p){
            alert(test.param);

        },
        cde:function(){
            this.param="233";
        }
};
// normal function
function abc(param){
    alert(param);
}
var jpub_options={
    // 'bg':false,//不需要背景层
    'bg_color':'rgba(0,0,0,0.2)',//背景层指定方式rgba
    'close_mode':1,//背景层关闭模式
    'close_tag':'.jpub-btn-cancel',
    'form_padding_top':'150px',
    'animate_in':2,
    'animate_out':2,
    // 'show_pre_func':test.abc,//show之前执行方法
    // 'show_pre_param':test.param,
    // 'show_after_func':function(){
    //     alert();
    // },//show之后执行方法
    // 'show_after_param':'show_after',
    // 'hide_pre_func':abc,//hide之后执行方法
    // 'hide_pre_param':'hide_before',
    // 'hide_after_func':abc,//hide之后执行方法
    // 'hide_after_param':'hide_after',
    'ok_btn':'#ok_1',
    'cancel_btn':'#cancel_1',
    // 'ok_func':test.abc,
    // 'cancel_func':test.abc,
    // 'ok_btn_param':test.param,
    'cancel_btn_param':undefined,
};
