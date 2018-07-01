var ppt = {
    len: $('.page').length,
    wrap: $('.wrapper'),
    page: $('.page'),
    nowIndex: 0,
    lastIndex: undefined,
    key: true,
    timer:null,
    init: function () {
        if (this.len > 1) {
            this.createDom(this.len);
            this.bindEvent();
            this.movePage();
        }
    },
    createDom: function (len) {
        var pointstr = '';
        for (var i = 0; i < len; i++) {
            if (i == 0) {
                pointstr += '<li class="active"></li>';
            } else {
                pointstr += '<li></li>';
            }
        }
        pointstr = '<div class="point"><ul>' + pointstr + '</ul></div>';
        var btnstr = '';
        btnstr = '<div class="btn">\
                <img src="images/left-btn.png" alt="left" class="left">\
                <img src="images/right-btn.png" alt="right" class="right">\
                </div>';
        this.wrap.append(pointstr).append(btnstr);
    },
    bindEvent: function () {
        var self = this;
        $('li').add($('.left')).add($('.right')).on('click', function () {
            if ($(this).attr('class') == 'left') {
                // self.changeIndex('left');
                self.tool('left');
            } else if ($(this).attr('class') == 'right') {
                // self.changeIndex('right');
                self.tool('right');
            } else {
                // self.changeIndex($(this).index());
                self.tool($(this).index());
            }
            // self.changePoint(self.nowIndex);
            // 触发页面变化
            // self.page.eq(self.lastIndex).trigger('leave');
            // self.page.eq(self.nowIndex).delay(300).trigger('come');
        })
        // 设定页面变化
        this.page.on('leave', function () {
            $(this).fadeOut(200).find($('img')).animate({
                width: '0%'
            });
        })
        this.page.on('come', function () {
            $(this).fadeIn(200).find($('img')).delay(200).animate({
                width: '30%'
            }, 400, 'linear',function(){
                self.key = true;
                self.movePage();
            });
        })
    },
    tool: function (str) {
        var self = this;
        if (self.key) {
            self.changeIndex(str);
            if (self.nowIndex !== self.lastIndex) {
                self.changePoint(self.nowIndex);
                self.page.eq(self.lastIndex).trigger('leave');
                self.page.eq(self.nowIndex).delay(300).trigger('come');self.key = false;
            }
        }
    },
    changeIndex: function (dir) {
        this.lastIndex = this.nowIndex;
        if (dir == 'left') {
            this.nowIndex = this.nowIndex == 0 ? this.len - 1 : this.nowIndex - 1;
        } else if (dir == 'right') {
            this.nowIndex = this.nowIndex == this.len - 1 ? 0 : this.nowIndex + 1;
        } else {
            this.nowIndex = dir;
        }
    },
    changePoint: function (index) {
        $('.active').removeClass('active');
        $('li').eq(index).addClass('active');
    },
    movePage:function(){
        var self = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function(){
            self.tool('right');
        },3000)
    },
};
ppt.init();