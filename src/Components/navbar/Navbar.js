import React, {useState} from 'react';
import img from '../../Assets/profile-img.jpg'; 
import logo from './../../Assets/login-logo.jpg'
import './Navbar.css';

// youtube Api key = AIzaSyCvbf7pyLnncgRHOT0XGsm_F3Ow-OQNb6s

function Navbar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  };

  const handleSearch = async () => {
    if(query.trim() === '') return;
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=12&key=AIzaSyCvbf7pyLnncgRHOT0XGsm_F3Ow-OQNb6s`
      )
      const data = await response.json();
      onSearch(data.items);
    } catch (error) {
      console.log("Error Fetching Youtube data: ", error);
    }
    setQuery('');
  };

  const showSidebar = () => {
    const sidebar = document.getElementsByClassName('nav-menu')[0]; // Access the first element with this class
    if (sidebar) {
    sidebar.style.display = 'flex'; // Update the display property
    }
  };
  
  const closeSidebar = () => {
    const sidebar = document.getElementsByClassName('nav-menu')[0];
    if (sidebar) {
      sidebar.style.display = 'none'; // Hide the sidebar
    }
  };

  const handleLogout = () => {
    // Redirect to the login page
    window.location.href = 'https://deepak-rajput8030.github.io/music-app/';
  };
  
  const toggleTheme = () => {
      document.body.classList.toggle('dark-theme')
  }
  
  return (
  <div className='nav-section'>

    <div className='navbar'>
        <div className='nav-home'>
          <img className="nav-home-img" src={logo} alt='app-logo'></img> 
          <h1 className='nav-home-h1'>BeatBox</h1>
        </div>

      <div className='nav-search'>
        <input 
          className='nav-search-input' 
          type='search' 
          placeholder='Search Music...' 
          value={query}
          onChange={handleInputChange}
        />
        <button 
          className="nav-search-button fa-solid fa-magnifying-glass" 
          type='submit'
          onClick={handleSearch}
          > 
        </button>
      </div>

      <div className='nav-profile' onClick={showSidebar}>
        <img onClick={showSidebar} className='nav-profile-img' src={img} alt='profile_img'></img>
      </div>

        <div className="nav-menu">
          <span onClick={closeSidebar}>
            <i className='close-sidebar fa-solid fa-circle-xmark'></i> 
          </span>
          <p className='user-email'>Email - example123@gmail.com</p>
          
          <p onClick={toggleTheme} className='theme-btn'>
            <span>
              <i class="fa-solid fa-circle-half-stroke"></i>
              Theme
            </span>
          </p>
         
          <p className='logout-btn' onClick={handleLogout}>
            <span>
              <i className="fa-solid fa-right-from-bracket"></i> 
              Sign Out
            </span>
          </p>

        </div>
    </div>

  </div>
  )
}

export default Navbar
