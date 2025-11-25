import { useEffect, useRef } from "react";

export default function MovingSquare() {
    const leftDoor = useRef(null);
    const rightDoor = useRef(null);

    const posLeft = useRef(0);
    const posRight = useRef(0);

    const speed = 1;

    useEffect(() => {
        document.body.style.overflowX = "hidden";

        let leftTick;
        let rightTick;

        const tickAnimateLeft = () => {
            posLeft.current -= speed;
            leftDoor.current.style.left = posLeft.current + "px";
            leftTick = requestAnimationFrame(tickAnimateLeft);
        };

        const tickAnimateRight = () => {
            posRight.current -= speed;
            rightDoor.current.style.left = -posRight.current + "px";
            rightTick = requestAnimationFrame(tickAnimateRight);
        };

        tickAnimateLeft();
        tickAnimateRight();

        return () => {
            document.body.style.overflowX = "auto"; // pas avoir de deroulement
            cancelAnimationFrame(leftTick);
            cancelAnimationFrame(rightTick);
        };
    }, []);
    const imgStyle = {
            width: "100vw",
            height: "100vh",
            objectFit: "cover"
        };

    return (
        <div>        
            <img 
                src="./src/images/2907_final.png" 
                style={{ position: "absolute", zIndex: 2, top: 0, left: 0, ...imgStyle }}
            />

            <div 
                ref={leftDoor}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 1,
                }}
            >
                <img src="./src/images/2907_left.png" style={imgStyle} />
            </div>

            <div 
                ref={rightDoor}
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 1,
                }}
            >
                <img src="./src/images/2907_right.png" style={imgStyle} />
            </div>
        </div>
    );
}