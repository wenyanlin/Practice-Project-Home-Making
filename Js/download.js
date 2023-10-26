

export function changeUrl(pageUrl, dataLocation, dataName, secondData) {
    const newState = { dataName: dataLocation.data(dataName) };
    const newUrl = secondData ? (pageUrl + `&` + dataName + `=` + newState.dataName) : (pageUrl + `?` + dataName + `=` + newState.dataName);
    //console.log(dataLocation.data(dataName));
    history.pushState(newState, '', newUrl);
}

function clickCategoryButton(event) {
    return new Promise((resolve, reject) => {
        const CategoryButton = $('.faq_navigation_item');
        CategoryButton.on('click', (cate) => {
            changeUrl('/download.html', $(cate.currentTarget), 'category', false);
            const urlParams = new URLSearchParams(window.location.search);
            switchContent(urlParams);
        });
        resolve();
    });
}

export function loadContent(url, contentContainer) {
    //console.log('--' + url);
    contentContainer.load(url, function (response, status, xhr) {
        if (status === "success") {
            contentContainer.addClass('fade-in-fwd');

            setTimeout(function () {
                contentContainer.removeClass('fade-in-fwd');
            }, 300);
        } else {
            console.error('載入內容時發生錯誤:', status);
        }
    });
}

export function currentFaqQuestionSubcategory(theme) {
    const faqQuestionContent = $('.faq_question_content ul > li');
    faqQuestionContent.not(':first').each((index, item) => {
        if ($(item).data('theme') === theme) {
            $(item).addClass('current');
        } else {
            $(item).removeClass('current');
        }
    });
}

function switchContent(urlParams) {
    return new Promise((resolve, reject) => {
        const hasCategoryParam = urlParams.has('category');
        const hasThemeParam = urlParams.has('theme');
        const categoryContainer = $('#faq_question_block');

        if (!hasCategoryParam && !hasThemeParam) {
            loadContent('/Download/file-transfer-master.html', categoryContainer);
            setTimeout(()=>{
                loadContent('/Download/file-transfer-master/installation-tutorial.html', $('#faq_question_list'));
                currentFaqQuestionSubcategory('installation-tutorial');
            },50);
            resolve();
        }
        else {
            loadContent('/Download/' + urlParams.get('category') + '.html', categoryContainer);
            setTimeout(function () {
                const subcategoryContainer = $('#faq_question_list');

                if (hasThemeParam) {
                    loadContent(urlParams.get('category') + '/' + urlParams.get('theme') + '.html', subcategoryContainer);
                    currentFaqQuestionSubcategory(urlParams.get('theme'));
                    resolve();
                }
                else {
                    switch (urlParams.get('category')) {
                        case 'file-transfer-master':
                            loadContent('/Download/file-transfer-master/installation-tutorial.html', subcategoryContainer);
                            currentFaqQuestionSubcategory('installation-tutorial');
                            resolve();
                            break;
                        default:
                            loadContent('/Download/common-problem.html', subcategoryContainer);
                            resolve();
                            break;
                    }
                }
            }, 100);
        }
    });
}


$(window).on('load', function () {
    const urlParams = new URLSearchParams(window.location.search);
    switchContent(urlParams)
        .then(() => {
            clickCategoryButton();
        })
        .catch(error => {
            console.error('網頁加載失敗:', error);
        });
    $(window).on('popstate', function (event) {
        const urlParams = new URLSearchParams(window.location.search);
        switchContent(urlParams);
    });

});
