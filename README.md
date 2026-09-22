<<<<<<< HEAD
# AutoFlow_WTProject
=======
# AutoFlow — Intelligent Vehicle Service & Workshop Operations Management System
> **Academic Subject:** Engineering B.Tech — Web Technology  
> **Architecture:** Modern React + Vite + Tailwind CSS (Responsive Workshop Digital Twin)

---

## 🚗 Overview
**AutoFlow** is a vehicle service and workshop operations web platform that connects Customers, Service Advisors, Bay Mechanics, and Workshop Administrators into one connected digital lifecycle.

Instead of disconnected CRUD tables, AutoFlow functions as a **digital twin of workshop operations**, with live stage transitions, AI-assisted recommendations, automated inventory deduction, and a dedicated Workshop Live Board.

---

## 🎯 Features Implemented (As per Specification)

### 1. 👤 Customer Portal
- **Vehicle Garage Management**: Add new vehicles (Brand, Model, Year, Fuel, Odometer).
- **Service Booking**: Book periodic maintenance or custom issue diagnostic slots.
- **Visual Progress Timeline**: Step-by-step service journey tracking (`Booking` ➔ `Inspection` ➔ `Estimate` ➔ `In Service` ➔ `Quality Check` ➔ `Ready for Pickup` ➔ `Completed`).
- **Interactive Estimate Approval**: View parts/labor cost breakdown with 18% GST and 1-click **Approve** or **Decline**.
- **Simulated Digital Payments**: Pay invoice via UPI (Google Pay/PhonePe) or Credit Card and download/print receipts.
- **AI Predictive Maintenance Insight**: Displays component health confidence %, mileage analysis, and preventive recommendations.

### 2. 📋 Service Advisor Workspace
- **Vehicle Check-In**: Check in arriving vehicles to transition them to physical workshop bays.
- **Digital Multi-Point Inspection**: Interactive checklist covering:
  - *Exterior* (Front bumper, Rear bumper, Doors)
  - *Engine & Fluids* (Oil level, Battery, Coolant)
  - *Brakes* (Front/Rear pad wear)
  - *Tyres* (FL, FR, RL, RR tread condition)
- **Cost Estimation Generator**: Select parts directly from inventory or add custom labor with automated 18% GST calculation.
- **AI Smart Mechanic Assignment**: Recommends best-fit mechanics using the specification formula:  
  $$\text{Score} = (\text{Specialization} \times 0.5) + (\text{Availability} \times 0.3) + (\text{Workload} \times 0.2)$$
- **Quality Check (QC) Clearance**: Verify repairs and mark vehicle *Ready for Pickup*.

### 3. 🔧 Mechanic Bay Terminal
- **Technician Profile Switching**: View workload across mechanics (Amit Shinde, Rohan Kulkarni, Sachin Pawar, Dinesh Gaikwad).
- **Bay Service Execution**: Start service job cards (marks vehicle *In Service*).
- **Automated Parts Consumption**: Log parts used, which dynamically decrements workshop stock in real time.
- **Technician Notes**: Document progress logs and observations directly onto the job card.
- **Service Completion**: Submit vehicle for supervisor Quality Check.

### 4. 📊 Administrator & Operations Dashboard
- **Executive KPI Metrics**: Gross revenue from invoices, workshop bay utilization %, total vehicles in pipeline, and low-stock count.
- **Inventory Control**: Real-time stock monitor, minimum safety thresholds, and 1-click **Restock (+10 units)** button.
- **Technician Workload Tracking**: Real-time capacity utilization bars across all bay mechanics.

### 5. 📺 Workshop Live Board
- High-visibility Kanban board designed for workshop floor monitors and customer waiting lounges.
- Columns: **CHECK-IN**, **INSPECTION**, **IN SERVICE**, **QUALITY CHECK**, **READY FOR PICKUP**.

---

## 🚀 How to Run the Application

### 1. Open Terminal & Navigate to Project
```bash
cd C:\Users\Nishad\autoflow\frontend
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open in Browser
Open `http://localhost:5173` in your browser.

---

## 🎬 Recommended Viva / Demo Flow

1. **Step 1 (Customer Portal)**:
   - View `MH 31 CD 9012` (Honda City) which has an estimate awaiting approval.
   - Click **Review & Approve Estimate** ➔ Click **Approve & Authorize Work**.
2. **Step 2 (Service Advisor)**:
   - Switch to the **Service Advisor** tab from the top navigation bar.
   - Look for the approved vehicle and click **Assign Mechanic (AI)**.
   - Notice the AI ranking score based on specialization, availability, and workload. Click **Assign**.
3. **Step 3 (Mechanic Terminal)**:
   - Switch to **Mechanic** tab. Select the assigned mechanic.
   - Click **Start Vehicle Service** ➔ Click **Record Parts Used** (notice inventory decrements) ➔ Click **Complete Service & Submit QC**.
4. **Step 4 (Service Advisor QC)**:
   - Switch back to **Service Advisor** tab.
   - Click **Pass QC & Mark Ready** to generate the final invoice.
5. **Step 5 (Customer Payment)**:
   - Switch to **Customer** tab. Click **View & Pay Invoice** ➔ Click **Pay via UPI**.
   - The status updates to **Completed** and gets archived to service history.
6. **Step 6 (Live Board & Admin)**:
   - Switch to **Live Board** to see the digital twin board or **Admin** to inspect inventory stock alerts and revenue counters.

*Tip: You can reset all demo data back to default anytime using the **Reset Demo** button in the top navbar.*
>>>>>>> 67c5c77 (Initial Frontend Commit)
