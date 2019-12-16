import * as React from 'react';

export const Header: React.FC<any> = (props) => {
  const { style } = props;
  return (
    <header style={style}>Prophet</header>
  )
}
