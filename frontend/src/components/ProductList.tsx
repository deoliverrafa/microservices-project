import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { productService } from '../services/api';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px' 
      }}>
        <div>Carregando produtos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: '#dc2626' }}>
        <p>{error}</p>
        <button 
          onClick={loadProducts}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      padding: '2.5rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          color: 'white'
        }}>
          📦
        </div>
        <div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            margin: 0,
            color: '#2d3748',
            letterSpacing: '-0.025em'
          }}>
            Catálogo de Produtos
          </h2>
          <p style={{
            color: '#718096',
            margin: '0.25rem 0 0 0',
            fontSize: '0.9rem'
          }}>
            {products.length} produto{products.length !== 1 ? 's' : ''} cadastrado{products.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
      
      {products.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          backgroundColor: '#f7fafc',
          borderRadius: '16px',
          border: '2px dashed #e2e8f0'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            color: '#4a5568',
            marginBottom: '0.5rem'
          }}>
            Nenhum produto encontrado
          </h3>
          <p style={{ color: '#718096', margin: 0 }}>
            Adicione produtos usando o formulário acima
          </p>
        </div>
      ) : (
        <div className="products-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {products.map((product) => (
            <div key={product.id} style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  color: 'white'
                }}>
                  🛍️
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '600', 
                    margin: 0,
                    color: '#2d3748',
                    lineHeight: '1.4'
                  }}>
                    {product.name}
                  </h3>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}>
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#667eea'
                }}>
                  Preço
                </span>
                <span style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: '#667eea'
                }}>
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;