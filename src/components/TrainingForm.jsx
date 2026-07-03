import React, { useState, useEffect } from 'react';

const TrainingForm = ({ onSubmit, onCancel, editingEntry }) => {
    const [date, setDate] = useState('');
    const [distance, setDistance] = useState('');
    const [error, setError] = useState('');

    // Если редактируем, заполняем форму
    useEffect(() => {
        if (editingEntry) {
            setDate(editingEntry.displayDate || editingEntry.date);
            setDistance(String(editingEntry.distance));
            setError('');
        } else {
            setDate('');
            setDistance('');
            setError('');
        }
    }, [editingEntry]);

    const validateDate = (value) => {
        // ДД.ММ.ГГГГ
        const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
        if (!regex.test(value)) {
            return 'Введите дату в формате ДД.ММ.ГГГГ';
        }
        const [, day, month, year] = value.match(regex);
        const d = parseInt(day, 10);
        const m = parseInt(month, 10);
        const y = parseInt(year, 10);
        if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2100) {
            return 'Некорректная дата';
        }
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedDate = date.trim();
        const trimmedDistance = distance.trim();

        // Валидация даты
        const dateError = validateDate(trimmedDate);
        if (dateError) {
            setError(dateError);
            return;
        }

        // Валидация расстояния
        const dist = parseFloat(trimmedDistance.replace(',', '.'));
        if (isNaN(dist) || dist <= 0) {
            setError('Введите положительное число');
            return;
        }

        setError('');
        onSubmit(trimmedDate, dist);
        // Форма очищается только если не в режиме редактирования
        if (!editingEntry) {
            setDate('');
            setDistance('');
        }
    };

    const isEditing = !!editingEntry;

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="date">Дата (ДД.ММ.ГГГГ)</label>
                    <input
                        type="text"
                        id="date"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                            if (error) setError('');
                        }}
                        placeholder="20.07.2019"
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
