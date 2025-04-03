# 🌐 Domain Setup — forgetfulbob.com

This file documents the custom domain + DNS setup used for hosting Forgetful Bob on Cloudflare Pages.

---

## 📌 TL;DR Setup Summary

1. Create your site on **Cloudflare Pages**
2. Add `forgetfulbob.com` and `www.forgetfulbob.com` as **Custom Domains**
3. In **Cloudflare DNS**, add:
   - `CNAME forgetfulbob.com → forgetfulbob.pages.dev` (proxied ✅)
   - `CNAME www → forgetfulbob.pages.dev` (proxied ✅)
4. Set up a **Page Rule** to redirect `www` to the root domain
5. Get Cloudflare's **nameservers**
6. Update **Squarespace** to use those nameservers
7. Wait for propagation — domain will go live with **HTTPS**, **redirects**, and **CDN**

---

## ✅ Live Domain

- **Primary domain**: `https://forgetfulbob.com`
- **Redirected domain**: `https://www.forgetfulbob.com` → redirects to root

---

## 🚀 Hosting Stack

- Static site hosted on **Cloudflare Pages**
- Deployed via GitHub → Cloudflare Pages
- DNS managed entirely on Cloudflare

---

## 🔧 DNS Configuration (Cloudflare)

| Type   | Name              | Value                     | Proxy    | Notes                       |
|--------|-------------------|---------------------------|----------|-----------------------------|
| CNAME  | `forgetfulbob.com` | `forgetfulbob.pages.dev`  | Proxied  | Uses CNAME flattening at root |
| CNAME  | `www`              | `forgetfulbob.pages.dev`  | Proxied  | Supports `www` access         |
| NS     | `forgetfulbob.com` | Google DNS (registrar)    | DNS only | Default from Google Domains  |

✅ **CNAME flattening** is used to allow a root CNAME (normally not allowed in DNS)  
✅ All traffic is proxied through Cloudflare (orange cloud = on)  
✅ SSL/TLS is enabled and auto-managed

---

## 🔁 Redirects

- A **Page Rule** is configured to redirect: www.forgetfulbob.com/* → https://forgetfulbob.com/$1

---

## 🧠 Notes

- **No A record needed** (we’re not using `192.0.2.1`)
- Cloudflare Pages validates the domain via CNAME or proxied A record
- SSL is handled automatically — no certs to install or renew

---

## 🛠️ Step-by-Step: Setting Up Custom Domain + Redirect

### 1. Add Custom Domain to Cloudflare Pages

1. Go to **Cloudflare Dashboard → Pages → Your Project → Custom Domains**
2. Click **“Set up a custom domain”**
3. Enter your domain: `forgetfulbob.com`
4. If not already verified, Cloudflare will ask you to:
   - Add a CNAME record (`forgetfulbob.com → forgetfulbob.pages.dev`)  
   - Or an A record (`forgetfulbob.com → 192.0.2.1`) if you're using A record fallback
5. Make sure the record is **Proxied** (orange cloud) in the DNS settings
6. Cloudflare will auto-verify and issue SSL

---

### 2. Add `www` Subdomain (Required for SSL + Redirect)

1. Go to **Cloudflare Dashboard → Pages → Your Project → Custom Domains**
2. Click **“Set up a custom domain”**
3. Enter `www.forgetfulbob.com`
4. This ensures Cloudflare can:
   - Serve the `www` domain over HTTPS
   - Apply your Page Rule redirect properly
5. Cloudflare will auto-verify the existing CNAME (`www → forgetfulbob.pages.dev`)
6. It will show as ✅ Active once ready

---

### 3. Set Up Redirect (Page Rule)

1. Go to **Cloudflare Dashboard → Rules → Page Rules**
2. Click **“Create Page Rule”**
3. Configure it like this:

   - **If the URL matches**: `www.forgetfulbob.com/*`
   - **Then the settings are**:  
     - Forwarding URL → `301 - Permanent Redirect`  
     - Destination URL: `https://forgetfulbob.com/$1`

4. Save and deploy

---

## 🌐 How to Update Nameservers in Squarespace

If your domain is registered with Squarespace, follow these steps to point your DNS to Cloudflare:

### 1. Get Your Cloudflare Nameservers

1. After adding your site to Cloudflare, go to the **Cloudflare Dashboard → Your Domain**
2. Cloudflare will provide **two nameservers**, e.g. `alice.ns.cloudflare.com` and `bob.ns.cloudflare.com`
3. Keep these names handy

### 2. Update Nameservers in Squarespace

1. Log into your **Squarespace dashboard**
2. Go to **Settings → Domains**
3. Click on your custom domain (`forgetfulbob.com`)
4. Find the **DNS Settings** or **Nameservers** section
5. Replace the existing nameservers with the two from Cloudflare
6. Save your changes

### 3. Wait for DNS Propagation

- Changes typically take **5–30 minutes**, but can take up to 24 hours
- Cloudflare will automatically detect when the switch is complete and show your domain as **Active**