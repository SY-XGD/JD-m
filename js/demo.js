window.addEventListener('load', function() {
    var slider = document.querySelector('.slider');
    var ul = slider.querySelector('ul');
    var ol = slider.querySelector('ol');
    var flag = false;
    // 获取slider的宽度
    var w = slider.offsetWidth;
    // 利用定时器自动轮播图片
    var index = 0;
    var timer = setInterval(function() {
        index++;
        haveTransition();
    }, 2000);
    // 等过渡完成后，再去判断监听过渡事件
    ul.addEventListener('transitionend', function() {
        if (index >= 3) {
            index = 0;
            noTransition();
        } else if (index < 0) {
            index = 2;
            noTransition();
        }
        // 小圆点跟随变化效果
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    })

    // 手指拖动效果
    var startX = 0;
    var moveX = 0;

    // 手指触碰到
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        // 手指触摸到的时候,停止播放轮播图
        clearInterval(timer);
    })

    // 手指移动
    ul.addEventListener('touchmove', function(e) {
        // 计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子
        var translateX = -index * w + moveX;
        ul.style.transform = 'translateX(' + translateX + 'px)';
        // 手指滑动的时候，不要过渡效果
        ul.style.transition = 'none';
        flag = true;
    })

    // 手指离开
    ul.addEventListener('touchend', function(e) {
        if (flag) {
            // 如果滑动距离的绝对值大于50px，则播放上/下一张图片
            if (Math.abs(moveX) > 50) {
                // 如果左滑，移动距离为正，播放上一张
                if (moveX > 0) {
                    index--;
                } else if (moveX < 0) {
                    // 如果右滑，移动距离为负，播放下一张
                    index++;
                }
                haveTransition();
            } else {
                // 如果滑动距离小于50px，回弹
                haveTransition();
            }
            // 手指离开开启定时器
            clearInterval(timer);
            timer = setInterval(function() {
                index++;
                haveTransition();
            }, 2000);
        }
    })

    // 回到顶部
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    var header = document.querySelector('.app');
    var search_wrap = document.querySelector('.search-wrap');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }

        // 头部隐藏和显示效果
        // 搜索栏变色效果
        if (window.pageYOffset > 0) {
            header.style.display = 'none';
            search_wrap.classList.add('bg');
        } else {
            header.style.display = 'block';
            search_wrap.classList.remove('bg');
        }
    })

    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    })

    // 头部模块点击关闭
    var close_btn = document.querySelector('.close-btn');
    close_btn.addEventListener('click', function() {
        app.style.display = 'none';
    })

    // 封装一个有过渡效果的移动
    function haveTransition() {
        // 移动的距离
        var translateX = -index * w;
        // 过渡动画效果
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translateX + 'px)';
    }

    // 封装一个无过渡效果的移动
    function noTransition() {
        // 移动的距离
        var translateX = -index * w;
        // 过渡动画效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translateX + 'px)';
    }
})