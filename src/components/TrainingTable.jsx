import TrainingRow from './TrainingRow';

const TrainingTable = ({ entries, onDelete, onEdit }) => {
    if (entries.length === 0) {
        return (
            <div className="data-table">
                <div className="table-header">
                    <div className="col-date">Дата (ДД.ММ.ГГГГ)</div>
                    <div className="col-distance">Пройдено км</div>
                    <div className="col-actions">Действия</div>
                </div>
                <div className="table-body">
                    <div className="empty-state">Нет данных о тренировках</div>
                </div>
            </div>
        );
    }

    return (
        <div className="data-table">
            <div className="table-header">
                <div className="col-date">Дата (ДД.ММ.ГГГГ)</div>
                <div className="col-distance">Пройдено км</div>
                <div className="col-actions">Действия</div>
            </div>
            <div className="table-body">
                {entries.map((entry) => (
                    <TrainingRow
                        key={entry.date}
                        entry={entry}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default TrainingTable;
