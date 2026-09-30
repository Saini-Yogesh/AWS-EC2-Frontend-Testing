# AWS EC2 React Deployment Playbook & Technical Knowledge Base

> **Primary Source of Truth** for deploying, updating, troubleshooting, and managing React/Vite applications on AWS EC2 with GitHub Actions and Nginx.

---

## 1. Project Overview & Repository Structure
- **Repository**: GitHub (`AWS-EC2-Testing`)
- **Tech Stack**: React 18 + Vite 6 + React Router v6 + Lucide Icons
- **Local Structure**:
```text
AWS-EC2-Testing/
├── .github/workflows/deploy.yml
├── src/
├── public/
├── package.json
├── package-lock.json
├── .gitignore
├── .env.example
└── dist/
```
- **Rule**: Never commit production `.env` files or private SSH keys (`.pem`) to Git.

---

## 2. Architecture Flow

```text
  Local Dev / Developer
            │
            │ 1. git push origin main
            ▼
      GitHub Repository
            │
            │ 2. GitHub Actions Trigger
            ▼
     GitHub Actions Runner
            │
            │ 3. SSH (Port 22)
            ▼
      AWS EC2 Instance (Ubuntu 24.04 / Nginx)
      ┌──────────────────────────────────────┐
      │ 4. cd ~/AWS-EC2-Testing              │
      │ 5. git fetch & git reset --hard      │
      │ 6. npm ci                            │
      │ 7. npm run build  --> dist/          │
      │ 8. sudo cp -r dist/. /var/www/html/  │
      │ 9. sudo systemctl reload nginx       │
      └──────────────────┬───────────────────┘
                         │
                         ▼
             Live Website in Browser
```

---

## 3. Server Setup & Dependencies (Ubuntu EC2)

```bash
# Update System Packages
sudo apt update && sudo apt upgrade -y

# Install Git & Nginx
sudo apt install git nginx -y

# Install Node.js 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Installation
node -v
npm -v
```

---

## 4. Vite Build Engine & Common Gotchas

### Issue: `sh: 1: vite: not found`
- **Root Cause**: `npm run build` failed because `devDependencies` were skipped or `node_modules` was incomplete.
- **Fix**:
  ```bash
  unset NODE_ENV
  npm install
  npm run build
  ```
  Or explicitly save Vite to devDependencies:
  ```bash
  npm install -D vite
  ```

---

## 5. Nginx Configuration & React Router (SPA Fallback)

Location: `/etc/nginx/sites-available/default`

```nginx
server {
    listen 80;
    server_name _;

    root /var/www/html;
    index index.html;

    location / {
        # Redirect all SPA routes to index.html for client-side routing
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
```

---

## 6. AWS Security Group Configuration

- **HTTP (Port 80)**: `0.0.0.0/0` (Public Access)
- **HTTPS (Port 443)**: `0.0.0.0/0` (Public Access)
- **SSH (Port 22)**: `0.0.0.0/0` (Required for GitHub Actions SSH runner access)

### Troubleshooting Error: `dial tcp ***:22: i/o timeout`
- **Cause**: Port 22 SSH rule is restricted to a single IP (e.g. `x.x.x.x/32`) blocking GitHub Actions cloud runners.
- **Fix**: Update AWS Security Group Inbound Rule to allow `SSH (Port 22)` from `0.0.0.0/0` (or GitHub runner CIDR blocks).

---

## 7. GitHub Actions CI/CD Pipeline

Workflow Path: [`.github/workflows/deploy.yml`](file:///c:/Users/yoges/Desktop/GitHub/AWS-EC2-Testing/.github/workflows/deploy.yml)

### Required GitHub Secrets:
- `EC2_HOST`: Public IPv4 address or Public IPv4 DNS of your EC2 instance.
- `EC2_USER`: `ubuntu`
- `EC2_SSH_KEY`: Content of your `.pem` SSH private key.

### Production Workflow (`deploy.yml`):
```yaml
name: Deploy React App to AWS EC2

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to EC2 via SSH
        uses: appleboy/ssh-action@v1.2.2
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          port: 22

          script: |
            set -e

            echo "📍 Navigating to project..."
            cd ~/AWS-EC2-Testing

            echo "📥 Fetching latest code..."
            git fetch origin main

            echo "🔄 Resetting to latest main..."
            git reset --hard origin/main

            echo "📦 Installing dependencies..."
            npm ci

            echo "🏗️ Building React application..."
            npm run build

            echo "🔍 Checking build output..."
            if [ ! -d "dist" ]; then
              echo "❌ dist folder was not created!"
              exit 1
            fi

            echo "🚀 Deploying React application..."
            sudo rm -rf /var/www/html/*
            sudo cp -r dist/. /var/www/html/

            echo "🔄 Reloading Nginx..."
            sudo nginx -t
            sudo systemctl reload nginx

            echo "✅ Deployment completed successfully!"
```

---

## 8. Environment Variable Governance (`.env`)

1. **Vite Frontend Ingestion**:
   - Variables prefixed with `VITE_` (e.g. `VITE_APP_TITLE`, `VITE_AWS_REGION`) are bundled into client-side JS at **build time**.
   - **Warning**: Never put private keys, database passwords, or secret tokens inside `VITE_` variables.

2. **Server-Side `.env` Persistence**:
   - The production `.env` file lives on the EC2 instance at `~/AWS-EC2-Testing/.env`.
   - Because `.env` is listed in `.gitignore`, running `git reset --hard origin/main` will **never** delete your server's `.env`.
   - Never auto-copy `.env.example` to `.env` in production workflows to avoid silent misconfiguration.

---

## 9. Assistant Response Rules & Protocol

When responding to deployment queries:
1. Identify the layer (GitHub, Actions, EC2, SSH, Security Group, Node/npm, React/Vite, Nginx, Env).
2. Explain the root cause line-by-line.
3. Provide exact commands and specify **WHERE** they must be run:
   - 💻 **Local Windows Terminal**
   - 🖥️ **EC2 SSH Terminal**
   - 🌐 **GitHub Website**
   - ☁️ **AWS Console**
4. Never suggest committing secrets or `.env` files.
5. Provide safe, non-destructive steps.
