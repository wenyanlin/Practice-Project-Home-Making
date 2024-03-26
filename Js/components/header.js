$('#loading').load('/components/loading.html');
$("#footer").load("/Menu/Footer.html");
$("#back-to-top").load("/Menu/backToTop.html");

var resizeTimeout, resizeTimeout2;
var scrollTimeout;
var rootElement;
//scroll up header
var banner;
var header;
var bannerHeight;

// function headerScroll() {
//   $(window).on('scroll', scrollHandler);
// }
// function scrollHandler() {
//   if ($(window).scrollTop() > bannerHeight) {
//     header.addClass('navigation-transformed');
//   } else {
//     header.removeClass('navigation-transformed');
//   }
// }
//search bar
function loadSearchData() {
  return new Promise((resolve, reject) => {
    var productsData = [
      {
        "name": "彩色名片",
        "url": "/Product/Products.html?product=ColorBusinessCard"
      },
      {
        "name": "Product 2",
        "url": "/Product/Products.html"
      },
      {
        "name": "Product 4",
        "url": "/Product/Products.html"
      },
      {
        "name": "Product 5",
        "url": "/Product/Products.html"
      },
      {
        "name": "Product 6",
        "url": "/Product/Products.html"
      }
    ];
    var list = $('#search_list');
    $.each(productsData, function (index, product) {
      var productA = $('<a>');
      productA.text(product.name).attr('href', product.url).addClass('search_listItem');
      list.append(productA);
    });
    resolve();
  }).catch(() => reject());
}
var searchBar_listItem_open = -1;
var searchBar_listContainer;
var searchBar_listItems;
var searchBar_numItems;
var search_noResults = true;
function search() {
  return new Promise((resolve, reject) => {
    var input, filter;
    input = $('#search-input');
    filter = input.val().toLowerCase();
    search_noResults = true;
    searchBar_listItems = $('.search_listItem');
    searchBar_listItems.not(':first').each(function (index) {
      if ($(this).text().toLowerCase().indexOf(filter) > -1) {
        searchBar_listContainer.css('display', 'block');
        $(this).css('display', 'flex');
        search_noResults = false;
      }
      else {
        $(this).css('display', 'none');
      }
    });
    if (search_noResults) {
      searchBar_listContainer.css('display', 'block');
      searchBar_noSearchResult.css('display', 'flex');
    }
    else {
      searchBar_noSearchResult.css('display', 'none');
    }
    if (filter == "" || filter == undifined) {
      searchBar_listContainer.css('display', 'none');
    }
    //console.log('搜尋框成功');
    resolve();
  }).catch(() => {
    console.log('搜尋框失敗');
  });
}

var isToggle = false;
var isTyping = false;
var searchForm;
var searchBtn;
var searchInput;
var searchBtn_i;

function searchBar() {
  let input = $('#search-input').val();
  if (input != '' && !search_noResults) {//has Input & has Result
    window.location.href = searchBar_listItems[searchBar_listItem_open].href;
  }
  else if (input === '') {
    searchForm.toggleClass('active');
    searchInput.focus();
    //console.log('listItem_open = ' + listItem_open);
    searchBar_listItem_open = -1; //searchText reset
  }
}
function searchBar_switch() {
  return new Promise((resolve, reject) => {
    // if ($(window).width() > 414 && isToggle) {
    //   searchInput.val('');
    //   searchBtn.off('click', searchBar_mobile);
    //   searchBtn.on('click', searchBar_mobile);
    //   isToggle = false;
    //   console.log(isToggle);
    // }
    // else if($(window).width() > 414){
    //   searchBtn.on('click', searchBar_mobile);
    // }
    // else if ($(window).width() <= 414) {
    //   isToggle = true;
    //   searchBtn.on('click', searchBar_mobile);
    // }

    searchBtn.on('click', function () {
      searchBar();
    });
    searchInput.on('keydown', function (event) {
      //console.log(event.keyCode === 13);
      if (event.keyCode === 13) {
        searchBar();
      }
    });
    //console.log('按鈕切換成功');
    resolve();
  }).catch(() => {
    console.log('按鈕切換失敗');
    reject();
  });
}

function backToTop() {
  var progressPath = $('.progress-wrap path')[0];
  var pathLength = progressPath.getTotalLength();
  $(progressPath).css('transition', 'none').css('WebkitTransition', 'none');
  $(progressPath).css('strokeDasharray', pathLength + ' ' + pathLength);
  $(progressPath).css('strokeDashoffset', pathLength);
  progressPath.getBoundingClientRect();
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
  }
  updateProgress();
  $(window).scroll(updateProgress);

  var offset = 50;
  var duration = 50;
  $(window).on('scroll', function () {
    //console.log($(this).scrollTop());
    if ($(this).scrollTop() > offset) {
      $('.progress-wrap').addClass('active-progress');
    } else {
      $('.progress-wrap').removeClass('active-progress');
    }

    if ($(this).scrollTop() > $('#footer').offset().top - $(window).height()) {
      var mainBottom = $('#footer').offset().top;
      $('.progress-wrap').css({
        top: mainBottom - $(this).scrollTop() - 85 + 'px'
      });

    } else {
      $('.progress-wrap').css({
        position: 'fixed',
        bottom: '25px',
        top: 'auto'
      });
    }
  });



  $('.progress-wrap').on('click', function (event) {
    event.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, duration);
    return false;
  });

}

function scrollHeader() {
  $(window).scroll(function () {
    const scrollY = $(window).scrollTop();
    //console.log(scrollY);
    if (scrollY >= 80) {
      $('.banner').css('margin', '0 0 44px 0');
      $('.scrollHeader').css({
        position: 'fixed',
        top: '30px',
        padding: '10px 0',
        'box-shadow': '0px 1px 2px rgba(14, 14, 14, 0.13)'
      });
      $('.logo-scroll').css({
        display: 'block'
      });
    } else {
      $('.banner').css('margin', '0');
      $('.scrollHeader').css({
        position: 'static',
        padding: '0',
        'box-shadow': 'none'
      });
      $('.logo-scroll').css({
        display: 'none'
      });
    }
  });
}

//footer
function footerCollapse() {
  if (window.innerWidth <= 767) {
    var lis = $('.right-foot .info');
    var items = $('.right-foot ul');
    lis.each(function (index) {
      $(this).attr('index', index);
      $(this).on('click', function () {
        current = $('.right-foot .current');
        if (current) {
          current.removeClass('current');
        }
        var currentIndex = $(this).attr('index');
        if (current && current.is(items[currentIndex])) {
          current.removeClass('current');
        }
        else {
          items.eq(currentIndex).addClass('current');
        }
      });
    });
  }
}
// function navbarbgChange(){
//   var navbar = $('.navbar');
//   var navLink = $('.nav-link');
//   if (window.location.href.includes("Products")) {
//     //navbar.css('opacity', '20%');
//   }
// }

function loadVar() {
  return new Promise((resolve, reject) => {
    rootElement = $('html');
    // banner = $('.banner');
    // header = $('header');
    // bannerHeight = banner.outerHeight();

    searchBar_listContainer = $('#search_list');
    searchBar_listItems = $('.search_listItem');
    searchBar_numItems = searchBar_listItems.length;
    searchBar_noSearchResult = $('.search_no-search-result');

    searchForm = $('#search-form');
    searchBtn = $('#search-button');
    searchInput = $('#search-input');
    searchBtn_i = $('#search-button i');
    //console.log('變數載入成功');
    resolve();
  }).catch(() => {
    console.log('變數載入失敗');
    reject();
  });
}

function addDropdownMenu() {
  return new Promise((resolve, reject) => {
    var promise = new Promise((resolve, reject) => {
      $.getJSON('/Product/allProduct.json', function (data) {
        var productData = data;
        productData.forEach(function (product, index) {
          var categoryLi = $('<li>');
          var categorySpan = $('<span>');
          categorySpan.text((index + 1).toString().padStart(2, '0') + '.' + product.category);
          var iSpan = $('<span>').append(`<i class="fa-solid fa-chevron-right fa-2xs" style="color: #45464c;"></i>`);

          categoryLi.append(categorySpan);
          categoryLi.append(iSpan);
          $('.dropdown-menu_category').append(categoryLi);

          var productBlock = $('<li>').addClass('dropdown-menu_product_block');
          var productH5 = $('<h5>').addClass('dropdown-menu_product_title');
          productH5.text((index + 1).toString().padStart(2, '0') + '.' + product.category);
          var productUl = $('<ul>').addClass('dropdown-menu_product_list');
          product.products.forEach((item) => {
            var productLi = $('<li>').addClass('dropdown-menu_product_item');
            var a = $('<a>').attr('href', `/Product/Products.html?product=${item.id}`).text(item.name);
            productLi.append(a);
            productUl.append(productLi);
          });
          productBlock.append(productH5);
          productBlock.append(productUl);
          $('.dropdown-menu_product').append(productBlock);

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

function changeDropdownMenu() {
  return new Promise((resolve, reject) => {
    $(".dropdown-menu_category li").hover(function () {
      var index = $(this).index();
      $(".dropdown-menu_product_block").eq(index).addClass("active").siblings().removeClass("active");
    });

    $(".dropdown-menu-row").on("click", function (e) {
      e.stopPropagation(); // Prevent event propagation
    });
    $(".dropdown-menu-bottom").on("click", function (e) {
      e.stopPropagation(); // Prevent event propagation
    });

    resolve();
  })
}

function signinupSwitch() {
  $('#sign-in-up').load("/components/SignUp.html", function () {
    $('.homemaking_member_item .login_button').click((e) => {
      e.stopPropagation();
      //$('body').css('overflow', 'hidden');
      $('.sign-in-up').addClass('open').removeClass('s--signup');;
      $('.sign-in-up_bottom').addClass('open');
    });

    $('.homemaking_member_item .signup_button').click(function (e) {
      e.stopPropagation();
      //$('body').css('overflow', 'hidden');
      $('.sign-in-up').addClass('open').addClass('s--signup');
      $('.sign-in-up_bottom').addClass('open');
    });

    $('.sign-in-up_close').click(function () {
      //$('body').css('overflow', 'auto');
      $('.sign-in-up').toggleClass('open');
      $('.sign-in-up_bottom').removeClass('open');
      $('.sign-in-up_forget').removeClass('slide-in-left').addClass('slide-out-left');
      $('.sign-in-up_back').css({
        'visibility': 'hidden',
        'opacity': '0'
      });
    });

    $('.sign-in-up_switch-block_img_button').on('click', function () {
      $('.sign-in-up').toggleClass('s--signup');
    });
    $('.sign-in-up_forgot-password').on('click', (e) => {
      e.stopPropagation();
      $('.sign-in-up_forget').removeClass('slide-out-left').addClass('slide-in-left');
      $('.sign-in-up_back').css({
        'visibility': 'visible',
        'opacity': '1'
      });
    });
    $('.sign-in-up_back').on('click', () => {
      $('.sign-in-up_forget').removeClass('slide-in-left').addClass('slide-out-left');
      $('.sign-in-up_back').css({
        'visibility': 'hidden',
        'opacity': '0'
      });
    });
  });
}


$('#header').load("/Menu/Header.html", function () {
  //console.log('HTML/CSS已全部載入完成');
  //navbarbgChange();
  signinupSwitch();
  setTimeout(function () {

    addDropdownMenu().
      then(() => {
        changeDropdownMenu();
      }).catch(error => {
        console.error('網頁加載失敗:', error);
      });

    backToTop();
    //scrollHeader();

    loadSearchData()
      .then(() => loadVar())
      .then(() => {
        //console.log('變數資料已全部載入完成');
        searchBar_switch();
        search();
        $(window).on('resize', function () {
          // if (window.innerWidth >= 768) {
          //   $(window).off('scroll', scrollHandler);
          // }
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(searchBar_switch, 300);
        });
      })
      .catch(() => {
        console.log('變數資料載入失敗');
      });
  }, 100);


  // if (window.innerWidth < 768) {
  //   //console.log('window.innerWidth = ' + window.innerWidth);
  //   headerScroll();
  // }
  $(window).on('resize', function () {
    clearTimeout(resizeTimeout2);
    resizeTimeout2 = setTimeout(footerCollapse, 300);
  });
  //searchBar();

});

$(document).ready(function () {
  setTimeout(() => {
    $("#loading").fadeOut("slow");
  }, 5);
});
// $(window).on('load', function() {
//   //setTimeout(()=>{
//     $("#loading").fadeOut("slow");
//   //},1);
// });