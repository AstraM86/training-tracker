import { useState, useEffect } from 'react';
import TrainingForm from './components/TrainingForm';
import TrainingTable from './components/TrainingTable';

const loadEntries = () => {
    const saved = localStorage.getItem('trainingEntries');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch {
            return [];
        }
    }
    return [];
};

const App = () => {
    const [entries, setEntries] = useState(loadEntries);
    const [editingDate, setEditingDate] = useState(null);

    useEffect(() => {
        localStorage.setItem('trainingEntries', JSON.stringify(entries));
    }, [entries]);

    const addOrUpdateEntry = (dateStr, distance) => {
        const [year, month, day] = dateStr.split('-');
        const displayDate = `${day}.${month}.${year}`;

        setEntries((prev) => {
            const existingIndex = prev.findIndex((e) => e.date === dateStr);

            if (existingIndex !== -1) {
                const updated = [...prev];
                const newDistance = updated[existingIndex].distance + distance;
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    distance: Math.round(newDistance * 10) / 10,
                };
                return updated;
            } else {
                const newEntry = {
                    date: dateStr,
                    displayDate: displayDate,
                    distance: Math.round(distance * 10) / 10,
                };
                const combined = [...prev, newEntry];
                combined.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));
                return combined;
            }
        });

        if (editingDate) setEditingDate(null);
    };

    const deleteEntry = (normalizedDate) => {
        setEntries((prev) => prev.filter((e) => e.date !== normalizedDate));
        if (editingDate === normalizedDate) setEditingDate(null);
    };

    const startEditing = (normalizedDate) => {
        setEditingDate(normalizedDate);
    };

    const cancelEditing = () => {
        setEditingDate(null);
    };

    const editingEntry = editingDate
        ? entries.find((e) => e.date === editingDate) || null
        : null;

    return (
        <div className="container">
            <div className="form-container">
                <TrainingForm
                    key={editingDate || 'new'}
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
