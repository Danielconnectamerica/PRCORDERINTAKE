export default function SuccessPage() {
  return (
    <main className="success-shell">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Order Submitted</h1>
        <p>Your inventory order has been received successfully.</p>
        <a href="/" className="back-link">
          Submit another order
        </a>
      </div>
    </main>
  );
}
