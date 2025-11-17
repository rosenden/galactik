// TokenList.stories.jsx
import React from 'react';
import tokens from '../../figma-tokens/tokens.json';

export default {
  title: 'Design Tokens/Liste JSON'
};

export const ToutesLesVariables = () => {
  const flatten = (obj, prefix = '') => {
    return Object.entries(obj).flatMap(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === 'object' && value.$value !== undefined) {
        return [{ name: `--${path.replace(/\./g, '-')}`, value: value.$value }];
      } else if (typeof value === 'object') {
        return flatten(value, path);
      } else {
        return [];
      }
    });
  };

  const variables = flatten(tokens);

  if (!variables.length) return <p>Aucune variable trouvée dans le JSON.</p>;

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'sans-serif',
        maxHeight: '80vh',
        overflow: 'auto',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}
    >
      <h2>Toutes les variables depuis le JSON</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Nom</th>
            <th style={{ textAlign: 'left' }}>Valeur</th>
            <th style={{ textAlign: 'left' }}>Aperçu</th>
          </tr>
        </thead>
        <tbody>
          {variables.map(({ name, value }) => (
            <tr key={name}>
              <td style={{ padding: '0.5rem' }}>{name}</td>
              <td style={{ padding: '0.5rem' }}>
                {typeof value === 'object' ? JSON.stringify(value) : value}
              </td>
              <td style={{ padding: '0.5rem' }}>
                {typeof value === 'string' && value.startsWith('#') ? (
                  <div
                    style={{
                      background: value,
                      width: 40,
                      height: 20,
                      border: '1px solid #ccc'
                    }}
                  />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

