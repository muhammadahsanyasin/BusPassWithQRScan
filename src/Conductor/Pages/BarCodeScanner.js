import React from 'react'
import {QrScanner} from "react-qrcode-scanner";
function BarCodeScanner() {
    const handleScan = (value) => {
        console.log({value})
    }

    const handleError = (error) => {
        console.log({error})
    }

    return (
        <div className="App">
            
            <QrScanner
                onScan={handleScan}
                onError={handleError}

                /** Default props

                 onError = (error) => console.log({error}),
                 
                 onScan = (value) => console.log({value}),
                 
                 facingMode = 'environment', // environment|face
                 
                 constraints = null, //device constraints
                 
                 onLoad = (val :{mirrorVideo, streamLabel}) => null,
                 
                 flipHorizontally = false, //flip or reflect the video output based on facing mode
                 
                 style, //section styling can be added here
                 
                 className, //classnames will be added to the section wrapper
                 
                 delay = 800, //delay between each scan
                 
                 resolution = 600, //canvas resolution
                 
                 aspectRatio = '16:9',
                       
                 showViewFinder = true,
                 
                 viewFinder = { //any valid JS-CSS can be added here
                    border: '12px solid rgba(255,255,255,0.3)',
                    position: 'absolute',
                    borderRadius: '5px',
                    width: '250px',
                    height: '250px'
                }
                 */
            />
        </div>
    );
}

export default BarCodeScanner