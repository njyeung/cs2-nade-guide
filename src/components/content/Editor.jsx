import React, {useEffect, useState} from "react";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import Node from "./Node"
import document from '../../assets/document.svg'

function Editor(props) {
    const [hoverFile, setHoverFile] = useState(false);
    const [data, setData] = useState(null)
    const [nodes, setNodes] = useState(null)

    function drop(e) {
        e.preventDefault();
        setHoverFile(false);
        alert('EDITOR COMING SOON')
        return

        if(e.dataTransfer.files && e.dataTransfer.files.length==1) {
            var file = e.dataTransfer.files[0]
            const reader = new FileReader();

            // Handle when file is read
            reader.onload = function(event) {
                const text = event.target.result;
                var obj = parseKV3(text);
                setData(obj);

                var clonedObj = JSON.parse(JSON.stringify(obj))
                delete clonedObj.MapName
                delete clonedObj.ScreenText 
                setNodes(clonedObj)
            };
            reader.readAsText(file);
        }
    }

    function dragover(e) {
        e.preventDefault();
        setHoverFile(true);
    }

    function dragleave(e) {
        e.preventDefault();
        setHoverFile(false);
    }

    return <Container style={{justifyItems: 'center'}}>

        { data==null ? <div style={ hoverFile ? {...styles.dragBox, ...styles.dragBoxHover} : {...styles.dragBox}} 
        onDragOver={(e)=>{dragover(e)}} onDrop={(e)=>drop(e)} onDragLeave={(e)=>{dragleave(e)}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <h2 style={{margin: '1rem'}}>Drag your annotation .txt file here!</h2>
                <img style={{width: '100px', filter: 'invert(100%)'}} src={document} alt="document icon" />
            </div>
        </div> : 
        <>
            <div style={{color: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <Form.Check type="switch" label="Advanced"/>
                <Button variant="danger" onClick={()=>{
                    if(confirm('Are you sure you want to edit a new file? You will lose your current progress.')) {
                        setData(null)
                        setNodes(null)
                    }
                }}>Edit New File</Button>
                <Button variant="success">Save As</Button>
            </div>
            {Object.keys(nodes).map((key)=><Node key={key} k={key} allNodes={nodes} localProps={nodes[key]}></Node>)}
        </>
        }
        
    </Container>

    // KV3 to JSON 
    function parseKV3(kv3String) {
        // Remove KV3 metadata lines at the top (if they exist)
        const cleanInput = kv3String.replace(/<!--.*?-->/g, "").trim();

        // THIS IS SO COOKED
        var string = cleanInput
        .replace(/([a-zA-Z0-9_]+)\s*=/g, '"$1":') // Convert `key = value` to `"key": value`
        .replace(/(?<=[\"\}\]])\s*(?=[\"\{])/g, ',') // put commas after " and } and ], but not when } follows
        .replace(/(?<=(true|false|null))\s*(?=["\}\]])/g, ',') // putting commas after true and false
        .replace(/:\s*","/g, ': ""') // edge case, we fix the issue when "" becomes ","
        .replace(/(:\s*[-]?\d*\.?\d+)/g, '$1,') // find numbers and put commas after them
        .replace(/(:\s*[-]?\d*\.?\d+),\s*}/g, '$1 }') // edge case: find numbers that come before a } and remove their commas
        .replace(/(true|false|null),\s*}/g, '$1 }')// edge case: find bools that come before a } and remove their commas

        string = JSON.stringify(JSON.parse(string))
        try {
            return JSON.parse(string);
        }
        catch(error) {
            alert("Error parsing KV3 file, try to avoid using colons ( : ), quotes ( \"\" ), and braces ( {} )")
            return null
        }
    }

    function toKV3(json) {
        function convertObject(obj, depth = 0) {
            const indent = "    ".repeat(depth); // 4-space indentation for readability
            const lines = [];
    
            for (const key in obj) {
                const value = obj[key];
    
                if (Array.isArray(value)) {
                    // Format arrays as KV3-compatible
                    lines.push(`${indent}${key} = [ ${value.join(", ")} ]`);
                } else if (typeof value === "object" && value !== null) {
                    // Format nested objects
                    lines.push(`${indent}${key} =`);
                    lines.push(`${indent}{`);
                    lines.push(convertObject(value, depth + 1));
                    lines.push(`${indent}}`);
                } else if (typeof value === "string") {
                    // Wrap strings in double quotes
                    lines.push(`${indent}${key} = "${value}"`);
                } else {
                    // Handle booleans, numbers, and other primitives
                    lines.push(`${indent}${key} = ${value}`);
                }
            }
    
            return lines.join("\n");
        }
    
        return `{\n${convertObject(json)}\n}`;
    }
    
}

const styles = {
    dragBox: {
        width: '100%', height: '500px', margin: '2rem', color: 'white', display: 'flex', transition: '0.3s', backgroundColor: 'rgba(0, 0, 0, 0.1)',
        border: '0.3rem dashed rgb(255,140,0)', borderRadius: '3rem', justifyContent: 'center', alignItems: 'center'
    },
    dragBoxHover: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    }
}
export default Editor;