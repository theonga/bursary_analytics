import { useState } from 'react';

export default function useData() {
  const getData = () => {
    const dataString = sessionStorage.getItem('adminData');
    const adminData = JSON.parse(dataString);
    return adminData
  };

  const [adminData, setAdminData] = useState(getData());

  const saveData = adminData => {
    sessionStorage.setItem('adminData', JSON.stringify(adminData));
    setAdminData(adminData);
  };

  return {
    setAdminData: saveData,
    adminData
  }
}