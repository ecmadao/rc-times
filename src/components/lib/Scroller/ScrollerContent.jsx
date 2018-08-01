
import React, { Component } from 'react';

export default class ScrollerContent extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.centerindex !== this.props.centerindex;
  }

  render() {
    const {
      scroll,
      className,
      scrollRef,
      autoScroll,
      ...props
    } = this.props;

    const style = {
      height: '100%',
      width: '100%',
      overflowY: autoScroll || scroll.touching ? 'hidden' : 'auto',
    };

    return (
      <div
        style={style}
        ref={scrollRef}
        className={className}
        {...props}
      />
    );
  }
}
