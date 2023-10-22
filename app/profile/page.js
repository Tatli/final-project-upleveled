import Image from 'next/image';

export default function Profile() {
  return (
    <div className={`grid grid-cols-12 pt-16`}>
      <div className={`col-span-3`}>
        <h1 className={`text-4xl pb-4`}>Settings</h1>
        <hr />
        <br />
        <ul>
          <li>Profile</li>
          <li>Password</li>
        </ul>
      </div>
      <div className={`col-span-1`}>1/12</div>
      <div className={`col-span-4`}>
        <h1 className={`text-4xl pb-4`}>Profile</h1>
        <hr />
        <br />
        <h2 className={`text-2xl pb-2`}>Personal Information</h2>
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
          <h2 className={`text-2xl my-2`}>Address</h2>
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
          <h2 className={`text-2xl my-2`}>Contact</h2>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="your@email.xyz"
            className="input input-bordered w-full mb-2"
          />
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="text"
            placeholder="06XX 123 456 78"
            className="input input-bordered w-full mb-2"
          />
        </div>
      </div>

      <div className={`col-span-1`}>1/12</div>

      <div className={`col-span-2 mt-20`}>
        <div className={`flex flex-col`}>
          <h2 className={`text-2xl mb-8`}>Profile picture</h2>
          <Image
            src="/images/profile/default-male.jpg"
            width={228}
            height={224}
            alt="Picture of the user"
          ></Image>
          <button className="btn btn-primary my-4">Upload Image</button>

          <h2 className={`text-2xl my-4`}>Profile type</h2>
          <label for="profileType">
            <input
              type="radio"
              id="private"
              name="profileType"
              className={`radio radio-primary`}
              value="p"
            />
            Private
          </label>

          <label for="profileType">
            <input
              type="radio"
              id="commercial"
              name="profileType"
              className={`radio radio-primary`}
              value="c"
            />
            Commercial
          </label>
        </div>
      </div>
      <div className={`col-span-1`}>1/12</div>
    </div>
  );
}
