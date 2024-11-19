import React, { useEffect, useState, useContext} from "react"
import {Col, Row, Container, Button, Card, Form} from "react-bootstrap"

function LinePanel(props) {
    const [float, setFloat] = useState(true)
    const [output, setOutput] = useState('annotation_create line "label"')
    
    useEffect(()=>{
        updateOutput()
    }, [float])

    function updateOutput() {
        setOutput(`annotation_create line ${float==true ? "float" : "surface"}`)
    }

    function copy(type) {
        var copyText = document.getElementById(type);
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
    }

    return <>
        <h4>
            Text
        </h4>
        <p>
            Position yourself at a location (possibly using noclip), paste the first command in the console to create the starting point of a new line <b>at your play model's location</b>, then paste the second command in the console to generate following nodes.
        </p>
        <h4>
            Properties
        </h4>
        <Form.Check id="switch" type="switch" label="Float / Surface" onChange={()=>setFloat((p)=>!p)}></Form.Check>
        <Form.Text style={{color:'white'}}>
            Enable surface for the line nodes to be projected on the closest wall <b>that your crosshair is pointing at</b>.
        </Form.Text>
        <br />
        <h4>
            Output
        </h4>
        <h6>
            Create a starting point to a new line
        </h6>
        <Form.Control id='output1' value={output+' new'} readOnly={true} as="textarea" rows={3} />
        <Button style={{marginTop: '0.5rem', width: '10rem'}} onClick={()=>copy('output1')} variant="success">Click to Copy</Button>
        <br />
        <h6>
            Attach a point forming a line connecting to the previous node
        </h6>
        <Form.Control id='output2' value={output} readOnly={true} as="textarea" rows={3} />
        <Button style={{marginTop: '0.5rem', width: '10rem'}} onClick={()=>copy('output2')} variant="success">Click to Copy</Button>
    </> 
}
export default LinePanel