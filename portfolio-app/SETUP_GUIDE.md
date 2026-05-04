# Portfolio App - Setup Guide

Portfolio application dengan Django REST Framework backend dan React frontend.

## Struktur Folder
```
portfolio-app/
├── backend/          # Django REST API
│   ├── api/         # API endpoints & models
│   ├── backend/     # Django settings
│   └── db.sqlite3   # Database
└── frontend/        # React application
    └── src/
        ├── components/   # React components
        └── services/     # API service
```

## Cara Menjalankan

### 1. Backend (Django)

Dari root folder `portfolio-app`, jalankan:

```bash
cd portfolio-app\backend
python manage.py runserver
```

Backend akan berjalan di: **http://localhost:8000**

- Admin panel: http://localhost:8000/admin/
- API endpoints: http://localhost:8000/api/

### 2. Frontend (React)

Buka terminal baru, dari root folder `portfolio-app`, jalankan:

```bash
cd portfolio-app\frontend
npm start
```

Frontend akan berjalan di: **http://localhost:3000**

## API Endpoints

Backend menyediakan endpoints berikut:

- `/api/profile/` - Profile/About info
- `/api/social-links/` - Social media links
- `/api/experiences/` - Work experience
- `/api/skills/` - Skills & technologies
- `/api/projects/` - Portfolio projects
- `/api/approaches/` - Development approaches

## Komponen Frontend

Komponen React yang sudah dibuat:

1. **Profile.jsx** - Menampilkan profile, bio, dan social links
2. **Experience.jsx** - Menampilkan work experience
3. **Skills.jsx** - Menampilkan skills dikelompokkan berdasarkan category
4. **Projects.jsx** - Menampilkan portfolio projects dalam grid

## Dependencies

### Backend
- Django 6.0.4
- djangorestframework
- django-cors-headers

### Frontend
- React
- axios (untuk API calls)
- react-router-dom (untuk routing)

## Next Steps

1. Tambahkan data melalui Django admin panel (http://localhost:8000/admin/)
2. Frontend akan secara otomatis menampilkan data dari backend
3. Customize styling di `frontend/src/App.css`
4. Tambah komponen baru sesuai kebutuhan

## Troubleshooting

**CORS errors**: Pastikan `django-cors-headers` sudah terinstall dan CORS sudah dikonfigurasi di `backend/settings.py`

**Connection refused**: Pastikan backend Django sudah berjalan di port 8000

**Data tidak muncul**: Pastikan sudah ada data di database melalui Django admin panel
