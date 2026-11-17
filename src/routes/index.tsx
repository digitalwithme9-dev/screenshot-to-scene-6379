import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, ChevronDown, Headphones, Menu, Minus, Plus, Search, ShoppingBag, Sparkles, Watch, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/teckrain-hero.jpg";
import headphonesImage from "@/assets/teckrain-headphones.jpg";
import watchImage from "@/assets/teckrain-smartwatch.jpg";
import speakerImage from "@/assets/teckrain-speaker.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Teckrain — Upgrade Your Everyday Tech" },
      { name: "description", content: "Shop thoughtfully chosen headphones, wearables, and everyday tech at Teckrain." },
      { property: "og:title", content: "Teckrain — Upgrade Your Everyday Tech" },
      { property: "og:description", content: "Thoughtfully chosen tech. Ready for every day." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeckrainStorefront,
});

const products = [
  { id: 1, name: "Sonic Pro Headphones", category: "Audio", price: 129, oldPrice: 159, image: headphonesImage, badge: "BEST SELLER", rating: "4.9", reviews: 284, icon: Headphones },
  { id: 2, name: "Pulse Smartwatch", category: "Wearables", price: 189, oldPrice: null, image: watchImage, badge: "JUST IN", rating: "4.8", reviews: 136, icon: Watch },
  { id: 3, name: "Beat Mini Speaker", category: "Audio", price: 79, oldPrice: null, image: speakerImage, badge: null, rating: "4.7", reviews: 98, icon: Sparkles },
];

function TeckrainStorefront() {
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All products");
  const [sort, setSort] = useState("Featured");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = category === "All products" || product.category === category;
      const matchesQuery = `${product.name} ${product.category}`.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
    return sort === "Price: low to high" ? [...filtered].sort((a, b) => a.price - b.price) : filtered;
  }, [category, query, sort]);

  const scrollToProducts = () => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="announcement"><span className="announcement-dot" /> FREE SHIPPING ON ORDERS OVER $75 <span className="announcement-divider">/</span> EASY 30-DAY RETURNS</div>
      <header className="store-header">
        <div className="store-header-inner">
          <a className="brand" href="#top" aria-label="Teckrain home"><span className="brand-mark">t<span>.</span></span><span className="brand-name">teckrain</span></a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a className="nav-link nav-link-active" href="#products">Shop</a>
            <a className="nav-link" href="#categories">Categories</a>
            <a className="nav-link" href="#about">Our story</a>
          </nav>
          <div className="header-actions">
            <Button type="button" variant="ghost" size="icon" aria-label="Search products" title="Search" onClick={() => setSearchOpen((open) => !open)}><Search /></Button>
            <Button type="button" variant="ghost" size="icon" className="cart-trigger" aria-label={`Shopping bag, ${cartCount} items`} title="Shopping bag" onClick={() => setCartOpen(true)}><ShoppingBag /><span className="cart-count">{cartCount}</span></Button>
            <Button type="button" variant="ghost" size="icon" className="mobile-menu-trigger" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {searchOpen && <div className="search-panel"><Search size={18} /><Input autoFocus aria-label="Search products" placeholder="Search headphones, wearables…" value={query} onChange={(event) => { setQuery(event.target.value); scrollToProducts(); }} /><Button variant="ghost" size="icon" aria-label="Close search" onClick={() => setSearchOpen(false)}><X /></Button></div>}
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a href="#products" onClick={() => setMenuOpen(false)}>Shop <ArrowRight size={16} /></a><a href="#categories" onClick={() => setMenuOpen(false)}>Categories <ArrowRight size={16} /></a><a href="#about" onClick={() => setMenuOpen(false)}>Our story <ArrowRight size={16} /></a></nav>}
      </header>

      <section id="top" className="hero-section">
        <img className="hero-image" src={heroImage} alt="A curated lineup of headphones, a phone, a speaker, and a smartwatch" width={1600} height={960} fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-circuit circuit-one" /><div className="hero-circuit circuit-two" />
        <div className="hero-content">
          <div className="eyebrow eyebrow-light"><span className="eyebrow-rule" /> GOOD TECH. BETTER EVERY DAY.</div>
          <h1>Upgrade your<br /><span>Everyday Tech.</span></h1>
          <p>Little things make a big difference. Find the tech that fits your life, and makes every day work a little better.</p>
          <div className="hero-actions">
            <Button asChild size="lg" className="blue-button"><a href="#products">Shop products <ArrowRight /></a></Button>
            <Button asChild size="lg" variant="outline" className="hero-outline"><a href="#categories">Explore gadgets <ArrowDown /></a></Button>
          </div>
          <div className="hero-proof"><div className="proof-stars" aria-label="Five stars">★★★★★</div><span>LOVED BY 12,000+ HAPPY CUSTOMERS</span></div>
        </div>
        <a className="hero-index" href="#products"><span>01</span><span className="index-line" /><span>DISCOVER</span></a>
      </section>

      <div className="trust-strip" aria-label="Shopping benefits"><div><Check /> Made for everyday</div><span className="trust-divider" /><div><Check /> Quality, picked by us</div><span className="trust-divider" /><div><Check /> Here when you need us</div><span className="trust-divider" /><div><Check /> Fast, free shipping $75+</div></div>

      <section id="categories" className="category-band">
        <div className="content-width">
          <div className="section-heading category-heading"><div><div className="eyebrow"><span className="eyebrow-rule" /> FIND YOUR NEXT FAVORITE</div><h2>Good things, <span>well chosen.</span></h2></div><a className="text-link" href="#products">Shop all categories <ArrowRight /></a></div>
          <div className="category-grid">
            <a className="category-tile category-audio" href="#products" onClick={() => setCategory("Audio")}><div className="category-visual category-audio-visual"><img src={headphonesImage} alt="Black wireless headphones" width={912} height={912} loading="lazy" /></div><div className="category-copy"><span className="category-number">01 / SOUND</span><span className="category-name">Hear more.</span><span className="category-arrow"><ArrowRight /></span></div></a>
            <a className="category-tile category-wearables" href="#products" onClick={() => setCategory("Wearables")}><div className="category-visual category-watch-visual"><img src={watchImage} alt="Black smartwatch with a blue display" width={912} height={912} loading="lazy" /></div><div className="category-copy"><span className="category-number">02 / WEARABLES</span><span className="category-name">Move smarter.</span><span className="category-arrow"><ArrowRight /></span></div></a>
            <a className="category-tile category-gadgets" href="#products" onClick={() => setCategory("All products")}><div className="category-visual category-speaker-visual"><img src={speakerImage} alt="Portable black Bluetooth speaker" width={912} height={912} loading="lazy" /></div><div className="category-copy"><span className="category-number">03 / EVERYDAY</span><span className="category-name">Small upgrades.</span><span className="category-arrow"><ArrowRight /></span></div></a>
          </div>
        </div>
      </section>

      <section id="products" className="products-section">
        <div className="content-width">
          <div className="section-heading products-heading"><div><div className="eyebrow"><span className="eyebrow-rule" /> THE GOOD STUFF</div><h2>Everyday favorites.</h2><p>The useful little upgrades you’ll reach for, every single day.</p></div><a className="text-link products-all" href="#products" onClick={() => { setCategory("All products"); setQuery(""); }}>Browse everything <ArrowRight /></a></div>
          <div className="catalog-toolbar"><div className="category-filters" aria-label="Filter products">{["All products", "Audio", "Wearables"].map((filter) => <Button key={filter} variant="ghost" aria-pressed={category === filter} className={`filter-button${category === filter ? " filter-active" : ""}`} onClick={() => setCategory(filter)}>{filter}</Button>)}</div><label className="sort-control"><span>{visibleProducts.length} items</span><span className="sort-separator" /><span className="sort-label">Sort by</span><select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>Price: low to high</option></select><ChevronDown size={15} /></label></div>
          {visibleProducts.length > 0 ? <div className="product-grid">{visibleProducts.map((product) => <article className="product-card" key={product.id}><a className="product-image-wrap" href="#products" aria-label={`View ${product.name}`} onClick={(event) => event.preventDefault()}>{product.badge && <span className="product-badge">{product.badge}</span>}<img className="product-image" src={product.image} alt={product.name} width={912} height={912} loading="lazy" /><span className="quick-add-label">Discover product <ArrowRight /></span></a><div className="product-details"><div className="product-meta"><span>{product.category}</span><span className="rating"><span>★</span> {product.rating} <span className="review-count">({product.reviews})</span></span></div><h3>{product.name}</h3><div className="product-bottom"><div className="product-price"><span>${product.price}</span>{product.oldPrice && <del>${product.oldPrice}</del>}</div><Button type="button" variant="outline" size="icon" className="add-button" aria-label={`Add ${product.name} to bag`} title={`Add ${product.name} to bag`} onClick={() => setCartCount((count) => count + 1)}><Plus /></Button></div></div></article>)}</div> : <div className="empty-results"><Search /><h3>No matches just yet.</h3><p>Try a different search or browse all of our picks.</p><Button variant="outline" onClick={() => { setQuery(""); setCategory("All products"); }}>See all products</Button></div>}
          <div className="catalog-bottom"><span>A LITTLE MORE GOOD STUFF</span><span className="catalog-bottom-line" /><span>{String(visibleProducts.length).padStart(2, "0")} / {String(products.length).padStart(2, "0")}</span></div>
        </div>
      </section>

      <section id="about" className="about-section"><div className="about-photo"><img src={heroImage} alt="Everyday technology, thoughtfully selected" width={1600} height={960} loading="lazy" /><span className="photo-label">A LITTLE LESS SCROLLING. A LOT MORE LIVING.</span></div><div className="about-content"><div className="eyebrow eyebrow-light"><span className="eyebrow-rule" /> NOT MORE TECH. THE RIGHT TECH.</div><h2>Make room for<br /><span>better everyday.</span></h2><p>Life’s busy enough. We bring you useful, reliable tech that feels right from the moment you open the box. No endless choosing. Just good finds, picked with care.</p><a className="about-link" href="#products">Find your everyday favorite <ArrowRight /></a><div className="about-stat"><span>GOOD TECH, MADE SIMPLE.</span><span>EST. FOR EVERYDAY <b>↗</b></span></div></div></section>

      <section className="newsletter-section"><div className="newsletter-inner"><div className="newsletter-icon"><Sparkles /></div><div className="newsletter-copy"><span className="eyebrow"><span className="eyebrow-rule" /> A LITTLE NOTE FROM US</span><h2>Good finds. <span>No noise.</span></h2><p>New arrivals, special offers, and everyday inspiration. Straight to your inbox.</p></div><form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); if (email.trim()) setSubscribed(true); }}><div className="newsletter-input-wrap"><Input type="email" required aria-label="Email address" placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} /><Button className="blue-button" type="submit" aria-label="Subscribe to emails">{subscribed ? <><Check /> You’re on the list</> : <>Sign me up <ArrowRight /></>}</Button></div><span className="newsletter-privacy">Just the good stuff. Unsubscribe whenever you like.</span></form></div></section>

      <footer className="store-footer"><div className="footer-main"><div className="footer-brand-column"><a className="brand footer-brand" href="#top"><span className="brand-mark">t<span>.</span></span><span className="brand-name">teckrain</span></a><p>The little upgrades that make<br />everyday life work better.</p><div className="footer-socials"><a href="mailto:hello@teckrain.com" aria-label="Email Teckrain">✉</a><a href="#top" aria-label="Teckrain on Instagram">◎</a><a href="#top" aria-label="Teckrain on Facebook">f</a></div></div><div className="footer-column"><span className="footer-heading">THE GOOD STUFF</span><a href="#products">All products</a><a href="#categories">Audio</a><a href="#categories">Wearables</a><a href="#categories">Everyday tech</a></div><div className="footer-column"><span className="footer-heading">HERE TO HELP</span><a href="mailto:hello@teckrain.com">Get in touch</a><a href="#about">Shipping & returns</a><a href="#about">Frequently asked</a><a href="#about">Our story</a></div><div className="footer-note"><span className="footer-note-line" /><p>GOOD TECH.<br /><span>GOOD EVERY DAY.</span></p><span className="footer-note-coord">MADE FOR REAL LIFE&nbsp; · &nbsp;TECKRAIN</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} TECKRAIN. HERE FOR THE EVERYDAY.</span><span>MADE WITH A LITTLE MORE THOUGHT. <b>BLUE, ALWAYS.</b></span><a href="#top">BACK TO TOP ↑</a></div></footer>

      {cartOpen && <div className="overlay" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}><section className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title"><div className="drawer-header"><div><span className="eyebrow"><span className="eyebrow-rule" /> YOUR GOOD FINDS</span><h2 id="cart-title">Your bag <span>({cartCount})</span></h2></div><Button variant="ghost" size="icon" aria-label="Close shopping bag" onClick={() => setCartOpen(false)}><X /></Button></div>{cartCount === 0 ? <div className="cart-empty"><div className="cart-empty-icon"><ShoppingBag /></div><h3>Your bag’s taking a breather.</h3><p>Find something good for your everyday.</p><Button className="blue-button" onClick={() => { setCartOpen(false); scrollToProducts(); }}>Explore products <ArrowRight /></Button></div> : <div className="cart-summary"><div className="cart-added"><div className="cart-added-icon"><Check /></div><div><strong>Good choice.</strong><p>{cartCount} {cartCount === 1 ? "item" : "items"} ready for your everyday.</p></div></div><div className="cart-line"><span>Items in your bag</span><span>{cartCount}</span></div><Button variant="outline" className="cart-reset" onClick={() => setCartCount(0)}><Minus /> Remove all items</Button><Button className="blue-button continue-shopping" onClick={() => setCartOpen(false)}>Keep exploring <ArrowRight /></Button></div>}<div className="drawer-footer"><span><Check /> EASY, FREE SHIPPING OVER $75</span><span>NEED A HAND? <a href="mailto:hello@teckrain.com">WE’RE HERE</a></span></div></section></div>}
    </main>
  );
}