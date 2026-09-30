# AWS Hosting & Deployment Guide

This React static website is configured with **Vite**, **React Router v6**, and **Environment Variable** injection for seamless hosting on **AWS EC2**, **AWS S3 + CloudFront**, or **AWS Amplify**.

---

## 🤖 1. Automated GitHub Actions CI/CD to AWS EC2

The project includes an automated deployment workflow at [`.github/workflows/deploy.yml`](file:///c:/Users/yoges/Desktop/GitHub/AWS-EC2-Testing/.github/workflows/deploy.yml).

### How It Works:
1. **GitHub Trigger**: Triggers automatically on push to `main`.
2. **SSH Connection**: Connects to your EC2 instance via `appleboy/ssh-action@v1.2.2`.
3. **Git Sync**: Pulls latest code directly into `~/AWS-EC2-Testing` on EC2 (`git fetch` & `git reset --hard origin/main`).
4. **Vite Build**: Runs `npm install` and `npm run build` on EC2.
5. **Live Update**: Copies `dist/*` into `/var/www/html/` and reloads Nginx (`sudo systemctl reload nginx`).

### Required GitHub Repository Secrets:
Go to **Settings** $\rightarrow$ **Secrets and variables** $\rightarrow$ **Actions** in your GitHub repository and add:

| Secret Name | Value Example | Description |
|---|---|---|
| `EC2_HOST` | `54.210.12.88` or `ec2-xx.compute.amazonaws.com` | Public IPv4 Address or Public DNS of your EC2 instance |
| `EC2_USER` | `ubuntu` (or `ec2-user`) | Default SSH username for your Linux AMI |
| `EC2_SSH_KEY` | `-----BEGIN OPENSSH PRIVATE KEY-----...` | Private key (`.pem`) used to SSH into EC2 |

---

## ⚠️ Troubleshooting SSH `i/o timeout` Errors

If your GitHub Action fails with:
`dial tcp ***:22: i/o timeout`

This means GitHub Actions cannot reach Port 22 on your EC2 instance. Follow these 3 steps to fix:

### 1. Update AWS Security Group Inbound Rules
1. Log in to **AWS EC2 Console**.
2. Go to **Instances** $\rightarrow$ Click your instance $\rightarrow$ Click **Security** tab $\rightarrow$ Click the **Security Group**.
3. Edit **Inbound Rules**:
   - **Type**: `SSH`
   - **Port**: `22`
   - **Source**: `Anywhere-IPv4` (`0.0.0.0/0`)
4. Save rules.

### 2. Verify `EC2_HOST` Value
Ensure `EC2_HOST` in GitHub Secrets is **only** the IP address (e.g. `54.210.12.88`), without `http://`, `https://`, `ssh://`, or trailing spaces.

### 3. Check EC2 Public IP Status
If your EC2 instance was stopped and restarted, AWS assigns a new IPv4 Public IP unless an **Elastic IP** is attached. Update `EC2_HOST` in GitHub Secrets if the IP changed.

---

## 🚀 2. Manual Local Build

Before manually deploying to AWS, compile the static bundle:

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

## 🖥️ 3. Manual Deployment on AWS EC2 (Nginx)

### Step 1: Transfer Build Files
Upload the contents of `dist/` to your EC2 instance:
```bash
scp -i your-key.pem -r dist/* ubuntu@<your-ec2-ip>:/var/www/html/
```

### Step 2: Configure Nginx SPA Routing
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

## 🪣 4. Deploying on AWS S3 + CloudFront

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

## ⚡ 5. Deploying on AWS Amplify

1. Connect your GitHub repository (`Saini-Yogesh/AWS-EC2-Testing`) to AWS Amplify Console.
2. Under **Environment variables**, set:
   - `VITE_APP_TITLE`: `AWS CloudScale Production`
   - `VITE_ENVIRONMENT`: `Production`
   - `VITE_AWS_REGION`: `us-west-2`
3. Deploy! AWS Amplify will run `npm run build` and host the static app automatically with SPA rewrites configured.
