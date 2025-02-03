import React, {useContext, useState} from 'react';
import { UserContext } from './../firebase/UserContext'; // import the context
import img from '../../Assets/profile-img.jpg'; 
import logo from './../../Assets/login-logo.jpg'
import './Navbar.css';


function Navbar({ onSearch }) {
  const { user } = useContext(UserContext); // access the user data from context 
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  };

  const handleSearch = async () => {
    if(query.trim() === '') return;
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query} "official music video"|"official audio" -remix -cover -live -performance -reaction -mashup -edit -dj&videoSyndicated=true&type=video&maxResults=12&channelType=any&videoCategoryId=10&safeSearch=strict&topicId=/m/04rlf&key=AIzaSyCvbf7pyLnncgRHOT0XGsm_F3Ow-OQNb6s`
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
      document.body.classList.toggle('light-theme')
  }
  
  const tabs = document.querySelectorAll('.scrollable-tabs-container a');

  const removeAllActiveclass = () => {
    tabs.forEach((tab) => {
      tab.classList.remove('active');
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      removeAllActiveclass();
      tab.classList.add('active');
    });
  });

  return (
  <div className='nav-section'>

    <div className='navbar'>

      <div className='nav-home'>
        <img className="nav-home-img" src={logo} alt='app-logo'></img> 
        <h1 className='nav-home-h1'> BeatBox </h1>
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
        <p className='user-email'>Email - {user.email }</p>

        <p onClick={toggleTheme} className='theme-btn'>
          <span>
            <i className="fa-solid fa-circle-half-stroke"></i>
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

    <div className='scrollable-tabs-container'>
      <ul> <li> <a href='#' className='active'>Trending</a> </li> </ul>
      <ul> <li> <a href='#'>New Release</a> </li> </ul>
      <ul> <li> <a href='#'>Sad</a> </li> </ul>
      <ul> <li> <a href='#'>Workout</a> </li> </ul>
      <ul> <li> <a href='#'>Party</a> </li> </ul>
      <ul> <li> <a href='#'>Relax</a> </li> </ul>
      <ul> <li> <a href='#'>Energize</a> </li> </ul>
      <ul> <li> <a href='#'>Sleep</a> </li> </ul>
      <ul> <li> <a href='#'>Chill</a> </li> </ul>
      <ul> <li> <a href='#'>Dance</a> </li> </ul>
      <ul> <li> <a href='#'>Classical</a> </li> </ul>
      <ul> <li> <a href='#'>Feel good</a> </li> </ul>
      <ul> <li> <a href='#'>Bollywood</a> </li> </ul>
      <ul> <li> <a href='#'>Romance</a> </li> </ul>
      <ul> <li> <a href='#'>Hollywood</a> </li> </ul>
      <ul> <li> <a href='#'>Focus</a> </li> </ul>
    </div>

  </div>
  )
}

export default Navbar
