
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
                    width: "90%",
                    height: "90%",
                    objectFit: "contain",
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            />

            <div style={{
                position: "absolute", 
                top: "70%",
                left: "75%",
                transform: "translate(-50%, -50%)",
                fontFamily: "Jersey 10",
                fontSize: "1.2em",
                color: "white",
                background: "linear-gradient(45deg, #000000ff, #2e2e2eff)",
                padding: "1px 6px",
                borderRadius: "5px"
            }}>
                {texte}
            </div>


        </div>
    );
}
