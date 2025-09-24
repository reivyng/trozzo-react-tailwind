import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, Minus, ShoppingCart, Play, Users, Cake, Star } from 'lucide-react';
import './TrozzoWebsite.css';

const TrozzoWebsite = () => {
  const [quantities, setQuantities] = useState({
    maracumango: 1,
    chococafe: 1
  });

  const [isVisible, setIsVisible] = useState({});
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCardFlip = (cardId) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const updateQuantity = (product, change) => {
    setQuantities(prev => ({
      ...prev,
      [product]: Math.max(1, prev[product] + change)
    }));
  };

  const orderProduct = (productName, quantity) => {
    const message = `¡Hola! Me interesa ordenar ${quantity} ${productName}(s) de TROZZO. ¿Podrían darme más información?`;
    const whatsappNumber = "573184976202";
    
    // Detectar si es dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let whatsappUrl;
    if (isMobile) {
      // Para dispositivos móviles, usar el esquema de URL que abre directamente la app
      whatsappUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
      
      // Fallback a wa.me si el esquema whatsapp:// no funciona
      setTimeout(() => {
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
      }, 500);
      
    } else {
      // Para desktop, usar wa.me que funciona mejor con WhatsApp Web
      whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    }
    
    // Intentar abrir la URL principal
    try {
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      // Fallback en caso de error
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <div className="page">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <div className="logo-icon">
              <Cake className="icon-white" />
            </div>
            <h1 className="logo-text">TROZZO</h1>
          </div>

          <nav className="nav">
            <button onClick={() => scrollToSection('home')}>Home</button>
            <button onClick={() => scrollToSection('nosotros')}>Nosotros</button>
            <button onClick={() => scrollToSection('productos')}>Productos</button>
          </nav>

          <div className="nav-mobile">
            <button>
              <ChevronDown className="icon-dark" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-content" data-animate id="hero">
          <h2 className={`hero-title ${isVisible.hero ? 'visible' : ''}`}>
            Postres con <span className="highlight">esencia colombiana</span>
          </h2>
          <p className="hero-subtitle">Cada postre cuenta una historia, cada bocado despierta emociones</p>
          <button onClick={() => scrollToSection('nosotros')} className="btn-primary">
            Conoce nuestra historia
          </button>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="section" data-animate>
        <div className={`section-content ${isVisible.nosotros ? 'visible' : ''}`} id="nosotros">
          <div className="section-header">
            <Users className="icon-accent" />
            <h3>Quiénes somos</h3>
          </div>

          <div className="video-section-fullscreen">
            <div className="video-container">
              <video 
                controls 
                autoPlay
                muted
                loop
                playsInline
                className="hero-video"
                style={{ 
                  width: '100%', 
                  maxWidth: '90vw', 
                  height: 'auto',
                  maxHeight: '70vh',
                  borderRadius: '12px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  objectFit: 'cover'
                }}
              >
                <source src="/src/img/video.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
              
              <div className="video-overlay">
                <div className="video-text">
                  <h4 className="video-title">Descubre TROZZO</h4>
                  <p className="video-subtitle">Sabores auténticos con esencia colombiana</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-box-enhanced" style={{
  backgroundImage: 'url(/src/img/fond.jpeg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundBlendMode: 'lighten',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  borderRadius: '20px',
  border: '1px solid rgba(0, 0, 0, 0.2)'
}}>
  <h4 className="story-title">Nuestra Historia</h4>
  <p className="story-text">En TROZZO creemos que cada postre puede contar una historia. Somos un emprendimiento colombiano dedicado a crear experiencias dulces únicas, fusionando sabores tradicionales con un toque innovador.
Trabajamos bajo el concepto de cocina cerrada, lo que significa que cada uno de nuestros postres es elaborado cuidadosamente por encargo, garantizando frescura, calidad y atención personalizada.
Colaboramos con empresas, entidades, casas de eventos y celebraciones especiales, llevando nuestros sabores a momentos que merecen ser recordados. Nuestro propósito es que cada bocado despierte emociones y conecte con lo mejor de nuestra tierra.
</p>
</div>
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="section" data-animate>
        <div className={`section-content ${isVisible.productos ? 'visible' : ''}`} id="productos">
          <div className="section-header">
            <Cake className="icon-accent" />
            <h3>Nuestros productos</h3>
          </div>

          <div className="products">
            {/* Maracumango */}
            <div className={`card-container ${flippedCards.maracumango ? 'flipped' : ''}`}>
              <div className="card-flip">
                {/* Frente de la tarjeta */}
                <div className="card card-front">
                  <div className="card-image maracumango-img">
                    <img 
                      src="/src/img/mango.jpg" 
                      alt="Maracumango - Postre tropical de mango"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: '0'
                      }}
                    />
                    <div className="card-overlay">
                      <div className="hover-indicator">
                        <span>Hover para más info</span>
                      </div>
                      <div className="touch-indicator" onClick={() => toggleCardFlip('maracumango')}>
                        <span>Toca para voltear</span>
                        <div className="flip-icon">↻</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <h4>🥭 Maracumango</h4>
                      <p className="card-subtitle">La frescura tropical en cada bocado</p>
                    </div>
                    
                    <div className="card-actions">
                     

                    
                    </div>
                  </div>
                </div>

                {/* Atrás de la tarjeta */}
                <div className="card card-back">
                  <div className="card-back-content">
                    <button className="flip-back-btn" onClick={() => toggleCardFlip('maracumango')}>
                      ← Volver
                    </button>
                    <h4>🥭 Maracumango</h4>
                    <div className="long-description">
                      <p>Una explosión de sabor que une lo mejor del trópico colombiano: el maracuyá y el mango, frutas cultivadas en tierras cálidas y fértiles de nuestro país.</p>
                      
                      <p>Su combinación crea un equilibrio perfecto entre el dulzor natural y la acidez refrescante, convirtiéndose en un postre irresistible para quienes aman los sabores exóticos y auténticos.</p>
                      
                      <p><strong>Cada capa está pensada para que sientas el alma del Caribe colombiano en cada cucharada.</strong></p>
                    </div>
                    
                    <div className="quantity">
                      <button onClick={() => updateQuantity('maracumango', -1)}><Minus /></button>
                      <span>{quantities.maracumango}</span>
                      <button onClick={() => updateQuantity('maracumango', 1)}><Plus /></button>
                    </div>

                    <button onClick={() => orderProduct('Maracumango', quantities.maracumango)} className="btn-secondary">
                      <ShoppingCart /> Pedir ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chococafé */}
            <div className={`card-container ${flippedCards.chococafe ? 'flipped' : ''}`}>
              <div className="card-flip">
                {/* Frente de la tarjeta */}
                <div className="card card-front">
                  <div className="card-image chococafe-img">
                    <img 
                      src="/src/img/cafe.jpg" 
                      alt="Chococafé - Postre de chocolate y café"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: '0'
                      }}
                    />
                    <div className="card-overlay">
                      <div className="hover-indicator">
                        <span>Hover para más info</span>
                      </div>
                      <div className="touch-indicator" onClick={() => toggleCardFlip('chococafe')}>
                        <span>Toca para voltear</span>
                        <div className="flip-icon">↻</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <h4>☕ Chococafé</h4>
                      <p className="card-subtitle">El sabor de nuestra tierra en un solo postre</p>
                    </div>
                    
                    <div className="card-actions">
                
                    </div>
                  </div>
                </div>

                {/* Atrás de la tarjeta */}
                <div className="card card-back">
                  <div className="card-back-content">
                    <button className="flip-back-btn" onClick={() => toggleCardFlip('chococafe')}>
                      ← Volver
                    </button>
                    <h4>☕ Chococafé</h4>
                    <div className="long-description">
                      <p>Inspirado en dos tesoros colombianos: el café, símbolo de nuestras montañas, y el chocolate, fuente de dulzura y tradición.</p>
                      
                      <p>Este postre es un homenaje a nuestras raíces, con un sabor profundo y elegante que encanta a los amantes de los contrastes intensos.</p>
                      
                      <p><strong>Un postre que celebra la calidez y el aroma de Colombia en cada detalle.</strong></p>
                    </div>
                    
                    <div className="quantity">
                      <button onClick={() => updateQuantity('chococafe', -1)}><Minus /></button>
                      <span>{quantities.chococafe}</span>
                      <button onClick={() => updateQuantity('chococafe', 1)}><Plus /></button>
                    </div>

                    <button onClick={() => orderProduct('Chococafé', quantities.chococafe)} className="btn-secondary">
                      <ShoppingCart /> Pedir ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <Cake className="icon-white" />
            <h4>TROZZO</h4>
          </div>
          <p>Postres con esencia colombiana</p>
          <small>© 2025 TROZZO. Todos los derechos reservados.</small>
        </div>
      </footer>
    </div>
  );
};

export default TrozzoWebsite;
