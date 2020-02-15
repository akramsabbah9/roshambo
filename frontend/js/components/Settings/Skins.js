import { faFish, faHippo, faKiwiBird, faOtter } from "@fortawesome/free-solid-svg-icons";

export const skins = [
    {
        name: "Power Move",
        id: 0,
        description: "Swift, Agile, Nimble. Just 3 adjectives needed to defeat any opponent",
        price: 0,
        avatar: {
            name: faFish,
            style: {
                color: 'green'
            }
        }
    },{
        name: "Lion in Lair Skin",
        id: 1,
        description: "Bring fierceness with Lion in Lair skin",
        price: 5,
        avatar: {
            name: faKiwiBird,
            style: {
                color: 'purple'
            }
        }

    },{
        name: "Princess Smoothie Skin",
        id: 2,
        description: "Show off attitude and spunk with Princess Smoothie skin",
        price: 5,
        avatar: {
            name: faOtter,
            style: {
                color: 'pink'
            }
        }
    },{
        name: "Angry Henery Skin",
        id: 3,
        description: "Show your opponent's you mean strictly business with Angry Henery skin",
        price: 5,
        avatar: {
            name: faHippo,
            style: {
                color: 'red'
            }
        }
    },
]