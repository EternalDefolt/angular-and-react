import { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Breadcrumbs({ items }) {
  return (
    <nav className="muted" style={{ marginBottom: 12 }}>
      {items.map((item, i) => (
        <Fragment key={item.label}>
          {i > 0 && ' / '}
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
        </Fragment>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
