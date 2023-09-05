// src/components/ApplicationForm.js
import React, { useState } from 'react';
import axios from 'axios';

function ApplicationForm() {
  const [formData, setFormData] = useState({
    business_name: '',
    year_established: '',
    loan_amount: '',
    selected_provider: 'Xerox', // Default selection
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = axios.post('http://backend:5000/applyloan', formData);
      console.log(response.data)
    //   const { message } = response.data;
    //   console.log("Getting approval status...")
    //   console.log(message);
    //   setResult(message);
      if (response.data) {
        const { approval } = response.data;
        console.log("Approval status:", approval);
        setResult(approval);
      } else {
        console.error("Error: Response data or approval property is undefined");
        setResult('Error: Unable to submit the application.');
      }
    } catch (error) {
      console.error("Error:", error);
      setResult('Error: Unable to submit the application.');
    }
  };

  return (
    <div>
      <h2>Loan Application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="business_name">Business Name:</label>
          <input
            type="text"
            id="business_name"
            name="business_name"
            value={formData.business_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="year_established">Year Established:</label>
          <input
            type="number"
            id="year_established"
            name="year_established"
            value={formData.year_established}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="loan_amount">Loan Amount:</label>
          <input
            type="number"
            id="loan_amount"
            name="loan_amount"
            value={formData.loan_amount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="selected_provider">Accounting Provider:</label>
          <select
            id="selected_provider"
            name="selected_provider"
            value={formData.selected_provider}
            onChange={handleChange}
          >
            <option value="Xerox">Xerox</option>
            <option value="MYOB">MYOB</option>
            {/* Add other accounting providers here */}
          </select>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {result && <div>{result}</div>}
    </div>
  );
}

export default ApplicationForm;
