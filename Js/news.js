var currentDate = new Date();
var currentMonth = currentDate.getMonth() + 1;
//動態生成近六月份標題
function addNewsDate() {
    return new Promise((resolve, reject) => {
        var ul = $('<ul>');
        for (var i = 0; i < 6; i++) {
            var li = $('<li>');
            var month = currentMonth - i;
            var year = currentDate.getFullYear();
            if (month <= 0) {
                month += 12;
                year -= 1;
            }
            li.text(month.toString().padStart(2, '0') + ' / ' + year);
            if (i === 0) {
                li.addClass('current');
            }
            ul.append(li);
        }
        var innerDiv = $('.events .inner .month');
        innerDiv.append(ul);
        resolve();
    }).catch(() => {
        reject();
    });
}

// 抓取News.json裡的內容並放入相應的.contentbyDate
function addNewsContent() {
    return new Promise((resolve, reject) => {
        var promise = new Promise((resolve, reject) => {
            $.getJSON('/News/News.json', function (data) {
                var newsData = data;
                newsData.reverse();
                newsData.forEach(function (news) {
                    var divI = $('<div>').addClass('item');
                    var divD = $('<div>').addClass('date');
                    var divT = $('<div>').addClass('type');
                    var divC = $('<div>').addClass('content');

                    var newsDate = new Date(news.date);
                    var newsMonth = newsDate.getMonth() + 1;
                    if (newsMonth > currentMonth) {
                        return;
                    }
                    var contentByDateDiv = $('#d' + (currentMonth - newsMonth + 1));
                    divD.text(news.date);

                    // .type
                    divT.text(news.type);

                    // content
                    divC.html('<span style="font-weight: 500;">' + news.title + '</span><br>' + '<span style="color: #636363">' + news.content + '</span>');

                    // add to current item
                    divI.append(divD);
                    divI.append(divT);
                    divI.append(divC);
                    contentByDateDiv.append(divI);
                });
                resolve();
            }).fail(function () {
                reject();
            });
        });
        promise.then(() => {
            // 若該月份無任何內容
            for (var i = 0; i < 6; i++) {
                var contentByDateDiv = $('#d' + (i + 1));
                if (contentByDateDiv.children().length === 0) {
                    var p = $('<p></p>').text('本月份無任何最新消息/異動公告');
                    contentByDateDiv.append(p);
                }
            }
            resolve();
        }).catch(() => {
            reject();
        });
    });
}

//選擇日期對應內容
function chooseNewsDate() {
    var lis = $('.month li');
    var items = $('.contentbyDate');
    items.eq(0).addClass('fade-in-fwd');
    for (var i = 1; i < lis.length; i++) {
        items.eq(i).hide();
    }
    lis.each(function (index) {
        $(this).attr('index', index);
        $(this).on('click', function () {
            lis.removeClass('current');
            $(this).addClass('current');
            var index = $(this).attr('index');
            items.removeClass('fade-in-fwd').addClass('fade-out-bck').hide();
            items.eq(index).removeClass('fade-out-bck').addClass('fade-in-fwd').show();
        });
    });
}


$(window).on('load', function () {
    addNewsDate()
        .then(() => addNewsContent())
        .then(() => chooseNewsDate())
        .catch(() => console('最新消息載入不成功'));
});
