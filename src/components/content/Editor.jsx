import React, {useEffect, useState} from "react";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import { saveAs } from 'file-saver';
import Node from "./Node"
import document from '../../assets/document.svg'

function Editor(props) {
    const [hoverFile, setHoverFile] = useState(false);

    const [data, setData] = useState(null)
    const [nodes, setNodes] = useState(null)
    const [advanced, setAdvanced] = useState(false)

    function updateData(updates) {
        var jsonObject = JSON.parse(JSON.stringify(data))
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                jsonObject[key] = updates[key];
            }
        }
        setData(jsonObject);

        // TODO: Save the data in localStorage so it doesn't get lost when ppl switch to another page
    }

    function drop(e) {
        e.preventDefault();
        setHoverFile(false);

        
        if(e.dataTransfer.files && e.dataTransfer.files.length==1) {
            var file = e.dataTransfer.files[0]
            const reader = new FileReader();

            // Handle when file is read
            try {
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
            catch(e) {
                alert("ERROR. Make sure you are dropping a text file.")
            }
        }
        else if(e.dataTransfer.files.length>1) {
            alert("Drag and drop one file at a time.")
        }
        else {
            alert("ERROR. Try again.")
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

    return <Container data-bs-theme="dark" style={{justifyItems: 'center'}}>
        { data==null ? <div style={ hoverFile ? {...styles.dragBox, ...styles.dragBoxHover} : {...styles.dragBox}} 
        onDragOver={(e)=>{dragover(e)}} onDrop={(e)=>drop(e)} onDragLeave={(e)=>{dragleave(e)}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <h2 style={{margin: '1rem'}}>Drag your annotation .txt file here!</h2>
                <img style={{width: '100px', filter: 'invert(100%)'}} src={document} alt="document icon" />
            </div>
        </div> : 
        <>
            {/* TODO: Add map name to top and maybe a cool pic*/}
            {/* TODO: Add a warning to not use colons, braces, and brackets bc that fucks with the parser */}
            {/* TODO: Add filters for grenade, spot, line, position, and text */}
            {/* TODO: Make a col and row system that user can customize */}
            {/* TODO: Add button to delete the entire node from the json file */}
            <div style={{color: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <Form.Check type="switch" onChange={()=>setAdvanced((prev)=>!prev)} checked={advanced} label="Advanced"/>
                <Button variant="danger" onClick={()=>{
                    if(confirm('Are you sure you want to edit a new file? You will lose your current progress.')) {
                        setData(null)
                        setNodes(null)
                    }
                }}>Edit New File</Button>
                <Button variant="success" onClick={()=>{
                    var string = toKV3(data)
                    const blob = new Blob([string], {type: 'text'})
                    saveAs(blob, 'annotations.txt')
                }}>Save File</Button>
            </div>
            {Object.keys(nodes).map((key)=><Node key={key} advanced={advanced} k={key} updateData={(e)=>updateData(e)} allNodes={nodes} localProps={nodes[key]}></Node>)}
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

        try {
            string = JSON.stringify(JSON.parse(string))
            return JSON.parse(string);
        }
        catch(error) {
            return new Error("Error parsing KV3 file. Make sure you have a valid annotation file. Try to avoid using colons ( : ), quotes ( \"\" ), and braces ( {} )") 
        }
    }

    function toKV3(json) {

        var converted = JSON.stringify(json, null, 4)
        converted = converted.replace(/"([^"]+)":/g, '$1 =')  // Replace "key": with key =

        // Find commas within quotes and replace it with | for the next step
        converted = replaceCommasInQuotes(converted, '||||||||') // if someone decides to use 8 pipes they deserve to get it replaced

        converted = converted.replace(/,\s*(?=[^\]]*(?:\[|$))/g, ' ') // replace all commas not within brackets
        .replace(/\|\|\|\|\|\|\|\|/g, ',') // replace the 8 pipes back with commas

        converted = '<!-- kv3 encoding:text:version{e21c7f3c-8a33-41c5-9977-a76d3a32aa0d} format:generic:version{7412167c-06e9-4698-aff2-e63eb59037e7} -->\n'
        + converted
        
        return converted
    }
    
    // Brute force because I'm too stupid to write regex
    function replaceCommasInQuotes(input, replacement = ';') {
        let result = '';
        let insideQuotes = false;
    
        for (let i = 0; i < input.length; i++) {
            const char = input[i];

            if (char === '"' && (i === 0 || input[i - 1] !== '\\')) {
                insideQuotes = !insideQuotes;
            }
            if (char === ',' && insideQuotes) {
                result += replacement;
            } else {
                result += char;
            }
        }
        return result;
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