import React, { useState, useEffect } from "react";

const KegiatanList = () => {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fungsi fetch data kegiatan dari backend
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:6543/kegiatan");
      if (!res.ok) throw new Error(`Gagal fetch data: ${res.status}`);
      const data = await res.json();
      if (data.status !== "success")
        throw new Error(data.message || "Fetch gagal");

      // Normalisasi key agar camelCase sesuai frontend
      const normalized = data.data.map((item) => ({
        ...item,
        jamMulai: item.jam_mulai,
        jamSelesai: item.jam_selesai,
      }));
      setKegiatan(normalized);
    } catch (err) {
      setError(err.message);
      setKegiatan([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi update kegiatan (edit)
  const handleEdit = async (updatedKegiatan) => {
    try {
      const res = await fetch(
        `http://localhost:6543/kegiatan/${updatedKegiatan.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nama_kegiatan: updatedKegiatan.nama_kegiatan,
            jenis_kegiatan: updatedKegiatan.jenis_kegiatan,
            tanggal: updatedKegiatan.tanggal,
            jam_mulai: updatedKegiatan.jamMulai,
            jam_selesai: updatedKegiatan.jamSelesai,
          }),
        }
      );
      if (!res.ok) throw new Error(`Gagal update kegiatan: ${res.status}`);

      // Update lokal state
      setKegiatan((prev) =>
        prev.map((k) =>
          k.id === updatedKegiatan.id ? { ...k, ...updatedKegiatan } : k
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  // Fungsi hapus kegiatan
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus kegiatan ini?")) return;
    try {
      const res = await fetch(`http://localhost:6543/kegiatan/${id}/delete`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Gagal hapus kegiatan: ${res.status}`);

      setKegiatan((prev) => prev.filter((k) => k.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const statusLabel = {
    "Sedang Berlangsung": "kegiatan-status-sedang-berlangsung", // Teal color
    "Akan Datang": "kegiatan-status-akandatang", // Orange color
    Selesai: "kegiatan-status-selesai", // Dark Blue color
  };

  function getStatusKegiatan(item) {
    if (item.statusManual === "Selesai") return "Selesai";
    const now = new Date();
    const mulai = new Date(`${item.tanggal}T${item.jamMulai || "00:00"}`);
    const selesai = new Date(`${item.tanggal}T${item.jamSelesai || "23:59"}`);
    if (now < mulai) return "Akan Datang";
    if (now >= mulai && now <= selesai) return "Sedang Berlangsung";
    return "Selesai";
  }

  return (
    <div>
      <h2 style={{ marginBottom: "1.5rem", color: "var(--primary)" }}>
        Daftar Kegiatan
      </h2>

      {loading && <p>Memuat data kegiatan...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && kegiatan.length === 0 && (
        <p>Tidak ada kegiatan.</p>
      )}

      <ul className="kegiatan-list" style={{ listStyle: "none", padding: 0 }}>
        {kegiatan.map((item) => {
          const status = getStatusKegiatan(item);
          return (
            <li
              key={item.id}
              className={`kegiatan-card ${statusLabel[status] || "default"}`}
              style={{
                border: "1px solid #ddd",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  marginBottom: 6,
                }}
              >
                {item.nama_kegiatan}
              </div>
              <div>
                <span
                  className={`kegiatan-badge`}
                  style={{
                    marginRight: 12,
                    padding: "0.2em 0.5em",
                    borderRadius: "4px",
                    backgroundColor: "#eee",
                  }}
                >
                  {status}
                </span>
                <span style={{ marginRight: 12 }}>
                  <i className="fa fa-calendar" style={{ marginRight: 6 }}></i>
                  {item.tanggal}
                </span>
                <span style={{ marginRight: 12 }}>
                  <i className="fa fa-clock" style={{ marginRight: 6 }}></i>
                  {item.jamMulai && item.jamSelesai
                    ? `${item.jamMulai} - ${item.jamSelesai}`
                    : item.jamMulai || item.jamSelesai || "-"}
                </span>
                <span>Jenis: {item.jenis_kegiatan}</span>
              </div>
              <div style={{ marginTop: 10 }}>
                <button
                  onClick={() => {
                    const nama_kegiatan = prompt(
                      "Edit Nama Kegiatan:",
                      item.nama_kegiatan
                    );
                    if (!nama_kegiatan) return;
                    const jenis_kegiatan = prompt(
                      "Edit Jenis Kegiatan:",
                      item.jenis_kegiatan
                    );
                    if (!jenis_kegiatan) return;
                    const tanggal = prompt(
                      "Edit Tanggal (YYYY-MM-DD):",
                      item.tanggal
                    );
                    if (!tanggal) return;
                    const jamMulai = prompt(
                      "Edit Jam Mulai (HH:mm):",
                      item.jamMulai
                    );
                    if (!jamMulai) return;
                    const jamSelesai = prompt(
                      "Edit Jam Selesai (HH:mm):",
                      item.jamSelesai
                    );
                    if (!jamSelesai) return;

                    handleEdit({
                      ...item,
                      nama_kegiatan,
                      jenis_kegiatan,
                      tanggal,
                      jamMulai,
                      jamSelesai,
                    });
                  }}
                  style={{
                    marginRight: "0.5rem",
                    backgroundColor: "#f7b32b",
                    border: "none",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    backgroundColor: "#e63946",
                    color: "white",
                    border: "none",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  Hapus
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default KegiatanList;
