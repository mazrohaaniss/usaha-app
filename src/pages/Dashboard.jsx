import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function Dashboard() {
  const [usahaList, setUsahaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsaha();
  }, []);

  async function fetchUsaha() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('usaha').select('*');
      if (error) throw error;
      setUsahaList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (confirm('Yakin ingin menghapus data ini?')) {
      try {
        const { error } = await supabase.from('usaha').delete().eq('id', id);
        if (error) throw error;
        fetchUsaha();
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  }

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daftar Usaha</h2>
      <div className="grid gap-4">
        {usahaList.length === 0 ? (
          <p>Tidak ada data usaha.</p>
        ) : (
          usahaList.map((usaha) => (
            <div key={usaha.id} className="border p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{usaha.nama_usaha}</h3>
              <p>Pemilik: {usaha.pemilik}</p>
              <p>Lokasi: {usaha.lokasi}</p>
              <p>No. WA: {usaha.no_wa}</p>
              <p>Deskripsi: {usaha.deskripsi || '-'}</p>
              <div className="mt-2 space-x-2">
                <Link to={`/edit/${usaha.id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(usaha.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;