import React from 'react';
import EmailAndSmsAnalytics from './EmailAndSmsAnalytics';
import SalesAnalytics from './SalesAnalytics';
import OpportunityAnalytics from './OpportunityAnalytics';
import TicketAnalytics from './TicketAnalytics';
import './Analytics.css';

const Analytics = () => {
  return (
    <div className='analytics'>
      <div className='analytics-container'>
        <SalesAnalytics />
        <EmailAndSmsAnalytics />
      </div>
      <div className='analytics-container'>
        <OpportunityAnalytics/>
        <TicketAnalytics/>
      </div>
    </div>
  );
};

export default Analytics;
