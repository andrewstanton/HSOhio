import React from "react"
import styled from "styled-components"
import { darken } from "polished"

import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Color } from "../../utilities"
import { ButtonHTMLLink } from "../Button"

const Clinics = styled.ul`
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow: auto;
`

const Clinic = styled.li`
  list-style: none;
  font-size: 0.8rem;
  color: ${Color.grey};
  padding: 1rem;
  transition: all 0.5s ease-in-out;
  background-color: ${darken(0.03, Color.white)};
  line-height: 150%;

  h2 {
    color: ${Color.red};
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .button {
    padding-top: 0.5rem;
  }

  .phone {
    display: inline-block;
    margin-left: 0.5rem;
  }
`

const NoClinics = styled.li`
  list-style: none;
  text-align: center;
  padding: 1.25em;
  line-height: 100%;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${Color.white};
  background-color: ${Color.grey};
`

const Loading = styled.li`
  list-style: none;
  padding: 1.25rem;
  text-align: center;
`

export const ClinicList = ({
  locations,
  searched,
  clinics,
  loading = false,
}) => (
  <Clinics>
    {loading ? <Loading>Loading...</Loading> : null}
    {clinics === null && searched && !loading ? (
      <NoClinics>Sorry Clinics Are Further Than 10 Miles Away</NoClinics>
    ) : null}

    {locations.map((loc, ix) => (
      <Clinic key={ix}>
        <h2>{loc.node.title}</h2>
        <div>{loc.node.acf.address_one}</div>
        {loc.node.acf.address_two ? (
          <div>{loc.node.acf.address_two}</div>
        ) : null}
        <div>
          {loc.node.acf.city}, {loc.node.acf.state} {loc.node.acf.zip}
        </div>
        <div>
          <a href={`tel:${loc.node.acf.phone}`} className="clinic_phone">
            <FontAwesomeIcon icon={faPhone} />
            <span className="phone">{loc.node.acf.phone}</span>
          </a>
        </div>
        <div className="button">
          <ButtonHTMLLink
            href={loc.node.acf.link}
            target="_blank"
            modifiers={["red", "small"]}
            className="clinic_website"
          >
            Clinic Details
          </ButtonHTMLLink>
        </div>
      </Clinic>
    ))}
  </Clinics>
)
