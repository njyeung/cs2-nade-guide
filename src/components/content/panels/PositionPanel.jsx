import React, { useEffect, useState} from "react"
import {Col, Row, Container, Button, Card, Form} from "react-bootstrap"

function PositionPanel(props) {
    const [title, setTitle] = useState('')
    const [output, setOutput] = useState('annotation_create position "label"')

    useEffect(()=>{
        updateOutput()
    }, [title])

    function updateOutput() {
        setOutput(`annotation_create position "${title ? title : "label"}"`)
    }

    function copy(type) {
        var copyText = document.getElementById(type);
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
    }

    return <>
        <h4>
            Position
        </h4>
        <p>
            Stand at the location and paste the following command in the console to generate a standing position on the ground.
        </p>
        <h4>
            Properties
        </h4>
        <Form.Label htmlFor="title">Position Title</Form.Label>
        <Form.Control placeholder="Stand here!" onChange={(e)=>setTitle(e.target.value)} value={title} id="title"/>
        <br />
        <h4>
            Output
        </h4>
        <Form.Control id='output' value={output} readOnly={true} as="textarea" rows={3} />
        <Button style={{marginTop: '0.5rem', width: '10rem'}} onClick={()=>copy('output')} variant="success">Click to Copy</Button>
    </> 
}
export default PositionPanel