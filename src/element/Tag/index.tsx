import React from 'react';
import './style.scss'

interface TagProps {
  tag: string
}

export const Tag = ({tag}: TagProps) => {
  let style
  switch (tag) {
    case 'Marketing' :
      style = {background: '#F5F0FF', color: '#764CED'}
  }


  return (
    <div style={style} className='tagElement'>
      {tag}
    </div>
  );
};