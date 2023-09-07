
const Error404Screen = {
    after_render: () =>{
        console.log('error404 after render sent "ok" ')
    },
    render:() => {
        return `
        <div>Erreur 404 page non trouvée</div>
        `
    }
}

export default Error404Screen;