
var input, label, h5, p;

function createFaqInputandLabel(index) {
    var input = $('<input>').attr('type', 'checkbox').attr('id', 'faq-' + index);
    var label = $('<label>').addClass('faq_common-question_item').attr('for', 'faq-' + index);
    return { input, label }
}

function createFaqQuestionandAns() {
    var h5 = $('<h5>').addClass('faq_common-question_item_question');
    var p = $('<p>').addClass('faq_common-question_item_answer');
    return { h5, p };
}

function addQuestionContent() {
    return new Promise((resolve, reject) => {
        var promise = new Promise((resolve, reject) => {
            $.getJSON('/faq/faq.json', function (data) {
                var commonQuestionData = data;
                var div = $('<div>').addClass('faq_common-question_item_list-style');
                //待新增分類後選擇form及data內容
                var form = $('#faq_common-question_list');
                commonQuestionData.forEach(function (item, index) {
                    var { input, label } = createFaqInputandLabel(index);
                    var { h5, p } = createFaqQuestionandAns();
                    h5.text(item.question);
                    p.text(item.answer);

                    label.append(div).append(h5).append(p);
                    form.append(input).append(label);
                });
                resolve();
            }).fail(function () {
                reject();
            });
        });
    });
}

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
            changeUrl('/faq.html', $(cate.currentTarget), 'category', false);
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
            loadContent('/faq/common-problem.html', categoryContainer);
            resolve();
        }
        else {
            loadContent('/faq/' + urlParams.get('category') + '.html', categoryContainer);
            setTimeout(function () {
                const subcategoryContainer = $('#faq_question_list');

                if (hasThemeParam) {
                    
                    loadContent('/faq/' + urlParams.get('category') + '/' + urlParams.get('theme') + '.html', subcategoryContainer);
                    currentFaqQuestionSubcategory(urlParams.get('theme'));
                    resolve();
                }
                else {
                    switch (urlParams.get('category')) {
                        case 'beginner-guide':
                            loadContent('/faq/beginner-guide/become-a-member.html', subcategoryContainer);
                            currentFaqQuestionSubcategory('become-a-member');
                            resolve();
                            break;
                        case 'account-problem':
                            loadContent('/faq/account-problem/common-problem.html', subcategoryContainer);
                            currentFaqQuestionSubcategory('common-problem');
                            resolve();
                            break;
                        case 'prepayment-problem':
                            loadContent('/faq/prepayment-problem/prepayment.html', subcategoryContainer);
                            currentFaqQuestionSubcategory('prepayment');
                            resolve();
                            break;
                        case 'printing-guide':
                            loadContent('/faq/printing-guide/finalization-guidelines.html', subcategoryContainer);
                            currentFaqQuestionSubcategory('finalization-guidelines');
                            resolve();
                            break;
                        case 'file-transmission-problem':
                            loadContent('/faq/file-transmission-problem/file-problem.html', subcategoryContainer);
                            currentFaqQuestionSubcategory('file-problem');
                            resolve();
                            break;
                        case 'other-issues':
                            loadContent('/faq/other-issues/technical-support.html', subcategoryContainer);
                            currentFaqQuestionSubcategory('technical-support');
                            resolve();
                            break;
                        default:
                            loadContent('/faq/common-problem.html', subcategoryContainer);
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
    //console.log(urlParams);
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
