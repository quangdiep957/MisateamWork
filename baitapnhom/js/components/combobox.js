/*  
*  xử lý sự kiện combo-box
*   Ngày 31/07/2022
*   Author: Bùi Quang Điệp
*/
$(document).ready(
    function () {

        //Hiển thị option combo-box khi mở
        $(".combobox__control").click(function () {
            try {

                $(this).parent().children('.combobox__option').show();

            } catch (error) {
                console.log(error);
            }
        });
        $('.combobox__option').on("click", '.combobox__option--item', function () {
            try {
                /*Luôn luôn xóa lựa chọn trước khi thực hiện chọn mới một thành phần
                    * Xóa màu active
                    * Xóa icon tick
                */
             var parent = $(this).parent();
                parent.children('.combobox__option--item').removeClass('combobox__option--active');
                console.log( parent.children().children());
                parent.children().children('.combobox__option--item-icon').remove();
                /* Đánh dấu lựa chọn mà người dùng click
                   * Đổi background
                   * Thêm icon tick
               */
                $(this).addClass('combobox__option--active');
                var icon = `<span class="combobox__option--item-icon"><i class="fa-solid fa-check"></i></span>`;
                $(this).children('.combobox__option--item-text').before(icon);
                // Lấy trường input để thêm dữ liệu
                var input = $(this).parent().parent().children().children("input");
                //console.log(input);
                // Xóa dữ liệu input trước khi thêm mới
                input.empty();
                // thêm Dữ vào vào ô input
                value = $(this).children('.combobox__option--item-text').text();
                input.val(value);
                // Sau khi click chọn 1 thành phần thì đóng form combobox-option 
                $(this).parent().hide();
            } catch (error) {
                console.log(error);
            }
        })

/*  
*  xử lý sự kiện combo-box table trong dialog
*   Ngày 07/08/2022
*   Author: Bùi Quang Điệp
*/

        $(".combobox__option--table table tbody tr").click(function(){
        var combobox__option=  $(this).parents(".combobox__option");
            // lấy thông tin dòng được click
         var  Id =  $(this).children(".idValue").text();
         var  Name =  $(this).children(".NameValue").text();
         // gán kết quả cho input tương ứng
        combobox__option.siblings().children("input").val(Id);
        $(this).parents(".m-row").find("input[disabled]").val(Name);
         // ẩn combobox option
        combobox__option.hide();
        })
    });
