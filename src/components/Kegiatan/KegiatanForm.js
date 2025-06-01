import React, { useState } from "react";

const defaultJenis = ["Seminar", "Lomba", "Organisasi"];

const KegiatanForm = ({ onSave }) => {
  const [namaKegiatan, setNamaKegiatan] = useState("");
  const [jenisKegiatan, setJenisKegiatan] = useState(defaultJenis[0]);
  const [tanggal, setTanggal] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [jenisOptions, setJenisOptions] = useState(defaultJenis);
  const [jenisBaru, setJenisBaru] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const kegiatanData = {
      nama_kegiatan: namaKegiatan,
      jenis_kegiatan: jenisKegiatan,
      tanggal,
      jam_mulai: jamMulai, // ubah dari jamMulai ke jam_mulai
      jam_selesai: jamSelesai, // ubah dari jamSelesai ke jam_selesai
    };

    setLoading(true);

    try {
      const response = await fetch("http://localhost:6543/kegiatan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kegiatanData),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const result = await response.json();

      if (result.status === "success") {
        if (typeof onSave === "function") {
          onSave((prev) => [
            ...prev,
            {
              id: result.data.id,
              nama_kegiatan: result.data.nama_kegiatan,
              jenis_kegiatan: result.data.jenis_kegiatan,
              tanggal: result.data.tanggal,
              jamMulai: result.data.jamMulai,
              jamSelesai: result.data.jamSelesai,
            },
          ]);
        }
        // Reset form fields
        setNamaKegiatan("");
        setJenisKegiatan(jenisOptions[0]);
        setTanggal("");
        setJamMulai("");
        setJamSelesai("");
      } else {
        alert("Gagal menyimpan kegiatan: " + result.message);
      }
    } catch (error) {
      console.error("Submit gagal:", error);
      alert("Gagal menyimpan kegiatan, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleTambahJenis = (e) => {
    e.preventDefault();
    const trimmedJenisBaru = jenisBaru.trim();
    if (trimmedJenisBaru && !jenisOptions.includes(trimmedJenisBaru)) {
      setJenisOptions([...jenisOptions, trimmedJenisBaru]);
      setJenisKegiatan(trimmedJenisBaru);
      setJenisBaru("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tambah Kegiatan</h2>

      <div>
        <label>Nama Kegiatan:</label>
        <input
          type="text"
          value={namaKegiatan}
          onChange={(e) => setNamaKegiatan(e.target.value)}
          required
          disabled={loading}
          autoFocus
        />
      </div>

      <div>
        <label>Jenis Kegiatan:</label>
        <select
          value={jenisKegiatan}
          onChange={(e) => setJenisKegiatan(e.target.value)}
          disabled={loading}
        >
          {jenisOptions.map((jenis, idx) => (
            <option key={idx} value={jenis}>
              {jenis}
            </option>
          ))}
        </select>
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <input
            type="text"
            placeholder="Tambah jenis baru"
            value={jenisBaru}
            onChange={(e) => setJenisBaru(e.target.value)}
            style={{ flex: 1 }}
            disabled={loading}
          />
          <button
            onClick={handleTambahJenis}
            type="button"
            disabled={loading}
            style={{ padding: "0.3rem 0.8rem" }}
          >
            +
          </button>
        </div>
      </div>

      <div>
        <label>Tanggal:</label>
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label>Jam Mulai:</label>
          <input
            type="time"
            value={jamMulai}
            onChange={(e) => setJamMulai(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label>Jam Selesai:</label>
          <input
            type="time"
            value={jamSelesai}
            onChange={(e) => setJamSelesai(e.target.value)}
            required
            disabled={loading}
          />
        </div>
      </div>

      <button type="submit" disabled={loading} style={{ marginTop: 12 }}>
        {loading ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
};

export default KegiatanForm;
