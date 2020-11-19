$('#pop').hide();
$('#toggle').click(function(){
    $('#pop').toggle();
    swaptext();
})
var b=false;
function swaptext(){
    if(b) $('#toggle').text('Click here for a beautiful Popout!');
    else $('#toggle').text('Click here to hide that disgusting Popout!');
    b=!b;
}