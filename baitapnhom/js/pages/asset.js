$(document).ready(function () {
    active ="";
    
    // $('[data-toggle]').hover(function(){
    //    var item = $(this);
    //     var title = item.attr('data-toggle');

    //     item.parent().after(`<div class="tooltip">${title}</div>`);
    //     item.parent().parent().children('.tooltip').show();

    //     setTimeout(function(){
    //         try {
    //             item.parent().parent().children('.tooltip').remove();

    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }, 500);
    // });

/*   Xử lý đóng mở navbar
*   Ngày 01/08/2022
*   Author: Bùi Quang Điệp
*/ 
    $(window).resize(function(){
        // console.log($(this).width());
        if ($(this).width() < 1300){
            active = true;
            setWidth();
            
        }
        else{
            active = false;
            setWidth();
        }
    })
   
   
    $('#btn-zoomout').click(function(){
        active = true;
        setWidth();
    });
 
    
 
});
function setWidth() {
    try {
        // Kiểm tra nếu width navbar bằng 226
        /*
            * co nhỏ lại
            * ẩn icon
            * ẩn text
        */
        if (active == true) {
            $('.navbar-header__text').hide();
            $('.navbar-body__text').hide();
            $('.navbar-body__logo.icon-down').hide();
            $(".navbar").css("width", "66px");
            // $("#btn-zoomout .icon").removeClass('icon-zoomout');
            // $("#btn-zoomout .icon").addClass('icon-zoom');
            $('.page-body-wrapper').css("width", "calc(100% - 66px)");
            $(".navbar-body__item").addClass("setpadding");
            $('.navbar-size').hide();
        }
        else {
           
            $(".navbar").css("width", "226px");
        
                $('.navbar-header__text').show();
                $('.navbar-body__text').show();
                $('.navbar-body__logo.icon-down').show();
                $(".navbar-body__item").removeClass("setpadding");
            // $("#btn-zoomout .icon").removeClass('icon-zoom');
            // $("#btn-zoomout .icon").addClass('icon-zoomout');
            $('.page-body-wrapper').css("width", "calc(100% - 226px)");

            $('.navbar-size').show();
        }

    } catch (error) {
        console.log(error);

    }
}

