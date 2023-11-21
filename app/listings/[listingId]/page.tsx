import { EditUserListingPropParams } from '../../../util/types';
import EditUserListing from '../../components/EditUserListing';

export default function Listing({
  params,
}: {
  params: EditUserListingPropParams;
}) {
  const listingId: string = params.listingId;
  const numericListingId: number = parseInt(listingId);
  return (
    <div className="grid grid-cols-12 pt-16">
      <div className="sm:col-span-1 xl:col-span-2 2xl:col-span-3" />

      <EditUserListing listingId={numericListingId} />

      <div className="mt-24 sm:col-span-1 xl:col-span-2 2xl:col-span-3" />
    </div>
  );
}
