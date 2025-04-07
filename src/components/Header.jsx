import SearchBar from "./SearchBar";

function Header() {
    return (
        <header className="py-3 px-5 d-flex justify-content-between">
            <h1 className="title">
                BoolFlix<span className="title-tm">&trade;</span>
            </h1>
            <SearchBar />
        </header>
    );
}

export default Header;