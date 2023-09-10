import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Coins from "./Componenet/Coins";
import Exchanges from "./Componenet/Exchanges";
import CoinDetails from "./Componenet/CoinDetails";
import Home from "./Componenet/Home";
import Header from "./Componenet/Header";


const App = () => {
  return (
    <>
          <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>


    </Router>
    </>
  );
};

export default App;







// firrst pura complete hone ke baad mene github se code me index.js me api export ki get kari exchnge.js ne
// data store krna we use empty arry anad useetate 
// we make another usestate in exhange for loading case
// and we use ternary opertor also  in load me
// we  make loader compont
// and we make error component  when  we show error whrnen api not fetch  or work , bss
// now we me  make coin.jsx componenet  then  copy alll  of exchange .jsx  data   and also make coincard componenet  and imporet to coin.jsx kiske badle  exchangecard ko replace karke kuiki baar baar reapeat horaha tha  vo bhi coin.jsx me



//   nesterd ternary opertor

// const currency=()=>
// currency === 'inr' ?  "₹" : currency=== 'eur'  ? "€" : "$"

// now we do paggination maeans  button baneke 1 to 132 tk page me jayge  in coiin.js


// now pegination ke baad  coindetail  componsnt baneyga baneyge  means jese click karga kisi pe  uski greap hua aur bhi stuff ayge eah pe chart ragega


// const [coins, setCoins] = useState({});   imp yeh chich coins detail me object ke form me data legi 
//fetch api in object 
// same all ki tarah usestate hogi 
//  same loading  concept inside container
//set api first  kha se li useffect ka pura diy acoin.jsx se  and uimport ki id 
//params of react router dom
// and chnges api me  ki jo bhi apan click karge usko detail show ho
// rdio grp bhi import kiya 
// ky7a rha loder hai loading show karo auger nahi hai box ke content show karo  and  importnat hai har 2 hour ya 2 days ya jitne din data hoga vo achived krna hoga