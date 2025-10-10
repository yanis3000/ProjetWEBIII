# Résumé sur React

## Démarrage

### Création d'un projet

```
npx create-vite@latest
nom du projet nom-de-votre-projet
cd dans votre projet
npm install react-router
```

Nettoyer ensuite le code fourni par défaut pour n'avoir que du code voulu.

Exemple de fichier à supprimer:
- app.css, index.css
- app.js

Faites un dossier "src/css", et y mettre votre fichier css : `global.css`

Créer vous un dossier "src/pages/" et y mettre une première page (ex : index.jsx)

```JavaScript
export default function Index() {
  return  <div>
            Hello!
          </div>
}
```

Établir le routage et faire un lien vers la page d'accueil (index)

```JavaScript
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import './css/global.css'; // Créer le fichier, si vous voulez

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index />} />
        </Routes>
    </BrowserRouter>
)
```

### Pour démarrer votre projet

```
npm run dev
```

### Installer Tailwind

```
npm install tailwindcss @tailwindcss/vite
```

Modifier ensuite votre fichier vite.config.js

```JavaScript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Dans votre fichier `src/css/global.css` :

```css
@import "tailwindcss";
```

## Création d'une composante

Créer un dossier "src/components" et y mettre votre composante (ex: button.jsx)

```JavaScript
export default function MainButton ({children, className = "", onClick}) {
    return (
        <button
  className={"bg-slate-500 text-white py-2 px-4 rounded cursor-pointer " + className}
  onClick={onClick}>
            {children}
        </button>
    );
}
```

Vous pouvez ensuite appeler cette composantes :

```JavaScript
    return  <div>
                <MainButton className="opacity-50" onClick={() => alert(1)}>Envoyer</MainButton>
            </div>

```

## Navigation entre les pages

### Faire un hyperlien

```JavaScript
import { NavLink } from "react-router";
// ...
<NavLink to="/contact">Contact</NavLink>
```

### Par programmation

```JavaScript
import { useNavigate } from "react-router";

export default ... {
    const navigate = useNavigate();

    const goToContact = () => {
        navigate("/")
    }
}
```

## Les hooks

### useEffect

`useEffect` permet d'appeler une fonction lorsqu'une variable change.

#### Fonction appelée seulement au chargement et "déchargement" de la composante

```JavaScript
useEffect(() => {
    console.log("démarrage");

    return () => {
        console.log("Composante est retirée/déchargement")
    }
}, [])
```

#### Fonction qui est appelé au démarrage et lorsque les variables "username" et "language" changent

```JavaScript
useEffect(() => {
    // code ici

    return () => {
        // code ici, au besoin
    }
}, [username, language])
```

### useState

`useState` permet de mettre à jour l'interface selon l'état de variables. Dans l'exemple suivant, l'interface sera modifiée deux fois. Lors du chargement initial et après 1 seconde, lorsque la variable username sera modifiée (par setUsername)

```JavaScript
const [username, setUsername] = useState("");

useEffect(() => {
    setTimeout(() => setUsername("Foo"), 1000);
}, [])

return  <>
            <span>{username}</span>
        </>
```

### useRef

`useRef` permet de conserver une variable en mémoire. En effect, si on ne fait simplement que `let username = "sadf"` dans la composante, cette variable sera recréée au prochain `render`.

```JavaScript
const [example, setExample] = useState("");
const posX = useRef(0);

let posY = 0;

useEffect(() => {
    setTimeout(() => {
        posX.current += 1;
        posY++;
        setExample("test");
    }, 1000);
}, [])

console.log(posX.current, posY); // posY sera toujours à 0, mais posX aura la bonne valeur
```

## Autres exemples

### Pour pouvoir appeler un API et éviter les problèmes de CORS lors du développement

Dans le fichier vite.config.js, ajouter:
```
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
```

### Exemple de création d'un formulaire

```JavaScript
import { useEffect, useState } from "react";

export default function Products() {
    const [products, setProducts] = useState(["Chaise", "Table", "Nappe"]);
    const [formData, setFormData] = useState({
        product_name: "",
        address: "",
    });

    const updateFormData = (property, value) => {
        let newFormData = { ...formData };
        newFormData[property] = value;
        setFormData(newFormData);
    }

    const orderProduct = (e) => {
        e.preventDefault();
        // fetch avec formData
        console.log("Appeler fetch");
    }

    return  <form onSubmit={e => orderProduct(e)}>
                <div>
                    <select value={formData.product_name}
                            onChange={e => updateFormData("product_name", e.target.value)}>
                        <option value="">Sélectionner un produit</option>
                        {
                            products.map((product) => {
                                return <option key={product}
                                    value={product}>{product}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <div>Adresse</div>
                    <textarea value={formData.address}
                        onChange={e => updateFormData("address", e.target.value)}></textarea>
                </div>
                <button type="submit">Envoyer</button>
            </form>
}
```


### Exemple d'animation en JS

```JavaScript
import { useEffect, useRef } from "react";

export default function MovingSquare() {
    const spriteNote = useRef(null);
    const posX = useRef(0);

    useEffect(() => {
        if (spriteNote.current) {
            console.log("Démarrage de l'animation");

            let tickId = null;

            const tick = () => {
                posX.current += 1;
                spriteNote.current.style.left = posX.current + "px";
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
```
