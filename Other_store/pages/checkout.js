import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';

export default function Checkout() {
  const router = useRouter();
  const { name, price, image } = router.query;
  const [loading, setLoading] = useState(false);

  const confirmOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, image_url: image }),
      });

      if (response.ok) {
        alert("Payment Successful! Order saved and synced via RabbitMQ.");
        router.push('/');
      } else {
        throw new Error("Order failed");
      }
    } catch (error) {
      console.error("Order failed:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: '"Inter", sans-serif', backgroundColor: '#ffffff', color: '#111' }}>
      <Head>
        <title>Checkout | Kushal Store</title>
      </Head>

      {/* --- HEADER --- */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 8%', backgroundColor: '#fff', borderBottom: '1px solid #eee', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div onClick={() => router.push('/')} style={{ fontSize: '24px', fontWeight: 'bold', cursor: 'pointer' }}>
          Kushal Store<span style={{ color: '#ff0000' }}>.</span>
        </div>
        <div style={{ display: 'flex', gap: '30px', fontWeight: '500' }}>
          <span onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>Home</span>
          <span style={{ cursor: 'pointer' }}>Shop</span>
          <span style={{ cursor: 'pointer' }}>Blog</span>
        </div>
      </nav>

      {/* --- BODY --- */}
      <main style={{ padding: '60px 8%', minHeight: '80vh', display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
        <div style={{ flex: 1, minWidth: '300px', border: '1px solid #eee', padding: '30px', borderRadius: '15px', backgroundColor: '#fff' }}>
          <h2 style={{ borderBottom: '2px solid #f4f4f4', paddingBottom: '15px' }}>Your Order</h2>
          <div style={{ marginTop: '20px' }}>
            <img src={image} alt={name} style={{ width: '100%', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            <h3 style={{ fontSize: '1.5rem', margin: '10px 0' }}>{name}</h3>
            <p style={{ fontSize: '1.8rem', color: '#000', fontWeight: '700' }}>Total: ₹{price}</p>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '300px', backgroundColor: '#fff', padding: '30px', borderRadius: '15px', border: '1px solid #eee' }}>
          <h2 style={{ marginBottom: '25px' }}>Payment Details</h2>
          <form onSubmit={confirmOrder}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Card Holder Name</label>
              <input type="text" placeholder="Ex: Kushal Ghosh" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Card Number</label>
              <input type="text" placeholder="Ex: 1234 5678 9101 1121" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <input type="text" placeholder="MM/YY" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <input type="password" placeholder="CVV" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
              </div>
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '18px', background: '#000', color: 'white', border: 'none', borderRadius: '5px', fontWeight: '700', cursor: 'pointer' }}>
              {loading ? 'Processing...' : `Pay ₹${price}`}
            </button>
          </form>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer style={{ backgroundColor: '#111', color: '#fff', padding: '50px 8%', textAlign: 'center' }}>
        <p>&copy; 2026 Kushal Store. All Rights Reserved.</p>
      </footer>
    </div>
  );
}