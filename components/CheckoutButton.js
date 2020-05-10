import React from 'react';
import {loadStripe} from '@stripe/stripe-js'

import stripeConfig from '../config/stripe'; //Importando nossas stripes

//Código abaixo disponivél na documentação!
const stripePromise = loadStripe(stripeConfig.publicKey); //Chave publica adicionada da nossa stripe


function CheckoutButton( { skuId, itemName } ) { //Recebe o produto junto com ID e 
  async function handleClick() {

    
    console.log('skuId = ', skuId)
    console.log('itemName = ',itemName)
    console.log('ENTREI NO handleClick')

    const stripe = await stripePromise;
    console.log('PASSEI DA AWAIT STRIPEPROMISE')
    
    const { error } = await stripe.redirectToCheckout({
      items: [{ sku: skuId , quantity: 1 }],
      successUrl: `https://localhost:3000/success?itemName=${itemName}`,
      cancelUrl: 'http://localhost:3000/cancel',
    });
    console.log('PASSAMOS DO STRIPE.REDIRECT')
    if(error){
      console.log('ERRO MEU PARCEIRO: ', error);
    }
    
  };
  return ( 
    <button role="link" onClick={handleClick}>
      Comprar
    </button>
  );
}

export default CheckoutButton;