import DisplaySingleListing from '../components/DisplaySingleListing';

export default function page({ params }) {
  const listingId = params.listingId;
  return <DisplaySingleListing listingId={listingId} />;
}
