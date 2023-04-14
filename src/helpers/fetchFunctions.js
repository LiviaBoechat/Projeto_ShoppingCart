// Aqui estão as funções que fazem requerimentos à API

// função retorna o OBJETO DO PRODUTO especificado no endpoint através do ID
export const fetchProduct = async (ProductID) => {
  if (!ProductID) {
    throw new Error('ID não informado');
  }
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${ProductID}`);
    const data = await response.json();
    // como já tá informando o id no endpoint, o .json vai retornar o próprio produto
    return data;
  } catch (error) {
    console.log(error);
    return ('Erro da API');
  }
};

// função retorna TODOS OS PRODUTOS da API
export const fetchProductsList = async (query) => {
  if (!query) {
    throw new Error('Termo de busca não informado');
  }

  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const data = await response.json();
    return data.results;
    // console.log(data);
  } catch (error) {
    return ('Erro da API');
  }
};
