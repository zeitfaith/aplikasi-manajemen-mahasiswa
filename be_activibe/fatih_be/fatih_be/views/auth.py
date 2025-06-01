from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import IntegrityError
from passlib.hash import bcrypt_sha256 as bcrypt
from ..models.user import User  # Pastikan path import ini benar

@view_config(route_name='register', renderer='json', request_method='POST')
def register(request):
    dbsession = request.dbsession
    data = request.json_body

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return Response(
            json_body={"status": "error", "message": "Data tidak lengkap"},
            status=400,
            content_type='application/json'
        )
    
    password_hash = bcrypt.hash(password)

    user = User(name=name, email=email, password_hash=password_hash)
    try:
        dbsession.add(user)
        dbsession.commit()
    except IntegrityError:
        dbsession.rollback()
        return Response(
            json_body={"status": "error", "message": "Email sudah digunakan"},
            status=400,
            content_type='application/json'
        )

    return {"status": "success", "message": "Registrasi berhasil"}

@view_config(route_name='register', request_method='OPTIONS')
def register_options(request):
    response = Response()
    response.status_code = 200
    response.headers.update({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '1728000',
    })
    return response


@view_config(route_name='login', renderer='json', request_method='POST')
def login(request):
    dbsession = request.dbsession
    data = request.json_body

    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return Response(
            json_body={"status": "error", "message": "Email dan password harus diisi"},
            status=400,
            content_type='application/json'
        )

    user = dbsession.query(User).filter_by(email=email).first()
    if not user:
        return Response(
            json_body={"status": "error", "message": "Email atau password salah"},
            status=401,
            content_type='application/json'
        )

    if not bcrypt.verify(password, user.password_hash):
        return Response(
            json_body={"status": "error", "message": "Email atau password salah"},
            status=401,
            content_type='application/json'
        )

    return {
        "status": "success",
        "message": "Login berhasil",
        "data": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
        }
    }


@view_config(route_name='login', request_method='OPTIONS')
def login_options(request):
    response = Response()
    response.status_code = 200
    response.headers.update({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '1728000',
    })
    return response
