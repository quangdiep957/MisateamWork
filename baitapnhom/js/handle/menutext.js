$(document).ready(function(){
/*  
*   Xử lý sự kiện cick chuột phải hiển thị menu
*   Ngày 02/08/2022
*   Author: Bùi Quang Điệp
*/  
    try {
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

         })
        
    } catch (error) {
        console.log(error)
        
    }
})
