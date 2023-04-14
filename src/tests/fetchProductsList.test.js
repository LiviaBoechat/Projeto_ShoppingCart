import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', async () => {
    await expect(typeof fetchProductsList).toBe('function'); 
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador')
    expect(fetch).toHaveBeenCalled()
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  });

  it('Quando o argumento da função fetchProductList for computador, o retorno é uma estrutura de dados igual ao objeto produto que já está importado no arquivo', async () => {
    expect(await fetchProductsList('computador')).toEqual(computadorSearch);
  });
  
  it('Ao chamar a função fetchProduct s/ argumento,deve retornar um erro com a mensagem: ID não informado', async () => {
    await expect(fetchProductsList()).rejects.toEqual(new Error('Termo de busca não informado'));
    });
  
    it('Ao chamar a função fetchProductsList s/ argumento,deve retornar um erro com a mensagem: ID não informado', async () => {
      const result = await fetchProductsList('blablabla')
      console.log(result)
      expect(result).toBe('Erro da API')
    });
});



