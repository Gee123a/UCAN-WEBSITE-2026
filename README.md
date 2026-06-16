# 🏆 UCAN Awarding Night 2026 Portal
> **Interactive Event RSVP Platform with Google Calendar Integration and Micro-Animations.**

[![React Version](https://img.shields.io/badge/React-18.2-blue.svg?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3-blueviolet.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/Prisma-PostgreSQL-blue.svg?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Animation](https://img.shields.io/badge/Animations-GSAP%20%252B%20Framer--Motion-violet.svg?style=flat-square)](https://gsap.com/)

---

## 🌟 Overview
**UCAN-WEBSITE-2026** is the official ticketing and RSVP platform engineered for the **UCAN Awarding Night 2026**. Designed with a focus on immersive user experience and fluid visual transitions, the portal allows university students to reserve their seats, authenticates student domains, and natively syncs event details to their personal schedules.

---

## ⚡ Key Features

### 📅 Smart RSVP & Ticketing
- Streamlined registration form collecting essential delegate profiles: **NIM (Student ID)**, **Major**, and **Organization**.
- Built-in validation system that restricts event registry exclusively to Ciputra University student email domains (`@*.ciputra.ac.id` or `@ciputra.ac.id`).

### 🗓️ Google Calendar Integration
- Natively connects with the Google Calendar API.
- Automatically inserts the UCAN Awarding Night event directly into the user's primary calendar upon submission, including details on timing (Asia/Jakarta timezone), location (Dian Auditorium ballroom), and automatic reminder notifications.

### 🎭 Cinematic Animations
- Ultra-premium micro-interactions using **GSAP** (GreenSock) and **Framer Motion** for elements that respond gracefully to mouse hovers and viewport scrolling.

### 📊 Administrative Data Export
- Secure, password-protected endpoint utilizing Basic Access Authentication (`Basic Auth`).
- Administrative feature allowing coordinators to instantly export the real-time RSVP database table to a CSV file for physical ticket verification.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React (TypeScript), Tailwind CSS, Vite
- **Animations:** GSAP, Framer Motion, Motion One
- **Backend API:** Node.js, Express (TypeScript)
- **Database Connector:** Prisma ORM connecting to a PostgreSQL server (with Prisma Accelerate integration)
- **Authentication:** Google OAuth (`@react-oauth/google`) for calendar insertion

---

## 📂 Codebase Structure

```
UCAN-WEBSITE-2026/
├── src/                             # React Frontend Source
│   ├── components/                  # UI components (Hero, Works, Contact, etc)
│   ├── assets/                      # Vector background graphics and logos
│   └── styles/                      # Tailwind global styles
├── prisma/                          # Database schemas and migrations
│   └── schema.prisma                # PostgreSQL RSVP entity definitions
├── server.ts                        # Express API Server (Prisma, Google Calendar API)
├── tailwind.config.js               # Theme token declarations
├── vite.config.ts                   # Bundler build config
└── tsconfig.json                    # Compiler definitions
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js v18+
- PostgreSQL instance
- Google OAuth Client ID credentials

### Quick Start
1. Clone the repository and navigate into the folder:
   ```bash
   cd Documents/UCAN-WEBSITE-2026
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables inside a new `.env` file:
   ```env
   PORT=3001
   DATABASE_URL="postgresql://username:password@localhost:5432/ucan_db?schema=public"
   ADMIN_EXPORT_USER="admin_username"
   ADMIN_EXPORT_PASSWORD="secure_password"
   ```
4. Run Prisma migrations:
   ```bash
   npx prisma db push
   ```
5. Run the client and server concurrently in development mode:
   ```bash
   npm run dev
   ```

---

*Made with ♥ for the UCAN 2026 Community.*
