import React, { createContext, useContext, useState, useEffect } from "react";
import {
  initialVehicles,
  initialMechanics,
  initialInventory,
  initialServices,
  initialNotifications
} from "../data/initialData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Role switcher: 'customer' | 'advisor' | 'mechanic' | 'admin' | 'liveboard'
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem("autoflow_role") || "customer";
  });

  // Active user / vehicle for Customer view
  const [selectedVehicleId, setSelectedVehicleId] = useState("veh-1");

  // State with LocalStorage persistence
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem("autoflow_vehicles");
    return saved ? JSON.parse(saved) : initialVehicles;
  });

  const [mechanics, setMechanics] = useState(() => {
    const saved = localStorage.getItem("autoflow_mechanics");
    return saved ? JSON.parse(saved) : initialMechanics;
  });

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem("autoflow_inventory");
    return saved ? JSON.parse(saved) : initialInventory;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem("autoflow_services");
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("autoflow_notifications");
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [toast, setToast] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem("autoflow_role", currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem("autoflow_vehicles", JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem("autoflow_mechanics", JSON.stringify(mechanics));
  }, [mechanics]);

  useEffect(() => {
    localStorage.setItem("autoflow_inventory", JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem("autoflow_services", JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem("autoflow_notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Toast Helper
  const showToast = (message, type = "info") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const addNotification = (title, message, type = "info", role = "customer") => {
    const newNotif = {
      id: "notif-" + Date.now(),
      timestamp: "Just now",
      title,
      message,
      type,
      role
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`${title}: ${message}`, type);
  };

  // 1. Add Vehicle (Customer)
  const addVehicle = (vehicleData) => {
    const newVehicle = {
      id: "veh-" + (vehicles.length + 1),
      customerId: "cust-1",
      customerName: "Rahul Sharma",
      phone: "+91 98765 43210",
      ...vehicleData,
      odometer: Number(vehicleData.odometer) || 10000,
      aiInsight: {
        component: "General Inspection",
        confidence: 85,
        recommendation: "Initial baseline diagnostic recommended",
        reason: "Newly registered vehicle added to workshop management system.",
        action: "Schedule digital 40-point health check."
      }
    };
    setVehicles((prev) => [newVehicle, ...prev]);
    setSelectedVehicleId(newVehicle.id);
    addNotification("Vehicle Registered", `${newVehicle.brand} ${newVehicle.model} (${newVehicle.registrationNumber}) added.`, "success", "customer");
    return newVehicle;
  };

  // 2. Book Service (Customer)
  const bookService = ({ vehicleId, serviceType, preferredDate, preferredTime, description }) => {
    const veh = vehicles.find((v) => v.id === vehicleId);
    if (!veh) return;

    const newService = {
      id: "srv-" + (Date.now() % 10000),
      bookingId: "bk-" + (Date.now() % 10000),
      vehicleId: veh.id,
      customerName: veh.customerName || "Rahul Sharma",
      phone: veh.phone || "+91 98765 43210",
      registrationNumber: veh.registrationNumber,
      vehicleModel: `${veh.brand} ${veh.model} (${veh.year})`,
      serviceType,
      priority: "Normal",
      status: "BOOKED", // Lifecycle starts at BOOKED
      advisorName: "Vikram Patil",
      assignedMechanicId: null,
      assignedMechanicName: null,
      problemDescription: description || `${serviceType} requested for ${preferredDate} at ${preferredTime}.`,
      inspection: null,
      estimate: null,
      partsUsed: [],
      serviceNotes: [
        {
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          author: `${veh.customerName} (Customer)`,
          text: `Service booking requested for ${preferredDate} (${preferredTime}). Notes: ${description || 'None'}`
        }
      ],
      invoice: null,
      createdAt: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setServices((prev) => [newService, ...prev]);
    addNotification(
      "New Booking Received",
      `Booking ${newService.bookingId} for ${veh.registrationNumber} by ${veh.customerName}.`,
      "info",
      "advisor"
    );
  };

  // 3. Check-In Vehicle (Advisor)
  const checkInVehicle = (serviceId) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          return {
            ...s,
            status: "INSPECTION",
            serviceNotes: [
              ...s.serviceNotes,
              {
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                author: "Vikram Patil (Advisor)",
                text: "Vehicle physically arrived and checked into workshop bay."
              }
            ]
          };
        }
        return s;
      })
    );
    addNotification("Vehicle Checked In", `Vehicle ${serviceId} checked in. Digital inspection now open.`, "info", "customer");
  };

  // 4. Save Inspection (Advisor)
  const saveInspection = (serviceId, inspectionData) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          return {
            ...s,
            status: "ESTIMATE_PENDING",
            inspection: inspectionData,
            serviceNotes: [
              ...s.serviceNotes,
              {
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                author: "Vikram Patil (Advisor)",
                text: `Digital inspection completed. Notes: ${inspectionData.notes || 'Components assessed.'}`
              }
            ]
          };
        }
        return s;
      })
    );
    addNotification("Inspection Completed", `Inspection done for ${serviceId}. Preparing cost estimate.`, "info", "advisor");
  };

  // 5. Create Estimate (Advisor)
  const createEstimate = (serviceId, items, discount = 0) => {
    const subtotal = items.reduce((sum, item) => sum + Number(item.cost), 0);
    const tax = Math.round((subtotal - discount) * 0.18); // 18% GST
    const total = subtotal - discount + tax;

    const estimate = {
      id: "est-" + Math.floor(1000 + Math.random() * 9000),
      items,
      subtotal,
      discount: Number(discount),
      tax,
      total,
      status: "PENDING"
    };

    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          return {
            ...s,
            status: "WAITING_APPROVAL",
            estimate,
            serviceNotes: [
              ...s.serviceNotes,
              {
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                author: "Vikram Patil (Advisor)",
                text: `Service estimate #${estimate.id} generated (₹${total.toLocaleString()}) sent for customer authorization.`
              }
            ]
          };
        }
        return s;
      })
    );

    addNotification("Estimate Awaiting Approval", `Estimate of ₹${total.toLocaleString()} generated for your vehicle. Please review and approve.`, "warning", "customer");
  };

  // 6. Respond to Estimate (Customer)
  const respondToEstimate = (serviceId, approved) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          const nextStatus = approved ? "APPROVED" : "REJECTED";
          return {
            ...s,
            status: nextStatus,
            estimate: {
              ...s.estimate,
              status: approved ? "APPROVED" : "REJECTED"
            },
            serviceNotes: [
              ...s.serviceNotes,
              {
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                author: `${s.customerName} (Customer)`,
                text: approved
                  ? "Estimate approved by customer. Ready for mechanic assignment."
                  : "Estimate declined by customer."
              }
            ]
          };
        }
        return s;
      })
    );

    if (approved) {
      addNotification("Estimate Approved", `Customer approved estimate for ${serviceId}. You may now assign a mechanic.`, "success", "advisor");
    } else {
      addNotification("Estimate Declined", `Customer rejected estimate for ${serviceId}.`, "alert", "advisor");
    }
  };

  // 7. Assign Mechanic (Advisor)
  const assignMechanic = (serviceId, mechanicId) => {
    const mech = mechanics.find((m) => m.id === mechanicId);
    if (!mech) return;

    // Increment workload
    setMechanics((prev) =>
      prev.map((m) => (m.id === mechanicId ? { ...m, currentWorkload: m.currentWorkload + 1 } : m))
    );

    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          return {
            ...s,
            status: "ASSIGNED",
            assignedMechanicId: mech.id,
            assignedMechanicName: mech.name,
            serviceNotes: [
              ...s.serviceNotes,
              {
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                author: "Vikram Patil (Advisor)",
                text: `Assigned job card to mechanic ${mech.name} (${mech.specialization}).`
              }
            ]
          };
        }
        return s;
      })
    );

    addNotification("Mechanic Assigned", `You have been assigned vehicle service ${serviceId}.`, "info", "mechanic");
  };

  // 8. Start Service (Mechanic)
  const startService = (serviceId) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          return {
            ...s,
            status: "IN_SERVICE",
            serviceNotes: [
              ...s.serviceNotes,
              {
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                author: `${s.assignedMechanicName || 'Mechanic'}`,
                text: "Service work commenced on vehicle."
              }
            ]
          };
        }
        return s;
      })
    );
    addNotification("Service In Progress", `Mechanic started work on ${serviceId}.`, "info", "customer");
  };

  // 9. Log Parts Used & Decrement Inventory (Mechanic)
  const logPartsUsed = (serviceId, partId, quantity) => {
    const part = inventory.find((p) => p.id === partId);
    if (!part) return;

    if (part.quantity < quantity) {
      showToast(`Not enough ${part.name} in inventory! Available: ${part.quantity}`, "error");
      return false;
    }

    // Decrement stock
    const updatedInventory = inventory.map((p) => {
      if (p.id === partId) {
        const newQty = p.quantity - quantity;
        if (newQty <= p.minimumStock) {
          addNotification("Low Inventory Alert", `Part "${p.name}" is low on stock (${newQty} left).`, "alert", "admin");
        }
        return { ...p, quantity: newQty };
      }
      return p;
    });
    setInventory(updatedInventory);

    // Update service
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          const existingPart = s.partsUsed.find((p) => p.partId === partId);
          let newPartsUsed;
          if (existingPart) {
            newPartsUsed = s.partsUsed.map((p) =>
              p.partId === partId ? { ...p, quantity: p.quantity + quantity } : p
            );
          } else {
            newPartsUsed = [
              ...s.partsUsed,
              { partId: part.id, name: part.name, quantity, price: part.unitPrice }
            ];
          }

          return {
            ...s,
            partsUsed: newPartsUsed,
            serviceNotes: [
              ...s.serviceNotes,
              {
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                author: `${s.assignedMechanicName || 'Mechanic'}`,
                text: `Fitted part: ${part.name} (Qty: ${quantity}). Inventory updated.`
              }
            ]
          };
        }
        return s;
      })
    );

    showToast(`Logged ${quantity}x ${part.name} for service`, "success");
    return true;
  };

  // 10. Add Service Note
  const addServiceNote = (serviceId, text, authorRole = currentRole) => {
    let author = "Staff";
    if (authorRole === "mechanic") author = "Mechanic";
    else if (authorRole === "advisor") author = "Vikram Patil (Advisor)";
    else if (authorRole === "admin") author = "Admin";
    else author = "Customer";

    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          return {
            ...s,
            serviceNotes: [
              ...s.serviceNotes,
              {
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                author,
                text
              }
            ]
          };
        }
        return s;
      })
    );
  };

  // 11. Complete Service -> Moves to QUALITY_CHECK (Mechanic)
  const completeService = (serviceId) => {
    let mechanicId = null;
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          mechanicId = s.assignedMechanicId;
          return {
            ...s,
            status: "QUALITY_CHECK",
            serviceNotes: [
              ...s.serviceNotes,
              {
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                author: `${s.assignedMechanicName || 'Mechanic'}`,
                text: "Mechanical work finished. Vehicle submitted for final Quality Inspection."
              }
            ]
          };
        }
        return s;
      })
    );

    // Relieve mechanic workload
    if (mechanicId) {
      setMechanics((prev) =>
        prev.map((m) =>
          m.id === mechanicId ? { ...m, currentWorkload: Math.max(0, m.currentWorkload - 1) } : m
        )
      );
    }

    addNotification("Work Completed -> QC Required", `Job ${serviceId} ready for quality verification.`, "info", "advisor");
  };

  // 12. Approve Quality Check -> READY & Generate Invoice (Advisor)
  const approveQualityCheck = (serviceId) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          const inv = s.invoice || {
            invoiceNumber: "INV-2026-0" + Math.floor(100 + Math.random() * 900),
            subtotal: s.estimate?.subtotal || 6500,
            tax: s.estimate?.tax || 1170,
            discount: s.estimate?.discount || 0,
            total: s.estimate?.total || 7670,
            paymentStatus: "PENDING",
            generatedAt: new Date().toISOString().split("T")[0]
          };

          return {
            ...s,
            status: "READY",
            invoice: inv,
            serviceNotes: [
              ...s.serviceNotes,
              {
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                author: "Vikram Patil (Advisor)",
                text: "Vehicle cleared Quality Check, road tested & washed. Marked READY FOR PICKUP."
              }
            ]
          };
        }
        return s;
      })
    );

    addNotification("Vehicle Ready for Pickup", `Your vehicle is ready for pickup! Invoice is ready for payment.`, "success", "customer");
  };

  // 13. Pay Invoice (Customer / Admin) -> COMPLETED
  const payInvoice = (serviceId, paymentMethod = "UPI") => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          return {
            ...s,
            status: "COMPLETED",
            invoice: {
              ...s.invoice,
              paymentStatus: "PAID",
              paymentMethod,
              paidAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            },
            serviceNotes: [
              ...s.serviceNotes,
              {
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                author: "Billing Counter",
                text: `Payment of ₹${s.invoice?.total?.toLocaleString()} received via ${paymentMethod}. Vehicle delivered to customer.`
              }
            ]
          };
        }
        return s;
      })
    );

    addNotification("Payment Received & Completed", `Invoice paid. Vehicle service completed successfully.`, "success", "customer");
  };

  // Restock inventory part
  const restockPart = (partId, qtyToAdd = 10) => {
    setInventory((prev) =>
      prev.map((p) => (p.id === partId ? { ...p, quantity: p.quantity + qtyToAdd } : p))
    );
    showToast(`Restocked +${qtyToAdd} units`, "success");
  };

  // Reset to initial defaults
  const resetToDefaults = () => {
    if (window.confirm("Reset all workshop demo data back to default state?")) {
      setVehicles(initialVehicles);
      setMechanics(initialMechanics);
      setInventory(initialInventory);
      setServices(initialServices);
      setNotifications(initialNotifications);
      setSelectedVehicleId("veh-1");
      showToast("Demo data reset to initial default state", "info");
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        selectedVehicleId,
        setSelectedVehicleId,
        vehicles,
        mechanics,
        inventory,
        services,
        notifications,
        toast,
        showToast,
        addNotification,
        addVehicle,
        bookService,
        checkInVehicle,
        saveInspection,
        createEstimate,
        respondToEstimate,
        assignMechanic,
        startService,
        logPartsUsed,
        addServiceNote,
        completeService,
        approveQualityCheck,
        payInvoice,
        restockPart,
        resetToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
