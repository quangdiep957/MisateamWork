$(document).ready(function () {
/*
    *   Chức năng chọn trong table
    *   Ngày 02/08/2022
    *   Author: Bùi Quang Điệp
*/
var table_th = "";
var key = false;
var event ="";
checkboxs = "";
var old = "";
sumchecked = 0;
IdAsset ="";
NameAsset = "";
    $("tbody").on("click","tr",function(){
        event = "downCtrl";
        me = $(this);
        htmlicon =` <div class="tablefunction display-flex">
        <div class="icon icon-edit icon__size-14"></div>
        <div class="icon icon-detail icon__size-14"></div>
        </div>`;
        if(checkboxs == true)
        {
            if(key == false){
                $("tbody tr").removeClass("table-active");
                $("tbody tr").find('input:checkbox').prop('checked', false);
                me.children(".row__icon").children().empty();
            }
            else{
                if(me.hasClass('table-active')){
                    me.removeClass("table-active");
                    me.children(".row__icon").children().empty();
                    me.find('input:checkbox').prop('checked', false);  
                  }
                  else{
                       me.addClass("table-active");
                       me.find('input:checkbox').prop('checked', true);
                       console.log(me.children());
                       me.children(".row__icon").append(htmlicon);
                      

                  }
            }

        }
        else{

            if(me.hasClass('table-active')){
                me.removeClass("table-active");
                me.find('input:checkbox').prop('checked', false);  
                me.children(".row__icon").children().empty();
              }
              else{
                if(old != ""){
                    old.children(".row__icon").children().empty();
                    old.removeClass("table-active");
                    old.find('input:checkbox').prop('checked', false);  
                }
               
               me.addClass("table-active");
               me.find('input:checkbox').prop('checked', true);
               me.children(".row__icon").append(htmlicon);
               //console.log(old);
                old = me;
                IdAsset = me.children("#IdAsset").text();
                NameAsset = me.children("#nameAsset").text();
               
              }
        }
        sumchecked =($("tbody tr").find('input:checkbox:checked')).length;
        console.log(sumchecked);
       
    })


    
    $("thead th").find("input").click(function(){
        if ($(this).is(':checked')){
            $("tbody tr").find('input:checkbox').prop('checked', true);
            $("tbody tr").addClass("table-active");
            sumchecked =($("tbody tr").find('input:checkbox:checked')).length;
        }
        else{
            $("tbody tr").find('input:checkbox').prop('checked', false);
            $("tbody tr").removeClass("table-active");
        }
      })

 /*
    *   Chức năng resize width table
    *   Ngày 05/08/2022
    *   Author: Bùi Quang Điệp
*/
    
    $("th").click(function(){
        event = "sum";
       table_th = $(this);
      
    });
  
    $("body").keydown(function(e){
        // Xử lý sự kiện khi nhấn phím ctrl thì có thể chọ được nhiều dòng
       var keycode = (e.keyCode ? e.keyCode : e.which);
   //    console.log(keycode);

       if(event == "downCtrl")
       {
        checkboxs = true;
         if(keycode == 17){
            key = true;
           
         }
         else{
            key = false ;
            checkboxs =false;
         } 
       }
       if(event=="sum") {
            // console.log(e.keyCode);
            width = table_th.width();
            if(e.keyCode == 39){
                width++;
            }
            if(e.keyCode == 37){
            width--;
            }
            table_th.css("width",`${width}px`);
            // console.log(table_th.width());
        
       }
      
    
   });
    /*
    *   Chức năng Xóa tài sản 1 hoặc nhiều
    *   Ngày 06/08/2022
    *   Author: Bùi Quang Điệp
*/
   $("#btn--remove").click(function(){
    try {
        if(sumchecked == 1){
            var errSingle = `Bạn có muốn xóa tài sản <span style ="font-weight:bold">${IdAsset}-${NameAsset}</span> ?`;
            $(".dialog__handle#dialog__warring").show();
            $(".dialog__handle#dialog__warring").find(".text--notify").empty();
            $(".dialog__handle#dialog__warring").find(".text--notify").append(errSingle); 
        }
        else{
            var errMulti =`<span style ="font-weight:bold">${sumchecked}</span> Tài sản được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách không ?`;
            $(".dialog__handle#dialog__warring").show();
            $(".dialog__handle#dialog__warring").find(".text--notify").empty();
            $(".dialog__handle#dialog__warring").find(".text--notify").append(errMulti); 
        }
    } catch (error) {
        console.log(error);
    }
       

           
   });
    
});

