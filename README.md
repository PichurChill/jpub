# jpub
## A jQuery Extension to make a PopUpBox easier.
# use
### 1、 `$('tag').jShow();`
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
|2| bg | background div |true |true/false|-|
|3|bg_color | background div color| 'rgba(0,0,0,0.5)'|'rgba(x,x,x,x)'|2|
|4|animate_in|animate-in-direction:<br>1:↓、2:←、3:↑、4:→|3|1/2/3/4|-|
|5|animate_out|animate-out-direction:<br>1:↑、2:→、3:↓、4:←、0:fadeOut()|0|0/1/2/3/4|-|
|6|close_mode|1-click the background div to hide<br>2-create a tag to hide<br>3-specify a html tag to hide|1|1/2/3|-|
|7|close_tag|the specified html tag|undefined|'#demo'/'.example'/...|6|
|8|show_pre_func|the function run before the div show|undefined|obj.func/funcName()/function(){alert()}|-|
|9|show_after_func|the function run after the div show|undefined|obj.func/funcName()/function(){alert()}|-|
|10|hide_pre_param|the function run before the div hide|undefined|obj.func/funcName()/function(){alert()}|-|
|11|hide_after_func|the function run after the div hide|undefined|obj.func/funcName()/function(){alert()}|-|
|12|show_pre_param|the parameter of show_pre_func |undefined|Any|8|
|13|show_after_param|the parameter of show_after_func |undefined|Any|9|
|14|hide_pre_param|the parameter of hide_pre_param |undefined|Any|10|
|15|hide_after_param|the parameter of hide_after_func |undefined|Any|11|

### 2、 `$.jCreateForm().jShow();`
*create automatically generated PopUpBox*

```js
$.jCreateForm({
    'tag_id':'hahaha'
}).jShow({
    'animate_in':3,
    'animate_out':3,
});
```
### Parameters
|id| name | description | default |value|require id|
|-------------| ------------- |:-----------:| -----:| -----:| -----:|
|1| tag_id | the PopUpBox's tag id you want name  | jpub_auto_form |-|-|
|2|parent_tag|the tag you want to append|'body'|'#demo'/'.class:eq(x)'|-|
