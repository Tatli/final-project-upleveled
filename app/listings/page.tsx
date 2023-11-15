import UserListings from './UserListings';

export default function Listings() {
  return (
    <section className="mx-2 sm:mx-8 lg:mx-24 2xl:mx-40">
      <h1 className="text-2xl mx-auto">Overview</h1>
      <div className="grid grid-cols-12">
        <div className="col-span-1" />
        <div className="col-span-10">
          <div className="grid grid-cols-2">
            <UserListings />
          </div>
        </div>
        <div className="col-span-1" />
      </div>
    </section>
  );
}
