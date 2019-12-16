import * as React from 'react';

interface IProps {
	className?: string;
};

export default class AccountPanel extends React.Component<IProps, any> {
  public render() {
    return (
      <nav className="account-panel">search + account icon</nav>
    );
  }
};
