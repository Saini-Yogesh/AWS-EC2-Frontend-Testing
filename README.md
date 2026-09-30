# AWS EC2 Testing - React Static Multi-Page App

A modern, multi-route static React web application built with **Vite**, **React Router DOM v6**, and **Environment Variable** injection designed specifically for testing AWS static web hosting (AWS EC2 Nginx/Apache, S3 + CloudFront, AWS Amplify).

![React Static AWS Portal](https://img.shields.io/badge/AWS-EC2%20%7C%20S3%20%7C%20Amplify-ff9900?style=for-the-badge&logo=amazonaws)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)

---

## 🌟 Features

- 🛣️ **Multi-Page Static Navigation**: 5 distinct routes (`/`, `/about`, `/environment`, `/services`, `/contact`, plus custom `404` handler).
- 🔑 **Environment Variable Support**: Full client-side `import.meta.env` access for variables prefixed with `VITE_` (e.g. `VITE_APP_TITLE`, `VITE_ENVIRONMENT`, `VITE_AWS_REGION`).
- 🎨 **Modern Dark UI Aesthetics**: Clean glassmorphism cards, glowing status pills, responsive navigation, and code snippets.
- ⚡ **Lightning Fast Static Build**: Fast HMR in development (`npm run dev`) and clean static bundle output in `dist/` (`npm run build`).

---

## 📁 Routes Overview

| Route | Page | Purpose |
|---|---|---|
| `/` | **Home** | Dashboard overview & AWS host summary |
| `/about` | **About** | Architecture notes & EC2 Nginx SPA routing configuration |
| `/environment` | **Environment** | Live inspection & testing of `VITE_` variables |
| `/services` | **AWS Services** | Interactive status cards & health checks |
| `/contact` | **Contact** | Form interactivity & state management |

---

## 🛠️ Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build Static Bundle for AWS**:
   ```bash
   npm run build
   ```

---

## 🌐 Environment Variables

Environment variables are declared in `.env` or `.env.production`:

```env
VITE_APP_TITLE=CloudScale AWS React Portal
VITE_ENVIRONMENT=Development
VITE_AWS_REGION=us-east-1
VITE_API_ENDPOINT=https://api.us-east-1.amazonaws.com/demo
VITE_EC2_INSTANCE_ID=i-0e8912ab45cd678f9
```

Read [DEPLOYMENT.md](file:///c:/Users/yoges/Desktop/GitHub/AWS-EC2-Testing/DEPLOYMENT.md) for full AWS deployment instructions.