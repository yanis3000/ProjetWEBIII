
export default function UiElement({ texte, image }) {
    return (
        <div 
            style={{
                width: "5vw",
                height: "7vh",
                position: "relative"
            }}
        >

            <img
                src={image}
                alt=""
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    position: "absolute",
                    filter: "brightness(0.0)", // 0 = noir, 1 = normal
                    top: 0,
                    left: 0,
                }}
            />

            <div style={{
                position: "absolute", 
                top: "80%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontFamily: "Jersey 10",
                fontSize: "1.1em",
                color: "black",

            }}>
                {texte}
            </div>


        </div>
    );
}
