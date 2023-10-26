$("#carouselBox").load("/Carousel.html");
$("#priceCount").load("/components/priceCount.html");

import { hoverOrderSOP } from "/Js/components/orderSOP.js";
// function navigateToPage(pageUrl) {
//       $.ajax({
//         url: pageUrl,
//         type: 'GET',
//         dataType: 'html',
//         success: function(response) {
//           $('.main').html(response);
//         }
//       });
//     }



function addNews() {
    //addNewsTitle();
    addNewsContent();
}

//最新消息&異動公告切換
// function addNewsTitle() {
//     var lis = $('.newsTitle li');
//     var items = $('.newsInner');
//     items.eq(1).hide();
//     lis.each(function (index) {
//         $(this).attr('index', index);
//         $(this).on('click', function () {
//             lis.removeClass('current');
//             $(this).addClass('current');
//             var currentIndex = $(this).attr('index');
//             items.hide();
//             items.eq(currentIndex).show();
//         })
//     });
// }


//公告內容填充
function addNewsContent() {
    $.getJSON('/News/News.json', function (data) {
        var newsData = data;
        var currentNews = newsData.slice(-8).reverse();
        var newsInnerDiv = $('#newsItems');
        var newsItemsHeight = 0;
        for (var i = 0; i < currentNews.length; i++) {
            //var divI = $('<label>').addClass('newsbox_content_item').attr('for', 'newsbox_input' + index);
            //var input = $('<input>').addClass('newsbox_content_input').attr('type', 'radio').attr('id', 'newsbox_input' + index).attr('name', 'label');
            var news = currentNews[i];
            var divI = $('<div>').addClass('newsbox_content_item').attr('for', 'newsbox_input' + i);
            var divII = $('<div>').addClass('newsbox_content_item_inner');
            var pT = $('<p>').addClass('newsbox_content_item_title');
            var pC = $('<div>').addClass('newsbox_content_item_content');
            var divD = $('<div>').addClass('newsbox_content_item_date');
            pT.text(news.title);
            pC.html(news.content);

            var newsDate = new Date(news.date);
            var newsMonth = newsDate.toLocaleString('en-US', { month: 'short' });
            divD.html('<span>' + newsDate.getDate() + '</span>' + '<br>' + newsMonth);
            divII.append(pT);
            divII.append(pC);
            divI.append(divD);
            divI.append(divII);
            //console.log('Number of News: ' + i);
            // if(i === 0){
            //     input.prop('checked', true);
            // }
            //newsInnerDiv.append(input);
            newsInnerDiv.append(divI);

            var contentItem = $('.newsbox_content_item');
            var contentItemHeight = contentItem.eq(i).outerHeight();
            newsItemsHeight += contentItemHeight;
            //console.log(contentItemHeight);
            //console.log(newsItemsHeight);
            if (newsItemsHeight > 630) {
                divI.remove();
                break;
            }
            else if (newsItemsHeight === 630) {
                break;
            }
            newsInnerDiv.on('click', function () {
                window.location.href = `/News.html`;
            });
        }
        // var latestNews = newsData.filter(function (news) {
        //     return news.type === "最新消息";
        // });
        // latestNews = latestNews.slice(-3);

        // var latestAnnouncements = newsData.filter(function (news) {
        //     return news.type === "異動公告";
        // });
        // latestAnnouncements = latestAnnouncements.slice(-3);

        // for (var i = 0; i < 2; i++) {
        //     var currentNews = newsData.slice(-4);
        //     // if (i === 0) {
        //     //     currentNews = latestNews;
        //     // } else {
        //     //     currentNews = latestAnnouncements;
        //     // }
        //     currentNews.reverse();

        //     var newsInnerDiv = $('#newsInner' + (i + 1));
        //     currentNews.forEach(function (news, index) {
        //         var divI = $('<div>').addClass('item');
        //         var divII = $('<div>').addClass('itemInner');
        //         var pT = $('<p>').addClass('itemTitle');
        //         var pC = $('<p>').addClass('itemContent');
        //         var divD = $('<div>').addClass('itemDate');
        //         pT.text('【 ' + news.title + ' 】');
        //         pC.html(news.content.replace('<br>', ' '))

        //         var newsDate = new Date(news.date);
        //         var newsMonth = newsDate.getMonth() + 1;
        //         divD.html(newsMonth + '/' + newsDate.getDate() + ' ' + newsDate.getFullYear());
        //         divII.append(pT);
        //         divII.append(pC);
        //         divI.append(divII);
        //         divI.append(divD);
        //         newsInnerDiv.append(divI);
        //     });
        // }
        // var divM = $('<div>').addClass('newsMore').css('cursor', 'pointer');
        // divM.click(function () {
        //     location.href = 'News/News.html';
        // });
        // divM.text('查看更多');
        // var newsContentDiv = $('.newsContent');
        // newsContentDiv.append(divM);
    });
}
function priceCount_select() {
    var selectBox = ['priceCount_productCategory', 'priceCount_productName', 'priceCount_paperTexture1', 'priceCount_paperTexture2', 'priceCount_paperTexture3', 'priceCount_productSize', 'priceCount_productQuantity'];
    var numOfSelectBox = selectBox.length;
    selectBox.forEach((item, index) => {
        var defaultselectbox = $('#' + item + '-origin');
        var numOfOptions = defaultselectbox.children('option').length;

        defaultselectbox.addClass('s-hidden');
        defaultselectbox.wrap('<div class="cusSelBlock ' + item + '" id="' + item + '" style="z-index: ' + numOfSelectBox + '"></div>');
        numOfSelectBox--;
        defaultselectbox.after('<div class="selectLabel"></div>');
        var cusSelBlock = $('#' + item);
        cusSelBlock.children('.selectLabel').text(defaultselectbox.children('option').eq(0).text());

        var cusList = $('<ul>', { 'class': 'options' }).insertAfter(cusSelBlock.children('.selectLabel'));

        for (var i = 0; i < numOfOptions; i++) {
            $('<li>', {
                text: defaultselectbox.children('option').eq(i).text(),
                rel: defaultselectbox.children('option').eq(i).val(),
                style: 'z-index: ' + (numOfOptions - i) + ';'
            }).appendTo(cusList);
        }

        // open-list and close-list items functions
        function openList() {
            cusSelBlock.children('.options').addClass('options-active');
            for (var i = 0; i < numOfOptions; i++) {
                cusSelBlock.children('.options').children('li').eq(i).attr('tabindex', i).css(
                    'transform', 'translateY(' + i * 100 + '%)').css('transition-delay', i * 30 + 'ms');
            }
        }

        function closeList() {
            for (var i = 0; i < numOfOptions; i++) {
                cusSelBlock.children('.options').children('li').eq(i).css(
                    'transform', 'translateY(' + i * 0 + 'px)').css('transition-delay', i * 0 + 'ms');
            }
            // $('.options').children('li').eq(1).css('transform', 'translateY(' + 2 + 'px)');
            // $('.options').children('li').eq(2).css('transform', 'translateY(' + 4 + 'px)');
            cusSelBlock.children('.options').removeClass('options-active');
        }

        function focusItems() {

            cusSelBlock.children('.options').on('focus', 'li', function () {
                $this = $(this);
                $this.addClass('active').siblings().removeClass();
            }).on('keydown', 'li', function (e) {
                $this = $(this);
                if (e.keyCode == 40) {
                    $this.next().focus();
                    return false;
                } else if (e.keyCode == 38) {
                    $this.prev().focus();
                    return false;
                }
            }).find('li').first().focus();

        }

        // click event functions
        cusSelBlock.children('.selectLabel').click(function () {
            $(this).toggleClass('active');
            if ($(this).hasClass('active')) {
                openList();
                focusItems();
            }
            else {
                closeList();
            }
        });

        cusSelBlock.children('.options').children('li').on('keypress click', function (e) {
            e.preventDefault();
            cusSelBlock.children('.options').children('li').siblings().removeClass();
            closeList();
            cusSelBlock.children('.selectLabel').removeClass('active');
            cusSelBlock.children('.selectLabel').text($(this).text());
            defaultselectbox.val($(this).text());
        });

        $(document).on('click', function (e) {
            var target = cusSelBlock;
            if (!target.is(e.target) && target.has(e.target).length === 0) {
                cusSelBlock.children('.selectLabel').removeClass('active');
                cusSelBlock.children('.options').children('li').siblings().removeClass();
                closeList();
            }
        });
    });

}

$("#orderSOP").load("/components/orderSOP.html", function () {
    hoverOrderSOP();
});
$(window).on('load', function () {
    addNews();
    priceCount_select();
});