import React from 'react';
import { TagCloud } from 'react-tagcloud'

const SocialKeyWords = (props) => {
  const viewSize = props.viewSize;
  return (
    <TagCloud 
      minSize={40}
      maxSize={viewSize > 1280 ? 80 : 60}
      shuffle={true}
      tags={props.data}
      colorOptions={{luminosity: 'dark'}}
      className="text-center p-5 self-center"
    />
  );
}

export default SocialKeyWords;
