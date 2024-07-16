import { login } from "@/serverActions"

function page() {
  return (
    <div>
      <div className="mx-auto flex h-screen max-w-lg flex-col md:max-w-none md:flex-row md:pr-10">
  <div className="max-w-md rounded-3xl bg-gradient-to-t from-blue-700 via-blue-700 to-blue-600 px-4 py-10 text-white sm:px-10 md:m-6 md:mr-8">
    <p className="mb-20 font-bold tracking-wider">Vendor Central</p>
    <p className="mb-4 text-3xl font-bold md:text-4xl md:leading-snug">
      Start your <br />
      journey with us
    </p>
    <p className="mb-28 leading-relaxed text-gray-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nisi voluptas a officia. Omnis.</p>
   
  </div>
  <div className="px-4 py-20">
    <h2 className="mb-2 text-3xl font-bold">Sign Up</h2>
    <a href="#" className="mb-10 block font-bold text-gray-600">Have an account</a>
    
    <p className="mb-1 font-medium text-gray-500">Email</p>
    <div className="mb-4 flex flex-col">
      <div className="focus-within:border-blue-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
        <input  id="email" name="email" type="email" required 
        className="w-full border-gray-300 bg-white px-4 
        py-2 text-base text-gray-700 placeholder-gray-400 
        focus:outline-none" placeholder="Enter your email" />
      </div>
    </div>
    <p className="mb-1 font-medium text-gray-500">Password</p>
    <div className="mb-4 flex flex-col">
      <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
        <input id="password" name="password" type="password" required
         className="w-full border-gray-300 bg-white px-4 py-2 
         text-base text-gray-700 placeholder-gray-400 
         focus:outline-none" 
         placeholder="Choose a password (minimum 8 characters)" />
      </div>
    </div>
    <button formAction={login} className="hover:shadow-blue-600/40 rounded-xl
     bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-3 
     font-bold text-white transition-all hover:opacity-90 
     hover:shadow-lg">Sign Up</button>
  </div>
</div>

    </div>
  )
}

export default page