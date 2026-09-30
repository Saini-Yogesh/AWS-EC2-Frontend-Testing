import React, { useState } from "react";
import {
  BookOpen,
  Terminal,
  CheckCircle2,
  ShieldAlert,
  Cpu,
  Server,
  Code,
  Copy,
  Check,
  Search,
  Layers,
  FileText,
} from "lucide-react";

export default function Playbook() {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sections = [
    {
      id: 0,
      title: "0. Source",
      tag: "Source",
      content: "This is the source of this content",
      code: "https://chatgpt.com/share/6abcd6d1-5c3c-83e8-b243-5bb910562e91",
    },
    {
      id: 1,
      title: "1. Project & Repository Structure",
      tag: "GitHub / Source",
      content: `The React/Vite application source code is managed in GitHub. Production .env files and private keys must never be committed to Git.`,
      code: `AWS-EC2-Testing/
├── .github/workflows/deploy.yml
├── src/
├── public/
├── package.json
├── package-lock.json
├── .gitignore
├── .env.example
└── dist/`,
    },
    {
      id: 2,
      title: "2. AWS EC2 Setup (Ubuntu)",
      tag: "Infrastructure",
      content: `EC2 instance created with Ubuntu. React static files are built on EC2 or in CI/CD and served directly by Nginx from /var/www/html.`,
      code: `GitHub Repository -> EC2 Instance -> npm install & build -> dist/ -> /var/www/html/ -> Nginx -> Web Browser`,
    },
    {
      id: 3,
      title: "3. EC2 Connection (SSH)",
      tag: "SSH",
      content: `Connect to Ubuntu EC2 instance via SSH using your private key (.pem).`,
      code: `ssh -i "my-key.pem" ubuntu@EC2_PUBLIC_IP`,
    },
    {
      id: 4,
      title: "4. Installing Dependencies on EC2",
      tag: "Ubuntu / Node.js",
      content: `Install Node.js 22 LTS, Git, and Nginx on Ubuntu EC2 instance.`,
      code: `sudo apt update && sudo apt upgrade -y
sudo apt install git nginx -y
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v && npm -v`,
    },
    {
      id: 5,
      title: "5. Troubleshooting Vite Error (vite: not found)",
      tag: "React / Vite",
      content: `Occurs when Vite is omitted from node_modules. Ensure devDependencies are installed by running unset NODE_ENV before npm install.`,
      code: `unset NODE_ENV
npm install
npm run build`,
    },
    {
      id: 6,
      title: "6. Nginx SPA Routing Configuration",
      tag: "Nginx",
      content: `Configure Nginx to route all client-side paths to index.html to prevent 404 errors on React Router routes.`,
      code: `server {
    listen 80;
    server_name _;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}`,
    },
    {
      id: 7,
      title: "7. AWS Security Group Setup",
      tag: "AWS Security",
      content: `Allow Port 80 (HTTP) and Port 443 (HTTPS) from 0.0.0.0/0. Allow Port 22 (SSH) from 0.0.0.0/0 for GitHub Actions runner access.`,
      code: `HTTP: Port 80   -> Source: 0.0.0.0/0
HTTPS: Port 443 -> Source: 0.0.0.0/0
SSH: Port 22    -> Source: 0.0.0.0/0 (Required for CI/CD runners)`,
    },
    {
      id: 8,
      title: "8. GitHub Actions CI/CD Setup",
      tag: "GitHub Actions",
      content: `Automates EC2 deployments via SSH on every git push to the main branch. Workflow stored at .github/workflows/deploy.yml.`,
      code: `git add .
git commit -m "Update application"
git push origin main`,
    },
    {
      id: 9,
      title: "9. GitHub Actions Repository Secrets",
      tag: "Secrets",
      content: `Configured in GitHub Repository Settings -> Secrets and variables -> Actions.`,
      code: `EC2_HOST    -> Public IPv4 address of EC2
EC2_USER    -> ubuntu
EC2_SSH_KEY -> Content of .pem private key`,
    },
    {
      id: 10,
      title: "10. Troubleshooting SSH Timeout (dial tcp ***:22: i/o timeout)",
      tag: "Troubleshooting",
      content: `Occurs when EC2 Security Group restricts Port 22 to a single local IP, blocking GitHub Actions runner IPs. Change Port 22 source to 0.0.0.0/0.`,
      code: `AWS EC2 -> Security Groups -> Edit Inbound Rules -> SSH (22) -> Source: 0.0.0.0/0`,
    },
    {
      id: 11,
      title: "11. GitHub Actions Deployment Script",
      tag: "GitHub Actions",
      content: `Fetches latest code on EC2, runs npm ci & build, copies dist/ to /var/www/html/, and reloads Nginx.`,
      code: `git fetch origin main
git reset --hard origin/main
npm ci
npm run build
sudo rm -rf /var/www/html/*
sudo cp -r dist/. /var/www/html/
sudo systemctl reload nginx`,
    },
    {
      id: 12,
      title: "12. Why git fetch + git reset is Used",
      tag: "Git Workflow",
      content: `Ensures the EC2 working directory cleanly matches GitHub main without merge conflicts. EC2 is treated as a build target, not a development environment.`,
      code: `git fetch origin main && git reset --hard origin/main`,
    },
    {
      id: 13,
      title: "13. Production .env File Governance",
      tag: "Security / Env",
      content: `Production .env stays on EC2 and is listed in .gitignore. Variables starting with VITE_ are exposed to the frontend bundle at build time.`,
      code: `# .gitignore
.env
node_modules/
dist/`,
    },
    {
      id: 14,
      title: "14. Build-Time Env Variable Ingestion",
      tag: "Vite",
      content: `Vite bakes VITE_* environment variables into static JS/HTML assets during npm run build. Ensure .env exists on EC2 before building.`,
      code: `VITE_APP_TITLE=CloudScale AWS React Portal
VITE_AWS_REGION=us-east-1`,
    },
    {
      id: 15,
      title: "15. Safe .env Management",
      tag: "Best Practices",
      content: `Do not auto-generate .env from .env.example in production scripts to avoid silent misconfiguration. Explicitly manage EC2 .env.`,
      code: `# Manage ~/AWS-EC2-Testing/.env directly on EC2 server`,
    },
    {
      id: 16,
      title: "16. Standard Developer Deployment Flow",
      tag: "Workflow",
      content: `1. Edit locally -> 2. Test locally -> 3. git add . -> 4. git commit -> 5. git push -> GitHub Actions auto-deploys to EC2!`,
      code: `git push origin main`,
    },
    {
      id: 17,
      title: "17. Master Troubleshooting Checklist",
      tag: "Troubleshooting",
      content: `Check GitHub Actions log -> Verify Security Group Port 22 -> Confirm EC2 Public IP -> Verify Nginx SPA try_files rule.`,
      code: `sudo nginx -t && sudo systemctl reload nginx`,
    },
    {
      id: 18,
      title: "18. Current Architecture Diagram",
      tag: "Architecture",
      content: `GitHub -> GitHub Actions SSH -> EC2 (Ubuntu) -> npm build -> dist/ -> Nginx (/var/www/html) -> Browser`,
      code: `Developer -> GitHub push -> GitHub Actions -> SSH to EC2 -> Nginx Web Server`,
    },
    {
      id: 19,
      title: "19. Future Infrastructure Roadmap",
      tag: "Roadmap",
      content: `AWS Elastic IP, Custom Domain, HTTPS Certbot, S3 + CloudFront CDN, AWS Systems Manager, Docker containerization.`,
      code: `1. Elastic IP  2. SSL/TLS Certbot  3. S3 + CloudFront CDN`,
    },
    {
      id: 20,
      title: "20. Assistant Guidelines & Protocols",
      tag: "System",
      content: `AI assistant guidelines for structured line-by-line troubleshooting, explicit command location tagging, and secret protection.`,
      code: `Rule: Never expose secrets, specify exact execution locations, explain root causes.`,
    },
  ];

  const filteredSections = sections.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sec.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sec.tag.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "800",
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <BookOpen color="#ff9900" size={32} /> AWS EC2 Deployment Playbook
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Comprehensive technical guide & reference manual for deploying
          React/Vite SPAs to AWS EC2 with Nginx & GitHub Actions.
        </p>
      </div>

      {/* Search Input */}
      <div
        className="glass-card"
        style={{ marginBottom: "2rem", padding: "1.25rem" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Search size={20} color="var(--accent-orange)" />
          <input
            type="text"
            className="input-field"
            placeholder="Search playbook sections (e.g. Nginx, Vite, SSH, Secrets, Security Group)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Sections List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {filteredSections.map((sec) => (
          <div key={sec.id} className="glass-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "800",
                  color: "var(--text-main)",
                }}
              >
                {sec.title}
              </h3>
              <span
                style={{
                  background: "rgba(255, 153, 0, 0.12)",
                  color: "#ff9900",
                  border: "1px solid rgba(255, 153, 0, 0.3)",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: "700",
                }}
              >
                {sec.tag}
              </span>
            </div>

            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.95rem",
                marginBottom: "1rem",
                lineHeight: "1.6",
              }}
            >
              {sec.content}
            </p>

            {sec.code && (
              <div style={{ position: "relative" }}>
                <pre
                  className="code-block"
                  style={{ margin: 0, paddingRight: "4rem" }}
                >
                  {sec.code}
                </pre>
                <button
                  onClick={() => handleCopy(sec.code, sec.id)}
                  className="btn btn-secondary"
                  style={{
                    position: "absolute",
                    top: "0.65rem",
                    right: "0.65rem",
                    padding: "0.3rem 0.6rem",
                    fontSize: "0.75rem",
                  }}
                >
                  {copiedIndex === sec.id ? (
                    <Check size={13} color="#10b981" />
                  ) : (
                    <Copy size={13} />
                  )}
                  {copiedIndex === sec.id ? "Copied" : "Copy"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
