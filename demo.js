var ppt = {
    len: $('.page').length,
    wrap: $('.wrapper'),
    li: $('.point li'),
    pageindex: $('.page').index(),
    nowIndex: 0,
    lastIndex: undefined,
    timer: null,
    page: $('.page'),
    key: true,
    // 初始函数，生成按钮
    init: function () {
        if (this.len > 1) {
            this.createDom(this.len);
            this.bindEvent();
            this.movePage();
        }
    },
    // 按照页面数动态生成按钮
    createDom: function (len) {
        // 生成小圆钮
        var pointstr = '';
        for (var i = 0; i < len; i++) {
            if (i == 0) {
                pointstr += '<li class="active"></li>';
            } else {
                pointstr += '<li></li>';
            }
        }
        pointstr = '<div class="point"><ul>' + pointstr + '</ul></div>';
        // 生成左右键
        var btnstr = '';
        btnstr = '<div class="btn">\
                <img src="images/left-btn.png" alt="left" class="left">\
                <img src="images/right-btn.png" alt="right" class="right">\
                </div>';
        this.wrap.append(pointstr).append(btnstr);
    },
    // 点击事件
    bindEvent: function () {
        var self = this;
        $('.left').add($('.right')).add($('li')).on('click', function () {
            if ($(this).attr('class') == 'left') {
                // self.getIndex('left');
                self.tool('left')
            } else if ($(this).attr('class') == 'right') {
                // self.getIndex('right');
                self.tool('right')
            } else {
                // self.getIndex($(this).index());
                self.tool($(this).index())
            }
            // self.changePoint(self.nowIndex);
            // self.page.eq(self.lastIndex).trigger('leave');
            // self.page.eq(self.nowIndex).delay(200).trigger('come');
        });
        // 页面淡入淡出，图片伸缩
        this.page.on('leave', function () {
            $(this).fadeOut(100).find($('img')).animate({
                width: '0%'
            });
        });
        this.page.on('come', function () {
            $(this).fadeIn(100).find($('img')).delay(200).animate({
                width: '30%'
            }, 300, 'linear', function () {
                self.key = true;
                self.movePage();
            });
        });
    },
    tool: function (str) {
        var self = this;
        if (self.key) {
            self.getIndex(str);
            if (this.nowIndex !== this.lastIndex) {
                self.changePoint(self.nowIndex);
                self.page.eq(self.lastIndex).trigger('leave');
                self.page.eq(self.nowIndex).delay(200).trigger('come');
                self.key = false;
            }
        }
    },
    // 改变索引值
    getIndex: function (dir) {
        this.lastIndex = this.nowIndex;
        if (dir == 'left') {
            this.nowIndex = this.nowIndex == 0 ? this.len - 1 : this.nowIndex - 1;
        } else if (dir == 'right') {
            this.nowIndex = this.nowIndex == this.len - 1 ? 0 : this.nowIndex + 1;
        } else {
            this.nowIndex = dir;
        }
    },
    // 改变原点
    changePoint: function (index) {
        $('.active').removeClass('active');
        $('li').eq(index).addClass('active');
    },
    // 自动轮播
    movePage: function () {
        var self = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            self.tool('right');
        }, 3000);
    },
}
ppt.init();