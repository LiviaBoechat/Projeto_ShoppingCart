import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', async () => {
    await expect(typeof fetchProduct).toBe('function'); 
  });

  it('Ao executar a função fetchProduct c/ argumento MLB1405519561, verifique se fetch é chamada', async () => {
    await fetchProduct('MLB1405519561')
    expect(fetch).toHaveBeenCalled()
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561')
  });

  it('Quando o argumento da função fetchProduct for MLB1405519561, o retorno é uma estrutura de dados igual ao objeto produto que já está importado no arquivo', async () => {
    expect(await fetchProduct('MLB1405519561')).toEqual(product);
  });

  // lembrar que função rejeitada tem que incluir o .rejects
  it('Ao chamar a função fetchProduct s/ argumento,deve retornar um erro com a mensagem: ID não informado', async () => {
    await expect(fetchProduct()).rejects.toEqual(new Error('ID não informado'));
  });

  it('Ao chamar a função fetchProduct s/ argumento,deve retornar um erro com a mensagem: ID não informado', async () => {
    const result = await fetchProduct('blablabla')
    console.log(result)
    expect(result).toBe('Erro da API')
  });
});




