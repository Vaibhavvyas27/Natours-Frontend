import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Modal, Button, Form } from 'react-bootstrap';
import { useEffect } from 'react';

const MapWithLocationList = ({ setLocationArr, resetSignal, currentTour }) => {
  const [locations, setLocations] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newLocation, setNewLocation] = useState({ coordinates: [], description: '', day: '' });


  const handleRemoveLocation = (index, e) => {
    e.preventDefault()
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    setLocations(updatedLocations);
  };

  useEffect(() => {
    setLocations([])
  }, [resetSignal])

  const AddMarkerToClickLocation = () => {
    const map = useMapEvents({
      click(e) {
        setNewLocation({
          coordinates: [e.latlng.lng, e.latlng.lat],
          description: '',
          day: '',
        });
        setModalIsOpen(true);
      }
    });
    return null;
  };


  const handleModalSubmit = () => {
    setLocations([...locations, newLocation]);
    setModalIsOpen(false);
  };

  // State lifing up for locations array 
  useEffect(() => {
    setLocationArr(locations)
  }, [locations])

  useEffect(() => {
    setLocations(currentTour?.locations? currentTour?.locations : [] )
  }, [currentTour])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLocation((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='gap-3' style={{ display: 'flex' }}>
      <div style={{ flex: '1' }}>
        <h4>Location List</h4>
        <ol className='list-group list-group-numbered mt-4'>
          {locations.map((location, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{location.description}{' '}</div>
                Day {location.day}
              </div>
              <span role="button" className="badge bg-dark cursor-pointer rounded-pill" onClick={(e) => handleRemoveLocation(index, e)}>x</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="card" style={{ flex: '1' }}>
        <div className="card-body">
          <h5 className="card-title">Choose locations in map</h5>
          <div>
            <MapContainer center={[51.505, -0.09]} zoom={5} style={{ height: '400px', width: '100%' }}>
              <TileLayer
                url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=u5O3I0YdUkYNtUNo2Yy8"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <AddMarkerToClickLocation />
              {locations.map((location, index) => (
                <Marker key={index} position={[location.coordinates[1], location.coordinates[0]]}>
                  <Popup>{location.day} {location.description}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>

      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newLocation.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Day</Form.Label>
              <Form.Control
                type="text"
                name="day"
                value={newLocation.day}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Add Location
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MapWithLocationList;
