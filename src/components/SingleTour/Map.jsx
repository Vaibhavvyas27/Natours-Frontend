import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {Icon} from 'leaflet'

const Map = ({ locations }) => {
  console.log(locations)
  const customIcon = new Icon({
    iconUrl:'https://cdn-icons-png.flaticon.com/128/684/684908.png',
    iconSize:[40,38]
  })
  return (
    <div id='map'>
      {locations != undefined? 
      (  <MapContainer center={locations[0].coordinates?.reverse()} zoom={5} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=u5O3I0YdUkYNtUNo2Yy8"
          />
            {
              locations?.map((place,i) => (
                <div key={i}>
                  <p>{place.coordinates}</p>
                  <Marker icon={customIcon} position={i==0 ? place.coordinates : place.coordinates.reverse() } >
                  <Popup>
                    <h4 className='text-small'><i><u>Day : {place.day}</u></i></h4>
                    <br />
                    <h2 className='custom_map_popup_text'>{place.description}</h2>
                  </Popup>
                  </Marker>
                </div>
                
              ))
            }
            
        </MapContainer> ):(
          ""
        )
      
      }
    </div>
  )
}

export default Map
