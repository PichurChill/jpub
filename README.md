# jpub

*A jQuery plugin to make a PopUpBox easier.*

[![npm version](https://badge.fury.io/js/jpub.png)](https://badge.fury.io/js/jpub)
-----------


view at [GitHub](https://github.com/PichurChill/jpub)

**Not support UC browser ！(╯‵□′)╯︵┻━┻**

## [DEMO](http://jirachi.win/jpub/) (The DEMO is old version,update later...)
# Function List
|id|name|description|
|---|:--|:--|
|1|`$(Selecoter).jShow()`|the target PopUpBox  has been in the html|
|2|`$.jCreateForm()`|create automatically generated PopUpBox|

# use
### 1、 `$(Selecoter).jShow();`
*the target PopUpBox  has been in the html*
```js
$(".jpub-div").jShow({
    'close_mode':2,
    'form_padding_top':'30px',
    'animate_in':1,
    'animate_out':1,
    'show_pre_func':test.abc,
    'show_pre_param':test.param,
    'show_after_func':function(){
            alert('show_after');
        },

});
```
### Parameters
|id| name | description | default |value|require id|
|-------------| ------------- |:-----------:| -----:| -----:| -----:|
|1| isScroll | - | false |true/false|-|
|2|~~bg~~| ~~background div~~ |~~true~~ |~~true/false~~|-|
|3|bg_color | background div color| 'rgba(0,0,0,0.5)'|'rgba(x,x,x,x)'|2|
|4|animate_in|animate-in-direction:<br>1:↓、2:←、3:↑、4:→|3|1/2/3/4|-|
|5|animate_out|animate-out-direction:<br>1:↑、2:→、3:↓、4:←|0|0/1/2/3/4|-|
|6|**close_mode**|1-you can click the background div to hide<br>2-you can't click the background and specify a html tag to hide|1|1/2|-|
|7|close_tag|the specified html tag|undefined|'#demo'/'.example'/...|6|
|8|show_pre_func|the function run before the div show|undefined|obj.func/funcName()/function(){alert()}|-|
|9|show_after_func|the function run after the div show|undefined|obj.func/funcName()/function(){alert()}|-|
|10|hide_pre_param|the function run before the div hide|undefined|obj.func/funcName()/function(){alert()}|-|
|11|hide_after_func|the function run after the div hide|undefined|obj.func/funcName()/function(){alert()}|-|
|12|show_pre_param|the parameter of show_pre_func |undefined|Any|8|
|13|show_after_param|the parameter of show_after_func |undefined|Any|9|
|14|hide_pre_param|the parameter of hide_pre_param |undefined|Any|10|
|15|hide_after_param|the parameter of hide_after_func |undefined|Any|11|
|16|**ok_btn**|the attribute name of the "ok" button |.jpub-btn-ok|'.btn_1'/'#btn_1'|-|
|17|**cancel_btn**|the attribute name of the "cancel" button |.jpub-btn-cancel|'.btn_2'/'#btn_2'|-|
|18|**ok_func**|the onclick function of the "ok" button  |funcs.testFunc(an "alert" function)|type of function|16|
|19|**ok_func_param**|the parameter of ok_func |undefined|Any|18|


### 2、 `$.jCreateForm().jShow();`（TODO:More Themes）
*create automatically generated PopUpBox*

```js
$(function(){
    $.jCreateForm({
        'tag_id':'hahaha',
    });
});
$(".btn").click(){
    $("#hahaha").jShow();
}

```
### Parameters
|id| name | description | default |value|require id|
|-------------| ------------- |:-----------:| -----:| -----:| -----:|
|1| tag_id | the PopUpBox's tag id you want name  | jpub_auto_form |-|-|
|2|~~parent_tag~~|~~the parent tag you want to append~~|~~'body'~~|~~'#demo'/'.class:eq(x)'~~|-|
|3|head_text|the head text of the box|'Notice'|Any word|-|
|4|ok_text|the text of the "ok" button|'Ok'|Any word|-|
|5|cancel_text|the text of the "cancel" button|'Cancel'|Any word|-|
|6|content|the Information you want to show in the PopUpBox|'Information you want to show'|Any Html tag|-|
