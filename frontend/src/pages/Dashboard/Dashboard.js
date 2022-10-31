import React from 'react';
import PageTitle from '../../components/Title/PageTitle';
import ItensDashBoard from './ItensDashBoard';

const Dashboard = () => {
  return (
    <div>
      <PageTitle title={'Dashboard'} subtitle={'Administração do sistema'} />
      <ItensDashBoard />
    </div>
  );
};

export default Dashboard;
