import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import { getMenu } from '../../utils/api'
import PizzaCard from '../../components/PizzaCard'

function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    getMenu()
      .then((res) => setFeatured(res.data.slice(0, 3)))
      .catch((e) => console.warn('Could not load featured items:', e.message))
  }, [])

  return (
    <>
      <Header />

      {/* Banner */}
      <div className="banner banner-1 banner-4 light-banner">
        <div className="banner-item">
          <div
            className="banner-inner bg-cover bg-center dark-overlay dark-overlay-2"
            style={{ backgroundImage: 'url("/slices/assets/img/banner/7.jpg")' }}
          >
            <div className="container">
              <img src="/slices/assets/img/misc/1.png" alt="img" />
              <h1 className="title">Modernizing The Traditional Italian Pizza</h1>
              <p className="subtitle">
                Indulge in the authentic flavors of Italy with our delicious pizzas, crafted with the
                finest ingredients and traditional recipes. Buon appetito!
              </p>
              <Link to="/menu" className="btn-custom primary">View Menu</Link>
            </div>
            <div className="banner-bottom-img">
              <img src="/slices/assets/img/veg/2.png" alt="veg" />
              <img src="/slices/assets/img/prods/3.png" alt="pizza" />
              <img src="/slices/assets/img/veg/12.png" alt="veg" />
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-lg-30 ct-single-img-wrapper">
              <img src="/slices/assets/img/about.jpg" alt="img" />
              <div className="ct-dots" />
            </div>
            <div className="col-lg-6">
              <div className="section-title-wrap mr-lg-30">
                <h5 className="custom-primary">Sir Slice's Heritage</h5>
                <h2 className="title">Serving Pizzas By The Slice Since 1987</h2>
                <p className="subtitle">
                  Our pizza site is your one-stop destination for all things pizza-related. From
                  mouthwatering recipes and cooking tips to reviews of the best pizza joints, we've
                  got you covered.
                </p>
                <div className="signature">
                  <img src="/slices/assets/img/signature.png" alt="signature" />
                </div>
                <Link to="/menu" className="btn-custom">Check our Menu</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured from DB */}
      {featured.length > 0 && (
        <div className="section section-padding pt-0">
          <div className="container">
            <div className="section-title-wrap section-header text-center">
              <h5 className="custom-primary">Fresh From Our Kitchen</h5>
              <h2 className="title">Featured Pizzas</h2>
              <p className="subtitle">Our most popular picks — crafted fresh daily.</p>
            </div>
            <div className="row">
              {featured.map((pizza) => (
                <PizzaCard
                  key={pizza._id}
                  id={pizza._id}
                  title={pizza.title}
                  description={pizza.description}
                  price={pizza.price}
                  url={pizza.url}
                />
              ))}
            </div>
            <div className="text-center mt-4">
              <Link to="/menu" className="btn-custom primary">See Full Menu</Link>
            </div>
          </div>
        </div>
      )}

      {/* Mini Menu */}
      <div className="section section-padding pt-0">
        <div className="container">
          <div className="section-title-wrap section-header text-center">
            <h5 className="custom-primary">Pizza Menu</h5>
            <h2 className="title">Explore Our Menu</h2>
            <p className="subtitle">Handcrafted with love, using only the freshest ingredients.</p>
          </div>
          <div className="row">
            {[
              { name: 'Pepperoni Pizza', price: '12.00', desc: 'Classic simplicity — tomato, mozzarella, premium pepperoni.' },
              { name: 'Four Cheese', price: '14.00', desc: 'A rich blend of four premium cheeses on garlic butter.' },
              { name: 'Vegetarian', price: '20.00', desc: 'Loaded with fresh veggies — bell peppers, olives, mushrooms.' },
              { name: 'Barbeque Chicken', price: '16.00', desc: 'Smoky BBQ chicken with red onions and mozzarella.' },
              { name: 'Swiss Mushroom', price: '18.00', desc: 'Earthy mushrooms with Swiss cheese and caramelised onions.' },
              { name: 'Hawaiian', price: '13.00', desc: 'Sweet pineapple and ham — the perfect sweet-salty combo.' },
            ].map((item) => (
              <div className="col-lg-6" key={item.name}>
                <div className="ct-mini-menu-item">
                  <div className="ct-mini-menu-top">
                    <h5>{item.name}</h5>
                    <div className="ct-mini-menu-dots" />
                    <span className="custom-primary">${item.price}</span>
                  </div>
                  <div className="ct-mini-menu-bottom">
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="section pt-0">
        <div className="gallery-section">
          <div className="row no-gutters">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="col-xl-6 col-lg-3 col-md-3 col-6 p-0">
                <a href={`/slices/assets/img/ig/${n}.jpg`} className="gallery-thumb">
                  <img src={`/slices/assets/img/ig/${n}.jpg`} alt="gallery" />
                </a>
              </div>
            ))}
          </div>
          <div
            className="gallery-bg bg-parallax dark-overlay dark-overlay-2 bg-cover"
            style={{ backgroundImage: 'url("/slices/assets/img/subheader.jpg")' }}
          >
            <div className="section-title-wrap text-center">
              <h5 className="custom-primary">A Community</h5>
              <h2 className="title text-white">Stories of Passion</h2>
              <p className="subtitle text-white">From a small storefront to a bustling pizzeria.</p>
              <Link to="/about" className="btn-custom shadow-none">Read Our Story</Link>
            </div>
          </div>
          <div className="row no-gutters">
            {[5, 6, 7, 8].map((n) => (
              <div key={n} className="col-xl-6 col-lg-3 col-md-3 col-6 p-0">
                <a href={`/slices/assets/img/ig/${n}.jpg`} className="gallery-thumb">
                  <img src={`/slices/assets/img/ig/${n}.jpg`} alt="gallery" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Home
