import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const handleBuyNow = (product) => {
    router.push({
      pathname: '/checkout',
      query: { 
        name: product.name, 
        price: product.price, 
        image: product.image_url 
      },
    });
  };

  return (
    <div style={{ fontFamily: '"Inter", sans-serif', backgroundColor: '#ffffff', color: '#111' }}>
      <Head>
        <title>Kushal Store | Exclusive Fashion</title>
      </Head>

      {/* --- HEADER SECTION --- */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 8%',
        backgroundColor: '#fff',
        borderBottom: '1px solid #eee',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Kushal Store<span style={{ color: '#ff0000' }}>.</span>
        </div>
        <div style={{ display: 'flex', gap: '30px', fontWeight: '500' }}>
          <span style={{ cursor: 'pointer' }}>Home</span>
          <span style={{ cursor: 'pointer' }}>Shop</span>
          <span style={{ cursor: 'pointer' }}>Blog</span>
          <span style={{ cursor: 'pointer' }}>Contact</span>
        </div>
      </nav>

      {/* --- MAIN BODY --- */}
      <main style={{ padding: '60px 8%', minHeight: '80vh' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '32px', fontWeight: '700' }}>Our Collection</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '25px' 
        }}>
          {products && products.length > 0 ? products.map(p => (
            <div key={p.id} style={{ 
              border: '1px solid #ddd', 
              padding: '10px', 
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <img 
                src={p.image_url} 
                width="100%" 
                alt={p.name} 
                style={{ borderRadius: '5px' }}
              />
              <h3 style={{ marginTop: '15px', fontSize: '1.2rem' }}>{p.name}</h3>
              <p style={{ color: '#e44d26', fontWeight: 'bold', fontSize: '1.2rem', margin: '10px 0' }}>
                ₹{p.price}
              </p>
              <button 
                onClick={() => handleBuyNow(p)} 
                style={{ 
                  background: '#0070f3', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '12px', 
                  width: '100%', 
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>
                Add to Cart
              </button>
            </div>
          )) : <p style={{ textAlign: 'center', width: '100%' }}>Loading products...</p>}
        </div>
      </main>

      {/* --- FOOTER SECTION --- */}
      <footer style={{ backgroundColor: '#111', color: '#fff', padding: '70px 8% 30px' }}>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between', 
          gap: '40px',
          marginBottom: '50px'
        }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <h2 style={{ marginBottom: '20px' }}>Kushal Store<span style={{ color: '#ff0000' }}>.</span></h2>
            <p style={{ color: '#b7b7b7', lineHeight: '1.6' }}>
              The customer is at the heart of our unique business model, which includes design.
            </p>
            <div style={{ marginTop: '20px' }}>
              <img src="https://img.icons8.com/color/48/visa.png" width="35" style={{ marginRight: '10px' }} alt="Visa" />
              <img src="https://img.icons8.com/color/48/mastercard.png" width="35" style={{ marginRight: '10px' }} alt="Mastercard" />
              <img src="https://img.icons8.com/color/48/paypal.png" width="35" alt="Paypal" />
            </div>
          </div>

          <div style={{ flex: '0.5', minWidth: '150px' }}>
            <h4 style={{ marginBottom: '20px', textTransform: 'uppercase' }}>Shopping</h4>
            <ul style={{ listStyle: 'none', padding: 0, color: '#b7b7b7', lineHeight: '2' }}>
              <li>Clothing Store</li>
              <li>Trending Shoes</li>
              <li>Accessories</li>
              <li>Sale</li>
            </ul>
          </div>

          <div style={{ flex: '0.5', minWidth: '150px' }}>
            <h4 style={{ marginBottom: '20px', textTransform: 'uppercase' }}>Customer Care</h4>
            <ul style={{ listStyle: 'none', padding: 0, color: '#b7b7b7', lineHeight: '2' }}>
              <li>Contact Us</li>
              <li>Payment Method</li>
              <li>Delivery</li>
              <li>Return & Exchange</li>
            </ul>
          </div>

          <div style={{ flex: '1', minWidth: '250px' }}>
            <h4 style={{ marginBottom: '20px', textTransform: 'uppercase' }}>Newsletter</h4>
            <p style={{ color: '#b7b7b7', marginBottom: '20px' }}>Be the first to know about new arrivals!</p>
            <div style={{ borderBottom: '1px solid #444', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <input type="text" placeholder="Your Email" style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', width: '90%' }} />
              <span>✉</span>
            </div>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid #333', paddingTop: '20px', textAlign: 'center', color: '#b7b7b7', fontSize: '14px' }}>
          Design and Code by Kushal Ghosh
        </div>
      </footer>
    </div>
  );
}