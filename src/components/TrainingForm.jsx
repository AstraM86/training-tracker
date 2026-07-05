import { useState } from 'react';

const TrainingForm = ({ onSubmit, onCancel, editingEntry }) => {
    const [date, setDate] = useState(editingEntry ? editingEntry.date : '');
    const [distance, setDistance] = useState(editingEntry ? String(editingEntry.distance) : '');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!date) {
            setError('Выберите дату');
            return;
        }

        const dist = parseFloat(distance.replace(',', '.'));
        if (isNaN(dist) || dist <= 0) {
            setError('Введите положительное число');
            return;
        }

        setError('');
        onSubmit(date, dist);
    };

    const isEditing = !!editingEntry;

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="date">Дата</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                            if (error) setError('');
                        }}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="distance">Пройдено км</label>
                    <input
                        type="number"
                        id="distance"
                        value={distance}
                        onChange={(e) => {
                            setDistance(e.target.value);
                            if (error) setError('');
                        }}
                        placeholder="5.7"
                        step="0.1"
                        min="0"
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">
                    {isEditing ? 'Сохранить' : 'OK'}
                </button>

                {isEditing && (
                    <button
                        type="button"
                        className="submit-btn submit-btn--cancel"
                        onClick={onCancel}
                    >
                        Отмена
                    </button>
                )}
            </div>
            {error && <div style={{ color: '#d32f2f', marginTop: '8px', fontSize: '14px' }}>{error}</div>}
        </form>
    );
};

export default TrainingForm;
