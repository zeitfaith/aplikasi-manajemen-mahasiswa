from sqlalchemy import Column, Integer, String, Date, Time
from .base import Base  # impor Base dari base.py, bukan dari __init__.py

class Kegiatan(Base):
    __tablename__ = 'kegiatan'

    id = Column(Integer, primary_key=True)
    nama_kegiatan = Column(String(255), nullable=False)
    jenis_kegiatan = Column(String(100), nullable=False)
    tanggal = Column(Date, nullable=False)
    jam_mulai = Column(Time, nullable=False)
    jam_selesai = Column(Time, nullable=False)
