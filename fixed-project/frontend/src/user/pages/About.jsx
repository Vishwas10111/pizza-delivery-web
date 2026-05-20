import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Subheader from '../../components/Subheader'
import NewsLetter from '../../components/NewsLetter'


function About() {
    return (
        <>
            <Header />
            <Subheader title="About"/>

            <div className="section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-lg-30 ct-single-img-wrapper">
                            <img src="/slices/assets/img/auth.jpg" alt="img" />
                            <div className="ct-dots" />
                        </div>
                        <div className="col-lg-6">
                            <div className="section-title-wrap mr-lg-30">
                                <h5 className="custom-primary">About Us</h5>
                                <h2 className="title">Serving Pizzas By The Slice Since 1987</h2>
                                <p className="subtitle">
                                    
Our pizza site is your one-stop destination for all things pizza-related. From mouthwatering recipes and cooking tips to reviews of the best pizza joints, we've got you covered. Whether you're a pizza aficionado or just looking for a slice of inspiration, our site is the ultimate resource for pizza lovers everywhere. Dive in and discover the delicious world of pizza with us!
                                </p>
                               
                                <div className="signature">
                                    <img src="/slices/assets/img/signature.png" alt="signature" />
                                </div>
                                <a href="menu-v1.html" className="btn-custom">Check our Menu</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
            <div className="section section-padding bg-cover bg-center bg-parallax dark-overlay dark-overlay-2" style={{ backgroundImage: 'url("assets/img/subheader-2.jpg")' }}>
                <div className="container">
                    <div className="section-title-wrap section-header text-center">
                        <h2 className="title text-white">Our success Story</h2>
                        <p className="subtitle text-white">
                        From humble beginnings to a thriving pizza empire, our passion for quality and taste has made us a beloved community favorite.
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="ct-infographic-item">
                                <i className="flaticon-employee" />
                                <h4>24,934</h4>
                                <p>Happy Customers</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="ct-infographic-item">
                                <i className="flaticon-pizza-slice" />
                                <h4>65,317</h4>
                                <p>Pizzas Made</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="ct-infographic-item">
                                <i className="flaticon-cheese" />
                                <h4>4,658</h4>
                                <p>Cheese Rolls</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="ct-infographic-item">
                                <i className="flaticon-soda" />
                                <h4>67,335</h4>
                                <p>Drinks Served</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Infographics End */}
            {/* Team members Start */}
            <div className="section section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-lg-30">
                            <div className="section-title-wrap">
                                <h5 className="custom-primary">Our Backbone</h5>
                                <h2 className="title">Meet The Team</h2>
                                <p className="subtitle">
                                Meet our dynamic team, united by a shared love for crafting exceptional pizzas. From our skilled chefs who meticulously perfect each recipe to our friendly staff who deliver top-notch service with a smile, we're dedicated to providing you with an unforgettable dining experience. Get to know the faces behind your favorite pizzas and join us on our culinary journey
                                </p>
                               
                            </div>
                            <a href="#" className="btn-custom">View All</a>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-6 col-sm-6">
                                    <div className="ct-team-item">
                                        <div className="ct-team-thumb">
                                            <img src="/slices/assets/img/team/1.jpg" alt="team" />
                                        </div>
                                        <div className="ct-team-desc">
                                            <h5>Miranda Blue</h5>
                                            <span>Executive Chef</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6">
                                    <div className="ct-team-item">
                                        <div className="ct-team-thumb">
                                            <img src="/slices/assets/img/team/2.jpg" alt="team" />
                                        </div>
                                        <div className="ct-team-desc">
                                            <h5>Jonathan Flock</h5>
                                            <span>Assistant Chef</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6">
                                    <div className="ct-team-item">
                                        <div className="ct-team-thumb">
                                            <img src="/slices/assets/img/team/3.jpg" alt="team" />
                                        </div>
                                        <div className="ct-team-desc">
                                            <h5>Mich Jean</h5>
                                            <span>Assistant Chef</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6">
                                    <div className="ct-team-item">
                                        <div className="ct-team-thumb">
                                            <img src="/slices/assets/img/team/4.jpg" alt="team" />
                                        </div>
                                        <div className="ct-team-desc">
                                            <h5>Andrew Lumber</h5>
                                            <span>Assistant Chef</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
           
            <NewsLetter />
            <Footer />

        </>
    )
}

export default About