def includeme(config):
                """Add routes to the config."""
                config.add_static_view('static', 'static', cache_max_age=3600)
                
                # Default route
                config.add_route('home', '/')
                
                # Mahasiswa routes dengan request_method untuk membedakan endpoint dengan URL yang sama
                config.add_route('mahasiswa_list', '/api/mahasiswa')
                config.add_route('mahasiswa_add', '/api/mahasiswa')
                config.add_route('mahasiswa_detail', '/api/mahasiswa/{id}')
                config.add_route('mahasiswa_update', '/api/mahasiswa/{id}')
                config.add_route('mahasiswa_delete', '/api/mahasiswa/{id}')
                config.add_route('kegiatan_list', '/api/kegiatan')
                config.add_route('kegiatan_detail', '/api/kegiatan/{id}')
