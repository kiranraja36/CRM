import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmailAndSmsAnalytics.css';

const EmailAndSmsAnalytics = () => {
    const [emailCount, setEmailCount] = useState(0);
    const [smsCount, setSmsCount] = useState(0);

    useEffect(() => {
        fetchEmailCount();
        fetchSMSCount();
    }, []);

    const fetchEmailCount = async () => {
        try {
            const response = await axios.get('http://localhost:8080/analytics/emailCount');
            setEmailCount(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchSMSCount = async () => {
        try {
            const response = await axios.get('http://localhost:8080/analytics/smsCount');
            setSmsCount(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="emailsms-container" style={{ display: 'flex' }}>
            <div className="analytics-box" style={{marginTop:'70px'}}>
            <p>Emails Today<span className="blueBox">{emailCount}</span></p>
            </div>
            <div className="analytics-box" style={{marginTop:'170px'}}>
            <p>SMS Today<span className="blueBox">{smsCount}</span></p>
            </div>
        </div>
    );
}
export default EmailAndSmsAnalytics;