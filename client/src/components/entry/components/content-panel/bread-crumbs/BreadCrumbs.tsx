import * as React from 'react'

interface IProps {
  className?: string
};

export default class BreadCrumbs extends React.Component<IProps, any> {
  public render() {
    const { className } = this.props;
    return (
      <section className={className}>西安新闻 > 西安本地宝 > 本地动态</section>
    );
  }
};