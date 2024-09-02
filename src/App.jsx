import React, { useReducer } from 'react';
import './App.css';

const initialState = {
  name: '',
  establishment_year: '',
  address: {
    building: '',
    street: '',
    city: {
      name: '',
      locality: {
        pinCode: '',
        landmark: ''
      }
    },
    state: '',
    coordinates: { latitude: '', longitude: '' },
  },
  courses_offered: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.payload
      };
    case 'SET_ADDRESS_FIELD':
      return {
        ...state,
        address: {
          ...state.address,
          [action.field]: action.payload
        }
      };
    case 'SET_CITY_FIELD':
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            [action.field]: action.payload
          }
        }
      };
    case 'SET_LOCALITY_FIELD':
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              [action.field]: action.payload
            }
          }
        }
      };
    case 'SET_COURSES':
      return {
        ...state,
        courses_offered: action.payload
      };
    case 'RESET':
      return initialState;
    default:
      throw new Error('Invalid action type');
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const parts = name.split('.');  

    if (parts.length === 1) {
      dispatch({ type: 'SET_FIELD', field: name, payload: value });
    } else if (parts[0] === 'address' && parts[1] === 'city' && parts[2] === 'locality') {
      dispatch({ type: 'SET_LOCALITY_FIELD', field: parts[3], payload: value });
    } else if (parts[0] === 'address' && parts[1] === 'city') {
      dispatch({ type: 'SET_CITY_FIELD', field: parts[2], payload: value });
    } else if (parts[0] === 'address') {
      dispatch({ type: 'SET_ADDRESS_FIELD', field: parts[1], payload: value });
    }
  };

  const handleCoursesChange = (e) => {
    const courses = e.target.value.split(',');
    dispatch({ type: 'SET_COURSES', payload: courses });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', state);
    alert("Submitted Data");
    handleReset();
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="card">
      <h1>College Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>College Name:</label>
          <input type="text" name="name" value={state.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Establishment Year:</label>
          <input type="number" name="establishment_year" value={state.establishment_year} onChange={handleChange} />
        </div>
        <h3>Address Details:</h3>
        <div className="form-group">
          <label>Building:</label>
          <input type="text" name="address.building" value={state.address.building} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Street:</label>
          <input type="text" name="address.street" value={state.address.street} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>City Name:</label>
          <input type="text" name="address.city.name" value={state.address.city.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Pincode:</label>
          <input type="text" name="address.city.locality.pinCode" value={state.address.city.locality.pinCode} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Landmark:</label>
          <input type="text" name="address.city.locality.landmark" value={state.address.city.locality.landmark} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>State:</label>
          <input type="text" name="address.state" value={state.address.state} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Latitude:</label>
          <input type="text" name="address.coordinates.latitude" value={state.address.coordinates.latitude} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Longitude:</label>
          <input type="text" name="address.coordinates.longitude" value={state.address.coordinates.longitude} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Courses Offered:</label>
          <input type="text" name="courses_offered" placeholder="Enter comma separated courses" onChange={handleCoursesChange} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default App;