import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Icon from '../../components/shared/Icon';
import { selectCompleteness } from '../../store/selectors';

export default function DashboardPage() {
  const items = useSelector(selectCompleteness);

  return (
    <section>
      <h2>Dashboard</h2>
      <p>What is on your site, and what is still missing.</p>

      <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
        {items.map((item) => (
          <Link
            key={item.page}
            to={`/admin/${item.page}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              border: `1px solid ${item.done ? 'var(--line)' : 'var(--ink)'}`,
              borderRadius: 'var(--radius)',
              padding: '12px 14px',
              fontSize: 15,
              color: 'var(--ink)',
            }}
          >
            <Icon name={item.done ? 'check' : 'warn'} />
            {item.label}
            <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--ink-soft)' }}>
              {item.done ? 'Done' : 'Needs attention'}
            </span>
          </Link>
        ))}
      </div>

      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          height: 48,
          padding: '0 20px',
          border: '1px solid var(--ink)',
          borderRadius: 'var(--radius)',
          fontSize: 15,
        }}
      >
        <Icon name="eye" />
        View your site
      </Link>
    </section>
  );
}