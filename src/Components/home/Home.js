import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import Content from '../content/Content';
import { getValidApiKey } from './../firebase/apiKeyManager'; // Import API key manager
import './Home.css';

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [quotaMessage, setQuotaMessage] = useState('');
  const [remainingQuota, setRemainingQuota] = useState(null);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      try {
        const apiKey = await getValidApiKey(); // Get the working API key
        const channelIds = [
          "UCq-Fj5jknLsUf-MWSy4_brA", // T-Series
          "UC56gTxNs4f9xZ7Pa2i5xNzg", // Sony Music India
          "UCFFbwnve3yF62-tVXkTyHqg", // Zee Music Company
          "UC2pmfLm7iq6Ov1UwYrWYkZA", // Vevo (Main Channel)
        ];

        let allVideos = [];
        for (const channelId of channelIds) {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&order=date&chart=mostPopular&maxResults=3&key=${apiKey}&channelId=${channelId}`
          );

          if (!response.ok) throw new Error("Failed to fetch trending videos");

          const data = await response.json();
          allVideos = [...allVideos, ...data.items];
        }

        setSearchResults(allVideos);
      } catch (error) {
        console.error("Error Fetching Trending Videos: ", error);
        setQuotaMessage("The daily search quota has been exceeded. Please try again after some time.");
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
      {quotaMessage && 
        <div className="quota-message">{quotaMessage}
          <div className='waiting-gif'></div>
        </div>}
    </div>
  );
}

export default Home;
