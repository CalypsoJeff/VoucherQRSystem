# Voucher Management System

A simple and efficient Voucher Management application that allows users to:
- Log in and access the dashboard.
- Generate a QR Voucher.
- Export the QR Voucher as a **PDF**.
- Print the voucher directly.
- Access a settings page to configure voucher dimensions, title, and expiry time.

---

## **Features**
1. **Login System**  
   - User authentication using `express-session`.
   - Session-based login mechanism for secure access.

2. **Dashboard**  
   - After login, users see a dashboard containing:
     - A button to generate a QR code-based voucher.
     - A list of existing vouchers.

3. **Generate QR Code**  
   - Generate a unique 10-digit random number as a voucher code.
   - Create a QR code using the `qrcode` package.
   - Save QR code details (voucher code, generated date, expiry date) to the SQL Server database.
   - Display a success message after generating the QR voucher.

4. **PDF Generation**  
   - Export the voucher as a **PDF** containing:
     - Voucher Title (configurable from the settings page).
     - Generated Date and Expiry Date.
     - QR Code image in the center.
     - Proper formatting and design.

5. **Settings Page**  
   - Configure the following settings:
     - Maximum expiry time (in days).
     - Voucher width and height (in mm).
     - Font sizes for the title and normal text.

6. **Print Voucher**  
   - Print the generated voucher PDF directly with a single click.

---

## **Tech Stack**
- **Backend**: Node.js with **Express.js**.
- **Frontend**: **EJS** (Embedded JavaScript Templates) for server-side rendering.
- **Database**: **SQL Server Express** for storing voucher data.
- **PDF Generation**: `pdfkit` for exporting voucher details.
- **QR Code Generation**: `qrcode` package for QR code generation.
- **Session Management**: `express-session` for login authentication.

---
## AI-Assisted Development:
This project utilized AI tools like ChatGPT, Claude.Ai and V0byVercel to enhance the development process:

- Frontend UI Development: ChatGPT was instrumental in generating and improving the frontend UI components/pages.
- Error Handling: AI assistance helped identify and resolve bugs more efficiently during the development process.
- Understanding SQL Server Express: These tools provided valuable explanations and guidance, enabling a deeper understanding of SQL Server Express concepts.
By leveraging these tools, the development speed and code quality were significantly improved, ensuring a smoother and more efficient workflow.

---

## **Application Structure**
```plaintext
/VOUCHERQRSYSTEM
├── index.js               # Express.js server configuration
├── /views/user             # EJS templates for user-related views (login, dashboard, etc.)
├── /routes                 # Application routes (login, dashboard, settings)
├── /controllers            # Controllers for handling requests
├── /models                 # Models for interacting with SQL Server database
└── /public                 # Static files (CSS, JS, images)

## Prerequisites
- Node.js installed on your local machine.
- Git installed for version control.

---

## Installation

### Clone the Repository
Clone the repository and navigate into it:
```bash
git clone [[https://github.com/CalypsoJeff/URL-Shortener.git](https://github.com/CalypsoJeff/URL-Shortener.git)](https://github.com/CalypsoJeff/VoucherQRSystem.git)
cd VoucherQRSystem
npm install

Create a .env file in root directory and add the necessary environment variables. 
Example:
PORT = 
DB_USER=
DB_PASS=
DB_NAME=
SESSION_SECRET=
DB_HOST=
DB_TRUST_CERTIFICATE=
Access the Application:
http://localhost:5000


Contributing
Contributions are welcome! 
Feel free to fork the repository and submit a pull request.

