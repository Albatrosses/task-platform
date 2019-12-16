import * as React from 'react';
import { NavPanel } from './components/nav-panel/NavPanel';
import { ContentPanel } from './components/content-panel/ContentPanel';
import { Header } from './components/header/Header';
import { BodyerStyle, NavPanelStyle, ContentPanelStyle, HeaderStyle, EntryStyle } from './index.style';

export const Entry: React.FC<any> = () => {
  return (
    <div style={EntryStyle}>
      <Header style={HeaderStyle}/>
      <div style={BodyerStyle}>
        <NavPanel style={NavPanelStyle}/>
        <ContentPanel style={ContentPanelStyle}/>
      </div>
    </div>
  );
};
