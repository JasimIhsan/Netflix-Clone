import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_icon from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { useEffect, useRef } from 'react'
import { logout } from '../../controllers/controllers'

const Navbar = () => {

	const navRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (navRef.current) {
				if (window.scrollY >= 80) {
					navRef.current.classList.add('nav-dark');
				} else {
					navRef.current.classList.remove('nav-dark')
				}
			}
		})
	}, [])

	return (
		<div ref={navRef} className='navbar'>
			<div className="navbar-left">
				<img src={logo} alt="Netflix logo" />
				<ul>
					<li>Home</li>
					<li>Tv Shows</li>
					<li>Movies</li>
					<li>New & Popular</li>
					<li>My Lists</li>
					<li>Browse by language</li>
				</ul>
			</div>
			<div className="navbar-right">
				<img src={search_icon} alt="Search" className='icons' />
				<p>Children</p>
				<img src={bell_icon} alt="Bell icon" className='icons' />
				<div className='navbar-profile'>
					<img src={profile_icon} alt="Profile" className='profile' />
					<img src={caret_icon} alt="Arrow" />
					<div className='dropdown'>
						<p onClick={logout}>Sign Out</p>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Navbar
