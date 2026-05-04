# Django Portfolio Backend - Railway Deployment Guide

## 🚀 Deploy to Railway

### Step 1: Push to GitHub
```bash
cd C:\Users\"Tara Bleisa"\portfolio-app
git add .
git commit -m "Setup backend for Railway deployment"
git push origin master
```

### Step 2: Deploy on Railway
1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select repository: `tarableisa/portofolio-web`
4. Click **"Add variables"** to configure:

### Step 3: Environment Variables
Add these environment variables in Railway:

```
SECRET_KEY=<generate-new-secret-key>
DEBUG=False
ALLOWED_HOSTS=.railway.app
CORS_ALLOWED_ORIGINS=https://portofolio-web-nine-khaki.vercel.app
```

**To generate SECRET_KEY:**
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Step 4: Add PostgreSQL Database
1. In Railway project, click **"New"** → **"Database"** → **"Add PostgreSQL"**
2. Railway will automatically set `DATABASE_URL` environment variable

### Step 5: Deploy!
Railway will automatically:
- Install dependencies from `requirements.txt`
- Run migrations
- Collect static files
- Start gunicorn server

### Step 6: Update Vercel Frontend
After backend is deployed, get the Railway URL (e.g., `https://your-app.railway.app`)

1. Go to Vercel project settings
2. Add environment variable:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://your-app.railway.app/api`
3. Redeploy frontend

### Step 7: Create Superuser
After deployment, run this command in Railway terminal:
```bash
python manage.py createsuperuser
```

Then access admin panel at: `https://your-app.railway.app/admin`

---

## 📝 Files Created for Deployment

- ✅ `requirements.txt` - Python dependencies
- ✅ `Procfile` - Railway/Heroku start command
- ✅ `runtime.txt` - Python version
- ✅ `railway.toml` - Railway configuration
- ✅ `.env.example` - Environment variables template
- ✅ `.gitignore` - Ignore sensitive files

## 🔧 Updated Settings

- ✅ Environment variables for SECRET_KEY, DEBUG, ALLOWED_HOSTS
- ✅ WhiteNoise for serving static files
- ✅ PostgreSQL support (falls back to SQLite locally)
- ✅ CORS configuration for production
- ✅ Security settings for production

---

## 🛠️ Local Development

Create `.env` file in backend folder:
```
SECRET_KEY=django-insecure-your-local-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

Run locally:
```bash
cd portfolio-app\backend
python manage.py runserver
```
