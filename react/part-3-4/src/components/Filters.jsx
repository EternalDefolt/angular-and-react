function FilterGroup({ title, options, current, onChange }) {
  return (
    <div className="row" style={{ flexWrap: 'wrap', marginBottom: 8 }}>
      <span className="muted" style={{ minWidth: 80 }}>
        {title}
      </span>
      {options.map((option) => {
        const isActive = option.key === current;
        return (
          <button
            key={option.key}
            onClick={() => onChange(option.key)}
            style={{
              padding: '6px 12px',
              border: '1px solid #ddd',
              borderRadius: 8,
              background: isActive ? '#3b82f6' : 'white',
              color: isActive ? 'white' : '#374151',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            {option.label} ({option.count})
          </button>
        );
      })}
    </div>
  );
}

function Filters({ current, onChange, counts, priority, onPriorityChange, priorityCounts }) {
  const statusOptions = [
    { key: 'all', label: 'Все', count: counts.all },
    { key: 'active', label: 'Активные', count: counts.active },
    { key: 'done', label: 'Выполненные', count: counts.done },
  ];

  const priorityOptions = [
    { key: 'all', label: 'Любой', count: priorityCounts.all },
    { key: 'high', label: 'Высокий', count: priorityCounts.high },
    { key: 'medium', label: 'Средний', count: priorityCounts.medium },
    { key: 'low', label: 'Низкий', count: priorityCounts.low },
  ];

  return (
    <div style={{ marginBottom: 8 }}>
      <FilterGroup title="Статус" options={statusOptions} current={current} onChange={onChange} />
      <FilterGroup
        title="Приоритет"
        options={priorityOptions}
        current={priority}
        onChange={onPriorityChange}
      />
    </div>
  );
}

export default Filters;
