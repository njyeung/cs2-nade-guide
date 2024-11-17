import React, { useEffect, useState, useContext} from "react"
import {Col, Row, Container, Button, Card, Form} from "react-bootstrap"

function QuickCreatePanel(props) {

    const [title, setTitle] = useState('')
    const [output, setOutput] = useState('annotation_create grenade "label"')

    useEffect(()=>{
        updateOutput()
    }, [title])

    function updateOutput() {
        setOutput(`annotation_create grenade "${title ? title : "label"}"`)
    }

    function copy(type) {
        var copyText = document.getElementById(type);
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
    }

    return <>
        <h4>
            Quick Create
        </h4>
        <p>
            Stand at the location, position your cursor at the line-up, and paste the following command in the console to generate a node
        </p>
        <h4>
            Properties
        </h4>
        <Form.Label htmlFor="title">Line-up Title</Form.Label>
        <Form.Control placeholder="Window Smoke" onChange={(e)=>setTitle(e.target.value)} value={title} id="title"/>
        <Form.Text style={{color:'white'}}>
            Description is currently not accessible through the console. You must edit the outputted .txt file directly 
        </Form.Text>
        <br />
        <h4>
            Output
        </h4>
        <Form.Control id='output' value={output} readOnly={true} as="textarea" rows={3} />
        <Button style={{marginTop: '0.5rem', width: '10rem'}} onClick={()=>copy('output')} variant="success">Click to Copy</Button>
    </> 
}
export default QuickCreatePanel