// import Listing from '../components/offers/chakraui/Listing';
import Listing from '../components/offers/daisyui/Listing';

export default function Listings() {
  return (
    // <div className="">
    //   <Listing />
    // </div>
    <section className="mx-2 sm:mx-8 lg:mx-24 2xl:mx-40">
      <div className="flex flex-row gap-3 justify-between flex-wrap">
        <Listing />
        <Listing />
        <Listing />
        <Listing />
        <Listing />
        <Listing />
        <Listing />
      </div>
    </section>
  );
}
