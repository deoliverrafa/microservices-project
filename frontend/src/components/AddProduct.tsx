import React, { useState } from 'react';
import type { Product } from '../types';
import { productService } from '../services/api';

interface AddProductProps {
  onProductAdded: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const productData: Omit<Product, 'id'> = {
        name,
        price: parseFloat(price),
      };

      await productService.addProduct(productData);
      setMessage('Produto adicionado com sucesso!');
      setName('');
      setPrice('');
      onProductAdded();
    } catch (error) {
      setMessage('Erro ao adicionar produto');
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      padding: '2.5rem',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '2rem',
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
          ➕
        </div>
        <div>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            margin: 0,
            color: '#2d3748',
            letterSpacing: '-0.025em'
          }}>
            Adicionar Novo Produto
          </h3>
          <p style={{
            color: '#718096',
            margin: '0.25rem 0 0 0',
            fontSize: '0.9rem'
          }}>
            Preencha os dados do produto para adicioná-lo ao catálogo
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="add-product-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'end' }}>
        <div>
          <label style={{ 
            display: 'block', 
            fontSize: '0.875rem', 
            fontWeight: '600', 
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Nome do Produto
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Digite o nome do produto"
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '1rem',
              transition: 'all 0.2s',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            fontSize: '0.875rem', 
            fontWeight: '600', 
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Preço (R$)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="0.00"
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '1rem',
              transition: 'all 0.2s',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '1rem 2rem',
              background: isLoading 
                ? '#9ca3af' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: isLoading 
                ? 'none' 
                : '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
          >
            {isLoading ? 'Adicionando...' : '➕ Adicionar Produto'}
          </button>
        </div>
      </form>

      {message && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          borderRadius: '4px',
          backgroundColor: message.includes('sucesso') ? '#d1fae5' : '#fee2e2',
          color: message.includes('sucesso') ? '#065f46' : '#dc2626',
          border: `1px solid ${message.includes('sucesso') ? '#a7f3d0' : '#fecaca'}`
        }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AddProduct;