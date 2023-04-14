// função  que realiza a requisição para a API de CEPs e retorna o endereço completo do CEP

export const getAddress = async (cepAdress) => {
  const responseFetch1 = await fetch(`https://cep.awesomeapi.com.br/json/${cepAdress}`);
  const responseFetch2 = await fetch(`https://brasilapi.com.br/api/cep/v2/${cepAdress}`);
  const fetches = [responseFetch1, responseFetch2];

  return Promise.any(fetches)
    .then((response) => response.json())
    .then((data) => {
      if (!data) {
        throw new Error('CEP não encontrado');
      }
      return `${data.address} - ${data.district} - ${data.city} - ${data.state}`;
    })
    .catch((error) => ('CEP não encontrado'));
};

export const searchCep = () => {
  const getCepButton = document.querySelector('.cep-button');
  getCepButton.addEventListener('click', async () => {
    const getImputText = document.querySelector('.cep-input').value;
    const cepLength = 8;
    if (getImputText.length === cepLength) {
      const getCepDisplay = document.querySelector('.cart__address');
      getCepDisplay.innerHTML = await getAddress(getImputText);
    } else {
      throw new Error('CEP deve conter 8 dígitos');
    }
  });
};
searchCep();
