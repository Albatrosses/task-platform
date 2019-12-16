import * as React from 'react';
import { Entry } from './entry';
import { ConfigProvider } from 'antd';
import { globalConfig } from 'src/config';


class App extends React.Component {
  public render() {
    return (
      <ConfigProvider {...globalConfig}>
        <Entry/>
      </ConfigProvider>
    );
  }
}

export default App;
