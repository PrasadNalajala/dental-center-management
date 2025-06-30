import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState({ users: [], patients: [], incidents: [] });

  useEffect(() => {
    const storedData = localStorage.getItem('dental-data');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const updateData = (newData) => {
    setData(newData);
    localStorage.setItem('dental-data', JSON.stringify(newData));
  };

  // You can add more specific functions here to update patients, incidents, etc.
  // For example:
  const addPatient = (patient) => {
    const newData = { ...data, patients: [...data.patients, patient] };
    updateData(newData);
  };
  
  const updatePatient = (updatedPatient) => {
    const newData = {
      ...data,
      patients: data.patients.map(p => p.id === updatedPatient.id ? updatedPatient : p)
    };
    updateData(newData);
  };

  const deletePatient = (patientId) => {
    const newData = {
        ...data,
        patients: data.patients.filter(p => p.id !== patientId)
    };
    updateData(newData);
  };

  // Incident functions
  const addIncident = (incident) => {
    const newData = { ...data, incidents: [...data.incidents, incident] };
    updateData(newData);
  };

  const updateIncident = (updatedIncident) => {
    const newData = {
      ...data,
      incidents: data.incidents.map(i => i.id === updatedIncident.id ? updatedIncident : i)
    };
    updateData(newData);
  };

  const deleteIncident = (incidentId) => {
    const newData = {
      ...data,
      incidents: data.incidents.filter(i => i.id !== incidentId)
    };
    updateData(newData);
  };

  return (
    <DataContext.Provider value={{
      data,
      addPatient, updatePatient, deletePatient,
      addIncident, updateIncident, deleteIncident
    }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider }; 