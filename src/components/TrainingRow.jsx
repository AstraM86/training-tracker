import React from 'react';

const TrainingRow = ({ entry, onDelete, onEdit }) => {
    const { date, displayDate, distance } = entry;

    const handleDelete = () => {
        if (window.confirm(`Удалить запись за ${displayDate || date}?`)) {
            onDelete(date);
        }
    };

    const handleEdit = () => {
        onEdit(date);
    };

    return (
        <div className="table-row">
            <div className="col-date">{displayDate || date}</div>
            <div className="col-distance">{distance}</div>
            <div className="col-actions">
                <button
                    className="action-btn edit-btn"
                    title="Редактировать"
                    onClick={handleEdit}
                >
                    ✎
                </button>
                <button
                    className="action-btn delete-btn"
                    title="Удалить"
                    onClick={handleDelete}
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default TrainingRow;
