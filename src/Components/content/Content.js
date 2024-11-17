import React from 'react';
import './Content.css';

function Content({ videos, hasSearched }) { 

  if (hasSearched && (!videos || videos.length === 0)) {
    return (
      <p className='error-msg'>No Videos found. Try a different search.</p>
    );
  }

  return (
    <div className='content-container'>
      {videos.map((video) => (
        <li key={video.id.videoId} className='video-content'>
          <div className='video-thumbnail'>
            <iframe
              className='video-thumbnail-iframe'
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="video-text">
            <div className='channel-profile'>
              <img 
                className='channel-profile-img' 
                src={video.snippet.thumbnails.default.url} 
                alt='channel-img'
              /> 
            </div>

            <div className='text-info'>
              <p className='text-info-video-title'>{video.snippet.title}</p>
              <p className='text-info-channel-name'>{video.snippet.channelTitle}</p>
              <p className='text-info-video-upload-date'>Published on {new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
}

export default Content;
