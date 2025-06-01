import datetime
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from fatih_be.models.mahasiswa import Mahasiswa


@view_config(route_name='mahasiswa_list', request_method='GET', renderer='json')
def mahasiswa_list(request):
    """Mengambil daftar semua mahasiswa"""
    dbsession = request.dbsession
    mahasiswas = dbsession.query(Mahasiswa).all()
    return {'mahasiswas': [m.to_dict() for m in mahasiswas]}


@view_config(route_name='mahasiswa_detail', request_method='GET', renderer='json')
def mahasiswa_detail(request):
    """Mengambil detail mahasiswa berdasarkan id"""
    dbsession = request.dbsession
    mahasiswa_id = request.matchdict.get('id')
    mahasiswa = dbsession.query(Mahasiswa).filter_by(id=mahasiswa_id).first()

    if not mahasiswa:
        return HTTPNotFound(json_body={'error': 'Mahasiswa tidak ditemukan'})

    return {'mahasiswa': mahasiswa.to_dict()}


@view_config(route_name='mahasiswa_add', request_method='POST', renderer='json')
def mahasiswa_add(request):
    """Menambahkan mahasiswa baru"""
    try:
        json_data = request.json_body
    except Exception:
        return HTTPBadRequest(json_body={'error': 'Request body harus berupa JSON valid'})

    required_fields = ['nim', 'nama', 'jurusan']
    for field in required_fields:
        if field not in json_data or not json_data[field]:
            return HTTPBadRequest(json_body={'error': f'Field "{field}" wajib diisi'})

    tanggal_lahir = None
    if 'tanggal_lahir' in json_data and json_data['tanggal_lahir']:
        try:
            tanggal_lahir = datetime.datetime.fromisoformat(json_data['tanggal_lahir']).date()
        except ValueError:
            return HTTPBadRequest(json_body={'error': 'Format tanggal lahir tidak valid. Gunakan format YYYY-MM-DD'})

    mahasiswa = Mahasiswa(
        nim=json_data['nim'],
        nama=json_data['nama'],
        jurusan=json_data['jurusan'],
        tanggal_lahir=tanggal_lahir,
        alamat=json_data.get('alamat')
    )

    dbsession = request.dbsession
    dbsession.add(mahasiswa)
    dbsession.flush()

    return {'success': True, 'mahasiswa': mahasiswa.to_dict()}


@view_config(route_name='mahasiswa_update', request_method='PUT', renderer='json')
def mahasiswa_update(request):
    """Mengupdate data mahasiswa berdasarkan id"""
    mahasiswa_id = request.matchdict.get('id')
    dbsession = request.dbsession
    mahasiswa = dbsession.query(Mahasiswa).filter_by(id=mahasiswa_id).first()

    if not mahasiswa:
        return HTTPNotFound(json_body={'error': 'Mahasiswa tidak ditemukan'})

    try:
        json_data = request.json_body
    except Exception:
        return HTTPBadRequest(json_body={'error': 'Request body harus berupa JSON valid'})

    # Update atribut bila ada di JSON
    if 'nim' in json_data:
        mahasiswa.nim = json_data['nim']
    if 'nama' in json_data:
        mahasiswa.nama = json_data['nama']
    if 'jurusan' in json_data:
        mahasiswa.jurusan = json_data['jurusan']
    if 'alamat' in json_data:
        mahasiswa.alamat = json_data['alamat']

    if 'tanggal_lahir' in json_data:
        if json_data['tanggal_lahir']:
            try:
                mahasiswa.tanggal_lahir = datetime.datetime.fromisoformat(json_data['tanggal_lahir']).date()
            except ValueError:
                return HTTPBadRequest(json_body={'error': 'Format tanggal lahir tidak valid. Gunakan format YYYY-MM-DD'})
        else:
            mahasiswa.tanggal_lahir = None

    return {'success': True, 'mahasiswa': mahasiswa.to_dict()}


@view_config(route_name='mahasiswa_delete', request_method='DELETE', renderer='json')
def mahasiswa_delete(request):
    """Menghapus mahasiswa berdasarkan id"""
    mahasiswa_id = request.matchdict.get('id')
    dbsession = request.dbsession
    mahasiswa = dbsession.query(Mahasiswa).filter_by(id=mahasiswa_id).first()

    if not mahasiswa:
        return HTTPNotFound(json_body={'error': 'Mahasiswa tidak ditemukan'})

    dbsession.delete(mahasiswa)

    return {'success': True, 'message': f'Mahasiswa dengan id {mahasiswa_id} berhasil dihapus'}
