# 🚀 Product Hunt Clone

A fully functional **Product Hunt Clone** built with **NuxtJS**, **TailwindCSS**, and **Vue ShadCN**. This project replicates the core features of the real Product Hunt platform, including product listings, upvoting, filtering, commenting, and user authentication (frontend only). It leverages a **mock backend API** to simulate real-world functionality.

## ✨ Features

### 🏠 Home Page

- **Hero Section** with a call-to-action.
- **Trending Product List** showing top upvoted products.
- **Newsletter Section** for user engagement.

### 🔍 Explore Page

- **Product List** with:

  - Toggleable **upvote/unvote** buttons.
  - **Sorting options**: Latest and Trending.
  - **Categories filter** via dropdown.
  - **Pagination** for browsing through products.

### 🔐 Auth Pages

- **Login Page**

  - Email & password fields.
  - Social auth buttons (frontend only).

- **Register Page**

  - Name, email, password fields.
  - Social auth buttons (frontend only).

### 📄 Product Details Page

- **Left Section**

  - Product image.
  - Name & tagline.
  - Upvote/unvote button.
  - Description.
  - **Comments list** with a comment post form.

- **Right Section**

  - **Submitted By** card with user info and follow button.
  - **Product Stats**:

    - Total comments.
    - Upvote count.
    - Submission date.

  - **Related Products** (5 suggestions).

### ➕ Submit Product Page

- Input fields for:

  - Name, tagline, description, website URL.
  - Category selector.
  - **Image upload** with live preview.

## 🛠️ Tech Stack

- **Framework**: [NuxtJS 3](https://nuxt.com/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **UI Components**: [Vue ShadCN](https://www.shadcn-vue.com/)
- **State Management**: `useState` with composables
- **Mock Backend**: Simulated API using mock data for full frontend experience

## 📦 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/pawantech12/product-hunt-clone.git
cd product-hunt-clone

# Install dependencies
pnpm install

# Start the development server
pnpm run dev
```

> ⚠️ Note: This project uses a **mock backend API**, so all user authentication and data operations are simulated on the frontend.

## 📌 Future Improvements

- Connect to a real backend (e.g., Supabase, Firebase, or custom API).
- Enable real user authentication and session management.
- Admin panel for managing submitted products.
- Email verification for newsletter subscriptions.

## 🧑‍💻 Author

**Pawan Kumavat**
🔗 [GitHub](https://github.com/pawantech12)

## 📄 License

This project is free to use.
