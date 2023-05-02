import { Upload } from './components/Upload';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='text-center bg-blue-500 p-10 rounded-lg shadow-2xl'>
        <h1 className='text-3xl font-bold'>
          Mascota
          <button>Crear mascota</button>
        </h1>
        <Upload />
        <p className='pt-5 text-xl'>
          Demo by{' '}
          <a href='https://tpiros.dev' className='underline'>
            Tamas Piros
          </a>
        </p>
      </div>
    </main>
  );
}
