import React, { Fragment } from "react"
import styled, { css } from "styled-components"
import { lighten } from "polished"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DatePicker from "react-datepicker"

import { Color, Type, Button } from "../"

const InputStyles = css`
  display: ${props => (props.checkbox ? "inline-block" : "block")};
  margin-bottom: ${props => !props.nomargin && `1rem`};
  padding: 1rem;
  font-size: 1rem;
  font-family: ${Type.text};
  width: 100%;
  box-sizing: border-box;
  border: ${lighten(0.3, Color.grey)} 1px solid;
  color: ${lighten(0.01, Color.grey)};

  ${props =>
    props.rounded &&
    `
    border-radius: 30px;
    padding: 1rem 1.5rem;
  `}

  &:focus {
    outline: none;
    color: ${Color.black};
    border-color: ${Color.green};
  }

  &[type="checkbox"],
  &[type="radio"] {
    width: 50px;
  }

  &::placeholder {
    color: ${lighten(0.4, Color.grey)};
  }
`

export const FormLabel = styled.label`
  display: ${props => (props.checkbox ? `inline-block` : "block")};
  font-weight: 700;
  font-family: ${Type.header};
  padding: 0.4rem 0;
  color: ${Color.red};
`

const StyledInput = styled.div`
  input,
  textarea,
  select {
    ${InputStyles}
  }

  .sublabel {
    font-size: 0.8rem;
    color: ${lighten(0.2, Color.grey)};
  }

  textarea {
    min-height: ${props => (props.minHeight ? props.minHeight : `300px`)};
  }
`

const FakeInput = styled.div`
  ${InputStyles}
  padding: 0.7rem 1rem;
  cursor: pointer;
  margin-bottom: 0;
`

const InputGrid = styled.div`
  display: flex;
  margin-bottom: 1rem;

  ${Button} {
    flex-shrink: 1;
    flex-grow: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
`

export const SelectInput = ({
  children,
  name,
  displayData = ({ value }) => (value ? value : "Select..."),
  onOpenSelect,
  onRemoveSelect,
  remove = true,
  value = null,
}) => (
  <StyledInput>
    <label htmlFor={name}>{children}</label>
    <InputGrid>
      <FakeInput onClick={onOpenSelect}>{displayData({ value })}</FakeInput>
      {remove && value && (
        <Button
          modifiers="danger"
          title="Remove"
          onClick={onRemoveSelect}
          type="button"
        >
          <FontAwesomeIcon icon="times" />
        </Button>
      )}
    </InputGrid>
  </StyledInput>
)

export const restrictCurrencyInput = e => {
  const re = /^[0-9.]+$/
  const keyCode = e.keyCode || e.which
  const keyValue = String.fromCharCode(keyCode)

  if (!re.test(keyValue)) {
    e.preventDefault()
  }
}

const CurrencyAppend = styled.div`
  padding: 1rem;
  padding-top: 0;
  padding-bottom: 0;
  font-size: 1.5rem;
`

export const NumberInput = props => (
  <Input onKeyPress={restrictCurrencyInput} {...props} />
)

export const CurrencyInput = ({ ...props }) => (
  <FlexInput
    onKeyPress={restrictCurrencyInput}
    appendChildren={<CurrencyAppend>$</CurrencyAppend>}
    {...props}
  />
)

export const PercentageInput = ({ ...props }) => (
  <FlexInput
    onKeyPress={restrictCurrencyInput}
    appendChildren={<CurrencyAppend>%</CurrencyAppend>}
    {...props}
  />
)

export const FlexInput = ({
  children,
  appendChildren,
  prependChildren,
  name = "",
  ...props
}) => (
  <StyledInput>
    <FormLabel htmlFor={name}>{children}</FormLabel>
    <InputGrid>
      {appendChildren && <div>{appendChildren}</div>}
      <input
        id={name}
        name={name}
        placeholder={props.placeholder || children}
        {...props}
      />
      {prependChildren && <div>{prependChildren}</div>}
    </InputGrid>
  </StyledInput>
)

const StyledDateInput = styled(StyledInput)`
  .react-datepicker-wrapper {
    width: 100%;
  }
`

const prepDateValue = ({ date, onChange, name }) => {
  const e = {
    target: {
      type: "date",
      value: date,
      name: name,
    },
  }
  onChange(e)
}

export const DateInput = ({ children, name, onChange, value, ...props }) => (
  <StyledDateInput>
    <FormLabel htmlFor={name}>{children}</FormLabel>
    <DatePicker
      {...props}
      selected={value}
      dateFormat="MM/dd/yyyy"
      onChange={date => prepDateValue({ date, onChange, name })}
    />
  </StyledDateInput>
)

export const Checkbox = ({ name, children, ...props }) => (
  <StyledInput checkbox={true}>
    <input id={name} name={name} {...props} type="checkbox" />
    <FormLabel htmlFor={name} checkbox={true}>
      {children}
    </FormLabel>
  </StyledInput>
)

export const FormHeader = styled.h5`
  display: block;
  background-color: ${Color.green};
  color: ${Color.white};
  padding: 1rem;
  margin-bottom: 0.5rem;
  width: 100%;
`

export const Radio = ({ name, children, value, data, ...props }) => (
  <StyledInput checkbox={true}>
    <FormLabel htmlFor={name} checkbox={true}>
      {children}
    </FormLabel>
    <input
      id={name}
      name={name}
      type="radio"
      value={data}
      checked={data === value}
      {...props}
    />
  </StyledInput>
)

export const Input = ({ children, name = "", ...props }) => (
  <StyledInput {...props}>
    <FormLabel htmlFor={name}>{children}</FormLabel>
    <input
      id={name}
      name={name}
      placeholder={props.placeholder || children}
      {...props}
    />
  </StyledInput>
)

export const Select = ({ children, name = "", options = [], ...props }) => (
  <StyledInput>
    <FormLabel htmlFor={name}>{children}</FormLabel>
    <select id={name} name={name} {...props}>
      {options.map((op, ix) => (
        <option value={op.value} key={ix}>
          {op.label ? op.label : op.value}
        </option>
      ))}
    </select>
  </StyledInput>
)

export const Textarea = ({ children, name, sublabel, ...props }) => (
  <StyledInput {...props}>
    <FormLabel htmlFor={name}>{children}</FormLabel>
    {sublabel && <span className="sublabel">{sublabel}</span>}
    <textarea name={name} {...props} />
  </StyledInput>
)

const StyledObjectList = styled.div``

const StyledObjectItem = styled.div`
  border-bottom: 1px solid ${lighten(0.5, Color.grey)};
  border-right: 1px solid ${lighten(0.5, Color.grey)};
  border-left: 1px solid ${lighten(0.5, Color.grey)};
  padding: 0.5rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .item-value {
    font-family: ${Type.header};
    font-weight: bold;
  }
`

export const ObjectItem = ({ children, removeItem, ix }) => (
  <StyledObjectItem>
    <span className="item-value">{children}</span>
    <Button
      modifiers={["danger"]}
      type="button"
      title="Remove Item"
      onClick={() => removeItem(ix)}
    >
      <FontAwesomeIcon icon="times" />
    </Button>
  </StyledObjectItem>
)

const StyledAlignInput = styled.div`
  display: flex;
`

const ObjectListWrapper = styled.div`
  margin-bottom: 1rem;
`

export const ObjectList = ({
  children,
  name,
  addItem,
  removeItem,
  list = [],
  ...props
}) => (
  <ObjectListWrapper>
    <StyledInput nomargin>
      <FormLabel htmlFor={name}>{children}</FormLabel>
      <StyledAlignInput>
        <input
          id={name}
          name={name}
          placeholder={props.placeholder || children}
          {...props}
        />
        <Button
          type="button"
          modifiers={["primary"]}
          onClick={() => addItem(props.value)}
        >
          <FontAwesomeIcon icon="plus" />
        </Button>
      </StyledAlignInput>
    </StyledInput>

    <StyledObjectList>
      {list.map((val, ix) => (
        <ObjectItem key={ix} removeItem={removeItem} ix={ix}>
          {val}
        </ObjectItem>
      ))}
    </StyledObjectList>
  </ObjectListWrapper>
)
