// Preguntas del test de escalada organizadas por categoría
const QUESTIONS = [
    {
        id: 1,
        text: "Mi técnica de pies (el uso que hago de los pies) empeora en el tramo más difícil de la vía.",
        category: "mental"
    },
    {
        id: 2,
        text: "Se me hinchan los antebrazos, y las manos se me empiezan a abrir incluso en vías que son fáciles para mí.",
        category: "tecnica"
    },
    {
        id: 3,
        text: "En las secuencias duras tengo dificultades para quedarme sobre apoyos de pie claves.",
        category: "fisico"
    },
    {
        id: 4,
        text: "Me entra ansiedad y me agarro cuando me acerco al paso clave.",
        category: "mental"
    },
    {
        id: 5,
        text: "Los bíceps se me cargan antes que los antebrazos.",
        category: "tecnica"
    },
    {
        id: 6,
        text: "Me cuesta colgarme de agarres pequeños que son obligados.",
        category: "fisico"
    },
    {
        id: 7,
        text: "Fallo en secuencias que ya había encadenado y me sabía de memoria.",
        category: "mental"
    },
    {
        id: 8,
        text: "Me estanco al principio de las secuencias clave. Acabo teniendo que colgar de la cuerda para descansar antes de poder darle un pegue en condiciones.",
        category: "tecnica"
    },
    {
        id: 9,
        text: "Escalo tres o cuatro días seguidos.",
        category: "fisico"
    },
    {
        id: 10,
        text: "Me entra la moto (temblor involuntario de una pierna).",
        category: "mental"
    },
    {
        id: 11,
        text: "Me fallan los brazos en vías desplomadas, por grandes que sean los agarres.",
        category: "tecnica"
    },
    {
        id: 12,
        text: "Pierdo el resuello cuando escalo.",
        category: "fisico"
    },
    {
        id: 13,
        text: "Me pongo excusas de por qué podría fracasar en una vía antes incluso de empezar a escalarla.",
        category: "mental"
    },
    {
        id: 14,
        text: "No descubro agarres ocultos en las vías.",
        category: "tecnica"
    },
    {
        id: 15,
        text: "Me cuesta quedarme de agarres romos, agujeros y/o pinzas.",
        category: "fisico"
    },
    {
        id: 16,
        text: "Me agarro a las cintas exprés, la cuerda u otro material, en vez de arriesgarme a caerme al intentar un movimiento duro que no esté seguro de poder hacer.",
        category: "mental"
    },
    {
        id: 17,
        text: "En una vía típica, siento que la mayor parte mi peso me cuelga de los brazos.",
        category: "tecnica"
    },
    {
        id: 18,
        text: "Me siento muy dolorido después de un día de escalada en roca.",
        category: "fisico"
    },
    {
        id: 19,
        text: "Antes de despegar del suelo, me cuesta visualizarme a mí mismo logrando encadenar esa vía.",
        category: "mental"
    },
    {
        id: 20,
        text: "No logro alcanzar agarres clave en vías difíciles.",
        category: "tecnica"
    },
    {
        id: 21,
        text: "En vías desplomadas y techos, me cuesta mantener los pies en la roca y evitar quedarme colgando.",
        category: "fisico"
    },
    {
        id: 22,
        text: "Mientras estoy escalando, me distrae la actividad que haya en el suelo y/o pienso si quien me asegura está prestando atención.",
        category: "mental"
    },
    {
        id: 23,
        text: "Me cuesta descifrar las secuencias.",
        category: "tecnica"
    },
    {
        id: 24,
        text: "Me agoto en la primera vía del día.",
        category: "fisico"
    },
    {
        id: 25,
        text: "Me cuesta más escalar cuando hay espectadores.",
        category: "mental"
    },
    {
        id: 26,
        text: "Se me van los pies de los apoyos sin que me lo espere.",
        category: "tecnica"
    },
    {
        id: 27,
        text: "Me duelen las rodillas o los codos cuando me entreno o escalo con regularidad.",
        category: "fisico"
    },
    {
        id: 28,
        text: "Cuando estoy escalando de primero una vía segura, tengo dificultades para llegar a mi límite.",
        category: "mental"
    },
    {
        id: 29,
        text: "Me cuesta encontrar posturas de reposo a media vía en las que pueda descargar los brazos.",
        category: "tecnica"
    },
    {
        id: 30,
        text: "Mi primer pegue a una vía difícil suele ser mejor que el segundo o tercer pegue del día.",
        category: "fisico"
    }
];

const CATEGORY_NAMES = {
    mental: 'Mental',
    tecnica: 'Técnica y Táctica',
    fisico: 'Físico'
};

const RATING_LABELS = [
    'Casi siempre',
    'A menudo',
    'Mitad',
    'A veces',
    'Raramente',
    'Nunca'
];
