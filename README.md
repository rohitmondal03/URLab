# 🚀 Konfig

> A modern, high-performance bookmark management SaaS built with a focus on speed, organization, and developer-grade UX.

---

## ✨ Overview

Konfig is a structured bookmarking platform that helps users organize, search, and manage links efficiently using domains, tags, and smart filtering.

Unlike traditional bookmark tools, Konfig is designed with a **productivity-first approach**, but optimized for **speed, scalability, and clean UX**.

---

## ⚡ Features

### 📌 Core Features

- 🔖 Bookmark management (create, delete, organize)
- 🧩 Tag-based filtering
- 🌐 Domain-based grouping
- 🕒 Recently added view
- 🔍 Fast search and filtering
- 🧱 Structured data model (domains + tags)

---

### 🎨 UX & Performance

- ⚡ Optimistic UI updates (instant feedback)
- 🧠 Smart caching with TanStack Query
- 🔄 Real-time UI synchronization across views
- 💀 Skeleton loaders for better perceived performance
- 🚫 Empty states and error boundaries

---

### 🧰 Developer Experience

- 🧬 Type-safe database queries using Drizzle ORM
- 🔐 Secure backend with Supabase (RLS policies)
- 📡 Background processing via Edge Functions
- 🧱 Clean architecture (separation of concerns)

---

## 🏗️ Tech Stack

| Category       | Tech |
|----------------|------|
| Framework      | Next.js (App Router) |
| Language       | TypeScript |
| Styling        | Tailwind CSS + shadcn/ui |
| State & Cache  | TanStack Query |
| Database       | PostgreSQL (Supabase) |
| ORM            | Drizzle ORM |

---

## 🧠 Architecture

```text
Client (Next.js)
   ↓
TanStack Query (cache layer)
   ↓
Server Actions
   ↓
Database (Supabase + Drizzle)
```