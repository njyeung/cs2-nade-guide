import React, { useEffect, useState, useContext} from "react"
import {Col, Row, Container, Button, Card, Form} from "react-bootstrap"

function TextPanel(props) {
    return <>
        <label>Title</label>
        <input type="text" />
        <label>Body</label>
        <input type="text" />
        <label>Float / Surface</label>
        <Form.Check type="switch" />
        <textarea></textarea>
    </>
}
export default TextPanel