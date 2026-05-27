export const ORDER_SOURCES = ["Innovage", "PRC", "Be Safe at Home"] as const;

export type OrderSource = (typeof ORDER_SOURCES)[number];

type CatalogItem = {
  id: string;
  name: string;
  allowedSources?: readonly OrderSource[];
};

type CatalogGroup = {
  category: string;
  allowedSources: readonly OrderSource[];
  items: CatalogItem[];
};

const PRC_INNOVAGE_SOURCES: readonly OrderSource[] = ["Innovage", "PRC"];
const BE_SAFE_AT_HOME_SOURCES: readonly OrderSource[] = ["Be Safe at Home"];

export const ITEM_CATALOG: CatalogGroup[] = [
  {
    category: "Anelto Devices & Accessories",
    allowedSources: PRC_INNOVAGE_SOURCES,
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
    allowedSources: PRC_INNOVAGE_SOURCES,
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
    allowedSources: PRC_INNOVAGE_SOURCES,
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
    allowedSources: PRC_INNOVAGE_SOURCES,
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
    allowedSources: PRC_INNOVAGE_SOURCES,
    items: [
      {
        id: "medready_cell",
        name: "MedReady Cell",
      },
    ],
  },
  {
    category: "General Accessories",
    allowedSources: PRC_INNOVAGE_SOURCES,
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
  {
    category: "Be Safe at Home Inventory",
    allowedSources: BE_SAFE_AT_HOME_SOURCES,
    items: [
      {
        id: "bsah_broomall_anelto_accessory_buttons",
        name: "BROOMALL Anelto Accessory Buttons (Neck and Wrist)",
      },
      {
        id: "bsah_amac_qns_anelto_att_otg_microns",
        name: "AMAC/QNS Anelto AT&T OTG/Microns",
      },
      {
        id: "bsah_broomall_anelto_fall_detection_buttons",
        name: "BROOMALL Anelto Fall Detection Buttons",
      },
      {
        id: "bsah_amac_qns_anelto_lte",
        name: "AMAC/QNS Anelto LTE",
      },
      {
        id: "bsah_amac_qns_anelto_verizon_otg",
        name: "AMAC/QNS Anelto VERIZON OTG",
      },
      {
        id: "bsah_broomall_belle_verizon",
        name: "BROOMALL Belle Verizon",
      },
      {
        id: "bsah_broomall_belle_plus_verizon",
        name: "BROOMALL Belle Plus Verizon",
      },
      {
        id: "bsah_amac_qns_door_knockers",
        name: "AMAC/QNS Door Knockers",
      },
      {
        id: "bsah_broomall_lockboxes",
        name: "BROOMALL Lockboxes (increments of 12)",
      },
      {
        id: "bsah_broomall_medready_cell",
        name: "BROOMALL MedReady Cell",
      },
      {
        id: "bsah_broomall_mytrex_accessory_buttons",
        name: "BROOMALL Mytrex Accessory Buttons (Neck and Wrist)",
      },
      {
        id: "bsah_amac_qns_mytrex_cell_assure",
        name: "AMAC/QNS Mytrex Cell/ASSURE",
      },
      {
        id: "bsah_broomall_mytrex_fall_detection_buttons",
        name: "BROOMALL Mytrex Fall Detection Buttons",
      },
      {
        id: "bsah_broomall_qns_mytrex_landline",
        name: "BROOMALL/QNS Mytrex Landline",
      },
      {
        id: "bsah_broomall_otg_mini_neck",
        name: "BROOMALL OTG Mini - Neck",
      },
      {
        id: "bsah_broomall_otg_mini_wrist",
        name: "BROOMALL OTG Mini - Wrist",
      },
      {
        id: "bsah_broomall_smart_watch",
        name: "BROOMALL Smart Watch",
      },
      {
        id: "bsah_broomall_round_wrist_bands",
        name: "BROOMALL Round Wrist Bands",
      },
      {
        id: "bsah_amac_qns_mytrex_cell_verizon",
        name: "AMAC/QNS Mytrex Cell-VERIZON",
      },
      {
        id: "bsah_broomall_anelto_phb",
        name: "BROOMALL Anelto PHB",
      },
      {
        id: "bsah_broomall_otg_mini_neck_user_guide",
        name: "BROOMALL OTG Mini - Neck USER GUIDE",
      },
      {
        id: "bsah_broomall_otg_mini_wrist_user_guide",
        name: "BROOMALL OTG Mini - Wrist USER GUIDE",
      },
    ],
  },
];
