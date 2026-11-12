function BulkActions({ counts, onCompleteAll, onDeleteDone, onClearAll }) {
  const allDone = counts.all > 0 && counts.active === 0;

  return (
    <div className="row" style={{ flexWrap: 'wrap', marginTop: 16 }}>
      <button className="btn" onClick={onCompleteAll} disabled={counts.all === 0}>
        {allDone ? 'Снять все отметки' : 'Отметить все'}
      </button>
      <button className="btn" onClick={onDeleteDone} disabled={counts.done === 0}>
        Удалить выполненные ({counts.done})
      </button>
      <button className="btn btn--danger" onClick={onClearAll} disabled={counts.all === 0}>
        Очистить всё
      </button>
    </div>
  );
}

export default BulkActions;
