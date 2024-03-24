import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const ImportStudentsForm = () => {
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file', file);

        Inertia.post('/import-students', formData);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Importer</button>
        </form>
    );
};

export default ImportStudentsForm;
