import React, { useState, useEffect } from "react"
import styled from "styled-components"

import * as axios from "axios"

import { InputSearch } from "../Input"
import GoogleMap from "../GoogleMap"
import { ClinicList } from "../ClinicList"

import Config from "../../Config"
import { Media } from "../../utilities"

const Locator = styled.div`
  padding: 1rem;
`

const locationsNear = (centerPoint, location) => {
  const ky = 40000 / 360
  const kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky
  const dx = Math.abs(centerPoint.lng - location.lng) * kx
  const dy = Math.abs(centerPoint.lat - location.lat) * ky
  return Math.sqrt(dx * dx + dy * dy)
}

const urlFriendly = value =>
  value === undefined
    ? ""
    : value
        .replace(/[^a-z0-9_]+/gi, "+")
        .replace(/^-|-$/g, "")
        .toLowerCase()

const getGeocode = address => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${Config.key}`
    )
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
      return false
    })
}

const getLocations = ({
  coords,
  setClinics,
  setSearched,
  setLoading,
  locations,
}) => {
  const dupLocations = locations
  const locationDistance = dupLocations.map((loc, ix) => {
    const locCoord = {
      lat: loc.node.acf.latitude,
      lng: loc.node.acf.longitude,
    }
    return { miles: locationsNear(coords, locCoord), index: ix }
  })
  const sortLocations = locationDistance.sort((a, b) =>
    a.miles > b.miles ? 1 : -1
  )
  const locationList = sortLocations.map(loc => {
    const ref = locations[loc.index]
    ref.miles = loc.miles
    return ref
  })

  const clinics = locationList.slice(0, 3).filter(loc => loc.miles <= 10)
  if (clinics.length === 0) {
    setClinics(null)
    setSearched(true)
  } else {
    setSearched(true)
    setClinics(clinics)
  }

  setLoading(false)
}

const showNearest = ({
  address,
  locations = [],
  setClinics,
  setSearched,
  setLoading,
}) => {
  address = urlFriendly(address)
  if (address === "" || address === null || address === " ") {
    setSearched(false)
    setClinics(null)
    return
  }

  setLoading(true)

  getGeocode(address).then(geocode => {
    if (geocode.data.results <= 0) {
      setClinics(null)
      setSearched(true)
      setLoading(false)
      return
    }
    const coords = geocode.data.results[0].geometry.location
    const postalRef = geocode.data.results[0].address_components.find(add =>
      add.types.includes("postal_code")
    )

    window.dataLayer.push({
      event: "clinic_search",
      clinic_search: postalRef.long_name,
    })

    getLocations({ setLoading, setSearched, setClinics, coords, locations })
  })
}

const convertLatLng = coords => {
  const latlng = `${coords.latitude},${coords.longitude}`
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${Config.key}`
    )
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err)
      return false
    })
}

const setCurrentLocation = ({
  position,
  setAddress,
  setLoading,
  setSearched,
  setClinics,
  locations,
}) => {
  if (!position.coords) {
    return
  }
  convertLatLng(position.coords).then(location => {
    const address = location.data.results[0].address_components
    const zip = address.find(add => add.types.includes("postal_code"))
    if (zip.long_name) {
      setAddress(zip.long_name)
      getLocations({
        setLoading,
        setClinics,
        setSearched,
        locations,
        coords: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      })
    }
  })
}

const LocationContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto;

  ${Media.below.tablet`
    grid-template-columns: 1fr;
  `}
`

export const ClinicLocator = ({ locations = [] }) => {
  const [address, setAddress] = useState("")
  const [clinics, setClinics] = useState(locations)
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  // Current Location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentLocation({
          position,
          setAddress,
          setSearched,
          setClinics,
          locations,
          setLoading,
        })
      })
    }
  }, [])

  return (
    <Locator>
      <h2>Find Nearest Clinic</h2>
      <InputSearch
        name="zip"
        label="Enter Your Address..."
        value={address}
        onChange={e => setAddress(e.target.value)}
        onSearch={e => {
          e.preventDefault()
          showNearest({
            address,
            locations,
            setClinics,
            setSearched,
            setLoading,
          })
        }}
      />
      <LocationContainer>
        <ClinicList
          locations={clinics ? clinics : locations}
          clinics={clinics}
          searched={searched}
          loading={loading}
        />
        <GoogleMap locations={clinics ? clinics : locations} />
      </LocationContainer>
    </Locator>
  )
}
