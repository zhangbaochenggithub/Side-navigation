
//默认导航图标处理
function vl_default() {
    $(".vl_t_nav li").removeClass("vl_t_now");
    $(".vl_icon").each(function (i) {
        if (i % 2 == 0) {
            $(this).show();
        } else {
            $(this).hide();
        }
    })
}
//导航重置数组
function navList() {
    var nav_list = [];
    if (JSON.parse(sessionStorage.getItem("navList")) != null) {
        // debugger
        var nav_list = JSON.parse(sessionStorage.getItem("navList"));
    } else {
        // debugger
        for (var i = 0; i < 7; i++) {
            var obj = {
                vl_li_now: false, //一级高亮
                vl_li_img0: true, //一级默认图标
                vl_li_img1: false, //一级高亮图标
                vl_li_arrow: false, //一级箭头
                vl_t_nav: false, //二级模块
                vl_t_nav_li: '-1', //二级高亮
                vl_s_nav_list:[]//三级模块
            };
            for(var j=0; j<8; j++){
                var third_list_obj ={
                    vl_s_arrow: "-1", //二级箭头
                    vl_s_nav: false, //三级模块
                    vl_s_nav_li: '-1' //三级高亮
                }
                obj.vl_s_nav_list.push(third_list_obj);
            }
            nav_list.push(obj);
        }
        nav_list[0].vl_li_arrow = true;
        nav_list[0].vl_li_img0 = false;
        nav_list[0].vl_li_img1 = true; 
        nav_list[0].vl_li_now = true; 
        nav_list[0].vl_t_nav = true;
        nav_list[0].vl_t_nav_li = "0";
        sessionStorage.setItem("navList", JSON.stringify(nav_list));
        sessionStorage.setItem("navToggle", true);
    }
    console.log(nav_list)
    //导航重置样式
    var navList_N = JSON.parse(sessionStorage.getItem("navList"));
    for (var i = 0; i < navList_N.length; i++) {
        // var second_li = $(".vl_li_").eq(i).siblings(".vl_t_nav").find(".li_second");
        var second_li = $(".vl_li_").eq(i).siblings(".vl_t_nav");
        //一级箭头
        navList_N[i].vl_li_arrow ? $(".vl_li_").eq(i).find(".vl_li_arrow").addClass("up") : $(".vl_li_").eq(i).find(".vl_li_arrow").removeClass("up");
        //一级默认图标
        navList_N[i].vl_li_img0 ? $(".vl_li_").eq(i).find("img").eq(0).show() : $(".vl_li_").eq(i).find("img").eq(0).hide();
        //一级高亮图标
        navList_N[i].vl_li_img1 ? $(".vl_li_").eq(i).find("img").eq(1).show() : $(".vl_li_").eq(i).find("img").eq(1).hide();
        //一级高亮
        navList_N[i].vl_li_now ? $(".vl_li_").eq(i).addClass("vl_li_now") : $(".vl_li_").eq(i).removeClass("vl_li_now");
        //二级模块
        navList_N[i].vl_t_nav ? $(".vl_li_").eq(i).siblings(".vl_t_nav").css("display", "block") : $(".vl_li_").eq(i).siblings(".vl_t_nav").css("display", "none");
        //二级高两处
        navList_N[i].vl_t_nav_li > -1 ? $(".vl_li_").eq(i).siblings(".vl_t_nav").children().eq(navList_N[i].vl_t_nav_li).addClass("vl_t_now") : $(".vl_li_").eq(i).siblings(".vl_t_nav").children().eq(navList_N[i].vl_t_nav_li).removeClass("vl_t_now");
        for(var j=0; j < navList_N[i].vl_s_nav_list.length; j++){
            //二级箭头
            navList_N[i].vl_s_nav_list[j].vl_s_arrow >-1 ? second_li.children().eq(j).prev(".li_second").find(".vl_s_arrow").addClass("up"):second_li.children().eq(j-1).find(".vl_s_arrow").removeClass("up");
            //三级模块
            navList_N[i].vl_s_nav_list[j].vl_s_nav ? second_li.children().eq(j).css("display", "block") : '';
            //三级高亮
            navList_N[i].vl_s_nav_list[j].vl_s_nav_li > -1 ?second_li.children().eq(j).find(".li_third").eq(navList_N[i].vl_s_nav_list[j].vl_s_nav_li).addClass("vl_s_now"):
            second_li.children().eq(j).find(".li_third").eq(navList_N[i].vl_s_nav_list[j].vl_s_nav_li).removeClass("vl_s_now");
        }
        // //二级箭头
        // navList_N[i].vl_s_nav_list[].vl_s_arrow ? $(".vl_li_").eq(i).siblings(".vl_t_nav").find(".li_second").find(".vl_s_arrow").addClass("up") :
        //     $(".vl_li_").eq(i).siblings(".vl_t_nav").find(".li_second").find(".vl_s_arrow").removeClass("up");
        // //三级模块
        // navList_N[i].vl_s_nav ? $(".vl_li_").eq(i).siblings(".vl_t_nav").find(".li_second").next(".vl_s_nav").css("display", "block") :
        //     $(".vl_li_").eq(i).siblings(".vl_t_nav").find(".li_second").next(".vl_s_nav").css("display", "none");
        // //三级高亮
        // navList_N[i].vl_s_nav_li > -1 ? $(".vl_li_").eq(i).siblings(".vl_t_nav").find(".li_second").eq(navList_N[i].vl_t_nav_li).next(".vl_s_nav").find(".li_third").eq(navList_N[i].vl_s_nav_li).addClass("vl_s_now") :
        //     $(".vl_li_").eq(i).siblings(".vl_t_nav").find(".li_second").eq(navList_N[i].vl_t_nav_li).next(".vl_s_nav").find(".li_third").eq(navList_N[i].vl_s_nav_li).removeClass("vl_s_now");
    }

}
// 一级导航操作
function Stair(e, index) {
    e.children(".vl_li_").unbind().on("click", function () {
        var navList = JSON.parse(sessionStorage.getItem("navList"));
        var vl_t_nav = $(this).siblings(".vl_t_nav").length;
        if (vl_t_nav <= 0) {
            //所有改为默认
            vl_default();
            $(".vl_li_").removeClass("vl_li_now");
            $(".li_third").removeClass("vl_s_now");
            //当前增加高亮
            $(this).addClass("vl_li_now").find(".vl_icon").eq(0).hide().next().show();
            for (var i = 0; i < navList.length; i++) {
                if (i == index) {
                    navList[i].vl_li_img0 = false; //一级导航默认图标
                    navList[i].vl_li_img1 = true; //一级导航高亮图标
                    navList[i].vl_li_now = true; //一级导航高亮
                    navList[i].vl_t_nav_li = '-1'; //二级子导航删除
                } else {
                    navList[i].vl_li_img0 = true; //一级导航默认图标
                    navList[i].vl_li_img1 = false; //一级导航高亮图标
                    navList[i].vl_li_now = false; //一级导航高亮
                    navList[i].vl_t_nav_li = '-1'; //二级删除高亮
                    //三级删除高亮
                    for(var j=0; j<navList[i].vl_s_nav_list.length; j++){
                        navList[i].vl_s_nav_list[j].vl_s_nav_li = "-1";
                        navList[i].vl_s_nav_list[j].vl_s_arrow = "-1";
                    }
                }
            }
            console.log("111")
            console.log(navList)
        } else {
            if ($(this).find(".vl_li_arrow").hasClass("up")) {
                $(this).find(".vl_li_arrow").removeClass("up")
                $(this).siblings(".vl_t_nav").slideUp(500);
                if (index < navList.length) {
                    navList[index].vl_t_nav = false; //二级导航模块
                    navList[index].vl_li_arrow = false; //一级导航箭头
                }
            } else {
                $(this).find(".vl_li_arrow").addClass("up")
                $(this).siblings(".vl_t_nav").slideDown(500);
                if (index < navList.length) {
                    navList[index].vl_t_nav = true; //二级导航模块
                    navList[index].vl_li_arrow = true; //一级导航箭头
                }
            }
        }
        sessionStorage.setItem("navList", JSON.stringify(navList));
    })
}

//二级导航操作
function Second(e, index) {
    e.children(".vl_t_nav").children().each(function (second_index) {
        //三级导航
        Third($(this), second_index, index)
        if($(this).hasClass("li_second")){
            $(this).on("click", function () {
                var navList_ = JSON.parse(sessionStorage.getItem("navList"));
                var vlTNav = $(this).parent(".vl_t_nav");
                var vl_s_nav = $(this).next(".vl_s_nav").length;
                if (vl_s_nav <= 0) {
                    vl_default();
                    $(".vl_li_").removeClass("vl_li_now");
                    $(".li_third").removeClass("vl_s_now");
                    $(this).parent("ul").css("display", "block");
                    vlTNav.parents(".vl_li").find(".vl_li_arrow").addClass("up");
                    vlTNav.prev(".vl_li_").addClass("vl_li_now");
                    vlTNav.prev(".vl_li_").find(".vl_icon").eq(0).hide();
                    vlTNav.prev(".vl_li_").find(".vl_icon").eq(1).show();
                    $(this).addClass("vl_t_now").siblings().removeClass("vl_t_now");
                    navList_[index].vl_t_nav_li = second_index; //二级导航高亮处
                    for (var i = 0; i < navList_.length; i++) {
                        if (i == index) {
                            navList_[i].vl_li_img0 = false; //一级导航默认图标
                            navList_[i].vl_li_img1 = true; //一级导航高亮图标
                            navList_[i].vl_li_now = true; //一级导航高亮
                            navList_[i].vl_t_nav = true; //二级导航模块
                            navList_[i].vl_li_arrow = true //一级导航箭头
                        } else {
                            navList_[i].vl_li_img0 = true; //一级导航默认图标
                            navList_[i].vl_li_img1 = false; //一级导航高亮图标
                            navList_[i].vl_li_now = false; //一级导航高亮
                            navList_[i].vl_t_nav_li = '-1'; //二级删除高亮
                        }
                        //三级删除高亮
                        for(var j=0; j<navList_[i].vl_s_nav_list.length; j++){
                            navList_[i].vl_s_nav_list[j].vl_s_nav_li = "-1";
                            navList_[i].vl_s_nav_list[j].vl_s_arrow = "-1";
                        }
                    }
                    console.log("222")
                    console.log(navList_)
                } else {
                    if ($(this).find(".vl_s_arrow").hasClass("up")) {
                        $(this).find(".vl_s_arrow").removeClass("up")
                        $(this).next(".vl_s_nav").slideUp(500);
                        if (index < navList_.length) {
                            navList_[index].vl_s_nav_list[second_index+1].vl_s_nav = false; //三级导航模块
                            navList_[index].vl_s_nav_list[second_index+1].vl_s_arrow = false; //二级导航箭头
                        }
                    } else {
                        $(this).find(".vl_s_arrow").addClass("up")
                        $(this).next(".vl_s_nav").slideDown(500);
                        if (index < navList.length) {
                            navList_[index].vl_s_nav_list[second_index+1].vl_s_nav = true; //三级导航模块
                            navList_[index].vl_s_nav_list[second_index+1].vl_s_arrow = true; //二级导航箭头
                        }
                    }
                }
                sessionStorage.setItem("navList", JSON.stringify(navList_));
            })
        }
    })
}
//三级导航
function Third(e, second_index, index) {
    var vl_s_nav = e.next(".vl_s_nav");
    e.next(".vl_s_nav").children().each(function (third_index) {
        var navList = JSON.parse(sessionStorage.getItem("navList"));
        var vl_s_nav = $(this).parent(".vl_s_nav");
        //这里有问题--------------------------------------------------------------------
        $(this).on("click", function () {
            vl_default();
            $(".vl_li_").removeClass("vl_li_now");
            $(this).closest(".vl_li").children(".vl_li_").addClass("vl_li_now");//一级高亮
            $(this).closest(".vl_li").children(".vl_li_").find(".vl_icon").eq(0).hide();//一级图标
            $(this).closest(".vl_li").children(".vl_li_").find(".vl_icon").eq(1).show();//一级图标
            $(this).closest(".vl_s_nav").prev(".li_second").addClass("vl_t_now");//二级高亮
            $((".li_third")).removeClass("vl_s_now");//三级高亮删除
            $(this).addClass("vl_s_now");//三级高亮
            for (var i = 0; i < navList.length; i++) {
                if (i == index) {
                    navList[i].vl_li_now = true;
                    navList[i].vl_li_img0 = false;
                    navList[i].vl_li_img1 = true;
                    navList[i].vl_li_arrow = true;
                    navList[i].vl_t_nav = true;
                    navList[i].vl_t_nav_li = second_index;
                    //三级删除高亮
                    for(var j=0; j<navList[i].vl_s_nav_list.length; j++){
                        navList[i].vl_s_nav_list[j].vl_s_nav_li = "-1";
                        navList[i].vl_s_nav_list[j].vl_s_arrow = "-1";
                        navList[i].vl_s_nav_list[j].vl_s_nav = false;
                    }
                    navList[i].vl_s_nav_list[second_index+1].vl_s_arrow = second_index+1;
                    navList[i].vl_s_nav_list[second_index+1].vl_s_nav = true;
                    navList[i].vl_s_nav_list[second_index+1].vl_s_nav_li = third_index;
                } else {
                    navList[i].vl_li_now = false;//一级高亮
                    navList[i].vl_li_img0 = true;//一级默认图标
                    navList[i].vl_li_img1 = false;//一级高亮图标
                    navList[i].vl_t_nav_li = '-1';//二级高亮处
                }
            }
            sessionStorage.setItem("navList", JSON.stringify(navList));
            console.log("333")
            console.log(navList)
        })
    })
}
//导航收起后的操作
function navToggle() {
    $(".vl_li_").each(function (index) {
        var NavList = JSON.parse(sessionStorage.getItem("navList"));
        if ($(this).next(".vl_t_nav").length <= 0) {
            $(this).on("click", function () {
                vl_default();
                $(".vl_li_").removeClass("vl_li_now");
                $(this).addClass("vl_li_now");
                $(this).children("img").eq(0).hide();
                $(this).children("img").eq(1).show();
                for (var i = 0; i < NavList.length; i++) {
                    if (i == index) {
                        NavList[i].vl_li_img0 = false; //一级导航默认图标
                        NavList[i].vl_li_img1 = true; //一级导航高亮图标
                        NavList[i].vl_li_now = true; //一级导航高亮
                        NavList[i].vl_t_nav_li = '-1'; //二级导航高亮
                    } else {
                        NavList[i].vl_li_img0 = true; //一级导航默认图标
                        NavList[i].vl_li_img1 = false; //一级导航高亮图标
                        NavList[i].vl_li_now = false; //一级导航高亮
                        NavList[i].vl_t_nav_li = '-1'; //二级导航高亮
                    }
                }
                sessionStorage.setItem("navList", JSON.stringify(NavList));
            })
        } else {
            $(this).unbind("click")
        }
    })
}

// 会员侧导航
$(function () {
    //导航重定
    navList();
    //展开重定
    if (sessionStorage.getItem("navToggle") == null) {
        $(".vl_nav_div ").removeClass("vl_nav_absolute");
    } else {
        if (sessionStorage.getItem("navToggle") == 'true') {
            $(".vl_nav_div ").removeClass("vl_nav_absolute");
        } else {
            navToggle();
            $(".vl_li").find('div').toggleClass("vl_nav_close_");//去掉导航文字部分
            $(".vl_nav_div ").toggleClass("vl_nav_absolute");//一级导航样式切换
            $(".vl_t_nav").toggleClass("vl_t_nav_absolute");//二级导航样式切换
            $(".content_").toggleClass("content_add")//内容区切换大小
        }
    }
    //侧导航操作
    $(".vl_li").each(function (index) {
        //一级导航操作
        Stair($(this), index);
        //二级导航操作
        Second($(this), index);
    })
    //侧导航收缩展开
    $(".vl_nav_toggle").on("click", function () {
        if ($(".vl_nav_div ").hasClass("vl_nav_absolute")) {
            $(".vl_li").each(function (index) {
                //一级导航操作
                Stair($(this), index);
            })
            sessionStorage.setItem("navToggle", true);
        } else {
            sessionStorage.setItem("navToggle", false);
            navToggle();
        }
        $(".vl_li").find('div').toggleClass("vl_nav_close_");//去掉导航文字部分
        $(".vl_nav_div ").toggleClass("vl_nav_absolute");//一级导航样式切换
        $(".vl_t_nav").toggleClass("vl_t_nav_absolute");//二级导航样式切换
        $(".content_").toggleClass("content_add")//内容区切换大小
    })

})