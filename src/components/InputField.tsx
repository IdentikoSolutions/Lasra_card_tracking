import React from 'react'
import { Iinput } from '../interface/interface'
import Col from "react-bootstrap/Col"
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from "react-bootstrap/Form"
import InputGroup from 'react-bootstrap/InputGroup'
export const InputField: React.FC<Iinput> = ({
  label,
  onChange,
  onClick,
  ...inputProps
}) => {
  return (
    <Col>
      <InputGroup className="my-2 ">
        {label &&
          <InputGroup.Text className="bg-default"
          >
            {label}
            <Form.Control
              {...inputProps}
              onChange={onChange} />
          </InputGroup.Text>}
      </InputGroup>
    </Col>
  )
}
// for details
export const DetailField: React.FC<Iinput> = ({ label, value }) => {
  return (
    <Col>
      <InputGroup className="my-2" >
        <InputGroup.Text
          className="primary muted"
          id="search"
        >
          <span className="label label-default">{label}</span>
        </InputGroup.Text>
        <Form.Control
          aria-label="id for batch you want to receive"
          aria-describedby="search"
          type="text"
          value={value === 0 ? '' : value}
          readOnly
          placeholder={label}
        />
      </InputGroup>
    </Col>

  )
}

