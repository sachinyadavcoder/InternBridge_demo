import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Link2, Building2, UserCheck, BookOpen, ShieldCheck, LogIn } from 'lucide-react';
import { useApp, DEMO_USERS } from '../../context/AppContext';

const DEMO_PORTALS = [
  {
    role: 'company',
    label: 'Company Portal',
    desc: 'TechSolutions · HR Manager',
    icon: Building2,
    iconColor: '#4F46E5',
    bg: '#EEF2FF',
    redirect: '/company/dashboard',
  },
  {
    role: 'supervisor',
    label: 'Supervisor Portal',
    desc: 'TechSolutions · Senior Engineer',
    icon: UserCheck,
    iconColor: '#0EA5E9',
    bg: '#F0F9FF',
    redirect: '/supervisor/dashboard',
  },
  {
    role: 'guide',
    label: 'College Guide Portal',
    desc: 'GCEN · Asst. Professor',
    icon: BookOpen,
    iconColor: '#16A34A',
    bg: '#F0FDF4',
    redirect: '/guide/dashboard',
  },
  {
    role: 'admin',
    label: 'College Admin Portal',
    desc: 'GCEN · T&P Officer',
    icon: ShieldCheck,
    iconColor: '#7C3AED',
    bg: '#FAF5FF',
    redirect: '/admin/dashboard',
  },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Please enter your email address.'); return; }
    if (!password.trim()) { setError('Please enter your password.'); return; }
    if (!email.includes('@')) { setError('Please enter a valid email address.'); return; }
    setLoading(true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));
    // Demo: match any demo email
    const found = Object.values(DEMO_USERS).find(u => u.email === email.trim().toLowerCase());
    if (found) {
      login(found);
      navigate(`/${found.role}/dashboard`);
    } else {
      setError('Invalid credentials. Use a demo portal below or a demo email.');
    }
    setLoading(false);
  };

  const handleDemoLogin = (portal) => {
    login(DEMO_USERS[portal.role]);
    navigate(portal.redirect);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#F8FAFC' }}>
      {/* Left Panel — Branding */}
      <div style={{
        width: '45%',
        background: 'linear-gradient(145deg, #4F46E5 0%, #2563EB 50%, #0EA5E9 100%)',
        display: 'flex',
        flexDirection: 'column',
        padding: '48px',
        position: 'relative',
        overflow: 'hidden',
      }} className="login-brand-panel">
        {/* Background shapes */}
        {[1,2,3].map(i => (
          <div key={i} style={{
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            width: i * 220 + 'px', height: i * 220 + 'px',
            right: -i * 60 + 'px', bottom: -i * 60 + 'px',
          }} />
        ))}
        <div style={{
          position: 'absolute', top: '15%', left: '10%',
          width: 120, height: 120, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, zIndex: 1 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}>
            <Link2 size={22} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.3px' }}>InternBridge</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Intelligent Internship Platform</div>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 1 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2, marginBottom: 16 }}>
            Connect. Mentor.<br />Succeed Together.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, lineHeight: 1.6, maxWidth: 360 }}>
            InternBridge brings companies, supervisors, college guides, and institutions into one intelligent ecosystem for complete internship lifecycle management.
          </p>

          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Intelligent Skill Matching', desc: 'ML-powered candidate compatibility scoring' },
              { label: 'Complete Lifecycle Management', desc: 'From application to completion certificate' },
              { label: 'Multi-Role Coordination', desc: 'Companies, supervisors, guides, and institutions' },
            ].map(f => (
              <div key={f.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.6)',
                  marginTop: 6, flexShrink: 0,
                }} />
                <div>
                  <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: 14 }}>{f.label}</div>
                  <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', zIndex: 1 }}>
          © 2025 InternBridge · Final Year Project — BE Information Technology
        </div>
      </div>

      {/* Right Panel — Login form */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 40px',
        overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          {/* Mobile logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'linear-gradient(135deg, #4F46E5 0%, #0EA5E9 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Link2 size={20} color="#FFFFFF" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 18, color: '#0F172A' }}>InternBridge</span>
          </div>

          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>Welcome back</h1>
          <p style={{ fontSize: 14, color: '#64748B', marginBottom: 28 }}>
            Sign in to your InternBridge portal to continue.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="form-group">
              <label className="form-label">Email Address<span className="required">*</span></label>
              <input
                className={`form-input ${error && !email ? 'error' : ''}`}
                type="email"
                placeholder="you@organisation.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label className="form-label">Password<span className="required">*</span></label>
                <button type="button" style={{ fontSize: 12, color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  Forgot password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  className={`form-input ${error && !password ? 'error' : ''}`}
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Your password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  style={{ paddingRight: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                style={{ width: 15, height: 15, accentColor: '#4F46E5' }}
              />
              <label htmlFor="remember" style={{ fontSize: 13, color: '#475569', cursor: 'pointer' }}>
                Remember me for 7 days
              </label>
            </div>

            {error && (
              <div style={{
                background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8,
                padding: '10px 14px', fontSize: 13, color: '#DC2626', display: 'flex', alignItems: 'center', gap: 8,
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
              style={{ width: '100%', marginTop: 4 }}
            >
              {loading ? (
                <><div className="loading-spinner" style={{ width: 16, height: 16, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#FFFFFF' }} />Signing in...</>
              ) : (
                <><LogIn size={16} />Sign In</>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '28px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
            <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>DEMO PORTAL ACCESS</span>
            <div style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
          </div>

          <p style={{ fontSize: 12, color: '#94A3B8', textAlign: 'center', marginBottom: 16 }}>
            Select a demo role to explore the prototype without credentials.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {DEMO_PORTALS.map(p => (
              <button
                key={p.role}
                onClick={() => handleDemoLogin(p)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  padding: '14px 16px', borderRadius: 10,
                  background: p.bg, border: `1.5px solid ${p.iconColor}30`,
                  cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left',
                  gap: 8,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${p.iconColor}25`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: p.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <p.icon size={17} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: p.iconColor }}>{p.label}</div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{p.desc}</div>
                </div>
              </button>
            ))}
          </div>

          <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: 20, lineHeight: 1.5 }}>
            This is a prototype demonstration. All data shown is simulated and does not represent real individuals or organisations.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .login-brand-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}
