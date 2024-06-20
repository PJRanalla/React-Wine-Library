import Background from '../assets/images/wine-gallery.jpeg'

function Home() {
  return (
    <div
      style={{ backgroundImage: `url(${ Background })`}}
      className='flex flex-row justify-center mx-auto bg-cover bg-fixed'
      >
        <div className='flex place-items-center h-screen'>
          <h1 className='p-10 bg-black bg-opacity-80 text-white rounded'>Welcome Back To Your Wine Library</h1>
        </div>
    </div>
  )
}

export default Home
