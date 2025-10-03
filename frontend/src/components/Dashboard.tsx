import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProductList from './ProductList';
import AddProduct from './AddProduct';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [refreshProducts, setRefreshProducts] = useState(0);

  const handleProductAdded = () => {
    setRefreshProducts(prev => prev + 1);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              🚀
            </div>
            <div>
              <h1 style={{ 
                fontSize: '1.75rem', 
                fontWeight: '700', 
                color: 'white',
                margin: 0,
                letterSpacing: '-0.025em'
              }}>
                Sistema de Microserviços
              </h1>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                margin: '0.25rem 0 0 0',
                fontSize: '1rem',
                fontWeight: '500'
              }}>
                Bem-vindo, <strong>{user?.username}</strong>! 👋
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: 'all 0.2s',
              backdropFilter: 'blur(10px)'
            }}
          >
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content" style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '3rem 2rem' 
      }}>
        {/* Add Product Section */}
        <div style={{ marginBottom: '3rem' }}>
          <AddProduct onProductAdded={handleProductAdded} />
        </div>

        {/* Products Section */}
        <div key={refreshProducts}>
          <ProductList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;