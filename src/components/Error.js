import { grey } from '@mui/material/colors';
import { bgcolor } from '@mui/system';
import React from 'react'
import { Link } from 'react-router-dom';
import Alert from '../logo/Alert.png';
const Error = () => {
  return (
    <>
      <div className="container">
        <div>
          <br/>
          <img src={Alert}  alt="error" style={{ width: "300px", marginBottom: 20, marginLeft:600 }} />
          <h2 className="mb-3" style={{  marginBottom: 20, marginLeft:650 }}>PAGE NOT FOUND</h2>
          <br/>
          <Link to="/fpage" className="btn btn-primary" style={{ fontSize: 18 ,alignContent:'center' }}> Back To Home Page </Link>
        </div>
      </div>
    </>
  )
}

export default Error