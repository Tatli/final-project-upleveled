import { DrawerExample } from './components/chakraui/DrawerExample';

export default function Home() {
  return (
    <main>
      <DrawerExample />
      <section>
        <div
          className={
            'bg-slate-700 sm:bg-slate-600 lg:bg-slate-500 2xl:bg-slate-400'
          }
        >
          -
        </div>
      </section>
      <section>
        <div
          className={
            'bg-slate-600 sm:bg-slate-500 lg:bg-slate-400 2xl:bg-slate-300'
          }
        >
          -
        </div>
      </section>
      <section>
        <div
          className={
            'bg-slate-500 sm:bg-slate-400 lg:bg-slate-300 2xl:bg-slate-200'
          }
        >
          -
        </div>
      </section>
    </main>
  );
}
