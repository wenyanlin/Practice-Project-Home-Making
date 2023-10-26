// 解析網址參數
function parseUrlParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlParams.entries());
}

// 定義產品類別與對應的產品資料
const productCategories = {
  BusinessCard: [
    {
      title: '名片1',
      description: '這是名片1的描述。',
      image: 'product1.jpg'
    },
    {
      title: '名片2',
      description: '這是名片2的描述。',
      image: 'product2.jpg'
    },
  ],
  HAHA: [
    {
      title: '瓜',
      description: '黑',
      image: 'product1.jpg'
    }
  ]
};

// 建立產品獨立頁面的函式
function createProductPage(product) {
  const container = document.getElementById('categories-container');

  // 建立產品卡片元素
  const productCard = document.createElement('div');
  productCard.classList.add('product-card');

  // 建立產品圖片元素
  const productImage = document.createElement('img');
  productImage.src = product.image;
  productImage.alt = product.title;
  productImage.classList.add('product-image');
  productCard.appendChild(productImage);

  // 建立產品標題元素
  const productTitle = document.createElement('h2');
  productTitle.textContent = product.title;
  productTitle.classList.add('product-title');
  productCard.appendChild(productTitle);

  // 建立產品描述元素
  const productDescription = document.createElement('p');
  productDescription.textContent = product.description;
  productDescription.classList.add('product-description');
  productCard.appendChild(productDescription);

  // 將產品卡片元素加入容器中
  container.appendChild(productCard);
}

// 解析網址參數
const urlParameters = parseUrlParameters();

// 建立商品類別連結
const categoriesContainer = document.getElementById('categories-container');
for (const category in productCategories) {
  const categoryLink = document.createElement('a');
  categoryLink.classList.add('category-link');
  categoryLink.textContent = category;
  categoryLink.href = `?CustomProduct=${category}`;
  categoriesContainer.appendChild(categoryLink);

  // 建立該類別的產品頁面
  if (category === urlParameters.CustomProduct) {
    const products = productCategories[category];
    products.forEach(product => {
      createProductPage(product);
    });
  }
}