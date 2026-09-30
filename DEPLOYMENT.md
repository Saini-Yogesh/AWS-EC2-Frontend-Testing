# AWS Hosting & Deployment Guide

This React static website is configured with **Vite**, **React Router v6**, and **Environment Variable** injection for seamless hosting on **AWS EC2**, **AWS S3 + CloudFront**, or **AWS Amplify**.

---

## 🚀 1. Building for Production

Before deploying to AWS, compile the static bundle:

```bash
# Build using local .env defaults
npm run build

# Or inject custom environment variables at build time
VITE_ENVIRONMENT=Production VITE_AWS_REGION=us-east-1 VITE_APP_TITLE="Production AWS Portal" npm run build
```

This generates a static production build in the `dist/` directory:
- `dist/index.html`
- `dist/assets/*.js`
- `dist/assets/*.css`

---

## 🖥️ 2. Deploying on AWS EC2 (Nginx)

### Step 1: Transfer Build Files
Upload the contents of `dist/` to your EC2 instance:
```bash
scp -i your-key.pem -r dist/* ubuntu@<your-ec2-ip>:/var/www/html/
```

### Step 2: Configure Nginx Routing
Edit `/etc/nginx/sites-available/default`:
```nginx
server {
    listen 80;
    server_name _;

    root /var/www/html;
    index index.html;

    location / {
        # Redirect all SPA routes to index.html
        try_files $uri $uri/ /index.html;
    }
}
```

Restart Nginx:
```bash
sudo systemctl restart nginx
```

---

## 🪣 3. Deploying on AWS S3 + CloudFront

1. Create an S3 Bucket and enable **Static Website Hosting**.
2. Sync the `dist/` folder:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```
3. In CloudFront:
   - Point origin to S3 bucket.
   - Configure **Custom Error Responses**:
     - **Error Code**: `404` or `403`
     - **Response Page Path**: `/index.html`
     - **HTTP Response Code**: `200`

---

## ⚡ 4. Deploying on AWS Amplify

1. Connect your GitHub repository (`Saini-Yogesh/AWS-EC2-Testing`) to AWS Amplify Console.
2. Under **Environment variables**, set:
   - `VITE_APP_TITLE`: `AWS CloudScale Production`
   - `VITE_ENVIRONMENT`: `Production`
   - `VITE_AWS_REGION`: `us-west-2`
3. Deploy! AWS Amplify will run `npm run build` and host the static app automatically with SPA rewrites configured.
