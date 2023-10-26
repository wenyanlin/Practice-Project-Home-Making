import { loadContent, changeUrl, currentFaqQuestionSubcategory} from "/Js/faq.js";

export function clickSubcategoryButton(name, titleURL, category) {
        const SubcategoryButton = $('.faq_question_content ul > li');
        SubcategoryButton.off('click');
        SubcategoryButton.not(':first-child').on('click', (subcate) => {
            changeUrl(titleURL + '?category=' + category, $(subcate.currentTarget), 'theme', true);
            const urlParams = new URLSearchParams(window.location.search);
            loadContent('/'+ name + '/' + urlParams.get('category') + '/' + $(subcate.currentTarget).data('theme') + '.html', $('#faq_question_list'));
            currentFaqQuestionSubcategory(urlParams.get('theme'));
        });
}
