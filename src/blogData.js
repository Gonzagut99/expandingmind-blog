export const blogdata = [{
    idUser: 1,
    slug: 'what-is-react',
    title: '¿Qué es React?',
    content:'React es una librería de JavaScript para construir interfaces de usuario. Fue desarrollada por Facebook y es una de las librerías más populares para construir aplicaciones web modernas. React te permite crear componentes reutilizables y construir interfaces de usuario complejas de manera sencilla.',
    author:'Andres',
    comments: [
        {
            idUser: 2,
            content: 'Excelente artículo',
        },
        {
            idUser: 3,
            content: 'Muy buena explicación',
        }]
}, {
    idUser:2,
    slug: 'what-is-jsx',
    title: '¿Qué es JSX?',
    content:'JSX es una extensión de JavaScript que te permite escribir código HTML dentro de JavaScript. JSX hace que el código sea más legible y fácil de escribir. Aunque no es necesario usar JSX con React, es muy común verlo en aplicaciones de React.',
    author:'Felipe',
    comments: [
        {
            idUser: 1,
            content: 'Muy buena explicación',
        }]
},{
    idUser:3,
    slug: 'what-is-a-component',
    title: '¿Qué es un componente?',
    content:'Un componente es una pieza reutilizable de código que encapsula una parte de la interfaz de usuario. Los componentes pueden contener otros componentes y se pueden reutilizar en diferentes partes de la aplicación.',
    author:'Pedro',
    comments: [
        {
            idUser: 2,
            content: 'Muy buen artículo',
        }]
}]
