import React from "react";




export default function Die(props){


    const styles = {
        background: props.isHeld ?  '#59E391' :  '#FFFFFF'}

    return(
        <div className="face" style={styles} onClick={props.handleClick}>
            <h2 className="die--number">{props.value}</h2>
        </div>
    )
}