import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function EditData() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_usaha: '',
    pemilik: '',
    lokasi: '',
    no_wa: '',
    deskripsi: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsaha();
  }, []);

  async function fetchUsaha() {
    try {
      const { data, error } = await supabase.from('usaha').select('*').eq('id', id).single();
      if (error) throw error;
      setFormData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('usaha').update(formData).eq('id', id);
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Usaha</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block">Nama Usaha</label>
          <input
            type="text"
            name="nama_usaha"
            value={formData.nama_usaha}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block">Pemilik</label>
          <input
            type="text"
            name="pemilik"
            value={formData.pemilik}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block">Lokasi</label>
          <input
            type="text"
            name="lokasi"
            value={formData.lokasi}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block">No. WA</label>
          <input
            type="text"
            name="no_wa"
            value={formData.no_wa}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Simpan
        </button>
      </form>
    </div>
  );
}

export default EditData;