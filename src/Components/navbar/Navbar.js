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

      <div className='nav-profile'>
        <img className='nav-profile-img' src={img} alt='profile_img'></img>
      </div>
    </div>

    <div className='sub-nav'>
      {/* <span className='sub-nav-span'>Trending</span>
      <span className='sub-nav-span'>Music</span>
      <span className='sub-nav-span'>Sports</span>
      <span className='sub-nav-span'>Movies</span>
      <span className='sub-nav-span'>Gaming</span>
      <span className='sub-nav-span'>Shopping</span>
      <span className='sub-nav-span'>Live</span>
      <span className='sub-nav-span'>News</span>
      <span className='sub-nav-span'>Fasion & Beauty</span> 
      <i className="sub-nav-i fa-solid fa-angle-right"></i>
      */}
    </div>
  </div>
  )
}

export default Navbar
