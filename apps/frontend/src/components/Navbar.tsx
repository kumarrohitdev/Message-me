
export default function Navbar() {
  return (
    <div className='bg-blue-500 flex justify-between max-w-6xl mx-auto p-6 text-white font-bold items-center'>
        <h1 className="text-2xl">Message me</h1>
        <button className="border-2 p-2 pl-3 pr-3 rounded-md active:bg-gray-800 hover:bg-gray-200 hover:text-black">login</button>
    </div>
  )
}
