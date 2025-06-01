from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker, scoped_session
from .models import Base
from pyramid.events import NewResponse
from pyramid.events import subscriber
from pyramid.response import Response

@subscriber(NewResponse)
def add_cors_headers(event):
    response = event.response
    response.headers.update({
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '1728000',
    })

# View untuk handle OPTIONS (preflight) agar tidak 404
def options_handler(request):
    return Response(status=200)

def main(global_config, **settings):
    engine = engine_from_config(settings, 'sqlalchemy.')
    session_factory = sessionmaker(bind=engine)
    db_session = scoped_session(session_factory)

    def get_dbsession(request):
        return db_session

    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('.models')
        config.include('.routes')

        config.add_request_method(get_dbsession, 'dbsession', reify=True)
        config.add_subscriber(add_cors_headers, NewResponse)

        # Routes
        config.add_route('kegiatan', '/kegiatan')
        config.add_route('kegiatan_edit', '/kegiatan/{id}'  )
        config.add_route('kegiatan_delete', '/kegiatan/{id}/delete')
        config.add_route('kegiatan_status_summary', '/kegiatan/status_summary')
        config.add_route('register', '/register')
        config.add_route('login', '/login')


        config.scan()

    Base.metadata.create_all(engine)

    return config.make_wsgi_app()
