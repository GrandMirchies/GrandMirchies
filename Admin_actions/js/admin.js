var api_url ="https://script.google.com/macros/s/AKfycbybQA_0uL5g1duCkovlhaZW_xl32IuD3e0NPrAzjQn5Uc6UAJobWWudiGDv58kHchYwXQ/exec";
$(document).ready(function(){
    $("#add_snack").on("click", function(){
$("#addproduct_modal").modal();
    });
    $("#stock_update").on("click", function(){
        window.location.href="product_update.html";
    }); 
});
function fnminusclick(id){ 
    var $input = $(id).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 0 ? 0 : count;
    $input.val(count);
    $input.change();
    return false;
}
function fnplusclick(id){ 
    var $input = $(id).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
}
$(function(){
    $('#frmsnacks').validate({
        rules: {
            sn_name: {
                required: true
            }, 
            sn_w_price: {
                required: true
            } ,
            sn_r_price: {
                required: true
            }   
        },
        messages: { 
        },
        submitHandler: function(form) {  
            $('#cover-spin').show(0);
            var snack_name = $("#snackname").val();
            fnAjaxCall(snack_name);
            }
    }); 
});
function ctrlq(e){    
    setMessagebox(e.result.result);
}
function fnAjaxCall(snack_name){
    var data = $("#frmsnacks").serialize();
    ajaxurl = api_url + "?callback=ctrlq&"+data+"&sheetname=tbl_snacks&action=insert_snack";
    var request = $.ajax({ 
        async:false,
        crossDomain: true,  
        url: ajaxurl,
        method: "POST", 
        success : function(result){  
            setMessagebox("Product details are saved successfully!");
        }, 
        complete: function(){
            debugger;
            $("#addproduct_modal").modal("hide");
            $('#cover-spin').hide(0);
          }
      });   
}
function setMessagebox(msg){
    $("#messagebox #msgboxvbody").html(msg);
    $("#messagebox").modal();
}
function getsnacks()
{ 
    $('#cover-spin').show(0);
    var ajaxurl = api_url + "?sheetname=tbl_snacks&action=get_snacks";
    $.getJSON(ajaxurl, function (json) {
        var filtered_array = json.records.filter(s=>s.is_deleted == 0);
        dynamicBindingStocks(filtered_array);
     });
}
function dynamicBindingStocks(json){
    var dynamic_control = "";
    $.each(json, function(i,v){
        var snack_name = v.snacks;
        dynamic_control = dynamic_control + "<div class='col-xl-3 col-md-6 mb-4'><div class='card border-left-primary shadow h-100 py-2'><div class='card-body'><div class='row no-gutters align-items-center'><div class='col mr-2'><table><tr><td class='wper60'><div class='h6 mb-0 font-weight-bold text-gray-800'>"+snack_name+"</div></td><td><div class='number'><span class='minus btn-success' onclick='return fnminusclick(this);'>-</span><input type='text' class='numbercontrol' value='0'/><span class='plus  btn-success' onclick='return fnplusclick(this);'>+</span></div></td></tr></table></div></div></div></div></div>";
    });
    $("#snack_update_panel").append(dynamic_control);
    $('#cover-spin').hide(0);
}