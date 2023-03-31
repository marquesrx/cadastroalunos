var cards = ""

const buscar = () => {
    const busca = document.querySelector("#campoBusca").value
    console.log(busca.length)
    if(busca.length < 4){
        alert("Digite um nome maior que 3 caracteres!")
        return;
    } 
    fetch('https://api.disneyapi.dev/character?name=' + busca)
        .then(T => T.json())
        .then(pers => pers.data)
        .then((p) => {
            cards = ""
            console.log(p)
            p && p.length > 0? p.map((pers) => {
                generateCard(pers)
            })
            : notFound()
        })
}

const generateCard = (item) => {
    console.log(item)
    let initial = "<div class=\"card\">"
    let image = "<img src=\""+item.imageUrl+"\" alt=\"Imagem do card\">"
    let initialCard = "<div class=\"card-content\">"
    let titulo = "<h2 id=\"titulo\">"+item.name+"</h2>"
    let filmes = "<p id=\"conteudo\">Filmes: <br><b>"+ (item.films.length > 0 ? item.films.slice(0, 5) : " - - -") +"</b></p>"
    let final = "</div>" 
    let escopo = "<div class=\"escopo-card\">"
    let series = "<p id=\"conteudo\">Shows de Tv: <br><b>"+ (item.tvShows.length > 0 ? item.tvShows.slice(0, 5) : " - - -") +"</b></p>"
    let games = "<p id=\"conteudo\">Video Games: <br><b>"+ (item.videoGames.length > 0 ? item.videoGames.slice(0, 5) : " - - -") +"</b></p>"
    let fimescopo = "</div>"
    let fechamento = "</div>"

    const html_completo = (initial + image + initialCard + titulo + filmes + escopo + series + games + fimescopo + final + fechamento).replace(","," <br/>")
    cards = html_completo + cards
    document.getElementById('cardContainer').innerHTML = cards;
}

const notFound = () => {
    let image = "<div><h3>Perssonagem não encontrado<h3/><img src=\"not-found.gif\" loop=infinite alt=\"Imagem do card\" width=\"200px\"><div/>"

    document.getElementById('cardContainer').innerHTML = image;
}


document.getElementById("buscar").addEventListener("click", buscar);