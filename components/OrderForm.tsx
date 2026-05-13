"use client";

import { useMemo, useState } from "react";
import { ITEM_CATALOG, ORDER_SOURCES } from "../lib/itemCatalog";
import { TECHNICIANS } from "../lib/technicians";

type ItemState = Record<string, number>;
type OrderSource = (typeof ORDER_SOURCES)[number];

type CustomItem = {
  itemName: string;
  quantity: number;
};

const OTHER_TECH_VALUE = "__other__";

export default function OrderForm() {
  const [items, setItems] = useState<ItemState>({});
  const [customItems, setCustomItems] = useState<CustomItem[]>([
    { itemName: "", quantity: 0 },
  ]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [orderSource, setOrderSource] = useState<OrderSource | "">("");

  const [selectedTechId, setSelectedTechId] = useState("");
  const [isManualTech, setIsManualTech] = useState(false);

  const [technicianName, setTechnicianName] = useState("");
  const [technicianEmail, setTechnicianEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingAddress1, setShippingAddress1] = useState("");
  const [shippingAddress2, setShippingAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  function clearTechnicianFields() {
    setTechnicianName("");
    setTechnicianEmail("");
    setPhone("");
    setShippingAddress1("");
    setShippingAddress2("");
    setCity("");
    setState("");
    setZip("");
  }

  function handleTechnicianChange(id: string) {
    setSelectedTechId(id);
    setError("");

    if (!id) {
      setIsManualTech(false);
      clearTechnicianFields();
      return;
    }

    if (id === OTHER_TECH_VALUE) {
      setIsManualTech(true);
      clearTechnicianFields();
      return;
    }

    const tech = TECHNICIANS.find((t) => t.id === id);

    if (!tech) {
      setIsManualTech(false);
      clearTechnicianFields();
      return;
    }

    setIsManualTech(false);
    setTechnicianName(tech.name);
    setTechnicianEmail(tech.email);
    setPhone(tech.phone);
    setShippingAddress1(tech.shippingAddress1);
    setShippingAddress2(tech.shippingAddress2);
    setCity(tech.city);
    setState(tech.state);
    setZip(tech.zip);
  }

  function changeQty(id: string, delta: number) {
    setItems((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);

      return {
        ...prev,
        [id]: next,
      };
    });
  }

  function updateCustomItem(
    index: number,
    field: "itemName" | "quantity",
    value: string | number
  ) {
    setCustomItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]:
                field === "quantity"
                  ? Math.max(0, Number(value) || 0)
                  : String(value),
            }
          : item
      )
    );
  }

  function addCustomItemRow() {
    setCustomItems((prev) => [...prev, { itemName: "", quantity: 0 }]);
  }

  function removeCustomItemRow(index: number) {
    setCustomItems((prev) => {
      if (prev.length === 1) {
        return [{ itemName: "", quantity: 0 }];
      }
      return prev.filter((_, i) => i !== index);
    });
  }

  const visibleCatalog = useMemo(() => {
    if (!orderSource) return [];

    return ITEM_CATALOG
      .filter((group) => group.allowedSources.includes(orderSource))
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const itemWithSources = item as {
            allowedSources?: readonly string[];
          };

          if (itemWithSources.allowedSources) {
            return itemWithSources.allowedSources.includes(orderSource);
          }

          return true;
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [orderSource]);

  const standardTotalUnits = useMemo(() => {
    return Object.values(items).reduce((sum, qty) => sum + qty, 0);
  }, [items]);

  const customCleanedItems = useMemo(() => {
    return customItems.filter(
      (item) => item.itemName.trim() !== "" && Number(item.quantity) > 0
    );
  }, [customItems]);

  const customTotalUnits = useMemo(() => {
    return customCleanedItems.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );
  }, [customCleanedItems]);

  const totalUnits = standardTotalUnits + customTotalUnits;

  const totalLines = useMemo(() => {
    const standardLines = Object.values(items).filter((qty) => qty > 0).length;
    return standardLines + customCleanedItems.length;
  }, [items, customCleanedItems]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!orderSource) {
      setError("Please select an order source.");
      return;
    }

    if (!selectedTechId) {
      setError("Please select a technician.");
      return;
    }

    if (!technicianName.trim()) {
      setError("Please enter a technician name.");
      return;
    }

    if (!technicianEmail.trim()) {
      setError("Please enter a technician email.");
      return;
    }

    if (
      !shippingAddress1.trim() ||
      !city.trim() ||
      !state.trim() ||
      !zip.trim()
    ) {
      setError("Please complete the technician shipping address.");
      return;
    }

    if (totalUnits === 0) {
      setError("Please add at least one item.");
      return;
    }

    const form = new FormData(e.currentTarget);

    const requesterName = String(form.get("requesterName") || "").trim();
    const requesterEmail = String(form.get("requesterEmail") || "").trim();
    const ccEmail = String(form.get("ccEmail") || "").trim();
    const priority = String(form.get("priority") || "Normal").trim();
    const comments = String(form.get("comments") || "").trim();

    if (!requesterName) {
      setError("Please enter requester name.");
      return;
    }

    if (!requesterEmail) {
      setError("Please enter requester email.");
      return;
    }

    const selectedStandardItems = Object.entries(items)
      .filter(([, qty]) => qty > 0)
      .map(([itemId, quantity]) => {
        const item = ITEM_CATALOG.flatMap((g) => g.items).find(
          (i) => i.id === itemId
        );
        const category = ITEM_CATALOG.find((g) =>
          g.items.some((i) => i.id === itemId)
        )?.category;

        return {
          itemId,
          category: category || "",
          itemName: item?.name || itemId,
          quantity,
        };
      });

    const selectedCustomItems = customCleanedItems.map((item, index) => ({
      itemId: `custom_${index + 1}`,
      category: "Custom",
      itemName: item.itemName.trim(),
      quantity: Number(item.quantity),
    }));

    const payload = {
      orderSource,
      technicianSource: isManualTech ? "manual" : "directory",
      technicianId: isManualTech ? "" : selectedTechId,
      technicianName: technicianName.trim(),
      technicianEmail: technicianEmail.trim(),
      requesterName,
      requesterEmail,
      ccEmail,
      phone: phone.trim(),
      shippingAddress1: shippingAddress1.trim(),
      shippingAddress2: shippingAddress2.trim(),
      city: city.trim(),
      state: state.trim(),
      zip: zip.trim(),
      priority,
      comments,
      totalUnitsRequested: totalUnits,
      totalLineCount: totalLines,
      items: [...selectedStandardItems, ...selectedCustomItems],
    };

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submit failed");
      }

      window.location.href = "/success";
    } catch (err) {
      console.error(err);
      setError("Failed to submit order.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="page-header">
        <div>
          <h1>Inventory Order Request</h1>
          <p className="page-subtitle">Submit an internal inventory request</p>
        </div>

        <div className="summary-pill-wrap">
          <div className="summary-pill">
            <span className="summary-label">Units</span>
            <span className="summary-value">{totalUnits}</span>
          </div>

          <div className="summary-pill">
            <span className="summary-label">Lines</span>
            <span className="summary-value">{totalLines}</span>
          </div>
        </div>
      </div>

      <section className="card">
        <h2>Order Source</h2>

        <div className="form-grid">
          <div className="field field-full">
            <label htmlFor="orderSource">Order Source</label>
            <select
              id="orderSource"
              name="orderSource"
              value={orderSource}
              onChange={(e) => {
                setOrderSource(e.target.value as OrderSource | "");
                setItems({});
                setError("");
              }}
              required
            >
              <option value="">Select Order Source</option>
              {ORDER_SOURCES.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Technician / Ship To</h2>

        <div className="form-grid">
          <div className="field field-full">
            <label htmlFor="technicianSelect">Technician</label>
            <select
              id="technicianSelect"
              value={selectedTechId}
              onChange={(e) => handleTechnicianChange(e.target.value)}
              required
            >
              <option value="">Select Technician</option>
              {TECHNICIANS.map((tech) => (
                <option key={tech.id} value={tech.id}>
                  {tech.name}
                </option>
              ))}
              <option value={OTHER_TECH_VALUE}>Other / New Technician</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="technicianName">Technician Name</label>
            <input
              id="technicianName"
              name="technicianName"
              value={technicianName}
              onChange={(e) => setTechnicianName(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="technicianEmail">Technician Email</label>
            <input
              id="technicianEmail"
              name="technicianEmail"
              type="email"
              value={technicianEmail}
              onChange={(e) => setTechnicianEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="field field-full">
            <label htmlFor="shippingAddress1">Address 1</label>
            <input
              id="shippingAddress1"
              name="shippingAddress1"
              value={shippingAddress1}
              onChange={(e) => setShippingAddress1(e.target.value)}
              required
            />
          </div>

          <div className="field field-full">
            <label htmlFor="shippingAddress2">Address 2</label>
            <input
              id="shippingAddress2"
              name="shippingAddress2"
              value={shippingAddress2}
              onChange={(e) => setShippingAddress2(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="state">State</label>
            <input
              id="state"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="zip">ZIP</label>
            <input
              id="zip"
              name="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
            />
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Request Details</h2>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="requesterName">Requester Name</label>
            <input id="requesterName" name="requesterName" required />
          </div>

          <div className="field">
            <label htmlFor="requesterEmail">Requester Email</label>
            <input
              id="requesterEmail"
              name="requesterEmail"
              type="email"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="ccEmail">CC Email(s)</label>
            <input
              id="ccEmail"
              name="ccEmail"
              type="text"
              placeholder="optional - comma separated if multiple"
            />
          </div>

          <div className="field field-full">
            <label htmlFor="comments">Comments</label>
            <textarea id="comments" name="comments" rows={4} />
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Items Requested</h2>

        {!orderSource ? (
          <p>Please select an Order Source first.</p>
        ) : (
          <>
            {visibleCatalog.map((group) => (
              <div key={group.category} className="item-group">
                <h3>{group.category}</h3>

                <div className="item-list">
                  {group.items.map((item) => {
                    const qty = items[item.id] || 0;

                    return (
                      <div key={item.id} className="item-row">
                        <div className="item-name">{item.name}</div>

                        <div className="qty-control">
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => changeQty(item.id, -1)}
                            aria-label={`Decrease ${item.name}`}
                          >
                            -
                          </button>

                          <div className="qty-value">{qty}</div>

                          <button
                            type="button"
                            className="qty-btn qty-btn-plus"
                            onClick={() => changeQty(item.id, 1)}
                            aria-label={`Increase ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="item-group">
              <h3>Custom / Free Form Inventory</h3>
              <p className="custom-note">
                Use this if an item is not listed above.
              </p>

              <div className="item-list">
                {customItems.map((item, index) => (
                  <div key={index} className="custom-item-row">
                    <div className="field">
                      <label htmlFor={`customItemName-${index}`}>Item Name</label>
                      <input
                        id={`customItemName-${index}`}
                        type="text"
                        value={item.itemName}
                        onChange={(e) =>
                          updateCustomItem(index, "itemName", e.target.value)
                        }
                        placeholder="Type item not on list"
                      />
                    </div>

                    <div className="field">
                      <label htmlFor={`customItemQty-${index}`}>Quantity</label>
                      <input
                        id={`customItemQty-${index}`}
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) =>
                          updateCustomItem(index, "quantity", e.target.value)
                        }
                      />
                    </div>

                    <div className="custom-item-actions">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => removeCustomItemRow(index)}
                        aria-label="Remove custom item"
                      >
                        -
                      </button>
                    </div>
                  </div>
                ))}

                <div className="custom-add-row">
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={addCustomItemRow}
                  >
                    Add Custom Item
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {error ? <div className="form-error">{error}</div> : null}

        <div className="submit-row">
          <button className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Order"}
          </button>
        </div>
      </section>
    </form>
  );
}
