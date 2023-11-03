// import Listing from '../components/offers/chakraui/Listing';
import Listing from '../components/offers/daisyui/Listing';

export default function Listings() {
  return (
    // <div className="">
    //   <Listing />
    // </div>
    <div className="flex flex-row gap-3 justify-between flex-wrap">
      <Listing />
      <Listing />
      <Listing />
      <Listing />
      <Listing />
      <Listing />
      <Listing />
    </div>
  );
}
