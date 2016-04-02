import React, { PropTypes } from 'react';

const Grid = ({ children, xs = 12, sm = xs, md = sm, lg = md }) => {
  const itemsPerRow = {
    lg: 12 / lg,
    md: 12 / md,
    sm: 12 / sm,
    xs: 12 / xs,
  };

  const items = [];

  for (let i = 1; i <= children.length; i++) {
    const item = children[i - 1];

    items.push(React.cloneElement(item, {
      key: i,
      className: [`col-xs-${xs}`, `col-sm-${sm}`, `col-md-${md}`, `col-lg-${lg}`].join(' '),
    }));

    if (i % itemsPerRow.lg === 0) {
      items.push(<div key={`${i}-lg-clearfix`} className="clearfix visible-lg-block" />);
    }
    if (i % itemsPerRow.md === 0) {
      items.push(<div key={`${i}-md-clearfix`} className="clearfix visible-md-block" />);
    }
    if (i % itemsPerRow.sm === 0) {
      items.push(<div key={`${i}-sm-clearfix`} className="clearfix visible-sm-block" />);
    }
    if (i % itemsPerRow.xs === 0) {
      items.push(<div key={`${i}-xs-clearfix`} className="clearfix visible-xs-block" />);
    }
  }

  return (
    <div>
      {items}
    </div>
  );
};

Grid.propTypes = {
  children: PropTypes.node,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  className: PropTypes.string,
};

export default Grid;
