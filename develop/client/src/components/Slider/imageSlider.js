import { useState } from "react"

const ImageSlider = ({slides})  => {
    const [currentIndex, setCurrentUser] = useState(0);

    const sliderStyles = {
        height: '100%',
        position: 'relative'
    }

    const slideStyles = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentIndex].url})`
    }
    const leftArrowStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        left: '32px',
        fontSize: '45px',
        color: '#fff',
        zIndex: '1',
        cursor: 'pointer'

    };

    const rightArrowStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: '32px',
        fontSize: '45px',
        color: '#fff',
        zIndex: '1',
        cursor: 'pointer'

    };

    return (
        <div style={sliderStyles}>
            <div style={leftArrowStyle}>❰</div>
            <div style={rightArrowStyle}>❱</div>
            <div 
            style={slideStyles}>
            </div>
        </div>
    )
}

export default ImageSlider