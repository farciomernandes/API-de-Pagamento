import Stripe from 'stripe';
import stripeConfig from '../config/stripe';

export async function getStaticProps(){ //Função que realiza a busca de dados no stripe
  const stripe = new Stripe(stripeConfig.secretKey, { //Usa a chave secreta de stripe
      apiVersion:'2020-03-02'
  });

  const skus = await stripe.skus.list() //Recebe um array com a lista de produtos 

  return{ //Retorna todos os produtos recebidos na lista
      props:{
        skus: skus.data //Uso de data para pegar apenas as informações importantes para o uso
      }
  };
}

function Home({ skus }) {
  return ( // <> = Fragment
    <> 
      <h1>Simple Stripe Store</h1>
      <hr/>

      {skus.map(sku =>( //Map retornando uma JSX
        <div key={sku.id}>
           <h2>{sku.attributes.name}</h2>

            {sku.image && <img src={sku.image}
            style={{
            width:'200px'
            }} />}

            <h3>{Number(sku.price/100).toFixed(2)} {sku.currency.toUpperCase()}</h3>
            <a href={`/${sku.id}`}> Ver item </a>


          <hr />
        </div>
      ))}
     
    </>    
  )
}

export default Home;