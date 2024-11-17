import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../navbar/Navbar';
import Content from '../content/Content';

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [quotaMessage, setQuotaMessage] = useState('');
  const [remainingQuota, setRemainingQuota] = useState(null);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoSyndicated=true&videoLicense=creativeCommon&maxResults=20&key=AIzaSyCvbf7pyLnncgRHOT0XGsm_F3Ow-OQNb6s`
        );

        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.error.code === 403 && errorData.error.errors[0].reason === 'quotaExceeded') {
            setQuotaMessage('Your daily search quota limit is exceeded. Try again after 24 hours.');
          }
          throw new Error("Failed to fetch trending videos");
        }

        // Extract remaining quota from response headers
        const availableQuota = response.headers.get('X-Quota-Available');
        if (availableQuota) {
          setRemainingQuota(availableQuota);
          // Show remaining quota temporarily for 3 seconds
          setQuotaMessage(`Quota Remaining: ${availableQuota} / 10000`);
          setTimeout(() => setQuotaMessage(''), 3000);
        }

        const data = await response.json();
        setSearchResults(data.items);
      } catch (error) {
        console.error("Error Fetching Trending Videos: ", error);
      }
    };

    fetchTrendingVideos();
  }, []);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <div className='homepage'>
      <Navbar onSearch={handleSearchResults} />
      <Content videos={searchResults} hasSearched={hasSearched} />
      {quotaMessage && <div className="quota-message">{quotaMessage}</div>}
    </div>
  );
}

export default Home;
