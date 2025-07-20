import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Manajemen Usaha</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-200">Dashboard</Link>
          <Link to="/tambah" className="text-white hover:text-blue-200">Tambah Data</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;