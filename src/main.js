import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// obs: lembrar de comentar a chamada da função qd for fazer o test do teste pq pd dar problema.

// Requisito 01: fazer teste da função fetchProductsList. Tem que chamar a função aqui na main pq é ela  que conecta o código ao browser
fetchProductsList('computador');

// Requisito 04:Adicione um texto de carregando durante uma requisição à API

// para alternar entre adicionar Loading OU Error, mude os parÂmetros de texto e classe
const addLoadingOrError = (text, classe) => {
  const getProductContainer = document.querySelector('.products');
  const creatLoadingContainer = document.createElement('div');
  creatLoadingContainer.classList.add(classe);
  creatLoadingContainer.innerText = text;
  // console.log(creatLoadingContainer);
  getProductContainer.appendChild(creatLoadingContainer);
};

const removeLoading = () => {
  const getProductContainer = document.getElementsByClassName('products')[0];
  const getLoadingContainer = document.querySelector('.loading');
  getProductContainer.removeChild(getLoadingContainer);
};

// Requisito 10: Calcule o valor total dos itens do carrinho de compras
const getCartProductsObjects = async () => {
  // getSavedCartIds retorna array de Ids salvos no carrinho
  const addedProductsIds = getSavedCartIDs();
  const getProductsObjects = addedProductsIds.map(async (productId) => {
    const returnProductObject = await fetchProduct(productId);
    return returnProductObject;
  });
  return getProductsObjects;
};
console.log(await getCartProductsObjects());

const sumCost = async () => {
  const getTotalPriceTag = document.querySelector('.total-price');
  const keepProductObjects = await getCartProductsObjects();
  console.log(keepProductObjects);
  let total = 0;
  const getProductsObjects = keepProductObjects.forEach(async (productObject) => {
    const objects = await productObject;
    const getPrice = objects.price;
    total += getPrice;
    getTotalPriceTag.innerHTML = total;
  });
  console.log(await getProductsObjects);
  return getProductsObjects;
};
console.log(await sumCost());

// Requisito 08: Implemente a funcionalidade que adiciona os produtos ao carrinho.

const addEventButton = (getCartButton) => {
  getCartButton.forEach((eachButton) => {
    eachButton.addEventListener('click', async (event) => {
      const getSectionPai = event.target.parentNode;
      const getId = getSectionPai.firstChild.innerText;
      console.log(getId);
      saveCartID(getId);
      const returnProductObject = await fetchProduct(getId);
      const getCartOL = document.getElementsByClassName('cart__products')[0];
      // inserir topicos da lista (retornados pela função createCartProductElement com parâmetro c/ objeto retornado, por sua vez pela fetchProduct) na lista OL
      getCartOL.appendChild(createCartProductElement(returnProductObject));
    });
  });
  getCartButton.forEach((eachButton) => {
    eachButton.addEventListener('click', async () => {
      sumCost();
    });
  });
  const getAddedCartProducts = document.querySelectorAll('.cart__products');
  getAddedCartProducts.forEach((eachProduct) => {
    eachProduct.addEventListener('click', async () => {
      sumCost();
    });
  });
};

// Requisito 03: Criando uma lista de produtos

const productsList = async () => {
  try {
    addLoadingOrError('carregando...', 'loading');
    const results = await fetchProductsList('computador');
    const getProductDiv = document.querySelector('.products');
    results.forEach((eachProduct) => {
      const newProductElement = createProductElement(eachProduct);
      getProductDiv.appendChild(newProductElement);
    });
    removeLoading();
    // captura todos os botões
    const getCartButton = document.querySelectorAll('.product__add');
    // chama a função de clique
    addEventButton(getCartButton);
  } catch (error) {
    const errorMessage = 'Algum erro ocorreu, recarregue a página e tente novamente';
    addLoadingOrError(errorMessage, 'error');
  }
};
productsList();

// Requisito 09: RECUPERE (getItem) os itens adicionados no carrinho de compras do localStorage

const listGenerator = async () => {
  const cartProducts = await getCartProductsObjects();
  // console.log(cartProducts);
  // promise all recebe um array, por isso não tem colchete dentro do parêntese
  Promise.all(cartProducts)
    .then((response) => {
      response.forEach((eachObject) => {
        const getCartOL = document.querySelector('.cart__products');
        // adiciona à OL(ordenated list) os topicos (li) de cada produto adicionado no cart/localStorage
        getCartOL.appendChild(createCartProductElement(eachObject));
      });
    })
    .catch((error) => console.log(error.message));
};

window.onload = () => {
  listGenerator();
};
