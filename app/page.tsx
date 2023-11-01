import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <section className="mx-0 sm:mx-0 lg:mx-0 2xl:mx-0">
        <div
          className="bg-primary text-white overflow-hidden h-96 min-h-96 max-h-96"
          // style={{
          //   height: '408px',
          //   minHeight: '480px',
          //   maxHeight: '480px',
          // }}
        >
          <div className={`[url('/public/images/home/hero/hero_cropped.jpg')]`}>
            div containing image url
          </div>
          {/* <img
            src="images/home/hero/hero_cropped.jpg"
            width="100%"
            alt="Hero"
          /> */}
          <div>
            <form>
              <label>
                Search
                <input type="text" />
              </label>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

// <section>
//   <div
//     className={
//       'bg-slate-700 sm:bg-slate-600 lg:bg-slate-500 2xl:bg-slate-400'
//     }
//   >
//     -
//   </div>
// </section>
// <section>
//   <div
//     className={
//       'bg-slate-600 sm:bg-slate-500 lg:bg-slate-400 2xl:bg-slate-300'
//     }
//   >
//     -
//   </div>
// </section>
// <section>
//   <div
//     className={
//       'bg-slate-500 sm:bg-slate-400 lg:bg-slate-300 2xl:bg-slate-200'
//     }
//   >
//     -
//   </div>
//   <div className={'2xl:bg-red-500'}>-</div>
// </section>
