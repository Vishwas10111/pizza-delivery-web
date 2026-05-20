import React from 'react'

function Subheader({title}) {
    return (
        <>
            <div className="subheader dark-overlay dark-overlay-2" style={{ backgroundImage: 'url("/slices/assets/img/subheader.jpg")' }}>
                <div className="container">
                    <div className="subheader-inner">
                        <h1>{title}</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#">Slices Pizzeria &gt;</a></li>
                                <li className="breadcrumb-item"><a href="#">{title}</a></li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Subheader