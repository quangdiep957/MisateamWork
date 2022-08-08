/*  
*   Xử lý dialog thêm , sửa xóa tài sản
*   Ngày 31/07/2022
*   Author: Bùi Quang Điệp
*/  
var Id = "";
var search =""; 
$(document).ready(
    function(){

        LoadData();
        setDate();
        handle = "edit";
        // Hiển thị dialog khi ấn thêm mới
        $("#btn--add").click(function(){
            try {
               handle ="add";
               $("input#txtAssetCode").val("MTS0001");
               SetInputDefault();
                eventHandle();

            } catch (error) {
                console.log(error);
            }
        });
        /*   Mở sửa tài sản
        *   Ngày 01/08/2022
        *   Author: Bùi Quang Điệp
        */
       $('tbody').on("dblclick",'tr',function(){

        try {
            handle ="edit";
            Id = $(this).data("data").EmployeeId;
            // set giá trị mặc định cho các ô input
            $("input#txtAssetCode").val("");
            SetInputDefault();
            // gọi hàm xử lý và show dialog
            eventHandle();
        } catch (error) {
            console.log(error);
        }
       });   
        $("#btn--close").click(function(){
            try {
                $('#dialog__handle').hide();
                
            } catch (error) {
                console.log(error);
            }
        });

        // bắt sự kiện ấn tab
        $('body').on('keydown', "#btn-cancel", function(e) {
            var keyCode = e.keyCode || e.which; 
debugger
            if (keyCode == 9) {
                e.stopPropagation();
                e.preventDefault();

                $('#txtAssetCode').focus();
            }
        });

        // bắt sự kiện thay đổi trong ô tìm kiếm sẽ load ra dữ liệu tìm kiếm
        $("#txtsearch").keydown(function(){
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13')    
            {
                search= $(this).val();
                if(search!="")
                {
                    handle ="search";
                }
                else{
                    handle ="";
                }
               LoadData();
            }
               
            });
/*  
*   Xử lý dialog waring
*   Ngày 01/08/2022
*   Author: Bùi Quang Điệp
*/         
       $('#btn-cancel').click(function(){
            $('#dialog__notify').show();
       });

       
/*   validate dữ liệu
*   Ngày 02/08/2022
 *   Author: Bùi Quang Điệp
*/

    $('input[required]').blur(function(){
        // Kiểm tra xem các ô input đã có dữ liệu hay chưa
        if ($(this).val() == "" || $(this).val()== null)
        {
           // console.log( $(this).siblings('.text__error').hasClass('text__error'));
           // Thêm thông báo cho người dùng
           // set border thành màu đỏ
            htmlTextError = `<p class="text__error">${$(this).attr("name")} không được để trống</p>`;
            $(this).addClass('border-red');
            if($(this).siblings('.text__error').hasClass('text__error')== false){
                $(this).after(htmlTextError);
            }
            
        }
        else{
            // nếu ô input đã có dữ liệu thì ẩn border cảnh báo và message
            $(this).removeClass('border-red');
            $(this).siblings('.text__error').remove();
        }
    })
    $('input[number]').keypress(function(){
       // kiểm tra nếu khi người dùng ấn vào phím thì xóa dữ liệu mặc định 
        if($(this).val()==0){
            $(this).val("");
        }
        
    //    else{
    //     format= $(this).val().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,'');
    //     $(this).val(format);
    //    }
    } )
    // hàm xử lý check kí tự có phải là số hay không
    $('input[number]').blur(function(){
        var regExp = /[a-zA-Z]/g;
        if(regExp.test($(this).val()))
        {
            // nếu có số thì hiển thị thông báo cho người dùng và xóa dữ liệu đó
            htmlTextError = `<p class="text__error">${$(this).attr("name")} chỉ được nhập số</p>`;
            $(this).addClass('border-red');
            if($(this).siblings('.text__error').hasClass('text__error')== false){
                $(this).after(htmlTextError);
            }
            $(this).val("");
        }
    })

    

        // click hủy thì đóng form
       $('.dialog__notify .btn-cancel').click(Cancel);
       $('.btn-confirm').click(Confirm);
    // bắt sự kiện khi nhấn lưu
    $('.btn-save').click(function(){
        validation();
    })
    $("#dialog__confirm .btn-save").click(function(){
        AssetName = $('#txtNameAsset').val();
        AssetCode = $('#txtAssetCode').val();
      //  console.log(AssetCode);
        IdPartsUsed = $('txtIdPartsUsed').val();
        date = new Date();
        date.setDate(date. getDate() - 7);
       var el ={
            "EmployeeCode":AssetCode,
            "EmployeeName": AssetName,
            "Gender"      : 1,
            "DateOfBirth" : date,
            "PhoneNumber" : "0911067145",
            "Email"       :"quangdiep123@gmail.com",
            "DepartmentId": "4e272fc4-7875-78d6-7d32-6a1673ffca7c"

        }
       
            eventHandle(el);
    });
    /*  
    *   Xử lý call Api lấy dữu liệu
    *   Ngày 07/08/2022
    *   Author: Bùi Quang Điệp
    */  

});
// loadData
function LoadData(){
    $('table tbody').empty();
    $(".m-loading").show();
    // Call api tìm kiếm
    if (handle=="search"){
        $.ajax({
            type: "GET",
            url: `https://amis.manhnv.net/api/v1/Employees/filter?pageSize=10&pageNumber=1&employeeFilter=${search}`,
            success: function (response) {
                
                 console.log(response);
                 if(response==undefined)
                 {
                // alert("Không có dữ liệu");
                $(".table__nodata").show();
                 $('.m-loading').hide();

                 }
                 else{
                    $(".table__nodata").hide();
                    LoadDataOption(response.Data);
                 }

            },
            error:function(response){
             
                $('.m-loading').hide();
                console.log(response);
            }
        });
    }
    else{
            $.ajax({
                type: "GET",
                url: "https://amis.manhnv.net/api/v1/Employees",
                success: function (response) {
                    LoadDataOption(response);
                },
                error:function(response){
                    console.log(response);
                    $(".m-loading").hide();
                    $(".table__nodata").show();
                }
            });
    }
}

function Cancel(){
    $(this).parent().parent().parent().hide();

}
function Confirm(){
   $('.dialog__handle').hide();
   $('.dialog__handle input').val("");
   $('.dialog__handle .text__error').remove();
   $('.dialog__handle .input').removeClass("border-red");

}
function validation(){
        try {
            var isValid = true;
            let errorMsgs = [];
            // Lấy tất cả các input bắt buộc nhập:
        
            let inputRequireds = $('input[required]');
            for (const input of inputRequireds) {
                const value = $(input).val();
                const name = $(input).attr("name");
                var atrophy = $('#txtAtrophy').val();
                var yearuse = $('#yearuse').val();
                var yeardepreciation = $('#txtdepreciation').val();
              
                var price = $('#txtPrice').val();
                // Kiểm tra nếu value rỗng
                if (!value) {
                    isValid = false;
                    console.log($(input).siblings('.text__error').hasClass('text__error'));
                    htmlTextError = `<p class="text__error">${$(input).attr("name")} không được để trống</p>`;
                   $(input).addClass('border-red');
                    if($(input).siblings('.text__error').hasClass('text__error')== false){
                       $(input).after(htmlTextError);
                    }
                    
                }

                 else {
                    $(input).removeClass("border-red");
                   $(input).siblings('.text__error').remove();
                }
            }
          //  console.log(($('input[required]').hasClass("border-red")));
            if(($('input[required]').hasClass("border-red"))== false){

                if (1 / yearuse != atrophy){
                    errorMsgs.push(`tỉ lệ hao mòn phải bằng phải bằng 1 / số năm sử dụng`);
                }
                if (atrophy / yeardepreciation > price){
                    errorMsgs.push(`Hao mòn năm phải lớn hơn nguyên giá`);
                }
                 // Kiểm tra nếu xem những input kiểu number có phải là số không
                 var number = $('input[number]');
                 for (const input_number of number) {
                     const value_number = $(input_number).val();
                     const name = $(input_number).attr("name");
                     if((/[a-zA-Z]/g).test(value_number)== true)
                     {
                         $(input_number).attr("title", "Chỉ được nhập kiểu số");
                         errorMsgs.push(`${name} Chỉ cho phép nhập số`);
                     }
                     else{
                     }
                    }
                   
                if (errorMsgs.length >0) {
                    console.log(  $(".dialog__handle#dialog__notify").find(".text--notify"));
                    // Hiển thị thông báo lỗi validate:
                    $(".dialog__handle#dialog__notify").show();
                    $(".dialog__handle#dialog__notify").find('.btn-cancel').remove();
                    $(".dialog__handle#dialog__notify").find('.btn-save').text("Đóng");
                    $(".dialog__handle#dialog__notify").find(".text--notify").empty();
                    for (const msg of errorMsgs) {
                        let msgHTML = `<div class="dialog__msg-item">
                                        ${msg}
                                    </div>`;
                            $(".dialog__handle#dialog__notify").find(".text--notify").append(msgHTML);
                    }
            
                }
                else{
                    $(".dialog__handle#dialog__confirm").show();

                }
           
            }   
        } catch (error) {
            console.log(error);
            
        }
}
function Close(a){
    console.log(a.parent().parent().parent('.dialog__handle'));
    a.parent().parent().parent('.dialog__handle').hide();
}
function eventHandle(res){
    try {
        // call api edit
        if (handle == 'edit'){
            $('#handle').empty();
            $('#handle').text("Sửa tài sản");
            $('#dialog__handle').show();
            $('input[tabindex=1001]').focus();
            $.ajax({
                type: "PUT",
                url: `https://amis.manhnv.net/api/v1/Employees/${Id}`,
                data: JSON.stringify(res),
                contentType:"application/json",
                dataType: "json",
                success: function (response) {
                     //tải lại data
                    LoadData();
                    var htmlToastBox =`<div class="toast__box">
                    <div class="toast__box--item">
                    <div class="toast__box--body"><div class ="toast__box--item-icon"><div class="icon icon-tick-white icon__size-11x2"></div></div></div>
                        <div class="toast__box--item-text">Sửa dữ liệu thành công</div>
                    </div>
                </div>`;
                  $("body").append(htmlToastBox);
                  setTimeout(() => {
                      $('.toast__box').remove();
                      
                  }, 2000);
                  $('.dialog__handle').hide();
                  $("#dialog__handle input").val("");
                },
                error : function(response){
                    console.log(response);
                }
            });

        }
        // call api add
        else if(handle == 'add')
        {
            $('#handle').empty();
            $('#handle').text("Thêm tài sản");
            $('#dialog__handle').show();
            $('input[tabindex=1001]').focus();
            $.ajax({
                type: "POST",
                url: "https://amis.manhnv.net/api/v1/Employees",
                data: JSON.stringify(res),
                contentType:"application/json",
                dataType: "json",
                success: function (response) {
                    //tải lại data
                    LoadData();
                      // alert("Thêm mới thành công");
                      var htmlToastBox =`<div class="toast__box">
                      <div class="toast__box--item">
                      <div class="toast__box--body"><div class ="toast__box--item-icon"><div class="icon icon-tick-white icon__size-11x2"></div></div></div>
                          <div class="toast__box--item-text">Lưu dữ liệu thành công</div>
                      </div>
                  </div>`;
                    $("body").append(htmlToastBox);
                    setTimeout(() => {
                        $('.toast__box').remove();
                        
                    }, 2000);
                    $('.dialog__handle').hide();
                    $("#dialog__handle input").val("");
                    },
                    error: function(response){
                        console.log(response);
                    }

            });
        }
      
   
    } catch (error) {
        console.log(error);
    }
}
function setDate(){
    var date =new Date();
    $("#purchasedate").val(FormatDate(date));
    $("#startday").val(FormatDate(date));
}
function FormatDate(date) {
    var d = new Date(date);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "/" + month + "/" + year;

    return date;
};
function NumberFormat(number){
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'vnd' }).format(number);
}
 
// hàm set giá trị mặc định cho input
function SetInputDefault(){
    date = new Date();
    $("#purchasedate").val(FormatDate(date));
    $("#startday").val(FormatDate(date));
    $("input[number]").val("0");
    $("#txtYearWatch").val("2022");
}
// Hàm Loaddata option
function LoadDataOption(response){
    console.log(response);
    DataEmployee = response;
    var price =20000000	;
    var accumulated = 894000;
    var price_rimaining = 19000100;
    var rank =0;
    var quantity = 1;
    var sum_price = 0;
    var sum_accumulated = 0;
    var sum_price_rimaining =0;
    var sum_quantity =0;
    if (DataEmployee){
                        for (const item of DataEmployee) {
                            var htmlTable =$(`<tr>
                            <td> <label class="checkbox"><input type="checkbox" ><span class="tick"></span></label></td>
                            <td class="text-align-center">${rank++}</td>
                            <td class="text-align-left" id ="IdAsset">${item.EmployeeCode}</td>
                            <td class="text-align-left" id ="nameAsset">Dell Inspiron 3467</td>
                            <td class="text-align-left">Máy vi tính xách tay</td>
                            <td class="text-align-left">Phòng Hành chính Kế toán</td>
                            <td class="text-align-right quantity">${quantity}</td>
                            <td class="text-align-right price">${NumberFormat(price)}</td>
                            <td class="text-align-right accumulated">${NumberFormat(accumulated)}</td>
                            <td class="text-align-right price-rimaining">${NumberFormat(price_rimaining)}</td>
                            <td class="row__icon"></td>
                        </tr>`)
                        htmlbottom =`<tr class="page__table">
                        <td class="text-align-left" colspan="6">
                            <div class="display-flex" style="font-size:11px;margin-left:17px">
                                <p class="page__table--text">Tổng số <span style="font-weight: bold;">200</span>
                                    bản ghi</p>
                                <div class="combobox__control combox--number">
                                    <input type="text" name="" id="" class="input combobox__input--number"
                                        value="20">
                                    <div class="combobox__icon--right icon icon-down1 icon__size-5"
                                        title="chọn để chọn các thành phần"></div>
                                </div>
                                <div class="page__table--number display-flex">
                                    <div class="page--number-item">
                                        <div class="icon icon-back icon__size-8"></div>
                                    </div>
                                    <div class="page--number-item number-active">1</div>
                                    <div class="page--number-item">2</div>
                                    <div class="page--number-item">...</div>
                                    <div class="page--number-item">10</div>
                                    <div class="page--number-item">
                                        <div class="icon icon-next icon__size-8"></div>
                                    </div>
                                </div>
                            </div>

                        </td>
                        <td class="text-align-right sum-quantity bold">${sum_quantity}</td>
                        <td class="text-align-right sum-price bold">${NumberFormat(sum_price)}</td>
                        <td class="text-align-right sum-accumulated bold">${NumberFormat(sum_accumulated)}</td>
                        <td class="text-align-right sum-price-rimaining bold">${NumberFormat(sum_price_rimaining)}</td>
                        <td></td>
                    </tr>`;
                        htmlTable.data("data",item);
                        sum_price = sum_price + price;
                        sum_accumulated =  sum_accumulated + accumulated;
                        sum_price_rimaining = sum_price_rimaining + price_rimaining;
                        sum_quantity = sum_quantity + quantity;
                        $(".table tbody").append(htmlTable);
                        /*  
                        *   Xử lý tính toán trong table
                        *   Ngày 01/08/2022
                        *   Author: Bùi Quang Điệp
                        */
                        var row = $('tbody tr');
                        //console.log(row.length);
                    
                        // for (var item = 0; item < row.length; item++) {
                        //     quantity = quantity + Number($(row[item]).children(".quantity").text());
                        //     price = price + Number($(row[item]).children(".price").text().replace(/\./g,''));
                        //     accumulated = accumulated  + Number($(row[item]).children(".accumulated").text().replace(/\./g,''));
                        //     price_rimaining = price_rimaining + Number($(row[item]).children(".price-rimaining").text().replace(/\./g,''));
                        // }
                    
                        var res = $('.page__table');
                    // console.log(price_rimaining);
                    
                            $(res).children(".sum-quantity").text(sum_quantity);
                            $(res).children(".sum-price").text(NumberFormat(sum_price));
                            $(res).children(".sum-accumulated").text(NumberFormat(sum_accumulated));
                            $(res).children(".sum-price-rimaining").text( NumberFormat(sum_price_rimaining));
                        //   console.log($(res).children(".sum-quantity"));
                    
                }
                $(".table tbody").append(htmlbottom);

    }
    // else{
    //     // hiển thị thông báo không có data
    //     $(".table__nodata").show();
    // }

    $(".m-loading").hide();
    /*  
    *   Xử lý sự kiện cick chuột phải hiển thị menu
    *   Ngày 02/08/2022
    *   Author: Bùi Quang Điệp
    */  
    $("tbody tr").on("contextmenu","td",function(e){ 
        var menu = `<div class="menu">
        <div class="menu__item">
            <div class="menu__item--icon icon icon-add-menu icon__size-18"></div>
            <div class="menu__item--text">Thêm</div>
        </div>
        <div class="menu__item">
            <div class="menu__item--icon icon icon-edit icon__size-18" style="margin:0"></div>
            <div class="menu__item--text">Sửa</div>
        </div>
        <div class="menu__item">
            <div class="menu__item--icon icon icon-remove icon__size-18"></div>
            <div class="menu__item--text">Xóa</div>
        </div>
        <div class="menu__item">
            <div class="menu__item--icon icon icon-replication icon__size-18"></div>
            <div class="menu__item--text">Nhân bản</div>
        </div>
    </div>`
    e.preventDefault();
    $('.menu').remove();
    $(this).append(menu);

    $(document).click(function(){
        $('.menu').remove();
    })

    });
}