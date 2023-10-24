import Image from 'next/image';

export default function Settings() {
  return (
    <div className={`grid grid-cols-12 pt-16`}>
      <div className={`col-span-2`}>
        <h1 className={`text-5xl pb-4`}>Settings</h1>
        <hr />
        <br />
        <ul>
          <li className={`text-primary`}>Profile</li>
        </ul>
      </div>
      <div className={`col-span-1`}></div>
      <div className={`col-span-5`}>
        <h1 className={`text-5xl pb-4`}>Profile</h1>
        <hr />
        <br />
        <h2 className={`text-3xl pb-2`}>Personal Information</h2>
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
          <h2 className={`text-3xl my-2`}>Address</h2>
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
          <h2 className={`text-3xl my-2`}>Private information</h2>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <div className={`join`}>
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
          <div className={`join`}>
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

      <div className={`col-span-2 mt-24`}>
        <div className={`flex flex-col`}>
          <h2 className={`text-3xl mb-8`}>Profile picture</h2>
          <Image
            src="/images/profile/default-male.jpg"
            width={285}
            height={516}
            alt="Picture of the user"
          ></Image>
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary w-full mt-2"
          />
          <h2 className={`text-3xl my-4`}>Profile type</h2>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Private</span>
              <input
                type="radio"
                name="profileType"
                className="radio checked:bg-primary"
                checked
              />
            </label>
          </div>
          <div className="form-control">
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
      <div className={`col-span-1`}></div>
    </div>
  );
}
