import "react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">FinLite</h1>
        <div className="flex space-x-4">
          <button className="text-gray-700 hover:text-blue-600 font-medium">
            Log in
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}
