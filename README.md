# ENTNT Dental Center Management Dashboard

![Dashboard Screenshot](https://github.com/PrasadNalajala/dental-center-management/raw/master/dashboard-screenshot.png)

A modern, responsive, frontend-only React dashboard for managing a dental center, supporting Admin (Dentist) and Patient roles. All data is stored in localStorage. No backend, no external auth/data libraries, and no API usage.

---

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PrasadNalajala/dental-center-management.git
   cd dental-center-management
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the app:**
   ```bash
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Project Architecture

- **React + MUI:** Modern UI with Material-UI (MUI) and custom theming.
- **Routing:** `react-router-dom` for role-based navigation.
- **State Management:**
  - `AuthContext`: Simulated authentication, user state, and role switching.
  - `DataContext`: All patient, appointment, and incident data, persisted in localStorage.
- **Pages:**
  - `DashboardPage`: Admin dashboard with KPIs, appointments, and top patients.
  - `PatientManagementPage`: CRUD for patients.
  - `IncidentManagementPage`: CRUD for appointments/incidents, file upload (base64, localStorage).
  - `CalendarPage`: Custom calendar view (date-fns).
  - `LoginPage`: Simulated login for Admin and Patient roles.
  - `PatientDashboardPage`: Patient view of their own data, appointments, and files.
- **Components:**
  - `Layout`: Responsive sidebar, AppBar, and content area.
  - `KpiCard`: Modern, glassy KPI widgets.
  - `IncidentForm`, `PatientForm`: Forms for CRUD actions.
- **Styling:**
  - Custom MUI theme, glassmorphism, and responsive design.
  - All UI/UX is mobile-first and touch-friendly.

---

## 🐞 Known Issues / Limitations

- Data is not shared between browsers or devices (localStorage only).
- File uploads are limited by localStorage size and browser support.
- No real authentication or security (for demo/assignment use only).
- No backend integration or real-time updates.

---

## 📂 File Structure (Key Parts)

- `src/contexts/` — AuthContext, DataContext
- `src/pages/` — DashboardPage, PatientManagementPage, IncidentManagementPage, CalendarPage, LoginPage, PatientDashboardPage
- `src/components/` — Layout, KpiCard, forms
- `src/data/` — mockData.js (initial data)

---

## 📞 Contact
For questions or feedback, contact the project maintainer.
