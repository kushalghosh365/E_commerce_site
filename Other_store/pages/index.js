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

   
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      new window.Swiper(".mySwiper", {
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        effect: "fade",
        fadeEffect: { crossFade: true },
      });
    };
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
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
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

      {/* --- SWIPER SLIDER SECTION --- */}
      <section className="swiper mySwiper" style={{ width: '100%', height: '80vh', backgroundColor: '#f4f4f4' }}>
        <div className="swiper-wrapper">
          
          {/* Slide 1: Office Tech */}
          <div className="swiper-slide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', width: '85%', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1', minWidth: '300px' }}>
                <span style={{ background: '#ff3c20', color: '#fff', padding: '5px 15px', borderRadius: '4px', fontSize: '12px' }}>NEW ARRIVAL</span>
                <h2 style={{ fontSize: '3.5rem', margin: '20px 0', lineHeight: '1.1' }}>Modern Work <br/> Solutions</h2>
                <p style={{ color: '#555', marginBottom: '30px' }}>Premium office laptops for peak productivity and style.</p>
                <a href="#shop" style={{ background: '#000', color: '#fff', padding: '15px 35px', textDecoration: 'none', fontWeight: 'bold', borderRadius: '5px' }}>SHOP NOW</a>
              </div>
              <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                <img src="https://as2.ftcdn.net/jpg/07/26/62/33/1000_F_726623392_fbluzyTUmBA0PAhQWZFImrUove6rypqC.jpg" style={{ maxWidth: '100%', borderRadius: '10px' }} alt="Laptop" />
              </div>
            </div>
          </div>

          {/* Slide 2: Smart Watches */}
          <div className="swiper-slide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', width: '85%', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1' }}>
                <span style={{ background: '#ff3c20', color: '#fff', padding: '5px 15px', borderRadius: '4px', fontSize: '12px' }}>TECH STYLE</span>
                <h2 style={{ fontSize: '3.5rem', margin: '20px 0', lineHeight: '1.1' }}>Track Your <br/> Success</h2>
                <p style={{ color: '#555', marginBottom: '30px' }}>Elegant smartwatches that monitor your health 24/7.</p>
                <a href="#shop" style={{ background: '#000', color: '#fff', padding: '15px 35px', textDecoration: 'none', fontWeight: 'bold', borderRadius: '5px' }}>EXPLORE</a>
              </div>
              <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999" style={{ maxWidth: '100%', borderRadius: '10px' }} alt="Watch" />
              </div>
            </div>
          </div>

        </div>
        <div className="swiper-button-next" style={{ color: '#000' }}></div>
        <div className="swiper-button-prev" style={{ color: '#000' }}></div>
        <div className="swiper-pagination"></div>
      </section>

      {/* --- MAIN BODY (COLLECTION) --- */}
      <main id="shop" style={{ padding: '60px 8%', minHeight: '80vh' }}>
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
              textAlign: 'center',
              transition: '0.3s'
            }}>
              <img 
                src={p.image_url} 
                width="100%" 
                alt={p.name} 
                style={{ borderRadius: '5px', height: '250px', objectFit: 'cover' }}
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
          </div>

          <div style={{ flex: '0.5', minWidth: '150px' }}>
            <h4 style={{ marginBottom: '20px', textTransform: 'uppercase' }}>Shopping</h4>
            <ul style={{ listStyle: 'none', padding: 0, color: '#b7b7b7', lineHeight: '2' }}>
              <li>Clothing Store</li>
              <li>Trending Shoes</li>
              <li>Accessories</li>
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
