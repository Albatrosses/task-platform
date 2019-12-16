import * as React from 'react';

interface IProps {
  className?: string
};

export default class ContentListing extends React.Component<IProps, any> {
  public render() {
    const { className } = this.props;

    return (
      <section className={className}>content</section>
    );
  }
};