import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import AOS from "aos";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./App.css";

/* ================= IMAGE IMPORTS ================= */

import paratha from "./assets/paratha.jpg";
import chaat from "./assets/chaat.jpg";
import kathiRoll from "./assets/kathi-roll.jpg";
import chai from "./assets/masala-chai.jpg";
import spices from "./assets/spices.jpg";
import interior from "./assets/interior.jpg";

import gallery1 from "./assets/gallery1.jpg";
import gallery2 from "./assets/gallery2.jpg";
import gallery3 from "./assets/gallery3.jpg";
import gallery4 from "./assets/gallery4.jpg";
import gallery5 from "./assets/gallery5.jpg";
import gallery6 from "./assets/gallery6.jpg";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true,
});

/* ================= DISHES ================= */

const dishes = [
  {
    name: "Aloo Paratha",
    subtitle: "Golden, buttery & comforting",
    image: paratha,
    price: 99,
    category: "Breakfast",
    desc: "Hand-rolled paratha with spiced potato, curd and pickle.",
  },
  {
    name: "Papdi Chaat",
    subtitle: "Sweet, spicy, crunchy",
    image: chaat,
    price: 89,
    category: "Chaat",
    desc: "Crisp papdi, chilled curd, tamarind, mint and pomegranate.",
  },
  {
    name: "Paneer Kathi Roll",
    subtitle: "Smoky street-style favourite",
    image: kathiRoll,
    price: 149,
    category: "Mains",
    desc: "Charred paneer, pickled onion and green chutney in a flaky roll.",
  },
  {
    name: "Masala Chai",
    subtitle: "A little pause in your day",
    image: chai,
    price: 40,
    category: "Drinks",
    desc: "Assam tea, ginger and cardamom simmered slowly.",
  },
];

/* ================= MENU ================= */

const menuGroups = {
  breakfast: [
    ["Aloo Paratha", 99, "Spiced potato, butter, curd and pickle", "Signature"],
    ["Paneer Paratha", 129, "Grated paneer, coriander and green chilli"],
    ["Gobi Paratha", 109, "Cauliflower, ginger and ajwain"],
    ["Besan Chilla Toast", 89, "Savoury gram flour crêpe on butter toast"],
    ["Poha", 69, "Flattened rice, peanuts, curry leaf and lime"],
    ["Ghee Podi Dosa", 99, "Crisp dosa with podi and ghee"],
  ],

  chaat: [
    ["Papdi Chaat", 89, "Curd, tamarind, mint, pomegranate and sev", "Signature"],
    ["Pani Puri", 59, "Six puris, mint water and sweet chutney"],
    ["Bhel Puri", 69, "Puffed rice, mango, onion and lime"],
    ["Samosa Chaat", 89, "Crushed samosa, chole, curd and chutneys"],
    ["Dahi Puri", 79, "Chilled curd, potato and chutneys"],
    ["Aloo Tikki Chaat", 89, "Crisp patties, chole, onion and sev"],
  ],

  mains: [
    ["Paneer Kathi Roll", 149, "Paneer tikka, pickled onion and green chutney", "Signature"],
    ["Classic Tikki Burger", 129, "Aloo tikki, sesame bun and masala mayo"],
    ["White Sauce Pasta", 169, "Penne, béchamel, corn and bell pepper"],
    ["Red Sauce Arrabbiata", 159, "Tomato, garlic, chilli and basil"],
    ["Chole Bhature", 149, "Two bhature, slow-cooked chole and onion"],
    ["Veg Club Sandwich", 139, "Triple-decker, cheese, coleslaw and fries"],
  ],

  drinks: [
    ["Masala Chai", 40, "Assam leaf, ginger and cardamom", "Signature"],
    ["Filter Coffee", 45, "Chicory blend, frothy and served traditionally"],
    ["Elaichi Cold Coffee", 119, "Cold coffee, milk, cardamom and ice"],
    ["Rose Falooda", 129, "Rose milk, sabja, vermicelli and ice cream"],
    ["Sweet Lassi", 79, "Thick curd and a whisper of saffron"],
    ["Nannari Sherbet", 49, "Nannari syrup, lime and chilled water"],
  ],
};

/* ================= GALLERY ================= */

const gallery = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
];

/* ================= REVIEWS ================= */

const testimonials = [
  [
    "Uday.",
    "The papdi chaat is incredible and the chai feels like home.",
    "★★★★★",
  ],
  [
    "Vicky.",
    "Aloo paratha with that much butter should be illegal. We come every Sunday.",
    "★★★★★",
  ],
  [
    "Bala.",
    "Warm lights, fast service and a filter coffee I keep thinking about.",
    "★★★★★",
  ],
  [
    "Kutta.",
    "A lovely place for friends, food and a relaxed evening.",
    "★★★★★",
  ],
];

/* ================= BENEFITS ================= */

const benefits = [
  [
    "bi-fire",
    "Fresh from the tawa",
    "Made in small batches, right when you order.",
  ],
  [
    "bi-stars",
    "Ingredients we trust",
    "Fresh produce and spice blends prepared every morning.",
  ],
  [
    "bi-cup-hot",
    "A welcoming atmosphere",
    "Comfort food, friendly faces and warm hospitality.",
  ],
  [
    "bi-heart",
    "Made with care",
    "We cook every dish with the joy of sharing.",
  ],
];

/* ================= COMBOS ================= */

const offers = [
  ["Chai & Snack Combo", "Pair masala chai with a fresh snack.", "₹99"],
  ["Weekend Breakfast", "A hearty paratha breakfast with chai.", "₹149"],
  ["Friends Feast", "Share chaat, rolls and refreshing drinks.", "₹399"],
];

/* ================= FAQ ================= */

const faqs = [
  [
    "Do you have vegetarian options?",
    "Yes. Our menu is vegetarian, with fresh options prepared daily.",
  ],
  [
    "Can I reserve a table?",
    "Send us your details in the contact form and our team can follow up to confirm.",
  ],
  [
    "Do you offer takeaway?",
    "Please contact the cafe directly to check takeaway availability.",
  ],
  [
    "Where are you located?",
    "We are listed at Church Street, Bengaluru. Please use the directions link in the contact section.",
  ],
];

/* ================= ANIMATED COUNTER ================= */

function AnimatedCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let animationFrame;
    let startTime = null;
    let hasStarted = false;

    const duration = 2000;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;

            const progress = Math.min(
              (timestamp - startTime) / duration,
              1
            );

            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCount(value * easeOut);

            if (progress < 1) {
              animationFrame = requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };

          animationFrame = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  const formattedCount = Number.isInteger(value)
    ? Math.floor(count).toLocaleString("en-IN")
    : count.toFixed(1);

  return (
    <strong ref={ref} className="counter-number">
      {formattedCount}{suffix}
    </strong>
  );
}

/* ================= APP ================= */

export default function App() {
  const [menuTab, setMenuTab] = useState("breakfast");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);

  const [newsletter, setNewsletter] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);

  /* ================= AOS ================= */

  useEffect(() => {
    AOS.init({
      duration: 850,
      once: false,
      offset: 70,
      easing: "ease-out-cubic",
    });

    AOS.refresh();

    return () => AOS.refreshHard();
  }, []);

  /* ================= NAVBAR SCROLL ================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ================= LENIS + GSAP + IMAGE SCROLL ================= */

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let lenis;
    let raf;

    if (!reduceMotion) {
      lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      raf = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      /* HERO IMAGE SCROLL */

      const slides = gsap.utils.toArray(".hero-slide");
      const slideImgs = gsap.utils.toArray(".hero-slide-img");
      const captions = gsap.utils.toArray(".hero-caption");
      const dots = gsap.utils.toArray(".hero-dot");

      if (slides.length > 1) {
        if (reduceMotion) {
          gsap.set(slides.slice(1), {
            autoAlpha: 0,
          });
        } else {
          gsap.set(slides.slice(1), {
            yPercent: 100,
          });

          gsap.set(slideImgs.slice(1), {
            yPercent: -10,
          });

          gsap.set(captions.slice(1), {
            autoAlpha: 0,
            y: 24,
          });

          const heroTl = gsap.timeline({
            defaults: {
              ease: "none",
            },

            scrollTrigger: {
              trigger: ".hero-section",
              start: "top top",
              end: `+=${(slides.length - 1) * 100}%`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          heroTl.to(
            ".hero-bottom",
            {
              opacity: 0,
              duration: 0.3,
            },
            0
          );

          slides.forEach((_, i) => {
            if (i === 0) return;

            const t = i - 1;

            heroTl
              .to(
                slides[i],
                {
                  yPercent: 0,
                  duration: 1,
                },
                t
              )

              .to(
                slideImgs[i],
                {
                  yPercent: 0,
                  duration: 1,
                },
                t
              )

              .to(
                slideImgs[i - 1],
                {
                  yPercent: 10,
                  duration: 1,
                },
                t
              )

              .to(
                captions[i - 1],
                {
                  autoAlpha: 0,
                  y: -24,
                  duration: 0.35,
                },
                t + 0.1
              )

              .fromTo(
                captions[i],
                {
                  autoAlpha: 0,
                  y: 24,
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.35,
                },
                t + 0.6
              )

              .to(
                dots[i - 1],
                {
                  opacity: 0.35,
                  height: 10,
                  duration: 0.3,
                },
                t + 0.35
              )

              .to(
                dots[i],
                {
                  opacity: 1,
                  height: 34,
                  duration: 0.3,
                },
                t + 0.35
              );
          });

          heroTl.to({}, {
            duration: 0.4,
          });
        }
      }

      /* PARALLAX IMAGES */

      gsap.utils.toArray(".parallax-image").forEach((image) => {
        gsap.fromTo(
          image,
          {
            yPercent: -12,
            scale: 1.15,
          },
          {
            yPercent: 12,
            scale: 1.15,
            ease: "none",

            scrollTrigger: {
              trigger: image.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      /* REVEAL CONTENT */

      gsap.utils.toArray(".reveal-line").forEach((element) => {
        gsap.from(element, {
          y: 35,
          opacity: 0,
          duration: 1,

          scrollTrigger: {
            trigger: element,
            start: "top 88%",
          },
        });
      });

      /* GALLERY IMAGE ANIMATION */

      gsap.utils.toArray(".gallery-tile").forEach((tile, index) => {
        const image = tile.querySelector("img");

        if (image) {
          gsap.fromTo(
            image,
            {
              yPercent: index % 2 === 0 ? -10 : 10,
              scale: 1.15,
            },
            {
              yPercent: index % 2 === 0 ? 10 : -10,
              scale: 1.15,
              ease: "none",

              scrollTrigger: {
                trigger: tile,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        }
      });
    });

    const onRefresh = () => AOS.refresh();
    const onLoad = () => ScrollTrigger.refresh();

    ScrollTrigger.addEventListener("refresh", onRefresh);

    window.addEventListener("load", onLoad);

    ScrollTrigger.refresh();
    AOS.refreshHard();

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);

      window.removeEventListener("load", onLoad);

      ctx.revert();

      if (lenis) {
        gsap.ticker.remove(raf);
        lenis.destroy();
      }
    };
  }, []);

  /* ================= CONTACT FORM ================= */

  const updateForm = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const submitContact = (e) => {
    e.preventDefault();
    setSent(true);
  };

  /* ================= NEWSLETTER ================= */

  const submitNewsletter = (e) => {
    e.preventDefault();

    if (newsletter.trim()) {
      setNewsletterDone(true);
    }
  };

  /* ================= NAVIGATION ================= */

  const closeNav = () => {
    setMobileNav(false);
  };

  /* ================= JSX ================= */

  return (
    <main>

      {/* ================= NAVIGATION ================= */}

      <nav
        className={`tapri-nav navbar navbar-expand-lg ${
          scrolled ? "nav-scrolled" : ""
        }`}
      >
        <div className="container-fluid nav-container">

          <a
            href="#home"
            className="cafe-brand"
            onClick={closeNav}
          >
            2K KIDS <span>CAFE</span>
          </a>

          <div className="mobile-nav-actions">

            <a
              className="nav-book"
              href="#contact"
              onClick={closeNav}
            >
              Find a table
            </a>

            <button
              className="nav-toggle"
              aria-label="Toggle navigation"
              aria-expanded={mobileNav}
              onClick={() => setMobileNav(!mobileNav)}
            >
              <i
                className={`bi ${
                  mobileNav ? "bi-x-lg" : "bi-list"
                }`}
              />
            </button>

          </div>

          <div
            className={`nav-links ${
              mobileNav ? "nav-open" : ""
            }`}
          >
            {[
              "home",
              "about",
              "menu",
              "gallery",
              "reviews",
              "contact",
            ].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={closeNav}
              >
                {id === "home"
                  ? "Home"
                  : id === "about"
                  ? "Our story"
                  : id === "menu"
                  ? "Menu"
                  : id === "gallery"
                  ? "Gallery"
                  : id === "reviews"
                  ? "Reviews"
                  : "Contact"}
              </a>
            ))}
          </div>

        </div>
      </nav>

      {/* ================= HERO ================= */}

      <section className="hero-section" id="home">

        <div className="hero-slides">
          {dishes.map((dish) => (
            <div className="hero-slide" key={dish.name}>
              <img
                className="hero-slide-img"
                src={dish.image}
                alt={dish.name}
              />
            </div>
          ))}
        </div>

        <div className="hero-overlay" />

        <div className="hero-inner container-fluid">
          <div className="hero-copy">

            <h1>
              GOOD FOOD.
              <br />
              <em>GREAT</em> MOOD.
              <br />
              
            </h1>

            <p>
              Your cravings deserve something special! Enjoy delicious
              street food, crispy favourites and refreshing treats.
              Every bite is freshly prepared to make your day better.
            </p>

            <div className="hero-actions">

              <a href="#menu" className="btn-primary-cafe">
                Find Your Favourite
                <i className="bi bi-arrow-right" />
              </a>

              <a href="#about" className="btn-secondary-cafe">
                Discover Our Cafe
                <i className="bi bi-arrow-up-right" />
              </a>

            </div>

            <div className="hero-mini">

              <span>
                <b>100%</b> Fresh & Tasty
              </span>

              <span>
                <b>Made</b> With Passion
              </span>

              <span>
                <b>Every</b> Bite A Smile
              </span>

            </div>

          </div>
        </div>

        {/* DISH CAPTIONS */}

        <div className="hero-captions">
          {dishes.map((dish, i) => (
            <div className="hero-caption" key={dish.name}>

              <b>{dish.name}</b>

              <span>₹{dish.price}</span>

            </div>
          ))}
        </div>

        {/* SLIDER DOTS */}

      </section>

      {/* ================= MARQUEE ================= */}

      <section className="marquee-strip">
        <div className="marquee-track">

          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>
              TASTE THE HAPPINESS <i>✦</i>
              CRUNCHY & DELICIOUS <i>✦</i>
              FRESH FROM OUR KITCHEN <i>✦</i>
              EVERY BITE IS MAGIC <i>✦</i>
              FOOD MADE FOR FUN <i>✦</i>
            </span>
          ))}

        </div>
      </section>

      {/* ================= STATS ================= */}

      <section className="stats-section section-pad">
        <div className="container">

          <div
            className="section-heading text-center"
            data-aos="fade-up"
          >
            <span className="section-kicker">
              OUR LITTLE ACHIEVEMENTS
            </span>

            <h2 className="section-title">
              Numbers full of <em>happiness.</em>
            </h2>

            <p className="section-text">
              Every number tells a story of flavour, freshness and happy moments.
            </p>
          </div>

          <div className="row g-4 mt-3">

            {[
              [15, "+", "Delicious Food Varieties"],
              [5000, "+", "Happy Food Lovers"],
              [28, "+", "Fresh Menu Specials"],
              [4.8, "/5", "Customer Happiness"],
            ].map(([num, suffix, label], i) => (

              <div
                className="col-6 col-lg-3"
                key={label}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >

                <div className="stat-box">

                  <AnimatedCounter
                    value={num}
                    suffix={suffix}
                  />

                  <span>{label}</span>

                </div>

              </div>

            ))}

          </div>
        </div>
      </section>
{/* ================= ABOUT ================= */}

<section className="about-section section-pad" id="about">
  <div className="container">

    <div className="row align-items-center g-5">

      <div className="col-lg-6" data-aos="fade-right">

        <div className="about-photo-wrap">

          <img
            className="parallax-image"
            src={spices}
            alt="Fresh spices and authentic ingredients"
          />

          <div className="photo-caption">
            <i className="bi bi-flower1" />
            FRESH FLAVOURS, HAPPY MOMENTS
          </div>

          <div className="about-circle">
            MADE
            <br />
            WITH
            <br />
            LOVE
          </div>

        </div>

      </div>

      <div className="col-lg-6" data-aos="fade-left">

        <span className="section-kicker">ABOUT OUR CAFE</span>

        <h2 className="section-title reveal-line">
          Good food.
          <br />
          <em>Great little moments.</em>
        </h2>

        <p className="section-text">
          Welcome to 2K Kids Cafe, where delicious food meets a
          cheerful atmosphere. We believe every meal should be
          special, whether you are enjoying a quick snack, sharing
          a meal with friends or spending quality time with family.
        </p>

        <p className="section-text">
          From crispy snacks and flavourful street food to freshly
          prepared favourites, every dish is made with quality
          ingredients, rich flavours and lots of love. Our goal is
          simple — serve tasty food and make every visit memorable.
        </p>

        <a className="text-link" href="#contact">
          Visit Our Cafe 
        </a>

      </div>

    </div>
  </div>
</section>
 {/* ================= VALUES ================= */}

<section className="values-section section-pad">
  <div className="container">

    <div className="section-heading text-center" data-aos="fade-up">

      <span className="section-kicker">WHY CHOOSE US</span>

      <h2 className="section-title">
        More than food, <em>it's happiness</em>
      </h2>

      <p className="section-text">
        Every dish is prepared with care, quality ingredients and a passion
        for bringing people together.
      </p>

    </div>

    <div className="row g-4 mt-3">

      {benefits.map(([icon, title, desc], i) => (
        <div
          className="col-md-6 col-xl-3"
          key={title}
          data-aos="fade-up"
          data-aos-delay={i * 100}
        >

          <div className="value-card">

            <div className="value-icon">
              <i className={`bi ${icon}`} />
            </div>

            <h3>{title}</h3>

            <p>{desc}</p>


          </div>

        </div>
      ))}

    </div>
  </div>
</section>

{/* ================= FEATURED DISHES ================= */}

<section className="featured-section section-pad" id="featured">
  <div className="container">

    {/* SECTION HEADING */}

    <div
      className="section-heading text-center"
      data-aos="fade-up"
    >

      <span className="section-kicker">
        OUR SPECIAL MENU
      </span>

      <h2 className="section-title">
        Freshly made.
        <br />
        <em>Simply delicious.</em>
      </h2>

      <p className="section-text">
        Discover our most loved dishes, prepared fresh and packed
        with delicious flavours for every food lover.
      </p>

    </div>

    {/* DISH CARDS */}

    <div className="row g-4 mt-4">

      {dishes.map((dish, i) => (

        <div
          className="col-sm-6 col-xl-3"
          key={dish.name}
          data-aos="zoom-in-up"
          data-aos-delay={i * 100}
        >

          <article className="dish-card">

            {/* DISH IMAGE */}

            <div className="dish-photo">

              <img
                className="parallax-image"
                src={dish.image}
                alt={dish.name}
              />

              <span className="dish-category">
                {dish.category}
              </span>

              <span className="dish-price">
                ₹{dish.price}
              </span>

            </div>

            {/* DISH CONTENT */}

            <div className="dish-card-content">

              <span className="dish-subtitle">
                {dish.subtitle}
              </span>

              <h3>{dish.name}</h3>

              <p>{dish.desc}</p>

              <a
                href="#menu"
                className="dish-arrow"
              >
                Explore Menu
               
              </a>

            </div>

          </article>

        </div>

      ))}

    </div>

  </div>
</section>

      {/* ================= MENU ================= */}

      <section className="menu-section section-pad" id="menu">
        <div className="container">

          <div className="section-heading text-center" data-aos="fade-up">

            <span className="section-kicker">THE MENU</span>

            <h2 className="section-title">
              Made to be <em>shared.</em>
            </h2>

            <p className="section-text">
              A little something for every appetite.
            </p>

          </div>

          <div className="menu-tabs" data-aos="fade-up">

            {Object.keys(menuGroups).map((tab) => (
              <button
                key={tab}
                className={
                  menuTab === tab
                    ? "menu-tab active"
                    : "menu-tab"
                }
                onClick={() => setMenuTab(tab)}
              >
                {tab}
              </button>
            ))}

          </div>

          <div className="menu-list" key={menuTab}>

            {menuGroups[menuTab].map(
              ([name, price, desc, tag], i) => (

                <article
                  className="menu-item"
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                  key={name}
                >

                  <div>

                    <h3>
                      {name}{" "}
                      {tag && (
                        <span className="menu-tag">
                          {tag}
                        </span>
                      )}
                    </h3>

                    <p>{desc}</p>

                  </div>

                  <strong>₹{price}</strong>

                </article>

              )
            )}

          </div>

          

        </div>
      </section>

    
{/* ================= COMBOS ================= */}

<section className="combo-section section-pad" id="combos">
  <div className="container">

    <div
      className="section-heading text-center"
      data-aos="fade-up"
    >

      <span className="section-kicker">
        SPECIAL FOOD COMBINATIONS
      </span>

      <h2 className="section-title">
        More flavour.
        <em> More happiness.</em>
      </h2>

      <p className="section-text">
        Enjoy your favourite foods together with our delicious
        combo offers. Great taste, satisfying portions and
        something special for everyone.
      </p>

    </div>

    <div className="row g-4 mt-3">

      {offers.map((offer, i) => (
        <div
          className="col-md-4"
          key={offer[0]}
          data-aos="flip-up"
          data-aos-delay={i * 120}
        >

          <div className="combo-card">

            <span className="combo-spark">✦</span>

            <span className="section-kicker">
              SPECIAL COMBO 0{i + 1}
            </span>

            <h3>{offer[0]}</h3>

            <p>{offer[1]}</p>

            <strong>{offer[2]}</strong>

            <a href="#contact">
              Order Your Combo{" "}
              
            </a>

          </div>

        </div>
      ))}

    </div>
  </div>
</section>

{/* ================= ATMOSPHERE ================= */}

<section className="atmosphere-section">

  <div className="atmosphere-image">

    <img
      className="parallax-image"
      src={interior}
      alt="Beautiful and welcoming 2K Kids Cafe interior"
    />

  </div>

  <div
    className="atmosphere-content"
    data-aos="fade-up"
  >

    <span className="section-kicker">
      A PLACE FULL OF HAPPINESS
    </span>

    <h2 className="section-title">
      Great food.
      <br />
      <em>Beautiful memories.</em>
    </h2>

    <p className="section-text">
      Step into a welcoming space filled with delicious aromas,
      friendly smiles and joyful moments. Whether you are here
      for a quick bite or a relaxing meal with your favourite
      people, 2K Kids Cafe is the perfect place to enjoy every moment.
    </p>

    <a href="#contact" className="btn-primary-cafe">
      Visit 2K Kids Cafe
      
    </a>

  </div>

</section>

{/* ================= GALLERY ================= */}

<section className="gallery-section section-pad" id="gallery">
  <div className="container">

    <div
      className="section-heading text-center"
      data-aos="fade-up"
    >

      <span className="section-kicker">
        EXPLORE OUR CAFE
      </span>

      <h2 className="section-title">
        A feast for your eyes.
        <br />
        <em>Moments worth sharing.</em>
      </h2>

      <p className="section-text">
        Take a glimpse into our world of delicious food,
        colourful creations and happy moments at 2K Kids Cafe.
        Every picture has a little story to tell.
      </p>

    </div>

    <div className="gallery-grid">

      {gallery.map((img, i) => (
        <div
          className={`gallery-tile tile-${i + 1}`}
          key={img}
          data-aos="zoom-in"
          data-aos-delay={i * 80}
        >

          <img
            src={img}
            alt={`2K Kids Cafe food and ambience ${i + 1}`}
          />

          <span className="gallery-overlay">
            TASTE THE HAPPINESS
           
          </span>

        </div>
      ))}

    </div>
  </div>
</section>

{/* ================= TESTIMONIALS ================= */}

<section className="reviews-section section-pad" id="reviews">
  <div className="container">

    <div
      className="section-heading text-center"
      data-aos="fade-up"
    >

      <span className="section-kicker">
        CUSTOMER EXPERIENCES
      </span>

      <h2 className="section-title">
        Real smiles.
        <br />
        <em>Real food love.</em>
      </h2>

      <p className="section-text">
        Nothing makes us happier than seeing our guests enjoy
        their favourite food. Here is what they say about
        their experience at 2K Kids Cafe.
      </p>

    </div>

    <div className="row g-4 mt-2">

      {testimonials.map(([name, quote, stars], i) => (
        <div
          className="col-md-6 col-xl-3"
          key={name}
          data-aos="fade-up"
          data-aos-delay={i * 100}
        >

          <div className="review-card">

            <div className="review-stars">
              {stars}
            </div>

            <p>“{quote}”</p>

            <div className="review-person">

              <span className="review-avatar">
                {name[0]}
              </span>

              <b>{name}</b>

              <small>Our Valued Guest</small>

            </div>

          </div>

        </div>
      ))}

    </div>
  </div>
</section>

{/* ================= FAQ ================= */}

<section className="faq-section section-pad" id="faq">
  <div className="container">

    <div className="row g-5">

      <div className="col-lg-5" data-aos="fade-right">

        <span className="section-kicker">
          EVERYTHING YOU NEED TO KNOW
        </span>

        <h2 className="section-title">
          Got questions?
          <br />
          <em>We've got answers.</em>
        </h2>

        <p className="section-text">
          Planning to visit us? Find answers to some common
          questions about our food, menu and cafe experience.
          Need more information? We'd love to hear from you.
        </p>

        <a href="#contact" className="text-link">
          Contact Our Cafe
          
        </a>

      </div>

      <div className="col-lg-7" data-aos="fade-left">

        {faqs.map(([q, a], i) => (

          <div
            className={`faq-row ${
              faqOpen === i ? "faq-active" : ""
            }`}
            key={q}
          >

            <button
              onClick={() =>
                setFaqOpen(faqOpen === i ? -1 : i)
              }
            >

              <span>{q}</span>

              <i
                className={`bi ${
                  faqOpen === i
                    ? "bi-dash"
                    : "bi-plus"
                }`}
              />

            </button>

            {faqOpen === i && <p>{a}</p>}

          </div>

        ))}

      </div>

    </div>
  </div>
</section>

{/* ================= CONTACT ================= */}

<section className="contact-section section-pad" id="contact">
  <div className="container">

    {/* CONTACT HEADER */}

    <div
      className="contact-header text-center"
      data-aos="fade-up"
    >

      <span className="section-kicker">
        WE WOULD LOVE TO HEAR FROM YOU
      </span>

      <h2 className="section-title">
        Let's connect.
        <br />
        <em>Let's share happiness.</em>
      </h2>

      <p className="section-text">
        Have a question about our menu, combo offers or cafe?
        Get in touch with us. We are always happy to welcome
        you and make your visit special.
      </p>

    </div>

    <div className="row g-4 mt-4">

      {/* CONTACT INFORMATION */}

      <div className="col-lg-5" data-aos="fade-right">

        <div className="contact-info">

          {/* LOCATION */}

          <div className="contact-detail">

            <i className="bi bi-geo-alt" />

            <div>
              <span>OUR LOCATION</span>

              <b>
                2K Kids Cafe, Krishnagiri ,Tamil Nadu
              </b>

              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noreferrer"
              >
                Find our location{" "}
               
              </a>
            </div>

          </div>

          {/* PHONE */}

          <div className="contact-detail">

            <i className="bi bi-telephone" />

            <div>
              <span>CALL US</span>

              <b>+91 93425 68375</b>

              <a href="tel:+919342568375">
                Talk to our team
              </a>
            </div>

          </div>

          {/* EMAIL */}

          <div className="contact-detail">

            <i className="bi bi-envelope" />

            <div>
              <span>EMAIL US</span>

              <b>uk556513@gmail.com</b>

              <a href="mailto:uk556513@gmail.com">
                Send us an email
              </a>
            </div>

          </div>

          {/* OPENING HOURS */}

          <div className="contact-detail">

            <i className="bi bi-clock" />

            <div>
              <span>VISIT OUR CAFE</span>

              <b>Monday – Friday · 9 AM – 10 PM</b>
              <b>Saturday · 9 AM – 10 PM</b>
              <b>Sunday · 9 AM – 10 PM</b>

            </div>

          </div>

          {/* GOOGLE MAP */}

          <div className="map-frame">

            <iframe
              title="2K Kids Cafe location map"
              src="https://maps.google.com/maps?q=2K Kids Cafe, Krishnagiri ,Tamil Nadu&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

          </div>

        </div>

      </div>

      {/* CONTACT FORM */}

      <div className="col-lg-7" data-aos="fade-left">

        <div className="contact-form-card">

          {sent ? (

            <div className="contact-success">

              <i className="bi bi-check-circle" />

              <h3>Thank You, {form.name}!</h3>

              <p>
                Thank you for contacting 2K Kids Cafe.
                We appreciate your message and look forward
                to connecting with you.
              </p>

              <button
                onClick={() => {
                  setSent(false);

                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                  });
                }}
              >
                Send Another Message
              </button>

            </div>

          ) : (

            <form onSubmit={submitContact}>

              <div className="form-intro">

                <span className="section-kicker">
                  GET IN TOUCH
                </span>

                <h3>Let's start a conversation.</h3>

                <p>
                  Have something to ask? Send us a message.
                </p>

              </div>

              <div className="row g-3">

                {/* NAME */}

                <div className="col-md-6">

                  <label>Your Name</label>

                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={updateForm("name")}
                    placeholder="Enter your full name"
                  />

                </div>

                {/* EMAIL */}

                <div className="col-md-6">

                  <label>Email Address</label>

                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={updateForm("email")}
                    placeholder="Enter your email"
                  />

                </div>

                {/* PHONE */}

                <div className="col-12">

                  <label>Phone Number</label>

                  <input
                    type="tel"
                    value={form.phone}
                    onChange={updateForm("phone")}
                    placeholder="Enter your mobile number"
                  />

                </div>

                {/* MESSAGE */}

                <div className="col-12">

                  <label>Your Message</label>

                  <textarea
                    rows="5"
                    required
                    value={form.message}
                    onChange={updateForm("message")}
                    placeholder="Write your questions or enquiries here..."
                  />

                </div>

                {/* SUBMIT */}

                <div className="col-12">

                  <button
                    className="btn-primary-cafe form-submit"
                    type="submit"
                  >
                    Send Your Message{" "}
                    <i className="bi bi-arrow-up-right" />
                  </button>

                </div>

              </div>

            </form>

          )}

        </div>

      </div>

    </div>
  </div>
</section>

{/* ================= NEWSLETTER ================= */}

<section className="newsletter-section">
  <div className="container">

    <div className="newsletter-wrap" data-aos="zoom-in">

      <div>

        <span className="section-kicker">
          A LITTLE TASTE OF HAPPINESS
        </span>

        <h2>
          Get the <em>latest bites.</em>
        </h2>

        <p>
          Be the first to discover our new dishes, special combo
          offers, exciting updates and delicious surprises at
          2K Kids Cafe.
        </p>

      </div>

      {newsletterDone ? (

        <p className="newsletter-thanks">
          <i className="bi bi-check-circle" />
          Welcome to the 2K Kids Cafe family!
        </p>

      ) : (

        <form onSubmit={submitNewsletter}>

          <input
            type="email"
            required
            value={newsletter}
            onChange={(e) =>
              setNewsletter(e.target.value)
            }
            placeholder="Enter your email address"
          />

          <button type="submit" aria-label="Subscribe">
            <i className="bi bi-arrow-right" />
          </button>

        </form>

      )}

    </div>
  </div>
</section>

{/* ================= FOOTER ================= */}

<footer className="cafe-footer">
  <div className="container">

    <div className="footer-main">

      {/* BRAND INFORMATION */}

      <div>

        <a href="#home" className="cafe-brand footer-brand">
          2K KIDS <span>CAFE</span>
        </a>

        <p>
          Serving delicious food, refreshing moments and
          unforgettable experiences. Visit 2K Kids Cafe
          and make every meal a happy memory.
        </p>

      </div>

      {/* QUICK LINKS */}

      <div>

        <h4>Quick Links</h4>

        <a href="#home">Home</a>
        <a href="#about">About Us</a>
        <a href="#menu">Our Menu</a>
        <a href="#featured">Special Dishes</a>
        <a href="#gallery">Our Gallery</a>

      </div>

      {/* CUSTOMER SUPPORT */}

      <div>

        <h4>Customer Support</h4>

        <a href="#contact">Contact Us</a>
        <a href="#faq">Frequently Asked Questions</a>
        <a href="#combos">Special Combos</a>
        <a href="#reviews">Customer Reviews</a>
        <a href="#contact">Visit Our Cafe</a>

      </div>

      {/* SOCIAL MEDIA */}

      <div>

        <h4>Follow Our Journey</h4>

        <p>
          Follow us for delicious updates, special offers
          and exciting moments from our cafe.
        </p>

        <div className="social-links">

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <i className="bi bi-instagram" />
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <i className="bi bi-facebook" />
          </a>

          <a
            href="https://www.whatsapp.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <i className="bi bi-whatsapp" />
          </a>

        </div>

      </div>

    </div>

    {/* FOOTER BOTTOM */}

    <div className="footer-bottom">

      <span>
        © {new Date().getFullYear()} 2K KIDS CAFE.
        All Rights Reserved.
      </span>

      <a href="#home">
        Back to Top ↑
      </a>

    </div>

  </div>
</footer>


    </main>
  );
}