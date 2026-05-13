export const ORDER_SOURCES = [
  "AMAC CO - Colorado",
  "AMAC CO - Arizona",
  "AMAC CO - New Mexico/Texas",
  "AMAC HI - Hawaii",
  "AMAC NW - Oregon",
  "AMAC NW - Washington",
  "HOME BUDDY - Kansas",
  "CA WEST - California",
] as const;

export const ITEM_CATALOG = [
  {
    category: "PERS",
    allowedSources: [...ORDER_SOURCES],
    items: [
      { id: "mytrex_landline_mxd", name: "Mytrex Landline MXD" },
      { id: "mytrex_cel_vzn", name: "Mytrex CEL VZN" },
      { id: "mobile_lte", name: "Mobile LTE" },
      { id: "otg_att", name: "OTG ATT" },
      { id: "otg_vzn", name: "OTG VZN" },
      { id: "otg_mini_neck", name: "OTG Mini Neck" },
      { id: "otg_mini_wrist", name: "OTG Mini Wrist" },
      { id: "otg_micron", name: "OTG Micron" },
      { id: "smartwatch", name: "Smartwatch" },
      { id: "assure", name: "Assure" },
    ],
  },
  {
    category: "Medication Dispensers",
    allowedSources: [
      "AMAC CO - Colorado",
      "AMAC HI - Hawaii",
      "AMAC NW - Oregon",
      "AMAC NW - Washington",
      "HOME BUDDY - Kansas",
      "CA WEST - California",
    ],
    items: [
      {
        id: "medready_standalone",
        name: "MedReady Standalone",
        allowedSources: [
          "AMAC CO - Colorado",
          "AMAC HI - Hawaii",
          "HOME BUDDY - Kansas",
        ],
      },
      {
        id: "medready_gsm",
        name: "MedReady GSM",
        allowedSources: [
          "AMAC CO - Colorado",
          "AMAC NW - Oregon",
          "AMAC NW - Washington",
          "CA WEST - California",
        ],
      },
      {
        id: "medtime",
        name: "MedTime",
        allowedSources: ["AMAC CO - Colorado"],
      },
      {
        id: "md2",
        name: "MD2",
        allowedSources: ["AMAC CO - Colorado"],
      },
    ],
  },
  {
    category: "Accessories",
    allowedSources: [...ORDER_SOURCES],
    items: [
      { id: "mytrex_fd_pendant", name: "Mytrex FD Pendant" },
      { id: "anelto_fd_pendant", name: "Anelto FD Pendant" },
      { id: "anelto_lanyard", name: "Anelto Lanyard" },
      { id: "micron_lanyard", name: "Micron Lanyard" },
      { id: "anelto_pouch", name: "Anelto Pouch" },
      { id: "lockboxes", name: "Lockboxes" },
      { id: "door_hangers", name: "Door Hangers" },
    ],
  },
];
