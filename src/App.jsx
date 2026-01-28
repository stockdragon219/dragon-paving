import React, { useMemo, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink as RRNavLink, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, CheckCircle2, Hammer, Shield, Layers, ArrowRight, Star, Flame } from "lucide-react";

const BRAND = {
  name: "Dragon Paving",
  phoneDisplay: "337-3DRAGON",
  phoneTel: "3373724666",
  email: "support@dragonpaving.com",
  primaryCta: "Get a Free Estimate",
  secondaryCta: "Call Now",
};

function cx(...xs) { return xs.filter(Boolean).join(" "); }

function PhoneHighlight({ children }) {
  return <span className="text-orange-500 font-semibold">{children}</span>;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

function DragonLogo({ className = "", compact = false }) {
  return (
    <div className={cx("flex items-center", className)}>
      <img
        src="/logo.png"
        alt="Dragon Paving"
        className={cx(
          "select-none",
          compact ? "h-10 w-auto" : "h-12 w-auto"
        )}
      />
    </div>
  );
}

function Pill({ children, tone = "neutral" }) {
  const styles = {
    neutral: "border-white/15 bg-white/10 text-white/90",
    ember: "border-orange-200/40 bg-orange-50 text-orange-900",
  };
  return (
    <span className={cx("inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium shadow-sm backdrop-blur", styles[tone] || styles.neutral)}>
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title, sub }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? <div className="mb-2 flex justify-center"><Pill tone="ember">{eyebrow}</Pill></div> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      {sub ? <p className="mt-3 text-base text-slate-600">{sub}</p> : null}
    </div>
  );
}

function TopNavLink({ to, children }) {
  return (
    <RRNavLink
      to={to}
      className={({ isActive }) =>
        cx(
          "rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-orange-200",
          isActive ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
        )
      }
    >
      {children}
    </RRNavLink>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="text-2xl font-semibold tracking-tight text-slate-950">{value}</div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, points, to }) {
  const card = (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className={cx("rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur", to ? "hover:border-slate-300" : "")}
    >
      <div className="flex items-start gap-4">
        {Icon ? (
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-orange-50 to-rose-50 p-3 shadow-sm">
            <Icon className="h-6 w-6 text-rose-700" />
          </div>
        ) : null}
        <div className="flex-1">
          <h3 className="text-lg font-semibold tracking-tight text-slate-950">{title}</h3>
          <ul className="mt-3 space-y-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-orange-600" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {to ? (
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
              View details <ArrowRight className="h-4 w-4" />
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );

  return to ? (
    <Link to={to} className="block rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-200">
      {card}
    </Link>
  ) : (
    card
  );
}

function Testimonial({ name, text, stars = 5 }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
      <div className="flex items-center gap-1 text-orange-600">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} className="h-4 w-4" />
        ))}
      </div>
      <p className="mt-3 text-sm text-slate-700">“{text}”</p>
      <div className="mt-4 text-sm font-medium text-slate-950">— {name}</div>
    </div>
  );
}

function ContactField({ label, value, icon: Icon, href }) {
  const content = (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-orange-50 to-rose-50 p-2 shadow-sm">
        <Icon className="h-5 w-5 text-rose-700" />
      </div>
      <div>
        <div className="text-sm font-medium text-slate-950">{label}</div>
        <div className="text-sm text-slate-600">{value}</div>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-200">
      {content}
    </a>
  ) : (
    content
  );
}

function Shell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute left-[-120px] top-[120px] h-[420px] w-[420px] rounded-full bg-orange-400/15 blur-3xl" />
        <div className="absolute right-[-120px] top-[40px] h-[420px] w-[420px] rounded-full bg-rose-500/15 blur-3xl" />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200">
            <div className="flex items-center gap-3">
              <DragonLogo compact className="text-white" />
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-white">{BRAND.name}</div>
                <div className="text-xs text-white/70">Commercial paving you can trust</div>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <TopNavLink to="/">Home</TopNavLink>
            <TopNavLink to="/services">Services</TopNavLink>
            <TopNavLink to="/contact">Contact</TopNavLink>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a href={`tel:${BRAND.phoneTel}`} className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-white/15">
              <Phone className="h-4 w-4" />
              <PhoneHighlight>{BRAND.phoneDisplay}</PhoneHighlight>
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95">
              {BRAND.primaryCta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            className="inline-flex items-center rounded-xl border border-white/15 bg-white/10 p-2 text-white shadow-sm md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <div className="h-0.5 w-6 bg-white" />
              <div className="h-0.5 w-6 bg-white" />
              <div className="h-0.5 w-6 bg-white" />
            </div>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-slate-950 md:hidden">
            <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
              <div className="grid gap-1">
                {[["Home", "/"], ["Services", "/services"], ["Contact", "/contact"]].map(([label, to]) => (
                  <Link key={to} to={to} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10">
                    {label}
                  </Link>
                ))}
                <div className="mt-2 grid gap-2">
                  <a href={`tel:${BRAND.phoneTel}`} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm">
                    <Phone className="h-4 w-4" /> {BRAND.secondaryCta}
                  </a>
                  <Link to="/contact" onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm">
                    {BRAND.primaryCta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {children}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <DragonLogo className="text-slate-950" compact={false} />
            <div className="flex flex-wrap gap-2">
              <a href={`tel:${BRAND.phoneTel}`} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-50">
                <Phone className="h-4 w-4" /> <PhoneHighlight>{BRAND.phoneDisplay}</PhoneHighlight>
              </a>
              <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-50">
                <Mail className="h-4 w-4" /> {BRAND.email}
              </a>
            </div>
          </div>
          <div className="mt-6 text-xs text-slate-500">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ services }) {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="flex flex-wrap gap-2">
              <Pill>Licensed & insured*</Pill>
              <Pill>Free estimates</Pill>
              <Pill>Commercial</Pill>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
            >
              Professional Commercial Asphalt Paving Services
            </motion.h1>
            <p className="mt-4 text-base text-white/75 sm:text-lg">
              {BRAND.name} delivers clean edges, solid prep, and durable finishes for parking lots, industrial yards, and commercial surfaces.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95">
                {BRAND.primaryCta} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:${BRAND.phoneTel}`} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-white/15">
                <Phone className="h-4 w-4" /> <PhoneHighlight>{BRAND.phoneDisplay}</PhoneHighlight>
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Stat label="Response time" value="Same-day*" />
              <Stat label="Warranty options" value="Available" />
              <Stat label="On-site standards" value="Quality Management" />
            </div>

            <p className="mt-3 text-xs text-white/50">*Replace with your real licensing/insurance and response-time details.</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-sm backdrop-blur">
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <Pill>Estimates • Scheduling • Service</Pill>
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-white">
                    <Flame className="h-4 w-4 text-orange-400" /> Dragon Crew
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {["Asphalt paving", "Sealcoating & maintenance", "Asphalt milling", "Concrete services", "Site excavation & grading"].map((t) => (
                    <div key={t} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white shadow-sm">
                      <div className="text-sm font-semibold">{t}</div>
                      <CheckCircle2 className="h-5 w-5 text-orange-300" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-5 text-white shadow-sm">
                  <div className="text-sm text-white/80">Need a quote fast?</div>
                  <div className="mt-1 text-xl font-semibold">Call <PhoneHighlight>{BRAND.phoneDisplay}</PhoneHighlight></div>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <a href={`tel:${BRAND.phoneTel}`} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm">
                      <Phone className="h-4 w-4" /> {BRAND.secondaryCta}
                    </a>
                    <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-4 py-2 text-sm font-semibold text-white">
                      Request estimate <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-orange-400/15 blur-2xl" />
            <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-rose-500/15 blur-2xl" />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20">
        <SectionTitle eyebrow="Our services" title="Commercial paving & site services" />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {services.map((s) => (
            <ServiceCard key={s.slug} icon={s.cardIcon} title={s.title} points={s.points} to={`/services/${s.slug}`} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-20">
        <SectionTitle eyebrow="Customer feedback" title="Work that earns repeat business" sub="Replace these with real reviews (Google, Facebook, etc.)." />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Testimonial name="Local Business Owner" text="Quick turnaround, great communication, and the lot looks brand new." />
          <Testimonial name="Facility Manager" text="Great communication and a smooth process. The lot came out clean with crisp edges." />
          <Testimonial name="Property Manager" text="They handled milling and repave efficiently and kept our site accessible." />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20">
        <SectionTitle eyebrow="Get in touch" title="Request a free estimate" sub="Tell us a bit about your project and we’ll follow up." />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="grid gap-3">
            <ContactField label="Phone" value={<PhoneHighlight>{BRAND.phoneDisplay}</PhoneHighlight>} icon={Phone} href={`tel:${BRAND.phoneTel}`} />
            <ContactField label="Email" value={BRAND.email} icon={Mail} href={`mailto:${BRAND.email}`} />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
            <div className="text-lg font-semibold tracking-tight text-slate-950">Prefer a quick call?</div>
            <p className="mt-2 text-sm text-slate-600">Call us and we’ll get you scheduled for a site visit.</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <a href={`tel:${BRAND.phoneTel}`} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95">
                <Phone className="h-4 w-4" /> Call <PhoneHighlight>{BRAND.phoneDisplay}</PhoneHighlight>
              </a>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-50">
                Contact page <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServicesOverviewPage({ services }) {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <SectionTitle eyebrow="Services" title="Commercial asphalt, concrete & sitework" sub="Click a service for details, typical scopes, and what to expect on-site." />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {services.map((s) => (
            <ServiceCard key={s.slug} icon={s.cardIcon} title={s.title} points={s.points} to={`/services/${s.slug}`} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ServiceDetailPage({ services }) {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur">
          <div className="text-2xl font-semibold tracking-tight text-slate-950">Service not found</div>
          <p className="mt-2 text-sm text-slate-600">Go back to Services to pick a service page.</p>
          <div className="mt-4">
            <Link to="/services" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-sm">
              View Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Pill tone="ember">Service</Pill>
            <Link to="/services" className="text-sm font-semibold text-slate-950 hover:opacity-80">← Back to Services</Link>
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{service.title}</h1>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">{service.longIntro}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
              <div className="text-lg font-semibold tracking-tight text-slate-950">Typical scope</div>
              <ul className="mt-3 space-y-2">
                {service.scope.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-orange-600" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
              <div className="text-lg font-semibold tracking-tight text-slate-950">What we look for on site</div>
              <ul className="mt-3 space-y-2">
                {service.checklist.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-orange-600" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="text-xl font-semibold tracking-tight text-slate-950">Get pricing for {service.title}</div>
                <p className="mt-2 text-sm text-slate-600">Share your location, approximate size, and timeline. We’ll schedule a site visit and provide a clear quote.</p>
              </div>
              <div className="flex flex-col gap-2">
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95">
                  {BRAND.primaryCta} <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={`tel:${BRAND.phoneTel}`} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-50">
                  <Phone className="h-4 w-4" /> Call <PhoneHighlight>{BRAND.phoneDisplay}</PhoneHighlight>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat label="Commercial focus" value="Yes" />
            <Stat label="Quality" value="Management" />
            <Stat label="Estimates" value="Free" />
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <SectionTitle eyebrow="Get in touch" title="Request a free estimate" sub="Tell us a bit about your project and we’ll follow up." />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="grid gap-3">
            <ContactField label="Phone" value={<PhoneHighlight>{BRAND.phoneDisplay}</PhoneHighlight>} icon={Phone} href={`tel:${BRAND.phoneTel}`} />
            <ContactField label="Email" value={BRAND.email} icon={Mail} href={`mailto:${BRAND.email}`} />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
            {submitted ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-xl font-semibold tracking-tight text-slate-950">Thanks! We got your request.</div>
                <p className="mt-2 text-sm text-slate-600">This demo form doesn’t email yet. Connect it to Formspree / Netlify Forms when you’re ready.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1">
                    <span className="text-sm font-medium text-slate-900">Name</span>
                    <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="Your name" required />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm font-medium text-slate-900">Phone</span>
                    <input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder={BRAND.phoneDisplay} />
                  </label>
                </div>

                <label className="grid gap-1">
                  <span className="text-sm font-medium text-slate-900">Email</span>
                  <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder={BRAND.email} required />
                </label>

                <label className="grid gap-1">
                  <span className="text-sm font-medium text-slate-900">Project details</span>
                  <textarea value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} className="min-h-[140px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200" placeholder="Example: 4,000 sq ft parking lot needs milling + overlay. Looking to schedule in March." required />
                </label>

                <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95">
                  Submit request <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-xs text-slate-500">By submitting, you agree to be contacted about your request.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const services = useMemo(
    () => [
      {
        slug: "asphalt-paving",
        title: "Asphalt Paving",
        cardIcon: Layers,
        points: ["Parking lots, private roads, and access lanes", "New installs, overlays, patching", "Proper base prep for long life"],
        longIntro: "From new construction to overlays and repairs, our asphalt paving focuses on solid prep, clean edges, and smooth finishes built for commercial traffic.",
        scope: ["Site measurement + layout", "Base evaluation and recommendations", "Patching, overlays, or full replacement", "Final roll + edge work"],
        checklist: ["Base condition and soft spots", "Drainage and slope for runoff", "Thickness requirements for traffic", "Access and staging for equipment"],
      },
      {
        slug: "asphalt-milling",
        title: "Asphalt Milling",
        cardIcon: Layers,
        points: ["Remove damaged asphalt layers cleanly", "Correct elevations and improve drainage", "Ideal preparation for overlays and repaving"],
        longIntro: "Milling removes failed asphalt and can correct grades before repaving. It’s a cost-effective way to prep commercial lots and improve drainage.",
        scope: ["Milling to specified depth", "Haul-off or reuse (as specified)", "Grade checks", "Prep for overlay/repave"],
        checklist: ["Target depth and transitions", "Drainage corrections needed", "Tie-ins at sidewalks/curbs", "Access and traffic control plan"],
      },
      {
        slug: "concrete",
        title: "Concrete Services",
        cardIcon: Hammer,
        points: ["Foundations, footings, and curbing", "Sidewalks and pads", "Professional forming, finishing, and cleanup"],
        longIntro: "Concrete work that supports commercial sites—foundations, footings, curbing, pads, and sidewalks with clean forming and durable finishes.",
        scope: ["Forming + reinforcement (as needed)", "Pour + finishing", "Curing guidance", "Cleanup + final walkthrough"],
        checklist: ["Subgrade prep and compaction", "Rebar/dowel needs", "Joints and layout", "Cure time and access limits"],
      },
      {
        slug: "sealcoating-maintenance",
        title: "Sealcoating & Maintenance",
        cardIcon: Shield,
        points: ["Sealcoating to extend asphalt life", "Crack filling and surface protection", "Ongoing maintenance programs"],
        longIntro: "Sealcoating and maintenance services protect asphalt from water, sun, and traffic wear while improving appearance and extending pavement life.",
        scope: ["Surface cleaning and preparation", "Crack filling as needed", "Sealcoat application", "Cure time coordination"],
        checklist: ["Surface condition", "Weather window", "Traffic control", "Cure timing"],
      },
      {
        slug: "site-excavation-grading",
        title: "Site Excavation & Grading",
        cardIcon: Hammer,
        points: ["Site clearing and earthwork", "Rough and fine grading", "Pad prep for asphalt and concrete"],
        longIntro: "Professional site excavation and grading to prepare commercial properties for paving and concrete. Accurate elevations, drainage control, and stable subgrades.",
        scope: ["Clearing and stripping", "Cut and fill operations", "Rough and fine grading", "Compaction and proof rolling"],
        checklist: ["Soil conditions", "Drainage paths and elevations", "Access for equipment", "Coordination with paving and concrete"],
      },
    ],
    []
  );

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Shell>
        <Routes>
          <Route path="/" element={<HomePage services={services} />} />
          <Route path="/services" element={<ServicesOverviewPage services={services} />} />
          <Route path="/services/:slug" element={<ServiceDetailPage services={services} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage services={services} />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}
