export default {
  routes: [
    {
      method: 'GET',
      path: `/restaurantes/desempenho`,
      handler: 'restaurante.desempenho',
    },
    {
      method: 'GET',
      path: `/restaurantes/cardapio/:documentId`,
      handler: 'restaurante.getCardapio',
    },
    {
      method: 'GET',
      path: `/restaurantes/avaliacoes`,
      handler: 'restaurante.avaliacao',
    },
  ]
}
