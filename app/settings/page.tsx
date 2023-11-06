import { gql } from '@apollo/client';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getClient } from '../../util/apolloClient';

export default async function Settings() {
  // const [profileType, setProfileType] = useState('private');
  const fakeSessionToken = cookies().get('fakeSession');

  const { data } = await getClient().query({
    query: gql`
      query LoggedInUser($username: String!) {
        loggedInUserByUsername(username: $username) {
          id
          username
        }
      }
    `,
    variables: {
      username: fakeSessionToken?.value || '',
    },
  });

  if (!data.loggedInUserByUsername) {
    redirect('/login');
  }

  return (
    <section className="mx-2 sm:mx-8 lg:mx-24 2xl:mx-40">
      <div className="grid grid-cols-12 pt-16">
        <div className="col-span-1">
          <h1 className="text-3xl pb-4">Settings</h1>
          <hr />
          <br />
          <ul>
            <li className="text-primary">Profile</li>
          </ul>
        </div>
        <div className="col-span-1" />
        <div className="col-span-5">
          <h1 className="text-3xl pb-4">Profile</h1>
          <hr />
          <br />
          <h2 className="text-2xl pb-2">Personal Information</h2>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">First name</span>
            </label>
            <input
              type="text"
              placeholder="First name"
              className="input input-bordered w-full mb-2"
            />
            <label className="label">
              <span className="label-text">Last name</span>
            </label>
            <input
              type="text"
              placeholder="Last name"
              className="input input-bordered w-full mb-2"
            />
            <label className="label">
              <span className="label-text">Birth date</span>
            </label>
            <input
              type="date"
              placeholder="Last name"
              className="input input-bordered w-full mb-2"
            />
            {/* ### Address ### */}
            <h2 className="text-2xl my-2">Address</h2>
            <label className="label">
              <span className="label-text">Street</span>
            </label>
            <input
              type="text"
              placeholder="Street"
              className="input input-bordered w-full mb-2"
            />
            <label className="label">
              <span className="label-text">City</span>
            </label>
            <input
              type="text"
              placeholder="City"
              className="input input-bordered w-full mb-2"
            />
            <label className="label">
              <span className="label-text">Country</span>
            </label>
            <input
              type="Country"
              placeholder="Last name"
              className="input input-bordered w-full mb-2"
            />
            <label className="label">
              <span className="label-text">Postal code</span>
            </label>
            <input
              type="Country"
              placeholder="Postal code"
              className="input input-bordered w-full mb-2"
            />
            <h2 className="text-2xl my-2">Private information</h2>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="join">
              <input
                type="email"
                placeholder="your@email.xyz"
                className="input input-bordered join-item w-full mb-2"
              />
              <button className="btn join-item rounded-r-full">Change</button>
            </div>

            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="join">
              <input
                type="password"
                placeholder="password"
                className="input input-bordered join-item w-full mb-2"
              />
              <button className="btn join-item rounded-r-full">Change</button>
            </div>

            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="text"
              placeholder="06XX 123 456 78"
              className="input input-bordered w-full mb-2"
            />
            <button className="btn btn-primary my-4">Save</button>
          </div>
        </div>

        <div className={`col-span-1`}></div>

        <div className="col-span-4">
          <div className="flex flex-col">
            <h2 className="text-2xl mb-8">Profile picture</h2>
            <Image
              src="/images/profile/default-male.jpg"
              width={285}
              height={516}
              alt="Picture of the user"
            />
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-4/6 mt-2"
            />
            <h2 className="text-2xl my-4">Profile type</h2>

            {/* Move this out into a client component for state management */}
            <div className="form-control">
              <div className="w-2/3">
                <label className="label cursor-pointer">
                  <span className="label-text">Private</span>
                  <input
                    type="radio"
                    name="profileType"
                    className="radio checked:bg-primary"
                  />
                </label>
              </div>
              <div className="w-2/3">
                <label className="label cursor-pointer">
                  <span className="label-text">Commercial</span>
                  <input
                    type="radio"
                    name="profileType"
                    className="radio checked:bg-primary"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
