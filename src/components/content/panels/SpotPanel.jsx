import React, { useEffect, useState} from "react"
import {Col, Row, Container, Button, Card, Form} from "react-bootstrap"

function SpotPanel(props) {
    function copy(type) {
        var copyText = document.getElementById(type);
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
    }

    return <>
        <h4>
            Spot
        </h4>
        <p>
            Position your crosshair and paste the following command to generate a line-up.
        </p>
        <br />
        <h4>
            Output
        </h4>
        <Form.Control id='output' value={"annotation_create spot"} readOnly={true} as="textarea" rows={3} />
        <Button style={{marginTop: '0.5rem', width: '10rem'}} onClick={()=>copy('output')} variant="success">Click to Copy</Button>
    </> 
}
export default SpotPanel