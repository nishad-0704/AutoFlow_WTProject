// Initial seed data based on AutoFlow specification

export const initialVehicles = [
  {
    id: "veh-1",
    customerId: "cust-1",
    customerName: "Rahul Sharma",
    phone: "+91 98765 43210",
    registrationNumber: "MH 12 AB 1234",
    brand: "Toyota",
    model: "Fortuner",
    year: 2021,
    fuelType: "Diesel",
    odometer: 42500,
    aiInsight: {
      component: "Brake System",
      confidence: 82,
      recommendation: "Brake inspection recommended",
      reason: "Brake pads were last replaced approximately 18,500 km ago.",
      action: "Schedule front brake inspection."
    }
  },
  {
    id: "veh-2",
    customerId: "cust-2",
    customerName: "Priya Patel",
    phone: "+91 98231 23456",
    registrationNumber: "MH 14 XY 5678",
    brand: "Hyundai",
    model: "Creta",
    year: 2022,
    fuelType: "Petrol",
    odometer: 28000,
    aiInsight: {
      component: "Engine & Fluids",
      confidence: 90,
      recommendation: "Engine oil & filter replacement due",
      reason: "Last oil change was 9,500 km ago. Synthetic oil interval reaching limit.",
      action: "Replace 5W-30 engine oil."
    }
  },
  {
    id: "veh-3",
    customerId: "cust-3",
    customerName: "Aditya Verma",
    phone: "+91 97654 98765",
    registrationNumber: "MH 31 CD 9012",
    brand: "Honda",
    model: "City",
    year: 2020,
    fuelType: "Petrol",
    odometer: 54000,
    aiInsight: {
      component: "Cooling System",
      confidence: 75,
      recommendation: "Coolant flush recommended",
      reason: "Coolant level tested slightly acidic during last seasonal check.",
      action: "Inspect radiator and top-up coolant."
    }
  },
  {
    id: "veh-4",
    customerId: "cust-4",
    customerName: "Sneha Deshmukh",
    phone: "+91 91234 56780",
    registrationNumber: "MH 09 EF 3456",
    brand: "Tata",
    model: "Nexon",
    year: 2023,
    fuelType: "EV",
    odometer: 15200,
    aiInsight: {
      component: "Tyres & Alignment",
      confidence: 88,
      recommendation: "Tyre rotation & wheel balancing",
      reason: "Uneven tread wear detected on front-right tyre.",
      action: "Rotate tyres and align suspension."
    }
  },
  {
    id: "veh-5",
    customerId: "cust-5",
    customerName: "Vikram Malhotra",
    phone: "+91 98450 11223",
    registrationNumber: "MH 22 GH 7890",
    brand: "Mahindra",
    model: "XUV700",
    year: 2022,
    fuelType: "Diesel",
    odometer: 33400,
    aiInsight: null
  }
];

export const initialMechanics = [
  {
    id: "mech-1",
    name: "Amit Shinde",
    specialization: "Engine & Transmission",
    available: true,
    currentWorkload: 1, // active jobs
    rating: 4.9,
    experienceYears: 7
  },
  {
    id: "mech-2",
    name: "Rohan Kulkarni",
    specialization: "AC & Electrical",
    available: true,
    currentWorkload: 0,
    rating: 4.8,
    experienceYears: 5
  },
  {
    id: "mech-3",
    name: "Sachin Pawar",
    specialization: "Brakes & Suspension",
    available: true,
    currentWorkload: 2,
    rating: 4.7,
    experienceYears: 6
  },
  {
    id: "mech-4",
    name: "Dinesh Gaikwad",
    specialization: "General Service & Diagnostics",
    available: true,
    currentWorkload: 1,
    rating: 4.6,
    experienceYears: 4
  }
];

export const initialInventory = [
  { id: "part-1", name: "Synthetic Engine Oil 5W-40 (4L)", partNumber: "ENG-OIL-5W40", category: "Fluids", quantity: 24, minimumStock: 10, unitPrice: 3500 },
  { id: "part-2", name: "Premium Oil Filter", partNumber: "FLT-OIL-01", category: "Filters", quantity: 8, minimumStock: 5, unitPrice: 800 },
  { id: "part-3", name: "Front Ceramic Brake Pads", partNumber: "BRK-PAD-FR01", category: "Brakes", quantity: 3, minimumStock: 6, unitPrice: 2800 },
  { id: "part-4", name: "Engine Air Filter", partNumber: "FLT-AIR-02", category: "Filters", quantity: 16, minimumStock: 8, unitPrice: 1200 },
  { id: "part-5", name: "Iridium Spark Plugs (Set of 4)", partNumber: "IGN-SPK-04", category: "Ignition", quantity: 2, minimumStock: 5, unitPrice: 2200 },
  { id: "part-6", name: "Coolant Ready-Mix (3L)", partNumber: "FLD-CLN-03", category: "Fluids", quantity: 12, minimumStock: 6, unitPrice: 950 },
  { id: "part-7", name: "Cabin AC Filter", partNumber: "FLT-CAB-05", category: "Filters", quantity: 10, minimumStock: 4, unitPrice: 850 },
  { id: "part-8", name: "Wiper Blades (Pair)", partNumber: "WPR-BLD-01", category: "Accessories", quantity: 14, minimumStock: 5, unitPrice: 650 }
];

export const initialServices = [
  {
    id: "srv-101",
    bookingId: "bk-101",
    vehicleId: "veh-1",
    customerName: "Rahul Sharma",
    phone: "+91 98765 43210",
    registrationNumber: "MH 12 AB 1234",
    vehicleModel: "Toyota Fortuner (2021)",
    serviceType: "Periodic Maintenance + Brake Noise",
    priority: "Normal",
    status: "IN_SERVICE", // Lifecycle: BOOKED -> CHECKED_IN -> INSPECTION -> ESTIMATE_PENDING -> WAITING_APPROVAL -> APPROVED -> ASSIGNED -> IN_SERVICE -> QUALITY_CHECK -> READY -> COMPLETED
    advisorName: "Vikram Patil",
    assignedMechanicId: "mech-1",
    assignedMechanicName: "Amit Shinde",
    problemDescription: "Slight squeaking sound from front brakes when slowing down at high speeds. 40,000km scheduled service.",
    inspection: {
      exterior: { frontBumper: "ok", rearBumper: "ok", leftDoor: "issue", rightDoor: "ok" },
      engine: { engineOil: "issue", battery: "ok", coolant: "ok" },
      brakes: { frontBrake: "issue", rearBrake: "ok" },
      tyres: { fl: "ok", fr: "issue", rl: "ok", rr: "ok" },
      notes: "Front brake pads worn to ~2.5mm. Engine oil dark. Front right tyre pressure slightly low."
    },
    estimate: {
      id: "est-1024",
      items: [
        { desc: "Synthetic Engine Oil 5W-40 (4L)", cost: 3500, type: "part" },
        { desc: "Premium Oil Filter", cost: 800, type: "part" },
        { desc: "Front Ceramic Brake Pads", cost: 2800, type: "part" },
        { desc: "Air Filter Replacement", cost: 1200, type: "part" },
        { desc: "Comprehensive Labor & Caliper Service", cost: 2000, type: "labor" }
      ],
      subtotal: 10300,
      tax: 1854, // 18% GST
      discount: 500,
      total: 11654,
      status: "APPROVED" // PENDING, APPROVED, REJECTED
    },
    partsUsed: [
      { partId: "part-1", name: "Synthetic Engine Oil 5W-40 (4L)", quantity: 1, price: 3500 },
      { partId: "part-2", name: "Premium Oil Filter", quantity: 1, price: 800 }
    ],
    serviceNotes: [
      { timestamp: "10:15 AM", author: "Vikram Patil (Advisor)", text: "Vehicle checked in and digital multi-point inspection recorded." },
      { timestamp: "11:00 AM", author: "Rahul Sharma (Customer)", text: "Estimate approved via Customer Portal." },
      { timestamp: "11:20 AM", author: "Amit Shinde (Mechanic)", text: "Drained old oil, installed new oil filter. Brake caliper dismantled." }
    ],
    invoice: {
      invoiceNumber: "INV-2026-041",
      subtotal: 10300,
      tax: 1854,
      discount: 500,
      total: 11654,
      paymentStatus: "PENDING", // PENDING, PAID
      generatedAt: "2026-09-16"
    },
    createdAt: "2026-09-16 09:30 AM"
  },
  {
    id: "srv-102",
    bookingId: "bk-102",
    vehicleId: "veh-2",
    customerName: "Priya Patel",
    phone: "+91 98231 23456",
    registrationNumber: "MH 14 XY 5678",
    vehicleModel: "Hyundai Creta (2022)",
    serviceType: "AC Cooling & General Checkup",
    priority: "High",
    status: "INSPECTION",
    advisorName: "Vikram Patil",
    assignedMechanicId: null,
    assignedMechanicName: null,
    problemDescription: "AC not cooling effectively during hot afternoons. Mild whistling sound when blower is at level 3.",
    inspection: {
      exterior: { frontBumper: "ok", rearBumper: "ok", leftDoor: "ok", rightDoor: "ok" },
      engine: { engineOil: "ok", battery: "issue", coolant: "ok" },
      brakes: { frontBrake: "ok", rearBrake: "ok" },
      tyres: { fl: "ok", fr: "ok", rl: "ok", rr: "ok" },
      notes: "Cabin air filter clogged with dust. AC gas pressure slightly lower than recommended."
    },
    estimate: null,
    partsUsed: [],
    serviceNotes: [
      { timestamp: "09:45 AM", author: "Vikram Patil (Advisor)", text: "Vehicle checked in at reception." }
    ],
    invoice: null,
    createdAt: "2026-09-16 09:00 AM"
  },
  {
    id: "srv-103",
    bookingId: "bk-103",
    vehicleId: "veh-3",
    customerName: "Aditya Verma",
    phone: "+91 97654 98765",
    registrationNumber: "MH 31 CD 9012",
    vehicleModel: "Honda City (2020)",
    serviceType: "Full 50,000 KM Major Service",
    priority: "Normal",
    status: "WAITING_APPROVAL",
    advisorName: "Vikram Patil",
    assignedMechanicId: null,
    assignedMechanicName: null,
    problemDescription: "Standard 50,000 km periodic service with spark plug inspection and wheel alignment.",
    inspection: {
      exterior: { frontBumper: "ok", rearBumper: "ok", leftDoor: "ok", rightDoor: "ok" },
      engine: { engineOil: "issue", battery: "ok", coolant: "issue" },
      brakes: { frontBrake: "ok", rearBrake: "ok" },
      tyres: { fl: "ok", fr: "issue", rl: "ok", rr: "ok" },
      notes: "Spark plugs have carbon build up. Coolant requires top up."
    },
    estimate: {
      id: "est-1025",
      items: [
        { desc: "Synthetic Engine Oil 5W-30", cost: 3200, type: "part" },
        { desc: "Oil Filter Honda OEM", cost: 650, type: "part" },
        { desc: "Iridium Spark Plugs Set", cost: 2200, type: "part" },
        { desc: "Major Service Labor & Tuning", cost: 2500, type: "labor" }
      ],
      subtotal: 8550,
      tax: 1539,
      discount: 300,
      total: 9789,
      status: "PENDING"
    },
    partsUsed: [],
    serviceNotes: [
      { timestamp: "08:30 AM", author: "Vikram Patil", text: "Vehicle checked in and digital estimate dispatched to customer." }
    ],
    invoice: null,
    createdAt: "2026-09-16 08:15 AM"
  },
  {
    id: "srv-104",
    bookingId: "bk-104",
    vehicleId: "veh-4",
    customerName: "Sneha Deshmukh",
    phone: "+91 91234 56780",
    registrationNumber: "MH 09 EF 3456",
    vehicleModel: "Tata Nexon EV (2023)",
    serviceType: "Periodic EV Diagnostics & Wheel Alignment",
    priority: "Normal",
    status: "QUALITY_CHECK",
    advisorName: "Vikram Patil",
    assignedMechanicId: "mech-4",
    assignedMechanicName: "Dinesh Gaikwad",
    problemDescription: "Steering pulling slightly to the left on highway. 15,000 km battery health diagnostic report requested.",
    inspection: {
      exterior: { frontBumper: "ok", rearBumper: "ok", leftDoor: "ok", rightDoor: "ok" },
      engine: { engineOil: "ok", battery: "ok", coolant: "ok" },
      brakes: { frontBrake: "ok", rearBrake: "ok" },
      tyres: { fl: "ok", fr: "issue", rl: "ok", rr: "ok" },
      notes: "Camber and toe adjustment needed on front axle."
    },
    estimate: {
      id: "est-1023",
      items: [
        { desc: "EV High Voltage Diagnostic Scan", cost: 1200, type: "labor" },
        { desc: "Computerized Wheel Alignment & Balancing", cost: 1500, type: "labor" }
      ],
      subtotal: 2700,
      tax: 486,
      discount: 0,
      total: 3186,
      status: "APPROVED"
    },
    partsUsed: [],
    serviceNotes: [
      { timestamp: "10:00 AM", author: "Dinesh Gaikwad", text: "Suspension aligned. High-voltage battery pack state of health is 98.4%. Test drive done." }
    ],
    invoice: {
      invoiceNumber: "INV-2026-039",
      subtotal: 2700,
      tax: 486,
      discount: 0,
      total: 3186,
      paymentStatus: "PENDING",
      generatedAt: "2026-09-16"
    },
    createdAt: "2026-09-16 08:00 AM"
  },
  {
    id: "srv-105",
    bookingId: "bk-105",
    vehicleId: "veh-5",
    customerName: "Vikram Malhotra",
    phone: "+91 98450 11223",
    registrationNumber: "MH 22 GH 7890",
    vehicleModel: "Mahindra XUV700 (2022)",
    serviceType: "Suspension Inspection & Wiper Change",
    priority: "Normal",
    status: "READY",
    advisorName: "Vikram Patil",
    assignedMechanicId: "mech-3",
    assignedMechanicName: "Sachin Pawar",
    problemDescription: "Wiper blades streaking on windshield. Road test check for suspension thud.",
    inspection: {
      exterior: { frontBumper: "ok", rearBumper: "ok", leftDoor: "ok", rightDoor: "ok" },
      engine: { engineOil: "ok", battery: "ok", coolant: "ok" },
      brakes: { frontBrake: "ok", rearBrake: "ok" },
      tyres: { fl: "ok", fr: "ok", rl: "ok", rr: "ok" },
      notes: "Wiper rubber torn. Bushings lubricated, noise resolved."
    },
    estimate: {
      id: "est-1022",
      items: [
        { desc: "Wiper Blades (Pair)", cost: 650, type: "part" },
        { desc: "Suspension Greasing & Checkup", cost: 800, type: "labor" }
      ],
      subtotal: 1450,
      tax: 261,
      discount: 0,
      total: 1711,
      status: "APPROVED"
    },
    partsUsed: [
      { partId: "part-8", name: "Wiper Blades (Pair)", quantity: 1, price: 650 }
    ],
    serviceNotes: [
      { timestamp: "09:15 AM", author: "Sachin Pawar", text: "New wiper blades fitted. Suspension test passed." },
      { timestamp: "11:30 AM", author: "Vikram Patil", text: "Quality check completed. Vehicle washed and vacuumed. Ready for pickup." }
    ],
    invoice: {
      invoiceNumber: "INV-2026-038",
      subtotal: 1450,
      tax: 261,
      discount: 0,
      total: 1711,
      paymentStatus: "PAID",
      generatedAt: "2026-09-16"
    },
    createdAt: "2026-09-15 03:00 PM"
  }
];

export const initialNotifications = [
  {
    id: "notif-1",
    timestamp: "Just now",
    title: "Service In Progress",
    message: "Mechanic Amit Shinde started work on Toyota Fortuner (MH 12 AB 1234).",
    type: "info",
    role: "customer"
  },
  {
    id: "notif-2",
    timestamp: "10 mins ago",
    title: "Estimate Awaiting Approval",
    message: "Estimate #EST-1025 for Honda City (MH 31 CD 9012) sent for customer approval.",
    type: "warning",
    role: "advisor"
  },
  {
    id: "notif-3",
    timestamp: "25 mins ago",
    title: "Vehicle Ready for Pickup",
    message: "Mahindra XUV700 (MH 22 GH 7890) has cleared Quality Check and is ready.",
    type: "success",
    role: "customer"
  },
  {
    id: "notif-4",
    timestamp: "1 hour ago",
    title: "Low Inventory Alert",
    message: "Brake Pads stock is 3 (Min threshold: 6). Restock recommended.",
    type: "alert",
    role: "admin"
  }
];
