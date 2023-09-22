import React from 'react';

export const Map = ({maps}) => {
  const iframeHtml = { __html: maps.map };
  return (
    <div className="map text-black" dangerouslySetInnerHTML={iframeHtml}>
      
    </div>
  );
};

