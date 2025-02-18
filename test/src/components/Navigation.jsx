export default function Navigation() {
    return (
        <>
            <header className="header_section">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg custom_nav-container">
                        <a className="navbar-brand" href="index.html">
                            <img src="images/logo.png" alt="" />
                            <span>Spering</span>
                        </a>
                        {/* Премахваме бутоните за мобилната версия */}
                        <div className="navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">
                                        Home <span className="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/about">
                                        About
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="work.html">
                                        Work
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="category.html">
                                        Category
                                    </a>
                                </li>
                            </ul>
                            <div className="user_option">
                                <a href="/login">
                                    <span>Login</span>
                                </a>
                                <form className="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
                                    <button
                                        className="btn my-2 my-sm-0 nav_search-btn"
                                        type="submit"
                                    />
                                </form>
                            </div>
                        </div>
                        <div>
                            <div className="custom_menu-btn">
                                <button>
                                    <span className="s-1"></span>
                                    <span className="s-2"></span>
                                    <span className="s-3"></span>
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}