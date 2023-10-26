$('.getFile').on('click', function () {
    var fileURL = $(this).data('url');
    var fileType = $(this).data('type');
    var fileName = $(this).data('name');
    $.ajax({
        url: fileURL,
        method: 'GET',
        xhrFields: {
            responseType: 'blob'
        },
        success: function (data) {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = fileName + '.' + fileType;
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        },
        error: function (xhr, status, error) {
            console.error('下載失敗：', error);
        }
    });
});