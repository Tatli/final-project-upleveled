import React from 'react';

export default function Hero() {
  return (
    <section>
      <div className="flex flex-col justify-center align-baseline py-15 bg-[url('https://images.pexels.com/photos/6069544/pexels-photo-6069544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] text-white overflow-hidden h-96 min-h-96 max-h-96 bg-center	bg-no-repeat bg-cover">
        <div className="flex justify-center">
          <h1 className="mb-6 sm:text-3xl md:text-4xl lg:text-6xl ">
            Rediscover the Joy of First Finds!
          </h1>
        </div>

        <div className="flex justify-center">
          <div className="form-control">
            <div className="input-group border-2 rounded-md border-primary ">
              <input
                type="text"
                placeholder="Find..."
                className="input input-bordered w-96 text-black"
              />
              <button className="btn btn-primary btn-square ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
