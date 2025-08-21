# 🛍️ TechShop-Angular

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Angular](https://img.shields.io/badge/Angular-17-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![RxJS](https://img.shields.io/badge/RxJS-7-purple)

A **responsive e-commerce web application** built with **Angular**, designed to simulate a modern tech store.  
This project demonstrates real-world Angular practices such as **lazy loading, route resolvers,REST API and reactive programming with RxJS**.  

---

## 📑 Table of Contents
- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)   
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running Locally](#running-locally)  
- [Testing](#testing)  
- [Project Structure](#project-structure)  
- [Contributing](#contributing)  
- [License](#license)  
- [Credits](#credits)  
- [Contact](#contact)  

---

## 🔎 Overview
**TechShop-Angular** is a scalable Angular front-end project that replicates the flow of a tech e-commerce store.  
It is intended both as a **learning project** to practice professional Angular patterns and as a **portfolio showcase** for real-world web app development.  

---

## ✨ Features
- **API-powered product catalog** – All product, cart, and user data are fetched from a REST API
- **Product Catalog** with dynamic filtering and sorting  
- **Product Details** preloaded with **Angular Route Resolvers**  
- **Lazy Loading** for optimized performance  
- **Reactive Programming with RxJS** for data streams and async handling  
- **Shopping Cart** with add/remove functionality and live quantity updates  
- **Authentication Flow** (login/logout simulation)  
- **Responsive Design** (mobile-first and desktop support)  

---

## 🛠 Tech Stack
- **Angular 17** (framework)  
- **TypeScript 5** (language)  
- **RxJS 7** (reactive programming)  
- **Angular Router** (lazy loading + resolvers)
- **REST API Integration** (mock data)
- **SCSS / CSS3** (styling)  

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)  
- **npm** (comes with Node.js)  
- (Optional) Angular CLI:
  ```bash
  npm install -g @angular/cli
  
### Installation
git clone https://github.com/N4cvlia/TechShop-Angular.git
cd TechShop-Angular
npm install

### Running Locally
npm start

## 🧪 Testing
ng test
(Currently minimal tests — future work includes full unit/E2E coverage.)

## 📂 Project Structure
src/
├── app/
│   ├── Components/      # Feature modules (Navbar, Footer, Loader)
│   ├── Guards/          # Link Guards and CanActivates
│   ├── Pages/           # Shop Pages
│   ├── Resolver/        # Site resolvers
│   ├── Services/        # API and state services
│   └── app-routes.ts
├── assets/                # Images, logos, static files
└── styles/                # Global SCSS/CSS

## 🤝 Contributing
Contributions are welcome!

Fork the project
Create a feature branch:
git checkout -b feature/my-feature

Commit your changes:
git commit -m "feat: add my feature"

Push and open a Pull Request

## 📜 License
This project is licensed under the MIT License.
See the LICENSE file for more details.

## 🎨 Credits
Logo Design: created by graphic designer Giorgi Goderdzishvili
Project created and maintained by Nikolozi Natsvlishvili

## 📬 Contact
👤 Nikolozi Natsvlishvili
GitHub: N4cvlia
Email: kaxa487@gmail.com
LinkedIn: http://linkedin.com/in/nikolozi-natsvlishvili-741363320/
