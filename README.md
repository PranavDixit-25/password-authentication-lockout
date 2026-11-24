# Secure Password Authentication & Account Lockout System

A browser-based Project-Based Learning (PBL) demonstration for **Cryptography and Network Security**.

## Features
- User registration
- Random per-account salt
- SHA-256 password hashing using the Web Crypto API
- No plaintext password storage
- Login authentication
- Failed-login counter
- Account lockout after 3 incorrect attempts
- Security Inspector for classroom demonstration
- No backend or dependencies; works on GitHub Pages

## Run locally
Open `index.html` in a modern browser. For best results, serve the folder with any local static server.

## Deploy with GitHub Pages
1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, `app.js`, and `README.md`.
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select your main branch and `/ (root)`, then save.

## Demo flow
1. Register a username and password.
2. Show the Security Inspector: it displays a salt and hash, not the plaintext password.
3. Login once with the correct password.
4. Enter an incorrect password three times.
5. Show that the account becomes locked.
6. Reset the demo lockout if you want to repeat the presentation.

## Important security note
This is an **educational client-side simulation**, not a production authentication system. Browser `localStorage` is used so the project can run entirely on GitHub Pages. A real authentication service should verify passwords on a trusted server, use a dedicated password-hashing/KDF algorithm such as Argon2id, scrypt, bcrypt, or PBKDF2 with appropriate parameters, store account data in a protected database, and implement secure session management and rate limiting.

## Learning outcomes
- Understand authentication and password verification.
- Understand why passwords should not be stored in plaintext.
- Understand salts and password hashing.
- Demonstrate protection against repeated login attempts through account lockout.

## AI usage disclosure
If AI tools are used during the PBL, document which tools were used, what they were used for, how their output was independently tested/verified/modified, and what was learned from the process, as required by the assignment.
