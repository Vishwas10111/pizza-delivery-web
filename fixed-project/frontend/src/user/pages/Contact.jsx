import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { error, success } from '../../utils/messages'
import API from '../../utils/api'

function Contact() {
    let [fnm, setFnm] = useState("")
    let [lnm, setLnm] = useState("")
    let [email, setEmail] = useState("")
    let [subject, setSubject] = useState("")
    let [msg, setMsg] = useState("")
    let [loading, setLoading] = useState(false)

    async function send(e) {
        e.preventDefault()
        if (fnm == "" || lnm == "" || email == "" || subject == "" || msg == "") {
            error("All Fields Are Required")
            return
        }
        setLoading(true)
        try {
            await API.post('/contact', { fnm, lnm, email, subject, msg })
            success("Thank you for contacting us! We'll get back to you soon.")
        } catch (err) {
            error(err.response?.data?.message || "Failed to send message. Please try again.")
        } finally {
            setLoading(false)
        }
        setFnm(""); setLnm(""); setEmail(""); setSubject(""); setMsg("")
    }

    return (
        <>
            <Header />
            <div className="contact-wrapper">
                <div className="ct-contact-map-wrapper">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.814196677264!2d72.9217625756034!3d22.548631933847805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4f9b4f29c001%3A0x6f36f98b301bc841!2sUltron%20Technologies!5e0!3m2!1sen!2sin!4v1712319263009!5m2!1sen!2sin" width="100%" height="900" loading="lazy" title="Map" />
                </div>
                <div>
                    <div className="section section-padding">
                        <div className="container">
                            <div className="contact-info">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="ct-info-box">
                                            <i className="flaticon-location" />
                                            <h5>Find Us</h5>
                                            <span>S202 Radhaswami Swamipia</span>
                                            <span>Opp. Home Science College</span>
                                            <span>+91 79904 56948</span>
                                            <span>support@slicespizzeria.com</span>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="ct-info-box">
                                            <i className="flaticon-online-booking" />
                                            <h5>Opening Hours</h5>
                                            <span><span>Mon - Wed:</span> 8:00am - 8:00pm</span>
                                            <span><span>Thu:</span> 8:00am - 5:00pm</span>
                                            <span><span>Fri:</span> 8:00am - 8:00pm</span>
                                            <span><span>Sat - Sun:</span> 8:00am - 2:00pm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section pt-0">
                        <div className="container">
                            <div className="section-title-wrap">
                                <h2 className="title">Send us a Message</h2>
                                <p className="subtitle">Send us a message if you have any questions, feedback, or inquiries. We're here to assist you promptly.</p>
                            </div>
                            <form onSubmit={send}>
                                <div className="row">
                                    <div className="form-group col-lg-6">
                                        <input value={fnm} onChange={e => setFnm(e.target.value)} type="text" placeholder="First Name" className="form-control" />
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <input value={lnm} onChange={e => setLnm(e.target.value)} type="text" placeholder="Last Name" className="form-control" />
                                    </div>
                                    <div className="form-group col-lg-12">
                                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email Address" className="form-control" />
                                    </div>
                                    <div className="form-group col-lg-12">
                                        <input value={subject} onChange={e => setSubject(e.target.value)} type="text" placeholder="Subject" className="form-control" />
                                    </div>
                                    <div className="form-group col-lg-12">
                                        <textarea value={msg} onChange={e => setMsg(e.target.value)} className="form-control" placeholder="Type your message" rows={8} />
                                    </div>
                                </div>
                                <button type="submit" className="btn-custom primary" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact
