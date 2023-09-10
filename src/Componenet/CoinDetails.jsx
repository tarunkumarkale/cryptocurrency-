
import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState,useEffect } from 'react'
import Loader from './Loader';
import axios from 'axios';
import { server } from '../index';
import {  useParams } from 'react-router-dom';
import ErrorComponent from './ErrorCompoenet';





const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(2);
  const [currency, setCurrency] = useState('inr');

const params=useParams();

const currencySymbol =
currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/${params.id}`
        );
        console.log(data)
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [params.id]);  // when we click it re render new id means box ke under data  jo given below
  new Date().toLocaleString()
  if (error) {
    return < ErrorComponent message='error while fetching coins' />;
  }



  return (
    <Container maxW={"container.xl"}>
{
  loading?<Loader/>:(
    <>
   <Box  width={'full'} borderWidth={1}>

   
     

   </Box>


 {/* button  here chart update kr sake esliye */}

 <RadioGroup value={currency} onChange={(value) => setCurrency(value)} p="8">
          <HStack spacing="4">
            <Radio value="inr">INR</Radio>
            <Radio value="usd">USD</Radio>
            <Radio value="eur">EUR</Radio>
          </HStack>
        </RadioGroup>

<VStack  spacing={"4"} p="16"  alignItems={'flex-start'}>

<Text fontSize={'small'} alignSelf="center" opacity={0.7}>

 Last Update on {Date(coin.market_data.last_updated).split('G')[0]}
 {/*  time update ho rha hai gmt form me 
 
 Last Update on Sun Sep 10 2023 15:29:50 GMT+0530 (India Standard Time)
 G se part ko remove kr diya bss
  */}

    {/*date function alredyu define hota  already  */}
</Text>
<Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />
          <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge
              fontSize={"2xl"}
              bgColor={"blackAlpha.800"}
              color={"white"}
            >{`#${coin.market_cap_rank}`}</Badge>
            {/*  badge actuclyy rank show kr rha */}

            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />
{/*  Custom baar  phele to props ke throuh data share kr rha hai below sabse down se phele thoda   it send high and low  yeh ye bata rha hai ki data high kitna hai and low  data range   follow  symbol 👍 jha declare kiya or props ka use kiya hai  */}



{/* below  sme  props send kr rah ahi  yeah interting stuff same name se bhut sarre same props name send kiy ahai */}
<Box w={"full"} p="4">
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </Box>



</VStack>


    </>
  )
}

    </Container>
  )
}



const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);






// 👍
const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);


export default CoinDetails
