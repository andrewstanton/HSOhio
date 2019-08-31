import React from "react"
import styled from "styled-components"
import { lighten } from "polished"

import { Type, Color } from "../../utilities"
import { Button } from "../Button"

const StyledInput = styled.div`
  flex-grow: 1;

  > input {
    box-sizing: border-box;
    width: 100%;
    padding: 1.25rem 1rem;
    font-size: 1rem;
    font-family: ${Type.text};
    background-color: ${Color.white};
    border: ${lighten(0.4, Color.grey)} 1px solid;
    outline: none;
    color: ${Color.grey};

    &::placeholder {
      color: ${lighten(0.4, Color.grey)};
    }
  }
`

export const Input = ({ label = "", name = "", value = "", onChange }) => (
  <StyledInput>
    <input
      type="text"
      name={name}
      placeholder={label}
      value={value}
      onChange={onChange}
    />
  </StyledInput>
)

const StyledSearch = styled.div`
  display: flex;
  flex-wrap: no-wrap;

  input {
    border-right: 0;
  }
`

const SearchButton = styled(Button)`
  padding: 0rem 1rem;
  border-radius: 0;
`

export const InputSearch = ({ onSearch, ...props }) => (
  <form onSubmit={onSearch} id="clinicsearch">
    <StyledSearch>
      <Input {...props} />
      <SearchButton modifiers="red" onClick={onSearch} id="clinic_search">
        Search
      </SearchButton>
    </StyledSearch>
  </form>
)
