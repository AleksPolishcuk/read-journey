# 📚 Read Journey

A full-stack reading tracker application built with Next.js 16, TypeScript, Redux Toolkit, and RTK Query. Track your reading progress, manage your personal library, and discover recommended books.

![Read Journey Preview](public/images/iPhone%2015%20desktop%402x.png)

---

## 🚀 Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Framework        | Next.js 16 (App Router)             |
| Language         | TypeScript 5                        |
| State Management | Redux Toolkit + RTK Query           |
| Forms            | React Hook Form + Yup               |
| Styling          | CSS Modules + CSS Custom Properties |
| Notifications    | react-hot-toast                     |
| Fonts            | Gilroy, SF Pro Text (local)         |
| Deployment       | Vercel (recommended)                |

---

## 📋 Features

### Authentication

- User registration and login with JWT tokens
- Persistent sessions via localStorage + cookies
- Automatic redirect based on auth state
- Next.js middleware for server-side route protection
- Token refresh support

### Recommended Page

- Browse recommended books with server-side pagination
- Filter books by title and author
- Add books to personal library from modal
- Responsive grid: 2 / 8 / 10 books per page (mobile / tablet / desktop)

### My Library Page

- Add custom books (title, author, page count)
- Filter library by reading status (unread / in-progress / done)
- Delete books from library
- Navigate to reading session from book modal

### Reading Page

- Start and stop reading sessions with page tracking
- Diary view: reading history with dates, pages, time, and percentage
- Statistics view: SVG ring chart with reading progress
- Delete individual reading diary entries
- Completion modal when book is finished

### UI / UX

- Fully responsive: mobile (320px+), tablet (768px+), desktop (1440px+)
- Retina-ready images (`@2x`)
- SVG sprite for all icons
- Burger menu on mobile/tablet
- Keyboard navigation (ESC to close modals)

---

## 🗂️ Project Structure

```
read-journey/
├── app/
│   ├── (private)/              # Authenticated routes
│   │   ├── library/            # My Library page
│   │   ├── reading/            # Reading page
│   │   ├── recommended/        # Recommended books page
│   │   └── layout.tsx          # Private layout with Header
│   ├── (public)/               # Unauthenticated routes
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── globals.css             # CSS variables, resets, fonts
│   └── layout.tsx              # Root layout
│
├── components/
│   ├── auth/                   # Auth-specific components
│   ├── common/                 # Shared UI primitives
│   ├── layout/                 # Header, BurgerMenu, UserNav, etc.
│   ├── library/                # Library page components
│   ├── reading/                # Reading page components
│   └── recommended/            # Recommended page components
│
├── lib/
│   ├── hooks/                  # Custom React hooks
│   └── validation/             # Yup schemas
│
├── public/
│   ├── fonts/                  # Gilroy + SF Pro Text (woff2)
│   ├── images/                 # Static images + @2x variants
│   └── sprite.svg              # SVG icon sprite
│
├── redux/
│   ├── features/
│   │   ├── authSlice.ts        # Auth state + token management
│   │   └── selectors.ts        # Typed selectors
│   ├── provider.tsx
│   └── store.ts
│
├── services/
│   ├── api.ts                  # RTK Query base API
│   ├── authApi.ts              # Auth endpoints
│   └── booksApi.ts             # Books endpoints
│
└── middleware.ts               # Next.js route protection
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/read-journey.git
cd read-journey

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_BASE_URL= you example
```

### Development

```bash
npm run dev
# Open http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## 🔌 API Reference

Base URL: `https://readjourney.b.goit.study/api`

Full documentation: [Swagger UI](https://readjourney.b.goit.study/api-docs/)

### Auth Endpoints

| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| POST   | `/users/signup`          | Register new user     |
| POST   | `/users/signin`          | Login                 |
| GET    | `/users/current`         | Get current user info |
| GET    | `/users/current/refresh` | Refresh access token  |
| POST   | `/users/signout`         | Logout                |

### Books Endpoints

| Method | Endpoint                | Description                       |
| ------ | ----------------------- | --------------------------------- |
| GET    | `/books/recommend`      | Get recommended books (paginated) |
| POST   | `/books/add`            | Add custom book to library        |
| POST   | `/books/add/:id`        | Add recommended book to library   |
| DELETE | `/books/remove/:id`     | Remove book from library          |
| GET    | `/books/own`            | Get user's library                |
| POST   | `/books/reading/start`  | Start reading session             |
| POST   | `/books/reading/finish` | Finish reading session            |
| DELETE | `/books/reading`        | Delete reading diary entry        |
| GET    | `/books/:id`            | Get book details                  |

---

## 🔐 Authentication Flow

```
User visits private route
        ↓
middleware.ts checks accessToken cookie
        ↓
No token → redirect to /
Token present → allow request
        ↓
AuthGuard (client) hydrates Redux from localStorage
        ↓
Fetches /users/current to validate token
        ↓
401 response → clearAuth() → redirect to /
Success → update user in Redux store
```

---

## 📱 Responsive Breakpoints

| Breakpoint   | Layout                                         |
| ------------ | ---------------------------------------------- |
| 320px–767px  | Mobile: single column, burger menu             |
| 768px–1439px | Tablet: 2-column dashboard, inline nav         |
| 1440px+      | Desktop: sidebar dashboard, 5-column book grid |

---

## 🗃️ State Management

The app uses Redux Toolkit with RTK Query:

- **`auth` slice** — stores `accessToken`, `refreshToken`, `user`, `isHydrated`
- **RTK Query API** — handles all server state with automatic caching and invalidation
- **Tag invalidation** — `Library` tag invalidated on add/remove book; `Book` tag invalidated on reading start/finish/delete

---

## 🎨 Design System

CSS custom properties defined in `globals.css`:

```css
--c-bg: #141414 /* Page background */ --c-black: #1f1f1f /* Card background */
  --c-text: #f9f9f9 /* Primary text */ --c-gray: #686868 /* Secondary text */
  --c-input-bg: #262626 /* Input background */ --c-error: #e90516
  /* Error color */ --radius-xl: 30px /* Card radius */;
```

Fonts: **Gilroy** (primary, 500/700) and **SF Pro Text** (secondary, 500/700) loaded locally via `@font-face`.

---

## 🐛 Known Issues

- Token field name from API is `token`, not `accessToken` — handled via normalization in `authSlice`
- No automatic token refresh implemented yet — sessions expire after 1 hour
- Library filter is client-side (all books fetched at once)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is for educational purposes as part of the GoIT Full Stack Developer course.

---

## 👤 Author
