import { loadContent, changeUrl } from "/Js/faq.js";

export function hoverOrderSOP() {
    var ordering = $('#ordering');
    var highlight = $('#highlight');
    var step = $('.step');
    highlight.css('width', '0px');
    step.each(function (i) {
        var title = $(this).find('.step_title');
        var img = $(this).find('.step_pic img');

        $(this).on('mouseenter', function () {
            highlight.css('width', `calc(100% / 5 * ${i})`);
            title.css('color', '#cc3333');
            img.attr('src', `/Image/index/OrderSOP/Step${i + 1}-2.png`);
        });
        $(this).on('mouseleave', function () {
            title.css('color', '#212529');
            img.attr('src', `/Image/index/OrderSOP/Step${i + 1}.png`);
        });
        $(this).on('click', function () {
            window.location.href = `/faq.html?category=beginner-guide&theme=` + $(this).data('theme') + '#faq';
        });
        ordering.on('mouseleave', function () {
            highlight.css('width', '0px');
        });
    });
}


export function activeOrderSOP() {
    var ordering = $('#ordering');
    var highlight = $('#highlight');
    var step = $('.step');
    var isHighlight = false;

    step.each(function (i) {
        var title = $(this).find('.step_title');
        var img = $(this).find('.step_pic img');

        if (!isHighlight) {
            if (window.location.href.includes($(this).data('theme'))) {
                highlight.css('width', `calc(100% / 5 * ${i})`);
                isHighlight = true;
            }
            else {
                highlight.css('width', '0px');
            }
        }

        $(this).on('mouseenter', function () {
            img.attr('src', `/Image/index/OrderSOP/Step${i + 1}-2.png`);
        });
        $(this).on('mouseleave', function () {
            title.css('color', '#212529');
            img.attr('src', `/Image/index/OrderSOP/Step${i + 1}.png`);
        });
        $(this).on('click', function () {
            highlight.css('width', `calc(100% / 5 * ${i})`);
            changeUrl('/faq.html?category=beginner-guide', $(this), 'theme', true);
            loadContent('/faq/beginner-guide/' + $(this).data('theme') + '.html', $('#faq_question_list'));
        });

    });
    ordering.on('mouseleave', function () {
        var currentURL = window.location.href;
        step.each(function (i) {
            if (currentURL.includes($(this).data('theme'))) {
                highlight.css('width', `calc(100% / 5 * ${i})`);
                return false;
            }
            else {
                highlight.css('width', '0px');
            }
        });
    });
}