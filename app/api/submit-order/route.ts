import { NextResponse } from "next/server";

type OrderItem = {
  category: string;
  itemId?: string;
  itemName: string;
  quantity: number;
};

type OrderPayload = {
  orderSource?: string;

  shipToName: string;
  phone?: string;
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  state?: string;
  zip?: string;

  requesterName: string;
  requesterEmail: string;
  ccEmail?: string;
  comments?: string;

  totalUnitsRequested?: number;
  totalLineCount?: number;
  assignedWarehouse?: string;

  items: OrderItem[];
};

const ALLOWED_ORDER_SOURCES = ["Innovage", "PRC"];

export async function POST(req: Request) {
  try {
    const body: OrderPayload = await req.json();

    const cleanedItems =
      body.items
        ?.filter(
          (item) => item && item.itemName && Number(item.quantity) > 0
        )
        .map((item) => ({
          category: item.category || "",
          itemId: item.itemId || "",
          itemName: item.itemName.trim(),
          quantity: Number(item.quantity),
        })) || [];

    if (!body.orderSource) {
      return NextResponse.json(
        {
          success: false,
          message: "Order source is required.",
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_ORDER_SOURCES.includes(body.orderSource)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order source.",
        },
        { status: 400 }
      );
    }

    if (!body.shipToName || !body.shipToName.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Ship To name is required.",
        },
        { status: 400 }
      );
    }

    if (!body.requesterName || !body.requesterEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Requester name and requester email are required.",
        },
        { status: 400 }
      );
    }

    if (!body.shippingAddress1 || !body.city || !body.state || !body.zip) {
      return NextResponse.json(
        {
          success: false,
          message: "Shipping address is incomplete.",
        },
        { status: 400 }
      );
    }

    if (cleanedItems.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "At least one inventory item with quantity greater than 0 is required.",
        },
        { status: 400 }
      );
    }

    const backendTotalUnits = cleanedItems.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );

    const backendTotalLines = cleanedItems.length;

    const payload: OrderPayload = {
      orderSource: body.orderSource,

      shipToName: body.shipToName.trim(),
      phone: body.phone || "",
      shippingAddress1: body.shippingAddress1 || "",
      shippingAddress2: body.shippingAddress2 || "",
      city: body.city || "",
      state: body.state || "",
      zip: body.zip || "",

      requesterName: body.requesterName,
      requesterEmail: body.requesterEmail,
      ccEmail: body.ccEmail || "",
      comments: body.comments || "",

      assignedWarehouse: body.assignedWarehouse || "",
      totalUnitsRequested: backendTotalUnits,
      totalLineCount: backendTotalLines,

      items: cleanedItems,
    };

    const flowUrl = process.env.POWER_AUTOMATE_ORDER_URL;

    if (!flowUrl) {
      console.error("Missing POWER_AUTOMATE_ORDER_URL environment variable.");

      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error.",
        },
        { status: 500 }
      );
    }

    const flowResponse = await fetch(flowUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const rawText = await flowResponse.text();

    if (!flowResponse.ok) {
      console.error("Power Automate flow error:", flowResponse.status, rawText);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to submit order to workflow.",
          details: rawText,
        },
        { status: 500 }
      );
    }

    let parsedResponse: unknown = null;

    try {
      parsedResponse = rawText ? JSON.parse(rawText) : null;
    } catch {
      parsedResponse = rawText;
    }

    return NextResponse.json({
      success: true,
      message: "Order submitted successfully.",
      workflowResponse: parsedResponse,
    });
  } catch (error) {
    console.error("Submit order error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid request.",
      },
      { status: 400 }
    );
  }
}
