$(function(){
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
});
