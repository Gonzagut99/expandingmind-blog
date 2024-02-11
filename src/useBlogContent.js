import React from 'react'

export const useBlogContent = ({ contentToChange, actions, setBlogdataLocal }) => {
    
    const { onEdit, onDelete } = actions
    
    const [edit, setEdit] = React.useState(false);
    const [inputContent, setInputContent] = React.useState(contentToChange);
    const [loading, setLoading] = React.useState(false);

    const handleEdit = () => {
        setEdit(true);
    };

    const handleSave = () => {
        setLoading(true);
        setInputContent(inputContent);
        setBlogdataLocal(onEdit);
        setEdit(false);
        setLoading(false);
    };

    const handleDelete = () => {
        setLoading(true);
        setBlogdataLocal(onDelete);
        setLoading(false);
    };

    const handleCancelEdit = () => {
        setEdit(false);
        const currentValue = inputContent;
        setInputContent(currentValue);
    };

    return {
        edit,
        inputContent,
        loading,

        setInputContent,
        handleEdit,
        handleSave,
        handleDelete,
        handleCancelEdit,
    };
};

