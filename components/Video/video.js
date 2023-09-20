import VideoComponent from 'components/VideoPlayer/VideoPlayer';
import { YoutubePlayer } from 'components/VideoPlayer/youtubePlayer';
import React from 'react';

export const Video = ({data}) =>{
    return(<div className="video-wrapper flex justify-between">
      <div className='youtube-wrapper'>
        <h2 className='text-black'>
            {data.youtube_embeed}
          </h2>
          <YoutubePlayer youtubeUrl={ data.youtube_video }/>
          </div>
          <div className='Video-wrapper'>
          <h2 className='text-black'>
            {data.video_file}
          </h2>
          <VideoComponent videoAttachmentId={data.video}/>
          </div>
    </div>)
}


