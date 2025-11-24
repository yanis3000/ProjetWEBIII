import { useEffect, useRef } from "react";

export default function MovingSquare() {
    const spriteNote = useRef(null);
    const posX = useRef(0);
    const posY = useRef(0);

    useEffect(() => {
        if (spriteNote.current) {
            console.log("Démarrage de l'animation");

            let tickId = null;

            const tick = () => {
                posX.current += 1;
                posY.current += 1;

                if (posY.current >= window.innerHeight) {
                    posY.current -= 1;
                }
                else {
                    posY.current += 1;
                }

                if (posX.current >= window.innerWidth) {
                    posX.current -= 1;
                }
                else {
                    posX.current += 1;
                }


                spriteNote.current.style.left = posX.current + "px";
                spriteNote.current.style.bottom = posY.current + "px";
                tickId = window.requestAnimationFrame(tick);
            }

            tick();

            return () => {
                cancelAnimationFrame(tickId);
                console.log("Fin de l'animation");
            }
        }
    }, [spriteNote.current]);

    return <div ref={spriteNote} className="absolute w-10 h-10 bottom-10 bg-black" ></div>
}