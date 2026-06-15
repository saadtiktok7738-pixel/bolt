import { useState } from 'react';
import { Search, Grid, List, ChevronRight } from 'lucide-react';
import { packages } from '../data/packages.js';
import { useModal } from '../contexts/ModelContext.jsx';

const ROBUX_IMG = 'https://strut-clash.vercel.app/_next/image?url=%2Frobux.svg&w=48&q=75';
const POINTS_IMG = 'https://strut-clash.vercel.app/_next/image?url=%2Fpoints.svg&w=32&q=75';

export default function Marketplace() {
  const { openCheckout } = useModal();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sort, setSort] = useState('popular');
  const [gridView, setGridView] = useState(true);
  const [maxPrice, setMaxPrice] = useState(200);

  const types = ['All', 'Standard', 'Premium', 'Elite', 'Bundle'];

  const filtered = packages.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'All' || p.type === filterType;
    const matchesPrice = p.price <= maxPrice;
    return matchesSearch && matchesType && matchesPrice;
  }).sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'pts') return b.pts - a.pts;
    return (b.tag ? 1 : 0) - (a.tag ? 1 : 0);
  });

  return (
    <div className="page-wrap" style={{ padding: '40px 56px 72px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text3)', marginBottom: '12px' }}>
          <span>Home</span><ChevronRight size={12} /><span style={{ color: 'var(--text)' }}>Marketplace</span>
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-1.2px', marginBottom: '6px', color: 'var(--text)' }}>Marketplace</h1>
        <p style={{ fontSize: '14px', color: 'var(--text2)' }}>Buy Robux with crypto — instant delivery guaranteed</p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px', maxWidth: '340px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
          <input
            type="text" placeholder="Search packages..." value={search} onChange={e => setSearch(e.target.value)}
            data-testid="input-marketplace-search"
            style={{
              width: '100%', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '10px',
              padding: '10px 14px 10px 36px', color: 'var(--text)', fontSize: '13px',
              fontFamily: 'var(--font)', outline: 'none', transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.5)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '4px' }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilterType(t)}
              data-testid={`filter-tab-${t.toLowerCase()}`}
              style={{
                padding: '7px 14px', borderRadius: '7px', fontSize: '12px', fontWeight: 600,
                background: filterType === t ? 'var(--bg3)' : 'transparent',
                color: filterType === t ? 'var(--text)' : 'var(--text3)',
                border: 'none', cursor: 'pointer', fontFamily: 'var(--font)', transition: 'all 0.2s',
              }}
            >{t}</button>
          ))}
        </div>

        <select value={sort} onChange={e => setSort(e.target.value)}
          style={{
            background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '10px',
            padding: '10px 14px', color: 'var(--text2)', fontSize: '13px',
            fontFamily: 'var(--font)', outline: 'none', cursor: 'pointer', marginLeft: 'auto',
          }}
        >
          <option value="popular">Most Popular</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="pts">Most Points</option>
        </select>
      </div>

      {/* Layout */}
      <div className="resp-sidebar-layout" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '24px' }}>
        {/* Sidebar filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '14px' }}>Type</h4>
            {['Standard','Premium','Elite','Bundle'].map(t => (
              <label key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: 'var(--text2)', marginBottom: '10px' }}>
                <input type="checkbox" checked={filterType === 'All' || filterType === t}
                  onChange={() => setFilterType(filterType === t ? 'All' : t)}
                  style={{ accentColor: 'var(--purple)' }} />
                {t}
                <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text3)', background: 'var(--bg2)', borderRadius: '4px', padding: '2px 6px' }}>
                  {packages.filter(p => p.type === t).length}
                </span>
              </label>
            ))}
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: '14px' }}>Max Price</h4>
            <input type="range" min={5} max={200} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--purple)', marginTop: '8px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>
              <span>$5</span><span style={{ color: 'var(--purpleL)', fontWeight: 700 }}>${maxPrice}</span>
            </div>
            <button
              onClick={() => { setFilterType('All'); setMaxPrice(200); setSearch(''); }}
              style={{
                width: '100%', background: 'var(--purple)', color: '#fff', border: 'none',
                borderRadius: '9px', padding: '10px', fontSize: '13px', fontWeight: 700,
                cursor: 'pointer', marginTop: '12px', fontFamily: 'var(--font)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--purple2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--purple)')}
            >Apply Filters</button>
          </div>
        </div>

        {/* Results */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text2)' }}>Showing <strong style={{ color: 'var(--text)' }}>{filtered.length}</strong> packages</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[{ icon: Grid, val: true }, { icon: List, val: false }].map(({ icon: Icon, val }) => (
                <button key={String(val)} onClick={() => setGridView(val)}
                  style={{
                    width: '32px', height: '32px', background: gridView === val ? 'var(--purple)' : 'var(--card)',
                    border: `1px solid ${gridView === val ? 'var(--purple)' : 'var(--border)'}`,
                    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: gridView === val ? '#fff' : 'var(--text3)',
                  }}
                ><Icon size={14} /></button>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: gridView ? 'repeat(3,1fr)' : '1fr',
            gap: '14px',
          }}>
            {filtered.map(pkg => (
              <div key={pkg.id}
                data-testid={`card-package-${pkg.id}`}
                style={{
                  background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px',
                  padding: '20px', position: 'relative', cursor: 'pointer', transition: 'all 0.25s',
                  display: gridView ? 'block' : 'flex', alignItems: gridView ? undefined : 'center', gap: gridView ? undefined : '16px',
                }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(124,58,237,0.45)'; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'var(--border)'; el.style.transform = ''; el.style.boxShadow = ''; }}
              >
                {pkg.tag && (
                  <span style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: pkg.tag === 'Best Value' ? 'var(--green)' : 'var(--yellow)',
                    color: '#111', fontSize: '9px', fontWeight: 700, letterSpacing: '1px',
                    textTransform: 'uppercase', padding: '2px 8px', borderRadius: '4px',
                  }}>{pkg.tag}</span>
                )}
                <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: gridView ? '12px' : '4px' }}>{pkg.type}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <img src={ROBUX_IMG} style={{ width: '32px', height: '32px' }} alt="R$" onError={e => { e.target.style.display = 'none'; }} />
                  <span style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.8px', color: 'var(--text)' }}>{pkg.amount.toLocaleString()}</span>
                </div>
                {gridView && <div style={{ fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>Robux</div>}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: gridView ? '14px' : '0', flex: gridView ? undefined : 1 }}>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)' }}>${pkg.price}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--text2)' }}>
                    <img src={POINTS_IMG} style={{ width: '13px', height: '13px' }} alt="pts" onError={e => { e.target.style.display = 'none'; }} />
                    +{pkg.pts} pts
                  </span>
                </div>
                <button
                  data-testid={`btn-buy-${pkg.id}`}
                  onClick={() => openCheckout(pkg.amount.toLocaleString(), `$${pkg.price}`, pkg.pts)}
                  style={{
                    width: gridView ? '100%' : 'auto',
                    background: 'var(--purple)', color: '#fff', border: 'none',
                    borderRadius: '9px', padding: '9px 18px', fontSize: '13px', fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'var(--font)', transition: 'background 0.2s', marginTop: gridView ? '0' : '0',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--purple2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--purple)')}
                >Buy Now</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
