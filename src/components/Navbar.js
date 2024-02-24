import './NavbarStyles.css';
function Navbar(){
    return(
        <nav className="navbar" >
            <a href="/" className='home' >Nikunjo</a>
            <a href="/addToLet" className='addTolet' >Add ToLet</a>
            <a href="/signIn" className='signIn'>Sign In</a>
        </nav>
    )
}
export default Navbar;