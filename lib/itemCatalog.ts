export const ORDER_SOURCES = ["Innovage", "PRC"] as const;

export const ITEM_CATALOG = [
  {
    category: "Anelto Devices & Accessories",
    allowedSources: [...ORDER_SOURCES],
    items: [
      {
        id: "anelto_accessory_buttons",
        name: "Anelto Accessory Buttons (Neck and Wrist)",
      },
      {
        id: "anelto_att_otg",
        name: "Anelto AT&T OTG",
        allowedSources: ["Innovage"],
      },
      {
        id: "anelto_fall_detection_buttons",
        name: "Anelto Fall Detection Buttons",
      },
      {
        id: "anelto_lte",
        name: "Anelto LTE",
        allowedSources: ["Innovage"],
      },
      {
        id: "anelto_verizon_otg",
        name: "Anelto Verizon OTG",
        allowedSources: ["Innovage"],
      },
    ],
  },
  {
    category: "Belle Devices",
    allowedSources: [...ORDER_SOURCES],
    items: [
      {
        id: "belle_verizon",
        name: "Belle Verizon",
      },
      {
        id: "belle_plus_verizon",
        name: "Belle Plus Verizon",
      },
    ],
  },
  {
    category: "Mytrex Devices & Accessories",
    allowedSources: [...ORDER_SOURCES],
    items: [
      {
        id: "mytrex_accessory_buttons",
        name: "Mytrex Accessory Buttons (Neck and Wrist)",
      },
      {
        id: "mytrex_cell",
        name: "Mytrex Cell",
      },
      {
        id: "mytrex_fall_detection_buttons",
        name: "Mytrex Fall Detection Buttons",
      },
      {
        id: "mytrex_landline",
        name: "Mytrex Landline",
      },
    ],
  },
  {
    category: "OTG Mini & Smartwatch",
    allowedSources: [...ORDER_SOURCES],
    items: [
      {
        id: "otg_mini_neck",
        name: "OTG Mini - Neck",
      },
      {
        id: "otg_mini_wrist",
        name: "OTG Mini - Wrist",
      },
      {
        id: "smart_watch",
        name: "Smart Watch",
        allowedSources: ["Innovage"],
      },
    ],
  },
  {
    category: "Medication Dispensers",
    allowedSources: [...ORDER_SOURCES],
    items: [
      {
        id: "medready_cell",
        name: "MedReady Cell",
      },
    ],
  },
  {
    category: "General Accessories",
    allowedSources: [...ORDER_SOURCES],
    items: [
      {
        id: "door_knockers",
        name: "Door Knockers",
      },
      {
        id: "lockboxes",
        name: "Lockboxes (increments of 12)",
      },
    ],
  },
];
