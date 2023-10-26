function interpolateColors(startColor, endColor, percentage) {
    const color = [];
    for (let i = 0; i < 3; i++) {
        const channel = Math.round(startColor[i] + (endColor[i] - startColor[i]) * percentage);
        color.push(channel);
    }
    return color;
}

function updateBackgroundColor() {
    const $topSection = $('.company-belief');
    const $companyHistory = $('.company-history');
    const $companyEquipment = $('.company-equipment');
    const transitionStart = $topSection.offset().top;
    const transitionMiddle = $companyHistory.offset().top;
    const transitionEnd = $companyEquipment.offset().top;
    const scrollRange = transitionMiddle - transitionStart;
    const scrollRange_ed = transitionEnd - transitionMiddle;
    const startColor = [255, 255, 255];
    const middleColor = [247, 243, 238];
    const endColor = [255, 255, 255];

    const scrollY = $(window).scrollTop();

    if (scrollY >= transitionStart && scrollY <= transitionMiddle) {
        const percentage = (scrollY - transitionStart) / scrollRange;
        const color = interpolateColors(startColor, middleColor, percentage);
        $('body').css('background-color', `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    }
    else if (scrollY >= transitionMiddle && scrollY <= transitionEnd) {
        const percentage = (scrollY - transitionMiddle) / scrollRange_ed;
        const color = interpolateColors(middleColor, endColor, percentage);
        $('body').css('background-color', `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        $('.printingMachine_type').css('background-color', `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    }
}

$(window).on('load', function () {
    console.log('Main網頁已全部載入完成');
    let animationFrameRequested = false;
    $(window).on('scroll', function () {
        if (!animationFrameRequested) {
            animationFrameRequested = true;
            requestAnimationFrame(function () {
                updateBackgroundColor();
                animationFrameRequested = false;
            });
        }
    });

    $(window).on('resize', function () {
        updateBackgroundColor();
    });
    updateBackgroundColor();
});