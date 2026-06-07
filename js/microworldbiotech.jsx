import { useState, useEffect, useRef } from "react";

/* ─── Global Styles ─── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,600;0,700;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --mint:       #daebea;
      --teal:       #2a8a85;
      --teal-dark:  #1d6360;
      --teal-light: #e8f5f4;
      --teal-mid:   #4aada8;
      --text:       #1e2d2c;
      --text-muted: #5a6e6d;
      --white:      #ffffff;
      --off-white:  #f5fbfb;
      --border:     #c8dedd;
      --shadow:     0 4px 24px rgba(42,138,133,0.10);
      --shadow-lg:  0 10px 40px rgba(42,138,133,0.15);
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Raleway', sans-serif;
      color: var(--text);
      background: var(--white);
      overflow-x: hidden;
    }

    h1,h2,h3,h4 { font-family: 'Lora', serif; line-height: 1.25; }
    h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 700; }
    h2 { font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 600; }
    h3 { font-size: 1.25rem; font-weight: 600; }
    h4 { font-size: 1.05rem; font-weight: 600; }
    p  { line-height: 1.75; color: var(--text-muted); }

    a { text-decoration: none; color: inherit; }
    ul { list-style: none; }
    img { max-width: 100%; display: block; }

    /* ── Navbar ── */
    .navbar {
      position: sticky; top: 0; z-index: 1000;
      background: var(--white);
      border-bottom: 1px solid var(--border);
      box-shadow: 0 2px 12px rgba(42,138,133,0.08);
    }
    .navbar-top {
      background: var(--teal);
      text-align: right;
      padding: 6px 32px;
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.04em;
    }
    .navbar-top a { color: var(--white); display: inline-flex; align-items: center; gap: 6px; }
    .navbar-top a:hover { opacity: 0.85; }
    .navbar-inner {
      max-width: 1200px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 24px;
      height: 72px;
    }
    .logo {
      display: flex; align-items: center; gap: 12px;
      cursor: pointer;
    }
    .logo-icon {
      width: 46px; height: 46px; border-radius: 50%;
      background: linear-gradient(135deg, var(--teal), var(--teal-dark));
      display: flex; align-items: center; justify-content: center;
      font-size: 1.3rem; font-weight: 800; color: var(--white);
      letter-spacing: -1px;
      box-shadow: 0 4px 12px rgba(42,138,133,0.3);
    }
    .logo-text { font-family: 'Lora', serif; }
    .logo-text strong { display: block; font-size: 1.05rem; font-weight: 700; color: var(--teal-dark); }
    .logo-text span { font-size: 0.72rem; color: var(--text-muted); letter-spacing: 0.08em; font-family: 'Raleway', sans-serif; font-weight: 500; }

    .nav-links { display: flex; align-items: center; gap: 4px; }
    .nav-item { position: relative; }
    .nav-link {
      padding: 8px 14px;
      font-size: 0.88rem; font-weight: 600;
      color: var(--text);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex; align-items: center; gap: 4px;
      white-space: nowrap;
    }
    .nav-link:hover, .nav-link.active { background: var(--teal-light); color: var(--teal-dark); }
    .nav-link svg { width: 12px; height: 12px; transition: transform 0.2s; }
    .nav-item:hover .nav-link svg { transform: rotate(180deg); }

    .dropdown {
      position: absolute; top: calc(100% + 8px); left: 0;
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 10px;
      box-shadow: var(--shadow-lg);
      min-width: 220px;
      overflow: hidden;
      opacity: 0; visibility: hidden; transform: translateY(-8px);
      transition: all 0.2s;
      z-index: 200;
    }
    .nav-item:hover .dropdown { opacity: 1; visibility: visible; transform: translateY(0); }
    .dropdown-item {
      display: block; padding: 11px 18px;
      font-size: 0.85rem; font-weight: 500; color: var(--text);
      cursor: pointer;
      transition: background 0.15s;
      border-bottom: 1px solid var(--border);
    }
    .dropdown-item:last-child { border-bottom: none; }
    .dropdown-item:hover { background: var(--teal-light); color: var(--teal-dark); }

    .hamburger {
      display: none; flex-direction: column; gap: 5px;
      cursor: pointer; padding: 8px; background: none; border: none;
    }
    .hamburger span {
      display: block; width: 24px; height: 2.5px;
      background: var(--teal-dark); border-radius: 2px;
      transition: all 0.3s;
    }

    /* ── Mobile Menu ── */
    .mobile-menu {
      display: none;
      position: fixed; inset: 0; z-index: 999;
      background: rgba(0,0,0,0.5);
    }
    .mobile-menu.open { display: block; }
    .mobile-panel {
      position: absolute; top: 0; right: 0;
      width: 280px; height: 100vh;
      background: var(--white);
      overflow-y: auto;
      box-shadow: -8px 0 32px rgba(0,0,0,0.15);
      padding: 24px 0;
      animation: slideIn 0.25s ease;
    }
    @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
    .mobile-close {
      display: flex; justify-content: flex-end;
      padding: 0 20px 16px;
      font-size: 1.5rem; cursor: pointer; color: var(--text-muted);
      background: none; border: none;
    }
    .mobile-nav-item {
      padding: 13px 24px;
      font-size: 0.9rem; font-weight: 600; color: var(--text);
      cursor: pointer; border-bottom: 1px solid var(--border);
      transition: background 0.15s;
    }
    .mobile-nav-item:hover { background: var(--teal-light); color: var(--teal-dark); }
    .mobile-nav-sub {
      padding: 10px 36px;
      font-size: 0.85rem; font-weight: 500; color: var(--text-muted);
      cursor: pointer; border-bottom: 1px solid var(--border);
    }
    .mobile-nav-sub:hover { background: var(--teal-light); color: var(--teal-dark); }

    /* ── Hero ── */
    .hero {
      background: linear-gradient(135deg, var(--teal-dark) 0%, var(--teal) 50%, var(--teal-mid) 100%);
      min-height: 560px;
      display: flex; align-items: center; justify-content: center;
      text-align: center;
      position: relative; overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute; inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    .hero-content { position: relative; z-index: 1; padding: 60px 24px; }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.3);
      padding: 8px 20px; border-radius: 100px;
      font-size: 0.82rem; font-weight: 600; color: var(--white);
      letter-spacing: 0.06em; text-transform: uppercase;
      margin-bottom: 24px;
    }
    .hero h1 { color: var(--white); font-size: clamp(2.2rem, 5vw, 3.6rem); margin-bottom: 20px; }
    .hero p { color: rgba(255,255,255,0.85); font-size: 1.1rem; max-width: 540px; margin: 0 auto 36px; }
    .hero-ctas { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 28px; border-radius: 50px;
      font-size: 0.9rem; font-weight: 700;
      cursor: pointer; transition: all 0.25s;
      border: 2px solid transparent;
      font-family: 'Raleway', sans-serif;
    }
    .btn-white {
      background: var(--white); color: var(--teal-dark);
    }
    .btn-white:hover { background: var(--mint); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
    .btn-outline-white {
      background: transparent; color: var(--white); border-color: rgba(255,255,255,0.6);
    }
    .btn-outline-white:hover { background: rgba(255,255,255,0.15); transform: translateY(-2px); }
    .btn-teal {
      background: var(--teal); color: var(--white);
    }
    .btn-teal:hover { background: var(--teal-dark); transform: translateY(-2px); box-shadow: var(--shadow); }
    .btn-outline-teal {
      background: transparent; color: var(--teal); border-color: var(--teal);
    }
    .btn-outline-teal:hover { background: var(--teal-light); transform: translateY(-2px); }

    /* Stats strip */
    .stats-strip {
      background: var(--white);
      border-bottom: 1px solid var(--border);
      padding: 28px 24px;
    }
    .stats-inner { max-width: 1000px; margin: 0 auto; display: flex; justify-content: space-around; flex-wrap: wrap; gap: 24px; }
    .stat { text-align: center; }
    .stat-num { font-family: 'Lora', serif; font-size: 2.2rem; font-weight: 700; color: var(--teal); }
    .stat-label { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); letter-spacing: 0.05em; text-transform: uppercase; }

    /* ── Sections ── */
    .section { padding: 80px 24px; }
    .section-alt { background: var(--off-white); }
    .container { max-width: 1160px; margin: 0 auto; }
    .section-head { text-align: center; margin-bottom: 56px; }
    .section-head .tag {
      display: inline-block; padding: 5px 16px; border-radius: 100px;
      background: var(--teal-light); color: var(--teal);
      font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
      margin-bottom: 14px;
    }
    .section-head h2 { margin-bottom: 14px; color: var(--text); }
    .section-head p { max-width: 600px; margin: 0 auto; }
    .divider { width: 52px; height: 3px; background: var(--teal); border-radius: 2px; margin: 16px auto 0; }

    /* ── About Cards ── */
    .about-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; }
    .about-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: var(--shadow);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .about-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
    .about-card-img { width: 100%; height: 220px; object-fit: cover; }
    .about-card-body { padding: 28px; }
    .about-card-body h4 { color: var(--teal-dark); margin-bottom: 14px; font-size: 1.1rem; }
    .about-card-body p { font-size: 0.9rem; line-height: 1.8; }
    .feature-list { margin-top: 18px; display: flex; flex-direction: column; gap: 10px; }
    .feature-item {
      display: flex; align-items: flex-start; gap: 10px;
      font-size: 0.88rem; color: var(--text);
    }
    .feature-icon { color: var(--teal); font-size: 1.1rem; margin-top: 1px; flex-shrink: 0; }
    .feature-item strong { color: var(--text); }

    /* Values */
    .values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-top: 16px; }
    .value-card {
      background: var(--teal-light);
      border-radius: 14px; padding: 24px 20px; text-align: center;
      border: 1px solid var(--border);
      transition: background 0.25s, transform 0.25s;
    }
    .value-card:hover { background: var(--mint); transform: translateY(-4px); }
    .value-icon { font-size: 2rem; margin-bottom: 12px; }
    .value-card h4 { color: var(--teal-dark); margin-bottom: 8px; }
    .value-card p { font-size: 0.83rem; }

    /* ── Products ── */
    .products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 28px; }
    .product-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 16px; overflow: hidden;
      box-shadow: var(--shadow);
      transition: all 0.3s;
      display: flex; flex-direction: column;
    }
    .product-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
    .product-img-wrap {
      height: 200px; overflow: hidden;
      background: var(--teal-light);
      display: flex; align-items: center; justify-content: center;
    }
    .product-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
    .product-card:hover .product-img-wrap img { transform: scale(1.06); }
    .product-icon-placeholder {
      font-size: 4rem; opacity: 0.5;
    }
    .product-body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
    .product-body h4 { color: var(--text); margin-bottom: 10px; font-size: 1rem; }
    .product-body p { font-size: 0.85rem; line-height: 1.7; flex: 1; }
    .product-tag {
      display: inline-block; margin-bottom: 10px;
      padding: 3px 12px; border-radius: 100px;
      background: var(--mint); color: var(--teal-dark);
      font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em;
    }
    .product-footer { padding: 0 24px 24px; }
    .product-footer a, .product-footer button {
      width: 100%; display: block; text-align: center;
      padding: 11px; border-radius: 50px;
      background: var(--teal); color: var(--white);
      font-size: 0.85rem; font-weight: 700;
      cursor: pointer; border: none; transition: all 0.2s;
      font-family: 'Raleway', sans-serif;
    }
    .product-footer a:hover, .product-footer button:hover { background: var(--teal-dark); transform: translateY(-1px); }

    /* ── Product Detail Page ── */
    .page-hero {
      background: linear-gradient(135deg, var(--teal-dark), var(--teal));
      padding: 60px 24px 50px;
      text-align: center;
      position: relative; overflow: hidden;
    }
    .page-hero::before {
      content: ''; position: absolute; inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.04'%3E%3Cpath d='M20 20c0-11 9-20 20-20v40C29 40 20 31 20 20zm0 0c0 11-9 20-20 20V0c11 0 20 9 20 20z'/%3E%3C/g%3E%3C/svg%3E");
    }
    .page-hero h1 { color: var(--white); position: relative; z-index: 1; }
    .page-hero .subtitle {
      color: rgba(255,255,255,0.82); font-size: 1rem; margin-top: 12px;
      position: relative; z-index: 1; font-style: italic;
    }

    .product-detail { max-width: 1100px; margin: 0 auto; padding: 60px 24px; }
    .product-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
    .product-detail-img {
      border-radius: 16px; overflow: hidden;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border);
      background: var(--teal-light);
      min-height: 320px;
      display: flex; align-items: center; justify-content: center;
    }
    .product-detail-img img { width: 100%; height: auto; object-fit: cover; }
    .product-detail-img-placeholder { font-size: 6rem; opacity: 0.35; }
    .detail-section { margin-bottom: 36px; }
    .detail-section h3 { color: var(--teal-dark); margin-bottom: 14px; font-size: 1.15rem; border-bottom: 2px solid var(--border); padding-bottom: 10px; }
    .detail-section p { font-size: 0.92rem; margin-bottom: 10px; }
    .detail-list { display: flex; flex-direction: column; gap: 10px; }
    .detail-list li {
      display: flex; align-items: flex-start; gap: 10px;
      font-size: 0.9rem; color: var(--text);
    }
    .detail-list li::before { content: '✓'; color: var(--teal); font-weight: 700; flex-shrink: 0; }

    /* Enquiry Form */
    .enquiry-section { background: var(--teal-light); padding: 60px 24px; }
    .enquiry-inner { max-width: 600px; margin: 0 auto; text-align: center; }
    .enquiry-inner h2 { margin-bottom: 8px; }
    .enquiry-inner p { margin-bottom: 32px; }
    .form-group { margin-bottom: 18px; text-align: left; }
    .form-group label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; color: var(--text); }
    .form-control {
      width: 100%; padding: 12px 16px;
      border: 1.5px solid var(--border); border-radius: 10px;
      font-size: 0.9rem; font-family: 'Raleway', sans-serif;
      background: var(--white); color: var(--text);
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
    }
    .form-control:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(42,138,133,0.12); }
    textarea.form-control { resize: vertical; min-height: 100px; }

    .whatsapp-btn {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 12px 24px; border-radius: 50px;
      background: #25D366; color: var(--white);
      font-size: 0.9rem; font-weight: 700;
      cursor: pointer; border: none; margin-top: 16px;
      transition: all 0.2s; font-family: 'Raleway', sans-serif;
    }
    .whatsapp-btn:hover { background: #1da851; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,211,102,0.35); }

    /* ── Founders ── */
    .founders-section { padding: 80px 24px; max-width: 1000px; margin: 0 auto; }
    .founders-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; margin-top: 20px; }
    .founder-card {
      background: var(--white); border: 1px solid var(--border);
      border-radius: 20px; overflow: hidden;
      box-shadow: var(--shadow);
      transition: all 0.3s;
    }
    .founder-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
    .founder-img-wrap { height: 280px; overflow: hidden; background: var(--teal-light); }
    .founder-img-wrap img { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
    .founder-placeholder {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      font-size: 5rem; opacity: 0.35;
    }
    .founder-body { padding: 28px; }
    .founder-body h2 { font-size: 1.35rem; color: var(--text); margin-bottom: 6px; }
    .founder-role { display: inline-block; padding: 4px 14px; border-radius: 100px; background: var(--teal-light); color: var(--teal-dark); font-size: 0.78rem; font-weight: 700; margin-bottom: 14px; }
    .founder-qual { font-size: 0.85rem; font-weight: 600; color: var(--teal); margin-bottom: 14px; }
    .founder-body p { font-size: 0.88rem; line-height: 1.75; }

    /* ── Join Team ── */
    .join-section { max-width: 680px; margin: 0 auto; padding: 80px 24px; }
    .join-hero-card {
      background: linear-gradient(135deg, var(--teal-dark), var(--teal));
      border-radius: 20px; padding: 48px 40px;
      text-align: center; margin-bottom: 40px;
      position: relative; overflow: hidden;
    }
    .join-hero-card::after {
      content: '🧬'; position: absolute; right: 24px; bottom: -8px;
      font-size: 5rem; opacity: 0.12;
    }
    .join-hero-card h1 { color: var(--white); margin-bottom: 12px; }
    .join-hero-card p { color: rgba(255,255,255,0.82); }
    .apply-card { background: var(--white); border: 1px solid var(--border); border-radius: 20px; padding: 40px; box-shadow: var(--shadow); }
    .apply-card h2 { margin-bottom: 6px; }
    .apply-card .subtitle-text { color: var(--text-muted); margin-bottom: 28px; font-size: 0.9rem; }

    /* ── Contact ── */
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
    .contact-info-card {
      background: var(--white); border: 1px solid var(--border);
      border-radius: 20px; padding: 36px;
      box-shadow: var(--shadow);
    }
    .contact-info-card h2 { margin-bottom: 20px; }
    .contact-item { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 22px; }
    .contact-item-icon {
      width: 42px; height: 42px; flex-shrink: 0;
      background: var(--teal-light); border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.15rem; color: var(--teal);
    }
    .contact-item-text strong { display: block; font-size: 0.82rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .contact-item-text span { font-size: 0.92rem; color: var(--text); }
    .hours-table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 0.88rem; }
    .hours-table td { padding: 8px 0; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .hours-table td:last-child { text-align: right; font-weight: 600; color: var(--text); }
    .form-card {
      background: var(--white); border: 1px solid var(--border);
      border-radius: 20px; padding: 36px;
      box-shadow: var(--shadow);
    }
    .form-card h2 { margin-bottom: 20px; }

    /* ── Footer ── */
    .footer { background: var(--teal-dark); color: var(--white); }
    .footer-main { max-width: 1160px; margin: 0 auto; padding: 60px 24px 40px; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; }
    .footer-brand .logo-text strong { color: var(--white); }
    .footer-brand .logo-text span { color: rgba(255,255,255,0.6); }
    .footer-brand p { margin-top: 16px; font-size: 0.88rem; color: rgba(255,255,255,0.7); line-height: 1.7; max-width: 300px; }
    .footer-col h5 { font-family: 'Lora', serif; font-size: 1rem; margin-bottom: 18px; color: var(--white); }
    .footer-col ul li { margin-bottom: 10px; }
    .footer-col ul li a, .footer-col ul li span {
      font-size: 0.85rem; color: rgba(255,255,255,0.7);
      cursor: pointer; transition: color 0.2s;
    }
    .footer-col ul li a:hover, .footer-col ul li span:hover { color: var(--white); }
    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.15);
      text-align: center; padding: 20px 24px;
      font-size: 0.82rem; color: rgba(255,255,255,0.55);
    }

    /* ── Cookie Banner ── */
    .cookie-banner {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      z-index: 9999;
      background: var(--teal-dark);
      color: var(--white);
      border-radius: 14px;
      padding: 18px 24px;
      max-width: 580px; width: calc(100% - 48px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.25);
      display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
      animation: fadeUp 0.4s ease;
    }
    @keyframes fadeUp { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
    .cookie-banner h5 { font-family: 'Lora', serif; font-size: 0.95rem; margin-bottom: 4px; }
    .cookie-banner p { font-size: 0.8rem; color: rgba(255,255,255,0.75); }
    .cookie-banner-text { flex: 1; min-width: 200px; }
    .cookie-actions { display: flex; gap: 10px; flex-shrink: 0; }
    .cookie-btn {
      padding: 9px 20px; border-radius: 50px; font-size: 0.82rem; font-weight: 700;
      cursor: pointer; border: none; font-family: 'Raleway', sans-serif;
    }
    .cookie-accept { background: var(--white); color: var(--teal-dark); }
    .cookie-decline { background: transparent; color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.3); }

    /* ── Toast ── */
    .toast {
      position: fixed; top: 90px; right: 24px; z-index: 9998;
      background: var(--teal-dark); color: var(--white);
      padding: 14px 20px; border-radius: 12px;
      font-size: 0.9rem; font-weight: 600;
      box-shadow: var(--shadow-lg);
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

    /* ── Page transitions ── */
    .page-enter { animation: pageIn 0.35s ease; }
    @keyframes pageIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .nav-links { display: none; }
      .hamburger { display: flex; }
      .product-detail-grid { grid-template-columns: 1fr; }
      .contact-grid { grid-template-columns: 1fr; }
      .footer-main { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 640px) {
      .hero h1 { font-size: 2rem; }
      .section { padding: 56px 16px; }
      .footer-main { grid-template-columns: 1fr; }
      .join-hero-card { padding: 32px 24px; }
      .apply-card { padding: 28px 20px; }
      .stats-inner { gap: 16px; }
    }
  `}</style>
);

/* ─── SVG Icons ─── */
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
  </svg>
);
const ChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
);
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.117.552 4.1 1.518 5.822L.057 23.927l6.263-1.445A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.796 9.796 0 01-4.998-1.37l-.358-.213-3.718.858.883-3.633-.234-.374A9.765 9.765 0 012.182 12c0-5.418 4.4-9.818 9.818-9.818 5.418 0 9.818 4.4 9.818 9.818 0 5.418-4.4 9.818-9.818 9.818z"/>
  </svg>
);

/* ─── Navbar ─── */
const Navbar = ({ page, setPage }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const products = [
    { label: "Dengue Combo Test Kit",    key: "dengue" },
    { label: "Typhoid Rapid Test Kit",   key: "typhoid" },
    { label: "Malaria Antigen Test Kit", key: "malaria" },
    { label: "Pregnancy Test Kit",       key: "pregnancy" },
  ];

  const nav = (p) => { setPage(p); setMobileOpen(false); setProductsOpen(false); window.scrollTo(0,0); };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-top">
          <a href="tel:+919604629953"><PhoneIcon /> +91-9604629953</a>
        </div>
        <div className="navbar-inner">
          <div className="logo" onClick={() => nav("home")}>
            <div className="logo-icon">MB</div>
            <div className="logo-text">
              <strong>Microworld Biotech</strong>
              <span>PRIVATE LIMITED</span>
            </div>
          </div>

          <ul className="nav-links">
            <li className="nav-item"><span className={`nav-link${page==="home"?" active":""}`} onClick={() => nav("home")}>Home</span></li>
            <li className="nav-item"><span className={`nav-link${page==="founders"?" active":""}`} onClick={() => nav("founders")}>Our Founders</span></li>
            <li className="nav-item">
              <span className={`nav-link${["dengue","typhoid","malaria","pregnancy"].includes(page)?" active":""}`}>
                Products <ChevronDown />
              </span>
              <ul className="dropdown">
                {products.map(p => (
                  <li key={p.key} className="dropdown-item" onClick={() => nav(p.key)}>{p.label}</li>
                ))}
              </ul>
            </li>
            <li className="nav-item"><span className={`nav-link${page==="join"?" active":""}`} onClick={() => nav("join")}>Join Our Team</span></li>
            <li className="nav-item"><span className={`nav-link${page==="contact"?" active":""}`} onClick={() => nav("contact")}>Contact Us</span></li>
          </ul>

          <button className="hamburger" onClick={() => setMobileOpen(true)}>
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${mobileOpen?" open":""}`} onClick={(e) => e.target===e.currentTarget && setMobileOpen(false)}>
        <div className="mobile-panel">
          <button className="mobile-close" onClick={() => setMobileOpen(false)}>✕</button>
          <div className="mobile-nav-item" onClick={() => nav("home")}>Home</div>
          <div className="mobile-nav-item" onClick={() => nav("founders")}>Our Founders</div>
          <div className="mobile-nav-item" onClick={() => setProductsOpen(!productsOpen)} style={{display:"flex",justifyContent:"space-between"}}>
            Products <span>{productsOpen?"▲":"▼"}</span>
          </div>
          {productsOpen && products.map(p => (
            <div key={p.key} className="mobile-nav-sub" onClick={() => nav(p.key)}>{p.label}</div>
          ))}
          <div className="mobile-nav-item" onClick={() => nav("join")}>Join Our Team</div>
          <div className="mobile-nav-item" onClick={() => nav("contact")}>Contact Us</div>
          <div style={{padding:"20px 24px"}}>
            <a href="tel:+919604629953" style={{color:"#2a8a85",fontWeight:700,fontSize:"0.95rem",display:"flex",alignItems:"center",gap:"8px"}}><PhoneIcon/> +91-9604629953</a>
          </div>
        </div>
      </div>
    </>
  );
};

/* ─── Footer ─── */
const Footer = ({ setPage }) => {
  const nav = (p) => { setPage(p); window.scrollTo(0,0); };
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="logo">
            <div className="logo-icon">MB</div>
            <div className="logo-text">
              <strong>Microworld Biotech</strong>
              <span>PRIVATE LIMITED</span>
            </div>
          </div>
          <p>Smart Diagnostics, Better Decisions! Leading provider of diagnostic test kits using immunochromatography technology for rapid diagnostic solutions.</p>
          <div style={{marginTop:"20px"}}>
            <a href="https://wa.me/919604629953" target="_blank" rel="noreferrer">
              <button className="whatsapp-btn"><WhatsAppIcon/> WhatsApp Us</button>
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h5>Quick Links</h5>
          <ul>
            <li><span onClick={() => nav("home")}>Home</span></li>
            <li><span onClick={() => nav("founders")}>Our Founders</span></li>
            <li><span onClick={() => nav("join")}>Join Our Team</span></li>
            <li><span onClick={() => nav("contact")}>Contact Us</span></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Our Products</h5>
          <ul>
            <li><span onClick={() => nav("dengue")}>Dengue Combo Test Kit</span></li>
            <li><span onClick={() => nav("typhoid")}>Typhoid Rapid Test Kit</span></li>
            <li><span onClick={() => nav("malaria")}>Malaria Antigen Test Kit</span></li>
            <li><span onClick={() => nav("pregnancy")}>Pregnancy Test Kit</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        Copyright © 2026 Microworld Biotech — All Rights Reserved. &nbsp;|&nbsp; Plot No B-95, Krushnoor MIDC, TQ. Naigaon, Dist. Nanded — 431709
      </div>
    </footer>
  );
};

/* ─── Cookie Banner ─── */
const CookieBanner = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="cookie-banner">
      <div className="cookie-banner-text">
        <h5>This website uses cookies.</h5>
        <p>We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data.</p>
      </div>
      <div className="cookie-actions">
        <button className="cookie-btn cookie-decline" onClick={() => setVisible(false)}>Decline</button>
        <button className="cookie-btn cookie-accept" onClick={() => setVisible(false)}>Accept</button>
      </div>
    </div>
  );
};

/* ─── Toast ─── */
const Toast = ({ msg, onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
  return <div className="toast">✓ {msg}</div>;
};

/* ─── HOME PAGE ─── */
const HomePage = ({ setPage }) => {
  const nav = (p) => { setPage(p); window.scrollTo(0,0); };
  const products = [
    {
      key: "dengue", icon: "🦟",
      tag: "Rapid Test",
      title: "Dengue Combo Test Kit",
      img: "https://img1.wsimg.com/isteam/ip/3cafcf7c-419d-46dc-a94f-d6f08e5f337d/Dengue%20Combo%20Test%20Kit.jpeg/:/cr=t:38.31%25,l:9.81%25,w:42.02%25,h:32.4%25/rs=w:400,h:300,cg:true,m",
      desc: "Advanced rapid diagnostic solution for qualitative detection of Dengue NS1 antigen and IgG/IgM antibodies in human serum or plasma.",
    },
    {
      key: "malaria", icon: "🔬",
      tag: "Rapid Test",
      title: "Malaria Antigen Test Kit",
      img: null,
      desc: "High-sensitivity RDT for qualitative detection and differentiation of Plasmodium falciparum and Plasmodium vivax from a human blood sample.",
    },
    {
      key: "typhoid", icon: "🧪",
      tag: "Rapid Test",
      title: "Typhoid Rapid Test Kit",
      img: null,
      desc: "High-performance diagnostic for simultaneous detection and differentiation of IgG and IgM antibodies to Salmonella typhi in serum or plasma.",
    },
    {
      key: "pregnancy", icon: "🤱",
      tag: "hCG Detection",
      title: "MummySure Pregnancy Kit",
      img: null,
      desc: "A rapid diagnostic tool designed for the early and accurate detection of pregnancy via human Chorionic Gonadotropin (hCG) detection.",
    },
  ];
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🧬 Founded 2023 · Nanded, India</div>
          <h1>Smart Diagnostics,<br/>Better Decisions!</h1>
          <p>Advanced rapid test kits using immunochromatography technology — fast, accurate, accessible.</p>
          <div className="hero-ctas">
            <button className="btn btn-white" onClick={() => { document.getElementById("products-section").scrollIntoView({behavior:"smooth"}); }}>
              View Our Products
            </button>
            <button className="btn btn-outline-white" onClick={() => nav("contact")}>
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-strip">
        <div className="stats-inner">
          <div className="stat"><div className="stat-num">4+</div><div className="stat-label">Diagnostic Kits</div></div>
          <div className="stat"><div className="stat-num">15–20</div><div className="stat-label">Minutes Results</div></div>
          <div className="stat"><div className="stat-num">2023</div><div className="stat-label">Founded</div></div>
          <div className="stat"><div className="stat-num">B2B</div><div className="stat-label">Focused Partner</div></div>
        </div>
      </div>

      {/* About */}
      <section className="section" id="about">
        <div className="container">
          <div className="section-head">
            <div className="tag">About Us</div>
            <h2>About Microworld Biotech</h2>
            <div className="divider"/>
          </div>
          <div className="about-grid">
            {/* History */}
            <div className="about-card">
              <img
                className="about-card-img"
                src="https://img1.wsimg.com/isteam/stock/bGrWp2E/:/cr=t:0%25,l:16.44%25,w:67.12%25,h:100%25/rs=w:600,h:600,cg:true"
                alt="Modern laboratory"
                onError={e => { e.target.style.display="none"; }}
              />
              <div className="about-card-body">
                <h4>Our History</h4>
                <p>Founded in 2023, Microworld Biotech Private Limited is driven by a clear mission: to advance diagnostic solutions that are faster, more accessible, and highly reliable — for the benefit of mankind.</p>
                <p style={{marginTop:"10px"}}>Established by seasoned professionals with deep expertise in pharmaceuticals and healthcare, the company bridges the gap between laboratory-grade accuracy and real-world accessibility.</p>
                <p style={{marginTop:"10px"}}>As a focused B2B partner, we develop and deliver advanced diagnostic solutions that combine speed, precision, and ease of use — enabling efficient and dependable testing in both advanced clinical settings and resource-limited environments.</p>
              </div>
            </div>

            {/* Technology */}
            <div className="about-card">
              <img
                className="about-card-img"
                src="https://img1.wsimg.com/isteam/stock/ZzrAn3k/:/rs=w:600,h:600,cg:true,m/cr=w:600,h:600"
                alt="Pharmaceutical manufacturing"
                onError={e => { e.target.style.display="none"; }}
              />
              <div className="about-card-body">
                <h4>Our Technology</h4>
                <p>We utilize <strong>advanced Immunochromatography technology</strong>, designed to deliver fast and reliable diagnostic results.</p>
                <div className="feature-list">
                  {[
                    ["High Accuracy","Designed for precise detection with high sensitivity and specificity."],
                    ["Rapid Results (15–20 min)","Enables immediate clinical decisions."],
                    ["No Specialized Equipment","Usable in clinics, nursing homes, and field conditions."],
                    ["Detailed Diagnostic Insights","Semi-quantitative info like viral load and antibody levels."],
                    ["Field-Ready Solutions","Ideal for remote areas, outbreaks, and resource-limited environments."],
                  ].map(([title, desc]) => (
                    <div className="feature-item" key={title}>
                      <span className="feature-icon">✓</span>
                      <span><strong>{title}: </strong>{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Values */}
            <div className="about-card">
              <img
                className="about-card-img"
                src="https://img1.wsimg.com/isteam/stock/mADagle/:/rs=w:600,h:600,cg:true,m/cr=w:600,h:600"
                alt="Growth and values"
                onError={e => { e.target.style.display="none"; }}
              />
              <div className="about-card-body">
                <h4>Our Values</h4>
                <p>Our work is guided by a strong set of values that define how we operate and what we stand for:</p>
                <div className="values-grid" style={{marginTop:"16px"}}>
                  {[
                    {icon:"💡",name:"Innovation",desc:"Continuous R&D to bring next-gen diagnostic solutions."},
                    {icon:"🎯",name:"Accuracy",desc:"Highly precise results healthcare professionals can trust."},
                    {icon:"🌍",name:"Accessibility",desc:"Quality healthcare for remote and underserved regions."},
                    {icon:"💰",name:"Affordability",desc:"Cost-effective solutions without compromising quality."},
                    {icon:"🤝",name:"Customer Commitment",desc:"Training, after-sales service, and consistent supply."},
                  ].map(v => (
                    <div className="value-card" key={v.name}>
                      <div className="value-icon">{v.icon}</div>
                      <h4>{v.name}</h4>
                      <p>{v.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section section-alt" id="products-section">
        <div className="container">
          <div className="section-head">
            <div className="tag">Portfolio</div>
            <h2>Our Products</h2>
            <p>Rapid diagnostic kits designed for accuracy, speed, and ease of use in any setting.</p>
            <div className="divider"/>
          </div>
          <div className="products-grid">
            {products.map(p => (
              <div className="product-card" key={p.key}>
                <div className="product-img-wrap">
                  {p.img
                    ? <img src={p.img} alt={p.title} onError={e => { e.target.parentElement.innerHTML = `<div class='product-icon-placeholder'>${p.icon}</div>`; }} />
                    : <div className="product-icon-placeholder">{p.icon}</div>
                  }
                </div>
                <div className="product-body">
                  <span className="product-tag">{p.tag}</span>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
                <div className="product-footer">
                  <button onClick={() => nav(p.key)}>Visit Product →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{background:"linear-gradient(135deg, var(--teal-dark), var(--teal))", padding:"60px 24px", textAlign:"center"}}>
        <div style={{maxWidth:"600px",margin:"0 auto"}}>
          <h2 style={{color:"var(--white)",marginBottom:"14px"}}>Ready to Partner With Us?</h2>
          <p style={{color:"rgba(255,255,255,0.82)",marginBottom:"28px",fontSize:"1rem"}}>We support healthcare providers, laboratories, and partners across the value chain with reliable B2B diagnostic solutions.</p>
          <div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn btn-white" onClick={() => nav("contact")}>Get In Touch</button>
            <a href="https://wa.me/919604629953" target="_blank" rel="noreferrer">
              <button className="btn btn-outline-white"><WhatsAppIcon/> WhatsApp Us</button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── FOUNDERS PAGE ─── */
const FoundersPage = () => (
  <div className="page-enter">
    <div className="page-hero">
      <h1>Our Founders</h1>
      <p className="subtitle">Seasoned professionals driving diagnostic innovation</p>
    </div>
    <div className="founders-section">
      <div className="founders-grid">
        <div className="founder-card">
          <div className="founder-img-wrap">
            <img
              src="https://img1.wsimg.com/isteam/ip/3cafcf7c-419d-46dc-a94f-d6f08e5f337d/Mukund.jpeg/:/cr=t:4.7%25,l:40.42%25,w:38.22%25,h:43.11%25/rs=w:600,h:451.12781954887214,cg:true,m"
              alt="Mukund Ganpatrao Bhong"
              onError={e => { e.target.parentElement.innerHTML = `<div class='founder-placeholder'>👤</div>`; }}
            />
          </div>
          <div className="founder-body">
            <h2>Mukund Ganpatrao Bhong</h2>
            <span className="founder-role">Founder & Director</span>
            <div className="founder-qual">B.Sc. Pharmacy, D. Pharma</div>
            <p>With over <strong>20 years of experience</strong> in the medical and pharmaceutical industry, Mukund brings deep domain expertise and leadership to Microworld Biotech. He has been a Partner at Varad Pharmaceutical since 2016, contributing significantly to its growth and operations.</p>
          </div>
        </div>

        <div className="founder-card">
          <div className="founder-img-wrap">
            <img
              src="https://img1.wsimg.com/isteam/ip/3cafcf7c-419d-46dc-a94f-d6f08e5f337d/Govind.jpeg/:/cr=t:8.17%25,l:50.58%25,w:28%25,h:42.02%25/rs=w:600,h:600,cg:true,m"
              alt="Govind Chandrakant Kavtikwar"
              onError={e => { e.target.parentElement.innerHTML = `<div class='founder-placeholder'>👤</div>`; }}
            />
          </div>
          <div className="founder-body">
            <h2>Govind Chandrakant Kavtikwar</h2>
            <span className="founder-role">Founder & Director</span>
            <div className="founder-qual">D. Pharma</div>
            <p>With more than <strong>25 years of experience</strong> in the pharmaceutical sector, Govind has extensive expertise in pharma trading and business operations. He leads a strong team and plays a key role in driving strategic growth and distribution excellence.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ─── PRODUCT DETAIL TEMPLATE ─── */
const ProductDetailPage = ({ product }) => {
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ name:"", email:"", phone:"", message:"" });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) { setToast("Please fill all required fields."); return; }
    setToast("Enquiry sent successfully! We'll reach out soon.");
    setForm({ name:"", email:"", phone:"", message:"" });
  };

  const products = {
    dengue: {
      title: "Dengue Combo Test Kit",
      subtitle: "NS1 Antigen & IgG/IgM Antibodies",
      tagline: "Comprehensive. Rapid. Reliable.",
      img: "https://img1.wsimg.com/isteam/ip/3cafcf7c-419d-46dc-a94f-d6f08e5f337d/Dengue%20Combo%20Test%20Kit.jpeg/:/cr=t:38.31%25,l:9.81%25,w:42.02%25,h:32.4%25/rs=w:1240,h:620,cg:true,m",
      icon: "🦟",
      significance: "Dengue is a major mosquito-borne viral infection with significant global impact. Early symptoms include fever, headache, muscle pain, and skin rash, while severe cases may lead to complications such as dengue hemorrhagic fever.",
      roles: [
        "Early detection through NS1 antigen (initial phase of infection)",
        "Monitoring immune response via IgM and IgG antibodies",
        "Differentiating primary and secondary infections",
        "Supporting diagnosis across different stages of the disease",
      ],
      features: [
        "Dual Detection Capability: NS1 Antigen + IgG/IgM Antibodies",
        "Rapid Results: Results available within 15–20 minutes",
        "High Accuracy & Sensitivity",
        "Early Diagnosis Support (NS1 detection in early infection stage)",
        "Easy to Use: No specialized laboratory equipment required",
        "Suitable for Clinics, Hospitals & Field Use",
        "Minimal Sample Requirement (Serum/Plasma)",
      ],
    },
    typhoid: {
      title: "Typhoid Rapid Test Kit",
      subtitle: "IgG/IgM Antibody Detection",
      tagline: "Simultaneous Detection. Swift Results.",
      img: null,
      icon: "🧪",
      significance: "Typhoid fever caused by Salmonella typhi remains a significant public health concern in many regions. Rapid and accurate diagnosis is critical for timely treatment and outbreak control.",
      roles: [
        "Simultaneous detection and differentiation of IgG and IgM antibodies",
        "Quick screening for Salmonella typhi in serum or plasma",
        "Supports timely clinical decision-making",
        "Effective in high-burden settings",
      ],
      features: [
        "Dual Antibody Detection: IgG & IgM simultaneously",
        "Rapid Results: 15–20 minutes",
        "High Sensitivity & Specificity",
        "Works with serum or plasma samples",
        "No specialized equipment required",
        "Suitable for clinics and field environments",
        "Minimal sample volume required",
      ],
    },
    malaria: {
      title: "Malaria Antigen Test Kit",
      subtitle: "Plasmodium falciparum / Plasmodium vivax",
      tagline: "Differentiate. Diagnose. Decide.",
      img: null,
      icon: "🔬",
      significance: "Malaria remains one of the world's deadliest infectious diseases. Differentiating between Plasmodium falciparum and Plasmodium vivax is essential for effective treatment protocols.",
      roles: [
        "Qualitative detection and differentiation of malaria infections",
        "Distinguishes P. falciparum from P. vivax directly from blood",
        "Supports timely species-specific treatment",
        "Effective in endemic and outbreak settings",
      ],
      features: [
        "Pf/Pv Differentiation in a single test",
        "Chromatographic immunoassay technology",
        "Rapid Results: 15–20 minutes",
        "High sensitivity and specificity",
        "Direct whole blood testing — no pre-processing",
        "Field-ready: no cold chain equipment needed during testing",
        "Suitable for remote and resource-limited areas",
      ],
    },
    pregnancy: {
      title: "MummySure Pregnancy hCG Detection Test Kit",
      subtitle: "Human Chorionic Gonadotropin Detection",
      tagline: "Early. Accurate. Reassuring.",
      img: null,
      icon: "🤱",
      significance: "Early pregnancy detection is important for initiating timely prenatal care and making informed health decisions. The MummySure kit provides a reliable, easy-to-use solution for early hCG detection.",
      roles: [
        "Early detection of pregnancy via hCG hormone",
        "Suitable for home, clinic, and hospital use",
        "Supports timely initiation of prenatal care",
        "Simple interpretation with clear visible results",
      ],
      features: [
        "Detects human Chorionic Gonadotropin (hCG) in urine",
        "Rapid Results: within 5 minutes",
        "High Sensitivity: detects low hCG levels",
        "Easy to Use: No equipment required",
        "Clear visual result interpretation (lines)",
        "Suitable for home and clinical use",
        "Individual foil-sealed packaging for hygiene",
      ],
    },
  };

  const p = products[product];
  if (!p) return null;

  return (
    <div className="page-enter">
      {toast && <Toast msg={toast} onDone={() => setToast("")} />}
      <div className="page-hero">
        <h1>{p.title}</h1>
        <p className="subtitle">{p.tagline}</p>
      </div>

      <div className="product-detail">
        <div className="product-detail-grid">
          <div>
            <div className="product-detail-img">
              {p.img
                ? <img src={p.img} alt={p.title} onError={e => { e.target.parentElement.innerHTML = `<div class='product-detail-img-placeholder'>${p.icon}</div>`; }} />
                : <div className="product-detail-img-placeholder">{p.icon}</div>
              }
            </div>
            <div style={{marginTop:"24px",padding:"24px",background:"var(--teal-light)",borderRadius:"14px",border:"1px solid var(--border)"}}>
              <h3 style={{color:"var(--teal-dark)",marginBottom:"12px"}}>Clinical Significance</h3>
              <p style={{fontSize:"0.9rem",marginBottom:"16px"}}>{p.significance}</p>
              <h4 style={{color:"var(--text)",marginBottom:"10px",fontSize:"0.95rem"}}>This test plays a crucial role in:</h4>
              <ul className="detail-list">
                {p.roles.map(r => <li key={r}>{r}</li>)}
              </ul>
            </div>
          </div>

          <div>
            <div className="detail-section">
              <h3>Product Overview</h3>
              <p>The <strong>{p.title}</strong> ({p.subtitle}) is a rapid diagnostic solution developed by Microworld Biotech using advanced immunochromatography technology.</p>
              <p style={{marginTop:"10px"}}>Designed for both clinical and field use, this kit delivers reliable results without requiring specialized laboratory infrastructure, making it ideal for hospitals, clinics, nursing homes, and resource-limited settings.</p>
            </div>

            <div className="detail-section">
              <h3>Key Features</h3>
              <ul className="detail-list">
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>

            <div className="detail-section">
              <h3>Who Should Use This Kit?</h3>
              <ul className="detail-list">
                <li>Hospitals & Multi-specialty Clinics</li>
                <li>Nursing Homes & Primary Health Centers</li>
                <li>Diagnostic Laboratories</li>
                <li>Field Health Workers & NGOs</li>
                <li>Outbreak Response Teams</li>
              </ul>
            </div>

            <a href="https://wa.me/919604629953" target="_blank" rel="noreferrer">
              <button className="whatsapp-btn"><WhatsAppIcon/> Message us on WhatsApp</button>
            </a>
          </div>
        </div>
      </div>

      {/* Enquiry */}
      <section className="enquiry-section">
        <div className="enquiry-inner">
          <div className="tag" style={{display:"inline-block",marginBottom:"12px"}}>B2B Enquiry</div>
          <h2>Enquire Now for Details &amp; Quotation</h2>
          <p>Drop us a line and our team will get back to you with complete product details and pricing.</p>
          <div className="form-card" style={{textAlign:"left"}}>
            <div className="form-group">
              <label>Name *</label>
              <input className="form-control" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input className="form-control" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input className="form-control" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 XXXXX XXXXX" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea className="form-control" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us about your requirements..."/>
            </div>
            <button className="btn btn-teal" style={{width:"100%",justifyContent:"center"}} onClick={submit}>Send Enquiry</button>
            <p style={{fontSize:"0.75rem",marginTop:"12px",textAlign:"center"}}>
              This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" style={{color:"var(--teal)"}}>Privacy Policy</a> and <a href="https://policies.google.com/terms" style={{color:"var(--teal)"}}>Terms of Service</a> apply.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── JOIN TEAM PAGE ─── */
const JoinPage = () => {
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ name:"", phone:"", email:"", resume:null });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) { setToast("Please fill all required fields."); return; }
    setToast("Application submitted! We'll review and get back to you.");
    setForm({ name:"", phone:"", email:"", resume:null });
  };

  return (
    <div className="page-enter">
      {toast && <Toast msg={toast} onDone={() => setToast("")} />}
      <div style={{padding:"60px 24px"}}>
        <div className="join-section">
          <div className="join-hero-card">
            <h1>We're Hiring!</h1>
            <p>Join our growing team at Microworld Biotech and contribute to innovative biotechnology solutions that improve lives globally.</p>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"16px",marginBottom:"40px"}}>
            {[
              {icon:"🌱",title:"Grow With Us",desc:"Be part of a fast-growing IVD company from the ground up."},
              {icon:"🧬",title:"Meaningful Work",desc:"Your work directly impacts healthcare outcomes."},
              {icon:"🏭",title:"MIDC Location",desc:"Based in Krushnoor MIDC, Nanded, Maharashtra."},
              {icon:"🤝",title:"Collaborative Culture",desc:"Work with experienced pharma and healthcare professionals."},
            ].map(c => (
              <div key={c.title} style={{background:"var(--teal-light)",borderRadius:"14px",padding:"22px 18px",border:"1px solid var(--border)",textAlign:"center"}}>
                <div style={{fontSize:"1.8rem",marginBottom:"10px"}}>{c.icon}</div>
                <h4 style={{marginBottom:"8px",color:"var(--teal-dark)"}}>{c.title}</h4>
                <p style={{fontSize:"0.82rem"}}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="apply-card">
            <h2>Apply Now</h2>
            <p className="subtitle-text">If you're interested in joining our team, start by applying here and attaching your resume.</p>
            <div className="form-group">
              <label>Name *</label>
              <input className="form-control" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input className="form-control" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 XXXXX XXXXX" />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input className="form-control" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label>Attach Resume</label>
              <input className="form-control" type="file" accept=".pdf,.doc,.docx" onChange={e=>setForm({...form,resume:e.target.files[0]})} style={{cursor:"pointer"}} />
            </div>
            <button className="btn btn-teal" style={{width:"100%",justifyContent:"center"}} onClick={submit}>
              Submit Application
            </button>
            <p style={{fontSize:"0.75rem",marginTop:"14px",textAlign:"center",color:"var(--text-muted)"}}>
              This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" style={{color:"var(--teal)"}}>Privacy Policy</a> and <a href="https://policies.google.com/terms" style={{color:"var(--teal)"}}>Terms of Service</a> apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── CONTACT PAGE ─── */
const ContactPage = () => {
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ name:"", email:"", phone:"", message:"" });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { setToast("Please fill required fields."); return; }
    setToast("Message sent! We'll get back to you soon.");
    setForm({ name:"", email:"", phone:"", message:"" });
  };

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const hours = {
    Monday:"9:00 AM – 6:00 PM", Tuesday:"9:00 AM – 6:00 PM",
    Wednesday:"9:00 AM – 6:00 PM", Thursday:"9:00 AM – 6:00 PM",
    Friday:"9:00 AM – 6:00 PM", Saturday:"10:00 AM – 4:00 PM", Sunday:"Closed",
  };
  const today = days[new Date().getDay()===0?6:new Date().getDay()-1];

  return (
    <div className="page-enter">
      {toast && <Toast msg={toast} onDone={() => setToast("")} />}
      <div className="page-hero">
        <h1>Contact Us</h1>
        <p className="subtitle">Better yet, see us in person! We love our customers.</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="contact-info-card">
                <h2>Microworld Biotech PVT LTD</h2>
                <div className="contact-item">
                  <div className="contact-item-icon">📍</div>
                  <div className="contact-item-text">
                    <strong>Address</strong>
                    <span>Plot No B-95, Krushnoor MIDC,<br/>TQ. Naigaon, Dist. Nanded,<br/>Pin Code: 431709, Maharashtra</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">📞</div>
                  <div className="contact-item-text">
                    <strong>Phone</strong>
                    <a href="tel:+919604629953" style={{color:"var(--teal)",fontWeight:600}}>+91-9604629953</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">✉️</div>
                  <div className="contact-item-text">
                    <strong>Email</strong>
                    <a href="mailto:info@microworldbiotech.com" style={{color:"var(--teal)",fontWeight:600}}>info@microworldbiotech.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon"><WhatsAppIcon/></div>
                  <div className="contact-item-text">
                    <strong>WhatsApp</strong>
                    <a href="https://wa.me/919604629953" target="_blank" rel="noreferrer" style={{color:"#25D366",fontWeight:600}}>Message us on WhatsApp</a>
                  </div>
                </div>
                <h4 style={{marginBottom:"12px",marginTop:"8px"}}>Business Hours</h4>
                <table className="hours-table">
                  <tbody>
                    {days.map(d => (
                      <tr key={d} style={d===today?{background:"var(--teal-light)"}:{}}>
                        <td style={{fontWeight: d===today?700:"normal",color:d===today?"var(--teal-dark)":"var(--text-muted)"}}>{d} {d===today?"(Today)":""}</td>
                        <td style={{color:hours[d]==="Closed"?"#e55":"inherit"}}>{hours[d]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Map embed */}
              <div style={{marginTop:"24px",borderRadius:"16px",overflow:"hidden",border:"1px solid var(--border)",boxShadow:"var(--shadow)"}}>
                <iframe
                  title="Microworld Biotech Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3776.4!2d77.3!3d18.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDIxJzAwLjAiTiA3N8KwMTgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%" height="220"
                  style={{border:0,display:"block"}}
                  allowFullScreen="" loading="lazy"
                />
              </div>
            </div>

            <div className="form-card">
              <h2>Drop Us a Line!</h2>
              <div className="form-group">
                <label>Name *</label>
                <input className="form-control" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your full name" />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input className="form-control" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input className="form-control" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea className="form-control" rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="How can we help you?" />
              </div>
              <button className="btn btn-teal" style={{width:"100%",justifyContent:"center"}} onClick={submit}>Send Message</button>
              <p style={{fontSize:"0.75rem",marginTop:"12px",textAlign:"center",color:"var(--text-muted)"}}>
                Protected by reCAPTCHA — <a href="https://policies.google.com/privacy" style={{color:"var(--teal)"}}>Privacy Policy</a> &amp; <a href="https://policies.google.com/terms" style={{color:"var(--teal)"}}>Terms of Service</a>.
              </p>
              <div style={{textAlign:"center",marginTop:"20px",paddingTop:"20px",borderTop:"1px solid var(--border)"}}>
                <a href="https://wa.me/919604629953" target="_blank" rel="noreferrer">
                  <button className="whatsapp-btn"><WhatsAppIcon/> Message us on WhatsApp</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── APP ROOT ─── */
export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home":      return <HomePage setPage={setPage} />;
      case "founders":  return <FoundersPage />;
      case "dengue":    return <ProductDetailPage product="dengue" />;
      case "typhoid":   return <ProductDetailPage product="typhoid" />;
      case "malaria":   return <ProductDetailPage product="malaria" />;
      case "pregnancy": return <ProductDetailPage product="pregnancy" />;
      case "join":      return <JoinPage />;
      case "contact":   return <ContactPage />;
      default:          return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <Navbar page={page} setPage={setPage} />
      <main key={page}>{renderPage()}</main>
      <Footer setPage={setPage} />
      <CookieBanner />
    </>
  );
}
