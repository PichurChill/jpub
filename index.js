$(function(){
    // demo1
   var str="<p>This is a popupbox automatically generated</p>";
   $.jCreateForm({
       'tag_id':'hahaha',
       'content':str,
   });
   $("#show_1").click(function(){
       $("#hahaha").jShow({
           'ok_func':function(p){
               alert(p);
           },
           'ok_func_param':"Hello,Jin"
       });
   });
   //demo2
   $("#show_2").click(function(){
       $("#form_2").jShow({
           'close_mode':2,
           'close_tag':'#demo-2-close',
           'ok_btn':'#demo-2-ok',
           'ok_func':function(p){
               alert(p);
           },
           'ok_func_param':"This is Demo2."
       });
   });
});
