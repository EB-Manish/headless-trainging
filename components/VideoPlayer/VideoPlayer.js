import React, { useState, useEffect } from 'react';

const VideoComponent = ({ videoAttachmentId }) => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await fetch(
          `http://localhost/starterkit-v2/wp-json/wp/v2/media/${videoAttachmentId}`
        );
        const videoData = await response.json();
        setVideoUrl(videoData.guid.rendered);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideoUrl();
  }, [videoAttachmentId]);

  return (
    <div>
      {videoUrl && (
        <video width={ 500 } height={ 500 }controls>
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default VideoComponent;
