import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      // Using relative URL so Vite proxy forwards to http://localhost:5175
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (res.ok && data?.ok) {
        setStatus('success');
        setMessage('Welcome email sent! Check your inbox.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data?.error || 'Subscription failed');
      }
    } catch (err) {
      console.error('fetch failed:', err);
      setStatus('error');
      setMessage('Network error');
    }
  }

  return (
    <div style={{
      maxWidth: 520, border: '1px solid #eee', padding: 24, borderRadius: 16,
      boxShadow: '0 6px 20px rgba(0,0,0,0.06)'
    }}>
      <h3 style={{ marginTop: 0 }}>Subscribe to DEV@Deakin</h3>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #ccc' }}
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            padding: '10px 16px', borderRadius: 10, border: '1px solid #ddd',
            background: status === 'loading' ? '#f3f3f3' : 'white', cursor: 'pointer'
          }}
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>

      {status === 'success' && (
        <p style={{ color: 'green', marginTop: 10 }}>{message}</p>
      )}
      {status === 'error' && (
        <p style={{ color: 'crimson', marginTop: 10 }}>{message}</p>
      )}
    </div>
  );
}
