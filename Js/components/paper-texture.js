function initPaperTexture() {
    Vue.component("paper", {
        template: "#paper-texture-template",
        data() {
            return {
                isOpen: false
            };
        },
        props: ["paper_data", "paper_option", "paper_index"],
        computed: {
            allWeight() {
                const allWeights = this.paper_option.map(option => option.w).flat();
                return [...new Set(allWeights)].join(", ");
            },
            popupMarginLeft() {
                const offset = 20;
                const index = this.paper_index % 5;
                return `calc((-100% - ${offset}px) * ${index})`;
            },
            allOptions() {
                return this.paper_option.map(option => option.id);
            }
        },
        methods: {
            toggleClass(element, className) {
                if (element.classList.contains(className)) {
                    element.classList.remove(className);
                } else {
                    element.classList.add(className);
                }
            },
            isPopup(event) {
                const target = event.currentTarget;

                document.querySelectorAll('.paper-texture_item.current').forEach(function (element) {
                    if (element !== target) {
                        element.classList.remove('current');
                    }
                });

                const nextSibling = target.nextElementSibling;
                const popupElements = document.querySelectorAll('.paper-texture_item_popup.active');
                popupElements.forEach(function (element) {
                    if (element !== nextSibling) {
                        element.classList.remove('active');
                    }
                });

                this.toggleClass(target, 'current');
                this.toggleClass(nextSibling, 'active');
            },
            noPopup(event) {
                const target = event.currentTarget;
                this.toggleClass(target.closest('.paper-texture_item_popup'), 'active');
                this.toggleClass(event.currentTarget.parentNode.parentNode.querySelector('.current'), 'current');
            },
            getOptionName(index) {
                const option = this.paper_data.variants.find(option => option.id === index);
                return option.variant_name;
            },
            getOptionIntro(index) {
                const option = this.paper_data.variants.find(option => option.id === index);
                return option.introduction;
            },
            getOptionQuality(index, w) {
                var option = this.paper_data.variants.find(option => option.id === index);
                option = option.quality.find(item => item.weight === w);
                if (!option?.thickness) { return "-" }
                return option.thickness + "±1條";
            }
        }
    });

    var vmm = new Vue({
        el: "#paper-texture",
        data() {
            return {
                productData: null,
                paperData: null
            };
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
            },
            getPaperDataById(paperId) {
                return this.paperData.find(paper => paper.id === paperId);
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
                        }
                    });

                    $.ajax({
                        url: '/Product/paper.json',
                        dataType: 'json',
                        success: function (data) {
                            self.paperData = data;
                        }
                    });
                })
            document.addEventListener('click', this.handleDocumentClick);
        },
        beforeDestroy() {
            document.removeEventListener('click', this.handleDocumentClick);
        }
    });
}

initPaperTexture();