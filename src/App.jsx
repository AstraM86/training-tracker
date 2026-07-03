// src/App.jsx
import React, { useState, useEffect } from 'react';
import TrainingForm from './components/TrainingForm';
import TrainingTable from './components/TrainingTable';

const App = () => {
    const [entries, setEntries] = useState([]);
    const [editingDate, setEditingDate] = useState(null);

    // Загружаем данные из localStorage при монтировании
    useEffect(() => {
        const saved = localStorage.getItem('trainingEntries');
        if (saved) {
            try {
                setEntries(JSON.parse(saved));
            } catch (_) {
                setEntries([]);
            }
        }
    }, []);

    // Сохраняем в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('trainingEntries', JSON.stringify(entries));
    }, [entries]);

    // Добавление / обновление записи
    const addOrUpdateEntry = (dateStr, distance) => {
        // dateStr ожидается в формате ДД.ММ.ГГГГ
        // Нормализуем для сравнения: преобразуем в YYYY-MM-DD
        const parts = dateStr.split('.');
        if (parts.length !== 3) return;
        const normalized = `${parts[2]}-${parts[1]}-${parts[0]}`;

        setEntries((prev) => {
            const existingIndex = prev.findIndex((e) => e.date === normalized);

            if (existingIndex !== -1) {
                // Обновляем существующую запись
                const updated = [...prev];
                const newDistance = updated[existingIndex].distance + distance;
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    distance: Math.round(newDistance * 10) / 10,
                };
                return updated;
            } else {
                // Добавляем новую запись
                const newEntry = {
                    date: normalized,
                    displayDate: dateStr,
                    distance: Math.round(distance * 10) / 10,
                };
                const combined = [...prev, newEntry];
                // Сортировка по дате (новые сверху)
                combined.sort((a, b) => {
                    if (a.date > b.date) return -1;
                    if (a.date < b.date) return 1;
                    return 0;
                });
                return combined;
            }
        });

        // Если был режим редактирования, сбрасываем
        if (editingDate) setEditingDate(null);
    };

    // Удаление записи по дате (нормализованной)
    const deleteEntry = (normalizedDate) => {
        setEntries((prev) => prev.filter((e) => e.date !== normalizedDate));
        if (editingDate === normalizedDate) setEditingDate(null);
    };

    // Начать редактирование: передаём данные в форму
    const startEditing = (normalizedDate) => {
        setEditingDate(normalizedDate);
    };

    // Отмена редактирования
    const cancelEditing = () => {
        setEditingDate(null);
    };

    // Найти запись для редактирования
    const getEditingEntry = () => {
        if (!editingDate) return null;
        return entries.find((e) => e.date === editingDate) || null;
    };

    const editingEntry = getEditingEntry();

    return (
        <div className="container">
            <div className="form-container">
                <TrainingForm
                    onSubmit={addOrUpdateEntry}
                    onCancel={cancelEditing}
                    editingEntry={editingEntry}
                />
            </div>
            <TrainingTable
                entries={entries}
                onDelete={deleteEntry}
                onEdit={startEditing}
            />
        </div>
    );
};

export default App;
