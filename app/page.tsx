'use client'

import { useEffect, useMemo, useState } from 'react'
import { ShoppingBag, Search, Moon, Sun, Star, ArrowRight, Plus, Minus, X, Heart, UserRound, Package, Menu, Sparkles, SlidersHorizontal } from 'lucide-react'

type Product = {
  id: number
  name: string
  category: string
  price: number
  rating: number
  description: string
  image: string
  badge?: string
}

const products: Product[] = [
  { id: 1, name: 'Terra Carryall', category: 'Bags', price: 148, rating: 4.9, description: 'A softly structured everyday tote in vegetable-tanned leather.', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85', badge: 'Bestseller' },
  { id: 2, name: 'Form Study Chair', category: 'Home', price: 320, rating: 4.8, description: 'A sculptural oak chair designed for long, comfortable days.', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=85', badge: 'New' },
  { id: 3, name: 'Arc Ceramic Set', category: 'Tabletop', price: 86, rating: 4.7, description: 'Hand-finished stoneware with a quiet, imperfect edge.', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Lumen Desk Lamp', category: 'Lighting', price: 112, rating: 4.9, description: 'Warm ambient light in a considered brushed metal silhouette.', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'Atelier Throw', category: 'Textiles', price: 124, rating: 4.6, description: 'A generous, tactile wool layer for slow Sunday mornings.', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Daily Vessel', category: 'Tabletop', price: 58, rating: 4.8, description: 'A small hand-thrown vase for stems, shelves, and stories.', image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=85' },
]

const categories = ['All pieces', 'Bags', 'Home', 'Tabletop', 'Lighting', 'Textiles']

export default function Page() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All pieces')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [selected, setSelected] = useState<Product | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('folio-theme')
    if (savedTheme === 'dark') setDark(true)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('folio-theme', dark ? 'dark' : 'light')
  }, [dark])

  const filtered = useMemo(() => products.filter((p) => {
    const matchesCategory = category === 'All pieces' || p.category === category
    const matchesQuery = `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  }), [category, query])

  const cartItems = products.filter((p) => cart[p.id])
  const count = Object.values(cart).reduce((sum, value) => sum + value, 0)
  const subtotal = cartItems.reduce((sum, p) => sum + p.price * cart[p.id], 0)

  function addToCart(product: Product) {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }))
    setToast(`${product.name} added to your bag`)
    window.setTimeout(() => setToast(''), 2200)
  }

  function updateQuantity(id: number, amount: number) {
    setCart((current) => {
      const next = Math.max(0, (current[id] || 0) + amount)
      const copy = { ...current }
      if (next === 0) delete copy[id]
      else copy[id] = next
      return copy
    })
  }

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Folio home"><span className="brand-mark">F</span><span>folio<span className="brand-dot">.</span></span></a>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a><a href="#story" onClick={() => setMenuOpen(false)}>Our story</a><a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button desktop-only" aria-label="Toggle theme" onClick={() => setDark(!dark)}>{dark ? <Sun /> : <Moon />}</button>
          <a className="account-link desktop-only" href="#account"><UserRound /> Account</a>
          <button className="bag-button" onClick={() => setCartOpen(true)}><ShoppingBag /><span>Bag</span><b>{count}</b></button>
          <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}><Menu /></button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy"><p className="eyebrow"><Sparkles /> Thoughtful goods, made to last</p><h1>Objects with a <em>point of view.</em></h1><p className="hero-description">A considered collection of everyday pieces for living well, slowly. Designed with intention, chosen for their character.</p><a className="text-link" href="#shop">Explore the collection <ArrowRight /></a></div>
          <div className="hero-art"><div className="hero-image hero-image-main"><img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=85" alt="Warmly styled living room with a sculptural chair" /></div><div className="hero-note"><span>01 / 04</span><p>Made for the everyday ritual.</p></div><div className="hero-stamp">EST.<br /><strong>2024</strong></div></div>
        </section>

        <section className="marquee" aria-label="Folio values"><span>USEFUL</span><i>✦</i><span>TIMELESS</span><i>✦</i><span>WELL-MADE</span><i>✦</i><span>USEFUL</span><i>✦</i><span>TIMELESS</span></section>

        <section className="shop-section" id="shop"><div className="section-heading"><div><p className="eyebrow">The collection</p><h2>Good things, <em>well chosen.</em></h2></div><p className="section-intro">Small-batch objects with a clear purpose and a long life ahead.</p></div>
          <div className="shop-toolbar"><div className="categories">{categories.map((item) => <button key={item} className={category === item ? 'category active' : 'category'} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-field"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pieces" aria-label="Search products" /></label><button className="filter-button"><SlidersHorizontal /> <span>Filters</span></button></div>
          <div className="product-grid">{filtered.map((product) => <article className="product-card" key={product.id}><button className="product-image" onClick={() => setSelected(product)}><img src={product.image} alt={product.name} />{product.badge && <span className="product-badge">{product.badge}</span>}<span className="quick-view">Quick view <ArrowRight /></span></button><div className="product-info"><div><p className="product-category">{product.category}</p><h3>{product.name}</h3></div><button className="heart-button" aria-label={`Save ${product.name}`}><Heart /></button></div><div className="product-meta"><span className="rating"><Star /> {product.rating}</span><span className="price">${product.price}</span></div></article>)}</div>
          {filtered.length === 0 && <div className="empty-state"><Package /><h3>No pieces found</h3><p>Try another search or browse the full collection.</p></div>}
        </section>

        <section className="story-section" id="story"><div className="story-image"><img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85" alt="Sunlit studio workspace" /></div><div className="story-copy"><p className="eyebrow">The Folio edit</p><h2>Less, but <em>better.</em></h2><p>We believe the things around us shape the way we move through the day. Folio is a growing edit of pieces that bring a little more care to the everyday.</p><a className="text-link" href="#journal">Read our story <ArrowRight /></a></div></section>

        <section className="newsletter" id="journal"><div><p className="eyebrow">A note in your inbox</p><h2>Keep good company.</h2></div><form onSubmit={(e) => { e.preventDefault(); setToast('You’re on the list. Welcome to Folio.') }}><input type="email" required placeholder="Your email address" aria-label="Email address" /><button type="submit">Sign me up <ArrowRight /></button></form></section>
      </main>

      <footer><a className="brand" href="#top"><span className="brand-mark">F</span><span>folio<span className="brand-dot">.</span></span></a><p>Considered goods for everyday living.</p><div className="footer-links"><a href="#shop">Shop</a><a href="#story">About</a><a href="#account">Account</a><button onClick={() => setDark(!dark)}>{dark ? 'Light mode' : 'Dark mode'}</button></div><small>© 2024 Folio Studio. Built with intention.</small></footer>

      {selected && <div className="modal-backdrop" role="presentation" onClick={() => setSelected(null)}><div className="product-modal" role="dialog" aria-modal="true" aria-label={`${selected.name} details`} onClick={(e) => e.stopPropagation()}><button className="close-button" onClick={() => setSelected(null)} aria-label="Close"><X /></button><div className="modal-image"><img src={selected.image} alt={selected.name} /></div><div className="modal-copy"><p className="product-category">{selected.category}</p><h2>{selected.name}</h2><div className="modal-rating"><Star /> {selected.rating} · 18 reviews</div><p>{selected.description} Made with materials chosen for their texture, durability, and everyday ease.</p><strong className="modal-price">${selected.price}</strong><button className="primary-button" onClick={() => { addToCart(selected); setSelected(null); setCartOpen(true) }}>Add to bag <ArrowRight /></button></div></div></div>}
      {cartOpen && <div className="modal-backdrop" role="presentation" onClick={() => setCartOpen(false)}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag" onClick={(e) => e.stopPropagation()}><div className="drawer-heading"><div><p className="eyebrow">Your selection</p><h2>Shopping bag <span>({count})</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close"><X /></button></div>{cartItems.length ? <><div className="cart-items">{cartItems.map((product) => <div className="cart-item" key={product.id}><img src={product.image} alt="" /><div className="cart-item-copy"><h3>{product.name}</h3><p>${product.price}</p><div className="quantity"><button onClick={() => updateQuantity(product.id, -1)} aria-label="Decrease quantity"><Minus /></button><span>{cart[product.id]}</span><button onClick={() => updateQuantity(product.id, 1)} aria-label="Increase quantity"><Plus /></button></div></div><button className="remove-item" onClick={() => updateQuantity(product.id, -cart[product.id])} aria-label={`Remove ${product.name}`}><X /></button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>${subtotal}</strong></div><small>Shipping calculated at checkout.</small><button className="primary-button" onClick={() => { setToast('Checkout is ready for your order.'); setCartOpen(false) }}>Continue to checkout <ArrowRight /></button></div></> : <div className="empty-cart"><ShoppingBag /><h3>Your bag is empty</h3><p>Find something good for your everyday.</p><button className="secondary-button" onClick={() => setCartOpen(false)}>Continue shopping</button></div>}</aside></div>}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  )
}
