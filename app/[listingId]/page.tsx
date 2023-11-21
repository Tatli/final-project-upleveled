import DisplaySingleListing from '../components/DisplaySingleListing';

export default function page({ params }) {
  console.log('params inside [listingId]: ', params);
  const listingId = params.listingId;
  return (
    <>
      <DisplaySingleListing listingId={listingId} />
    </>
  );
}
