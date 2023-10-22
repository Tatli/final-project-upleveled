// import Offer from '../components/offers/chakraui/Offer';
import Offer from '../components/offers/daisyui/Offer';

export default function Offers() {
  return (
    // <div className="">
    //   <Offer />
    // </div>
    <div className="flex flex-row gap-3 justify-between flex-wrap">
      <Offer />
      <Offer />
      <Offer />
      <Offer />
      <Offer />
      <Offer />
      <Offer />
    </div>
  );
}
