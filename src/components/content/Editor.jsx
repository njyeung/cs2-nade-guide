import React, {useEffect, useState} from "react";
import { Card, Container } from "react-bootstrap";
import document from '../../assets/document.svg'

function Editor(props) {
    const [hoverFile, setHoverFile] = useState(false);

    function drop(e) {
        alert("EDITOR COMING SOON")
        e.preventDefault();
        setHoverFile(false);
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
        <div style={ hoverFile ? {...styles.dragBox, ...styles.dragBoxHover} : {...styles.dragBox}} 
        onDragOver={(e)=>{dragover(e)}} onDrop={(e)=>drop(e)} onDragLeave={(e)=>{dragleave(e)}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <h2 style={{margin: '1rem'}}>Drag your annotation .txt file here!</h2>
                <img style={{width: '100px', filter: 'invert(100%)'}} src={document} alt="document icon" />
            </div>
        </div>
    </Container>

    
}

const styles = {
    dragBox: {
        width: '100%', height: '500px', margin: '2rem', color: 'white', display: 'flex', transition: '0.3s', backgroundColor: 'rgba(0, 0, 0, 0.1)',
        border: '0.5rem dashed rgb(255,140,0)', borderRadius: '3rem', justifyContent: 'center', alignItems: 'center'
    },
    dragBoxHover: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    }
}
export default Editor;