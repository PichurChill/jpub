/*jshint multistr: true */
(function(){
var code_test_1="```"+
    "$a=123;\n"+
    "function abc(){\n"+
    "}\n"+
    "```";
var code_block_1="```\n\
$(function(){\n\
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
});\n\
```";

var code_block_2_1="```\n\
<!-- html code -->\n\
<div id=\"form_2\" class=\"demo-box-2\"  hidden=\"hidden\">\n\
    <button id=\"demo-2-ok\">Ok</button>\n\
<button style=\"float:right\" id=\"demo-2-close\">Close</button><br>\n\
</div>\n\
```";
var code_block_2_2="```\n\
//js code\n\
$(\"#show_2\").click(function(){\n\
    $(\"#form_2\").jShow({\n\
        'close_mode':2,\n\
        'close_tag':'#demo-2-close',\n\
        'ok_btn':'#demo-2-ok',\n\
        'ok_func':function(p){\n\
            alert(p);\n\
        },\n\
        'ok_func_param':\"This is Demo2.\"\n\
        'animate_in':1,\n\
        'animate_out':1,\n\
        'show_pre_func':alertSth,\n\
        'show_pre_param':'This dialog show before the box come-in-animation.',\n\
        'hide_after_func':alertSth,\n\
        'hide_after_param':'This dialog show after the box come-out-animation.'\n\
    });\n\
});\n\
```";
$("#code-block-1").html(markdown.toHTML(code_block_1));
$("#code-block-2-1").html(markdown.toHTML(code_block_2_1));
$("#code-block-2-2").html(markdown.toHTML(code_block_2_2));
})();
