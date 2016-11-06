/*jshint multistr: true */
(function(){

    $=function(id){
        return document.getElementById(id);
    };
    var code_block_1="$(function(){\n\
    var str=\"<p>This is a popupbox automatically generated</p>\";\n\
    $.jCreateForm({\n\
        'tag_id':'hahaha',\n\
        'content':str,\n\
    });\n\
    $(\"#show_1\").click(function(){\n\
        $(\"#hahaha\").jShow({\n\
            'ok_func':function(p){\n\
                alert(p);\n\
            },\n\
            'ok_func_param':\"Hello,Jin\"\n\
        });\n\
    });\n\
});";
    $("code-block-1").innerHTML=markdown.toHTML(code_block_1);
})();
