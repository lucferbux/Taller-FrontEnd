import React from 'react';
import { useTranslation } from 'react-i18next';


const Admin = () => {

    // TODO: create admin page
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t('admin')}</h1>
        </div>
    );
};

export default Admin;