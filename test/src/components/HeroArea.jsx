import Navigation from "./Navigation.jsx";

export default function HeroArea() {
    return (
        <>
            <div className="hero_area">
                {/* header section strats */}
                <Navigation />
                {/* end header section */}
                {/* slider section */}
                <section className="slider_section ">
                    <div className="carousel_btn-container">
                        <a
                            className="carousel-control-prev"
                            href="#carouselExampleIndicators"
                            role="button"
                            data-slide="prev"
                        >
                            <span className="sr-only">Previous</span>
                        </a>
                        <a
                            className="carousel-control-next"
                            href="#carouselExampleIndicators"
                            role="button"
                            data-slide="next"
                        >
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    <div
                        id="carouselExampleIndicators"
                        className="carousel slide"
                        data-ride="carousel"
                    >
                        <ol className="carousel-indicators">
                            <li
                                data-target="#carouselExampleIndicators"
                                data-slide-to={0}
                                className="active"
                            >
                                01
                            </li>
                            <li data-target="#carouselExampleIndicators" data-slide-to={1}>
                                02
                            </li>
                            <li data-target="#carouselExampleIndicators" data-slide-to={2}>
                                03
                            </li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-5 offset-md-1">
                                            <div className="detail-box">
                                                <h1>
                                                    You Can <br />
                                                    Hire Freelancer <br />
                                                    Here
                                                </h1>
                                                <p>
                                                    It is a long established fact that a reader will be
                                                    distracted by the readable content of a page
                                                </p>
                                                <div className="btn-box">
                                                    <a href="" className="btn-1">
                                                        About Us
                                                    </a>
                                                    <a href="" className="btn-2">
                                                        Get A Quote
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="offset-md-1 col-md-4 img-container">
                                            <div className="img-box">
                                                <img src="images/slider-img.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item ">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-5 offset-md-1">
                                            <div className="detail-box">
                                                <h1>
                                                    You Can <br />
                                                    Hire Freelancer <br />
                                                    Here
                                                </h1>
                                                <p>
                                                    It is a long established fact that a reader will be
                                                    distracted by the readable content of a page
                                                </p>
                                                <div className="btn-box">
                                                    <a href="" className="btn-1">
                                                        About Us
                                                    </a>
                                                    <a href="" className="btn-2">
                                                        Get A Quote
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="offset-md-1 col-md-4 img-container">
                                            <div className="img-box">
                                                <img src="images/slider-img.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item ">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-5 offset-md-1">
                                            <div className="detail-box">
                                                <h1>
                                                    You Can <br />
                                                    Hire Freelancer <br />
                                                    Here
                                                </h1>
                                                <p>
                                                    It is a long established fact that a reader will be
                                                    distracted by the readable content of a page
                                                </p>
                                                <div className="btn-box">
                                                    <a href="" className="btn-1">
                                                        About Us
                                                    </a>
                                                    <a href="" className="btn-2">
                                                        Get A Quote
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="offset-md-1 col-md-4 img-container">
                                            <div className="img-box">
                                                <img src="images/slider-img.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* end slider section */}
            </div>
        </>
    )

}