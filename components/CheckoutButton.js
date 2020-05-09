import React from 'react';
import {loadStripe} from '@stripe/stripe-js'

import stripeConfig from '../config/stripe'; //Importando nossas stripes

//Código abaixo disponivél na documentação!
const stripePromise = loadStripe(stripeConfig.publicKey); //Chave publica adicionada da nossa stripe


function CheckoutButton( { skuId, itemName } ) { //Recebe o produto junto com ID e nome
  async function handleClick() {
    console.log('ENTREI NO handleClick')

    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      items: [ {sku: 'skuId', quantity: 1} ],
      successUrl: `http://localhost:3000/sucess?itemName=${itemName}`,
      cancelUrl: `http://localhost:3000/cancel`,
    });

    if(error){
      console.log(error);
    }else{
      console.log('NÃO EXISTE ERRO!')
    }
    
  };
  return ( 
    <button role="link" onClick={handleClick}>
      Comprar
    </button>
  );
}

export default CheckoutButton;