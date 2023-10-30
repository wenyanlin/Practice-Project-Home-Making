function initPrintFinishingServices() {
Vue.component("process", {
    template: "#print-finishing-services-template",
    data() {
        return {
            isOpen: false,
            guidelines: null
        };
    },
    props: ["process_data", "process_option", "process_index"],
    computed: {
        allWeight() {
            const allWeights = this.process_option.map(option => option.w).flat();
            return [...new Set(allWeights)].join(", ");
        },
        popupMarginLeft() {
            const offset = 20;
            const index = this.process_index % 5;
            return `calc((-100% - ${offset}px) * ${index})`;
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

            document.querySelectorAll('.print-finishing-services_item.current').forEach(function (element) {
                if (element !== target) {
                    element.classList.remove('current');
                }
            });

            const nextSibling = target.nextElementSibling;
            const popupElements = document.querySelectorAll('.print-finishing-services_item_popup.active');
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
            this.toggleClass(target.closest('.print-finishing-services_item_popup'), 'active');
            this.toggleClass(event.currentTarget.parentNode.parentNode.querySelector('.current'), 'current');
        },
        getOptionName(index) {
            const option = this.process_data.variants.find(option => option.id === this.process_option[index]);
            return option.variant_name;
        },
        getOptionIntro(index) {
            const option = this.process_data.variants.find(option => option.id === this.process_option[index]);
            return option.introduction;
        },
        getOptionGuidelines(id) {
            console.log(id);
            const self=this;
            $.ajax({
                url: `/faq/printing-guide/print-finishing-guidelines/${id}.html`,
                dataType: 'html',
                success: function (data) {
                    self.guidelines = data;
                },
                error: (error) => {
                    console.error('請求出錯：', error);
                }
            });
        }
    },
    mounted: function () {
        this.getOptionGuidelines(this.process_option[0]);
    }
});

var vmm = new Vue({
    el: "#print-finishing-services",
    data() {
        return {
            productData: null,
            processData: null
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
        getProcessDataById(processId) {

            return this.processData.find(item => item.id === processId);
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
                        url: '/Product/processing.json',
                        dataType: 'json',
                        success: function (data) {
                            self.processData = data;
                        }
                    });
                })
            document.addEventListener('click', this.handleDocumentClick);
        },
        beforeDestroy() {
            document.removeEventListener('click', this.handleDocumentClick);
        }
    });
};
initPrintFinishingServices();