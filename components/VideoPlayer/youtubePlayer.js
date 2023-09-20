export const YoutubePlayer = ({ youtubeUrl }) => {
    // Extract the video ID from the URL
    const videoId = extractVideoId(youtubeUrl);
  
    // Construct the embed URL
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  
    return (
      <div>
        <iframe width={500} height={500} src={embedUrl}></iframe>
      </div>
    );
  };
  
  const extractVideoId = (youtubeUrl) => {
    // Match video ID in "embed" format
    let videoIdMatch = youtubeUrl.match(/\/embed\/([a-zA-Z0-9_-]+)/);
    if (videoIdMatch) {
      return videoIdMatch[1];
    }
  
    // Match video ID in "watch" format
    videoIdMatch = youtubeUrl.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    return videoIdMatch ? videoIdMatch[1] : null;
  };