function load_productIntro() {

    Vue.component("intro", {
        template: "#product_intro-template",
        props: ["product_data"],
        data() {
            return {
                currentImageIndex: 0
            };
        },
        methods: {
            getImagePath: function (index) {
                return this.product_data.image[index];
            },
            switchImage(index) {
                this.currentImageIndex = index;
            },
            openOrderingPage() {
                window.open("https://example.com/online-order");
            },
            openDownloadPage() {
                window.open("/download.html?category=sample-file-download");
            }
        }
    });

    Vue.component("descr", {
        template: "#product_description-template",
        props: ["product_data", "product_path"],
        data() {
            return {
                loadedHTML: null,
                currentButtonIndex: 0
            }
        },
        methods: {
            loadHTMLContent(id, index) {
                if (id === "paper-texture" || id === "print-finishing-services") {
                    fetch(`/Product/Template/${id}.html`)
                        .then(response => response.text())
                        .then(html => {
                            this.loadedHTML = html;
                            this.updateCurrentButton(index);
                        })
                        .then(() => {
                            $('.appendScript').append($('<script>').attr('src', `/Js/components/${id}.js`));
                        })
                        .catch(error => {
                            console.error("Error loading HTML:", error);
                        });
                }
                else {
                    fetch(`${this.product_path}${id}.html`)
                        .then(response => response.text())
                        .then(html => {
                            this.loadedHTML = html;
                            this.updateCurrentButton(index);
                        })
                        .catch(error => {
                            console.error("Error loading HTML:", error);
                        });
                }
            },
            updateCurrentButton(index) {
                this.currentButtonIndex = index;
            }
        },
        watch: {
            product_path: function (newPath) {
                if (newPath && newPath.length > 0) {
                    this.loadHTMLContent("product-infor", 0);
                }
            }
        }
    });

    var vm = new Vue({
        el: "#product",
        data: {
            productData: null,
            productPath: null
        },
        methods: {
            switchProductContent(productName) {
                return new Promise((resolve, reject) => {
                    const hasProduct = productName !== null && productName.length ? 1 : 0;
                    if (hasProduct) {
                        $.ajax({
                            url: '/Product/allProduct.json',
                            dataType: 'json',
                            success: function (data) {
                                let found = false;
                                data.forEach(category => {
                                    category.products.forEach(product => {
                                        if (product.id && product.id.toLowerCase() === productName) {
                                            resolve(`/Product/${category.id}/${product.id}/`);
                                        }
                                    });
                                });
                                if (!found) {
                                    reject(new Error('Product not found'));
                                }
                            }
                        });
                    } else {
                        reject(new Error('Product not found'));
                    }
                });
            }
        },
        mounted: function () {
            const urlParams = new URLSearchParams(window.location.search);
            this.switchProductContent(urlParams.get('product').toLowerCase())
                .then((product_path) => {
                    urlLocation = product_path;
                    var self = this;
                    $.ajax({
                        url: urlLocation + 'intro.json',
                        dataType: 'json',
                        success: function (data) {
                            self.productData = data;
                            self.productPath = product_path;
                            document.title = self.productData.name + '-家裡蹲創意印刷';
                        }
                    });
                });
        }
    });
}

$(window).on('load', function () {
    load_productIntro();
});


