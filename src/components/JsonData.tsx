import { Button } from "@mui/material";
import { FC } from "react";
import { useLocation } from "react-router-dom";

import { style } from "../styles/components"
import {jsonLocation} from "../types/navigation"

const JsonData : FC = ()=>{

    const location = useLocation()
    const {item} = location.state as jsonLocation

    return <>
        <Button
            data-testid={"backButton"}
            style={{
                margin:20
            }}
            onClick={()=>{
                window.history.back()
            }}
        > 
            {"< Back"}
        </Button>
        <pre 
            data-testid={"json"}
            style={style.json}
        >
            {JSON.stringify(item, null, 4)}
        </pre>
    </>
}

export default JsonData