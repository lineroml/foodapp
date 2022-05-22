import Header from './components/header';

function App() {
  return (
    <div className='App w-full h-full '>
      <Header />
      <div className='h-screen w-full bg-hero-pattern overflow-x-hidden bg-cover bg-no-repeat'>
        <div className='w-full h-full bg-white opacity-60'></div>
      </div>
    </div>
  );
}

export default App;
