import React from 'react';
import Stripe from 'stripe';
import CheckoutButton from '../components/CheckoutButton';

import stripeConfig from '../config/stripe';

export async function getStaticPaths(){ //Função que realiza a busca de dados no stripe
    const stripe = new Stripe(stripeConfig.secretKey, { //Usa a chave secreta de stripe
        apiVersion:'2020-03-02'
    });

    const skus = await stripe.skus.list() //Recebe um array com a lista de produtos 


    const paths = skus.data.map((sku) =>({ //Para cada produto recebido execute a função
        params:{
            skuId: sku.id, //Retorne o valor do ID dos produtos para skuId (http atual vira um array de ids)
        } ,
    }))


    return{ //Retorno obrigatório com a tipagem
        paths,
        fallback:false
    };
}

export const getStaticProps = async ( {params} )=>{ //Conteúdo retornado para a página após a consulta
    const stripe = new Stripe(stripeConfig.secretKey, { //Usa a chave secreta de stripe
        apiVersion:'2020-03-02'
    });

    const { skuId } = params;

    const sku = await stripe.skus.retrieve(skuId); //Recebe o data do SKU referente ao ID passado no params
     


    return{ 
        props: { //Props é o conteúdo propriamente dito para a página
            sku
        } 
    }
}

 

function Product({ sku }){ //Função de retorno utilizando as infos
    return( 
        <div>
            <h2>{sku.attributes.name}</h2>

            {sku.image && <img src={sku.image}
            style={{
                width:'200px'
            }} />}
            <h3>{Number(sku.price/100).toFixed(2)} {sku.currency.toUpperCase()}</h3>

            <CheckoutButton skuId={sku.id} itemName={sku.attributes.name} />
            
            <br /> <br />
            <a href="/"> Voltar </a>
        </div>
    )
}

export default Product;