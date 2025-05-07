# 🚗 Car Rental System with Admin Dashboard

## 📖 Overview

This **Car Rental System** is a client-side web application built using **HTML**, **CSS**, **JavaScript**, and **Bootstrap 5**. It offers an intuitive and responsive interface for customers to explore and book cars, while administrators can manage vehicle listings, track reservations, and view rental analytics via a dedicated dashboard. All data is stored in **localStorage**, simulating backend data persistence.

---

## 🎯 Objective

The system aims to:

- Enable users to browse, filter, and book available cars.
- Allow users to track their bookings.
- Provide an admin interface to manage rental fleet and access reports.
- Deliver a responsive and user-friendly experience across all devices.

---

## 🚀 Key Features

### 🔐 1. User Authentication

- Admin login with validation.
- Customer registration and login.
- Customers can book cars after logging in.

### 🏠 2. Home Page

An attractive landing page featuring:

- Navigation menu
- Image slider
- Featured vehicles
- Offers section
- Car categories
- About Us section
- Reviews section
- Footer with:
  - Social links
  - Contact info
  - Quick access links
  - Newsletter subscription

### 🚘 3. Car Listings

- Displays cars with images, brand, model, type, and rent per day.
- Search and filter by category, price, and availability.

### 📋 4. Car Details

- Detailed view of each car.
- Booking form with calendar and terms.

### 📆 5. Booking Functionality

- Dynamic booking form with validation.
- Select pickup/drop-off date and time.
- Booking summary popup.
- Bookings stored in localStorage.
- Cars become unavailable during booked times.

### 🛠️ 6. Admin Dashboard

- Secure login for administrators.
- Middleware to protect admin pages.
- Features include:
  - Add/Edit/Delete car listings
  - View/Add/Delete admins
  - Manage bookings (confirm, cancel)
  - Contact message management
  - Add/View/Delete car offers
  - View rental history (linked in offer page)
  - Control review visibility
  - View analytics using Chart.js:
    - Bookings per month/year
    - Peak hours
    - Booked car ranges
  - Toggle between table and card views

### 📱 7. Responsive Design

- Built with **Bootstrap 5**
- Works on mobile, tablet, and desktop devices

### 📜 8. Booking History

- Users can view their current and past bookings
- Track statuses: confirmed, pending

### 📬 9. Contact Us Page

- Contact form with validation
- Static Google Maps integration
- Display contact info

### ✅ 10. Validation Constraints

- Prevents deletion of records that are linked to others

---

## 🧱 Technical Stack

| Technology   | Purpose                             |
|--------------|--------------------------------------|
| HTML         | Structure and layout                |
| CSS          | Custom styling                      |
| Bootstrap 5  | Responsive design framework         |
| JavaScript   | Client-side logic, storage, validation |
| Chart.js     | Dashboard charts and analytics      |
| LocalStorage | Simulated backend data persistence  |

---

## 👥 User Roles

### Anonymous Users

- View home page
- Browse and filter cars
- Send contact messages
- Subscribe to newsletter
- View booking history

### Registered Users

- All anonymous features
- Register/Login
- Book cars with pickup/drop-off info
- View their booking history
- Add reviews
- Logout

### Admins

- Secure login
- Manage car listings
- View admin list
- Approve or cancel bookings
- Read contact messages
- Control reviews (visibility and deletion)
- Manage car offers
- View dashboard analytics
- Logout

### Super Admins

- All Admin privileges
- Add/Delete Admins and Super Admins
- Logout

---

## 🔁 User Flow

### For Anonymous Users:

1. Visit Home Page
2. Send Contact Messages
3. View Reviews Section
4. Register

### For Registered Users:

1. Login
2. Visit Home Page
3. Click “Explore Cars” to view listings
4. Use filters (type, price)
5. Click “Details” to view car info
6. Select dates and click “Book Now”
7. Track bookings via “Rents” page
8. Add review

### For Admins:

1. Login with Admin credentials
2. Access Dashboard tabs:
   - **Manage Cars:** Add, update, delete
   - **Bookings:** View, confirm, cancel
   - **Reports:** View charts
   - **Reviews:** Manage visibility, delete

### For Super Admins:

- All Admin features
- Add/Delete Admins and Super Admins

---

## ⚙️ Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SafaaMagdyAwad/Car-Rental-WithAdmin-DashboardITI
## Navigate to the project folder and open index.html:

```bash
cd Car-Rental-With-Admin-DashboardITI
```
open index.html

## Admin Access:

Login as Admin or Super Admin to access the dashboard.

📌 Note: All data is handled using localStorage and sessionStorage.

## 🗓️ Project Duration
Start Date: April 23, 2025

End Date: May 4, 2025

## ✨ Additional Features
Middleware for admin route protection

Reviews and ratings system

Dark mode support

## 👨‍💻 Team Members
Safaa Magdy Awad Mohammad – Team Leader

Mohmed Refaat Mohmed Mohmed

Eslam Ahmed Mohammed Abdelsalam

Eman Ibrahim Ibrahim Abdelgawwad

## 🔧 Version Control & Task Management
Source Code: GitHub Repository

Project Management: Trello Board