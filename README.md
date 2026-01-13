# E-Commerce Platform

A modern, full-featured e-commerce application built with React and Vite, integrated with the DummyJSON API.

## Features

### ✅ Core Features Implemented

1. **Products Display**

   - Fetch products from DummyJSON API
   - Display products in a responsive grid layout
   - Show product details: title, description, price, rating, thumbnail

2. **Cart Management**

   - Add/remove products from cart
   - Update product quantities
   - Persist cart data in localStorage
   - View cart summary with total price

3. **Wishlist**

   - Save favorite products
   - Toggle wishlist from product cards
   - Persist wishlist data in localStorage
   - View all wishlisted products

4. **Product Sorting**

   - Sort by title (A-Z, Z-A)
   - Sort by price (ascending/descending)
   - Sort by rating (highest first)

5. **Categories**

   - Fetch all product categories from API
   - Filter products by category
   - Display category-specific products

6. **Authentication**

   - Login using DummyJSON auth API
   - User session persistence
   - Protected routes for authenticated users only
   - Logout functionality

7. **Dashboard (Admin)**
   - Create new products (simulated)
   - Update existing products
   - Delete products
   - View all products in a table format
   - Only accessible to logged-in users

## Technology Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **State Management:** React Context API (useContext)
- **HTTP Client:** Axios
- **Routing:** React Router DOM 6
- **Styling:** CSS3

## Project Structure

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
