import React from 'react';

export default function Hero() {
  return (
    <section>
      <div
        className="flex justify-center align-center py-20 bg-primary text-white overflow-hidden h-96 min-h-96 max-h-96"

        // style={{
        //   height: '408px',
        //   minHeight: '480px',
        //   maxHeight: '480px',
        // }}
      >
        <div
        // className="bg-gradient-to-r from-cyan-500 to-blue-500"
        // className={`[url('/public/images/home/hero/hero_cropped.jpg')]`}
        >
          div containing image url
        </div>
        {/* <img
            src="images/home/hero/hero_cropped.jpg"
            width="100%"
            alt="Hero"
          /> */}
        <div>
          <form>
            <div>
              <p className="align-center">Use your second chance, Firsthand</p>
            </div>
            <div>
              <label>
                Search
                <input type="text" />
              </label>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
