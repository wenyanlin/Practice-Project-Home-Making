function allProduct_load() {
    $.ajax({
        url: '/Product/allProduct.json',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, product) {
                var divI = $('<div>').addClass('item');
                var h5IT = $('<h5>').addClass('item_title');
                var divIC = $('<div>').addClass('item_content');
                var ul = $('<ul>');
                h5IT.text((index + 1).toString().padStart(2, '0') + '.' + product.category);
            
                $.each(product.products, function (i, prod) {
                    var li = $('<li>');
                    var a = $('<a>').attr('href', `/Product/Products.html?product=${prod.id}`).text(prod.name);
                    li.append(a);
                    ul.append(li);
                });
                
                if(product.products.length > 10){
                    divI.css('flex-basis', `calc(100% - (100% / 3 - 20px / 3) - 10px`);
                }

                divI.append(h5IT);
                divI.append(divIC);
                divIC.append(ul);
                $('#product').append(divI);
            });
        }
    });
}

$(window).on('load', function () {
    allProduct_load();
});
