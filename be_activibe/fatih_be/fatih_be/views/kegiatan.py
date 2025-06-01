from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound
from datetime import datetime
from ..models import Kegiatan

@view_config(route_name='kegiatan', renderer='json', request_method='GET')
def kegiatan_list(request):
    dbsession = request.dbsession
    all_kegiatan = dbsession.query(Kegiatan).all()
    data = []
    for k in all_kegiatan:
        data.append({
            "id": k.id,
            "nama_kegiatan": k.nama_kegiatan,
            "jenis_kegiatan": k.jenis_kegiatan,
            "tanggal": k.tanggal.isoformat(),
            "jam_mulai": k.jam_mulai.strftime("%H:%M"),
            "jam_selesai": k.jam_selesai.strftime("%H:%M"),
        })  
    return {"status": "success", "data": data}

@view_config(route_name='kegiatan_edit', renderer='json', request_method='PUT')
def kegiatan_edit(request):
    id = int(request.matchdict['id'])
    data = request.json_body
    kegiatan = request.dbsession.query(Kegiatan).filter_by(id=id).first()
    if not kegiatan:
        return HTTPNotFound()

    kegiatan.nama_kegiatan = data.get('nama_kegiatan', kegiatan.nama_kegiatan)
    kegiatan.jenis_kegiatan = data.get('jenis_kegiatan', kegiatan.jenis_kegiatan)

    if 'tanggal' in data:
        kegiatan.tanggal = datetime.strptime(data['tanggal'], "%Y-%m-%d").date()
    if 'jam_mulai' in data:
        kegiatan.jam_mulai = datetime.strptime(data['jam_mulai'], "%H:%M").time()
    if 'jam_selesai' in data:
        kegiatan.jam_selesai = datetime.strptime(data['jam_selesai'], "%H:%M").time()

    request.dbsession.flush()
    request.dbsession.commit()  # Commit perubahan agar tersimpan

    return {
        "status": "success",
        "data": {
            "id": kegiatan.id,
            "nama_kegiatan": kegiatan.nama_kegiatan,
            "jenis_kegiatan": kegiatan.jenis_kegiatan,
            "tanggal": kegiatan.tanggal.isoformat(),
            "jam_mulai": kegiatan.jam_mulai.strftime("%H:%M"),
            "jam_selesai": kegiatan.jam_selesai.strftime("%H:%M"),
        }
    }

@view_config(route_name='kegiatan_delete', renderer='json', request_method='DELETE')
def kegiatan_delete(request):
    id = int(request.matchdict['id'])
    kegiatan = request.dbsession.query(Kegiatan).filter_by(id=id).first()
    if not kegiatan:
        return HTTPNotFound()

    request.dbsession.delete(kegiatan)
    request.dbsession.flush()
    request.dbsession.commit()  # Commit hapus agar permanen

    return {"status": "success", "message": "Kegiatan berhasil dihapus"}

@view_config(route_name='kegiatan_status_summary', renderer='json', request_method='GET')
def kegiatan_status_summary(request):
    dbsession = request.dbsession
    now = datetime.now()

    all_kegiatan = dbsession.query(Kegiatan).all()

    # Hitung jumlah berdasarkan status
    stats = {
        "Sedang Berlangsung": 0,
        "Akan Datang": 0,
        "Selesai": 0,
    }

    for k in all_kegiatan:
        mulai = datetime.combine(k.tanggal, k.jam_mulai)
        selesai = datetime.combine(k.tanggal, k.jam_selesai)
        if now < mulai:
            stats["Akan Datang"] += 1
        elif mulai <= now <= selesai:
            stats["Sedang Berlangsung"] += 1
        else:
            stats["Selesai"] += 1

    data = [
        {"label": "Sedang Berlangsung", "value": stats["Sedang Berlangsung"]},
        {"label": "Akan Datang", "value": stats["Akan Datang"]},
        {"label": "Selesai", "value": stats["Selesai"]},
    ]

    return {"status": "success", "data": data}

@view_config(route_name='kegiatan', renderer='json', request_method='POST')
def kegiatan_create(request):
    dbsession = request.dbsession
    try:
        data = request.json_body
        nama = data.get("nama_kegiatan")
        jenis = data.get("jenis_kegiatan")
        tanggal_str = data.get("tanggal")
        jam_mulai_str = data.get("jam_mulai")
        jam_selesai_str = data.get("jam_selesai")

        if not all([nama, jenis, tanggal_str, jam_mulai_str, jam_selesai_str]):
            return Response(
                json_body={"status": "error", "message": "Data tidak lengkap"},
                status=400,
                content_type='application/json'
            )

        tanggal = datetime.strptime(tanggal_str, "%Y-%m-%d").date()
        jam_mulai = datetime.strptime(jam_mulai_str, "%H:%M").time()
        jam_selesai = datetime.strptime(jam_selesai_str, "%H:%M").time()

        kegiatan = Kegiatan(
            nama_kegiatan=nama,
            jenis_kegiatan=jenis,
            tanggal=tanggal,
            jam_mulai=jam_mulai,
            jam_selesai=jam_selesai,
        )

        dbsession.add(kegiatan)
        dbsession.commit()

        return {
            "status": "success",
            "data": {
                "id": kegiatan.id,
                "nama_kegiatan": kegiatan.nama_kegiatan,
                "jenis_kegiatan": kegiatan.jenis_kegiatan,
                "tanggal": kegiatan.tanggal.isoformat(),
                "jam_mulai": kegiatan.jam_mulai.strftime("%H:%M"),
                "jam_selesai": kegiatan.jam_selesai.strftime("%H:%M"),
            }
        }
    except Exception as e:
        dbsession.rollback()
        return Response(
            json_body={"status": "error", "message": str(e)},
            status=500,
            content_type='application/json'
        )

# Handler OPTIONS untuk preflight CORS di semua route kegiatan
@view_config(route_name='kegiatan', request_method='OPTIONS')
@view_config(route_name='kegiatan_edit', request_method='OPTIONS')
@view_config(route_name='kegiatan_delete', request_method='OPTIONS')
def kegiatan_options(request):
    response = Response()
    response.status_code = 200
    response.headers.update({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '1728000',
    })
    return response
