$(document).ready(function () {
   $('[calender]').datepicker(
            {
              showButtonPanel: true,    // option hiển thị nút "Today", "Done"
              dateFormat: 'dd/mm/yy'    // option Định dạng format ngày tháng; d: Day Ngày; m: Month tháng; y: Year năm
            }

    )

    // Tăng giảm số lượng input
    $('.header-group__icon--item.icon-up').click(SumNumber);
     $('.header-group__icon--item.icon-down2').click(MinusNumber);
/*   chọn menu
*   Ngày 02/08/2022
 *   Author: Bùi Quang Điệp
*/
var  isclass = null;
var handle = "active";
  $('.navbar-body .navbar-body__item').click(function(){
    handle = "active";
    ActiveNavBar($(this));
  })
  $('.navbar-body .navbar-body__item').hover(function(){
    handle = "hover";
    ActiveNavBar($(this));
  })
  function ActiveNavBar(res){
    if(handle == "active"){
      try {
        $(".navbar-body__item").removeClass("active-navbar-body__item");
        $(".navbar-body__item").children('.iconleft').removeClass(`${isclass}`+"__active");
       // $(".navbar-body__item").children('.iconleft').addClass(className);
       // Lấy ra tên class ban đầu khi chưa active
       var className = (res.find('.icon').attr('class').split(' ')[2]);
  
      //  console.log(className);
            res.addClass("active-navbar-body__item");
            // thêm class active icon 
            res.children('.iconleft').addClass(`${className}`+"__active");
            isclass = className;
        
      } catch (error) {
        console.log(error);
      }

    }
    // else{
    //   try {
  
    //     $(".navbar-body__item").removeClass("hover-navbar-body__item");
    //     $(".navbar-body__item").children('.iconleft').removeClass(`${isclass}`+"__active");
    //    // $(".navbar-body__item").children('.iconleft').addClass(className);
    //    // Lấy ra tên class ban đầu khi chưa active
    //    var className = ($(this).find('.icon').attr('class').split(' ')[2]);
  
    //   //  console.log(className);
    //         $(this).addClass("hover-navbar-body__item");
    //         // thêm class active icon 
    //         $(this).children('.iconleft').addClass(`${className}`+"__active");
        
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  }
});


function SumNumber(){
  
    var number =  $(this).parent().siblings().val();
    number++;
    $(this).parent().siblings().val(number);
}
function MinusNumber(){
  var number =  $(this).parent().siblings().val();
  if(number >0){
   number--;
  }
$(this).parent().siblings().val(number);
}
// $('input[number]').keypress(function (e) { 
//     console.log(e.keyCode);
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if (keycode == '43') {
//     SumNumber($(this));
//     }
//     if (keycode == '45') {
//     MinusNumber(input);
//       }
//     });




