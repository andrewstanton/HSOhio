import React, { useEffect, useState } from "react"
import { GoogleApiWrapper, Map, InfoWindow, Marker } from "google-maps-react"
import styled from "styled-components"

import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Color } from "../../utilities"
import { ButtonHTMLLink } from "../Button"

import Config from "../../Config"

const MarkerClick = ({ props, setWindow, marker }) => {
  setWindow({
    props,
    marker: marker,
    visible: true,
  })
}

const StyledMapNode = styled.div`
  background-color: ${Color.white};
  padding: 0.5rem;
  line-height: 150%;
  font-size: 0.9rem;

  .location {
    &_name {
      margin-bottom: 0.5rem;
    }

    &_phone {
      span {
        display: inline-block;
        margin-left: 0.8rem;
      }
    }

    &_site {
      margin-top: 0.5rem;
    }
  }
`

const MapNode = node => {
  const data = node.node
  return (
    <StyledMapNode>
      <h4 className="location_name">{data.title}</h4>
      <div className="location_addressOne">{data.acf.address_one}</div>
      {data.acf.address_two ? (
        <div className="location_addressTwo">{data.acf.address_two}</div>
      ) : null}
      <div className="location_addressThree">
        {data.acf.city}, {data.acf.state} {data.acf.zip}
      </div>
      <div className="location_phone">
        <a href={`tel: ${data.acf.phone}`} className="clinic_phone">
          <FontAwesomeIcon icon={faPhone} />
          <span>{data.acf.phone}</span>
        </a>
      </div>
      <div className="location_site">
        <ButtonHTMLLink
          target="_blank"
          href={data.acf.link}
          modifiers={["red", "small"]}
          className="clinic_website"
        >
          Clinic Details
        </ButtonHTMLLink>
      </div>
    </StyledMapNode>
  )
}

const renderBounds = ({ locations, google, setBounds }) => {
  console.log({ google })
  // const bounds = new google.maps.LatLngBounds()

  // locations.forEach(loc => {
  //   const coords = {
  //     lat: loc.node.acf.latitude,
  //     lng: loc.node.acf.longitude,
  //   }
  //   bounds.extend(coords)
  // })

  // console.log(bounds)

  // setBounds(bounds)
}

export const MapContainer = ({ google, locations = [], zoom = 8 }) => {
  const [window, setWindow] = useState({
    visible: false,
    marker: null,
    props: null,
  })
  const [bounds, setBounds] = useState(null)

  // Rendering Bounds
  useEffect(() => {
    console.log("RE_RENDER")
    const newBounds = new google.maps.LatLngBounds()
    locations.forEach(loc => {
      const coords = {
        lat: Number(loc.node.acf.latitude),
        lng: Number(loc.node.acf.longitude),
      }
      newBounds.extend(coords)
    })
    setBounds(newBounds)
  }, [locations])

  return (
    <Map
      google={google}
      className="miniMap"
      zoom={zoom}
      bounds={bounds}
      initialCenter={{ lat: 44.9778, lng: -93.265 }}
    >
      {locations.map((node, ix) => {
        return (
          <Marker
            key={ix}
            node={node.node}
            position={{
              lat: node.node.acf.latitude,
              lng: node.node.acf.longitude,
            }}
            onClick={(props, marker) =>
              MarkerClick({ props, setWindow, marker })
            }
          ></Marker>
        )
      })}
      <InfoWindow visible={window.visible} marker={window.marker}>
        <>{window.props && <MapNode node={window.props.node} />}</>
      </InfoWindow>
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: Config.key,
})(MapContainer)
