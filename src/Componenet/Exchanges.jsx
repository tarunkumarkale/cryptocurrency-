import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index.js';
import Loader from './Loader.jsx';
import { Container, HStack, VStack, Image, Heading, Text } from '@chakra-ui/react';
import ErrorCompoenet from './ErrorCompoenet.jsx';


const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        console.log(data);
        setLoading(false);
        
      } catch (error) {
        console.log(error);
        seterror(true)
        setLoading(true)
      }
    };
    fetchExchanges();
  }, []);

  if(error)
  return <ErrorCompoenet  message='error while fetching details'/>

  const ExchangeCard = ({ name, img, rank, url }) => (
    <a href={url} target="_blank">
      <VStack
        w="52"
        shadow="xl"
        p="8"
        fontSize={'2xl'}
        color={'black'}
        borderRadius="lg"
       
        transition="all 0.3s"
        m="4"
        
        css={{
          "&:hover": {
            transform: "scale(1.3)",
            filter: "drop-shadow(16px 16px 20px black) invert(20%)"

          },
        }}
      >
        <Image src={img} w="10" h="10" objectFit="contain" alt="Exchange" />
        <Heading size="md" noOfLines={1}>
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );

  return (
    <>
      <Container maxW="container.xl">
        {loading ? (
          <Loader />
        ) : (
          <>
            <HStack wrap="wrap">
              {exchanges.map((exchange) => (
                <ExchangeCard
                  key={exchange.id}
                  name={exchange.name}
                  img={exchange.image}
                  rank={exchange.trust_score_rank}
                  url={exchange.url}
                />
              ))}
            </HStack>
          </>
        )}
      </Container>
    </>
  );
};

export default Exchanges;
