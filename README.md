<<<<<<< HEAD
# Mzigua Tours & Safari

Static website (Vercel) + bookings, visitor stats and admin login (Supabase) + code on GitHub.

## 1. GitHub
Create an empty repo on github.com, then in this folder:
    git init && git add . && git commit -m "Mzigua Tours website"
    git branch -M main
    git remote add origin https://github.com/YOUR-USER/mzigua-tours.git
    git push -u origin main

## 2. Supabase
1. Create a project at supabase.com.
2. SQL Editor > paste supabase/schema.sql > Run.
3. Authentication > Providers > Email: turn OFF "Allow new users to sign up" (so only you can log in).
4. Authentication > Users > Add user: your admin email and a strong password.
5. Project Settings > API: copy the Project URL and the anon public key into public/config.js. Commit and push.

## 3. Vercel
vercel.com > Add New > Project > import the GitHub repo. Framework preset "Other". Deploy.
Then Settings > Domains to add your own domain. Every push to GitHub redeploys the site.

## 4. Use it
- Website: your Vercel URL. Booking requests are saved in Supabase.
- Admin: /admin.html  (bookings, status updates, visitor details, page views, devices, referrers).
- Photos: put images in public/images and set them in public/index.html, e.g. IMG["route-lemosho"]="images/lemosho.jpg".
- SEO: after launch, add the site to Google Search Console and submit /sitemap.xml. Replace www.mziguasafaritours.com with your real domain in index.html, robots.txt and sitemap.xml.
=======
# Mziguasafaristours
Tourism Website
>>>>>>> dabdd49488cabdc6a5e0563d7b5c9f813202b906
