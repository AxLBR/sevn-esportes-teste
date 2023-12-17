let round = 1;

//Cria a estrutura do card com os dados
async function createData(result, index){
console.log(result, index)

result.map((item, index) => {
    let card = document.querySelector('.cardModelContainer').cloneNode(true);
    let newTeamAwayId = item.team_away_id.slice(-1);
    let newTeamHomeId = item.team_home_id.slice(-1);
    
    console.log(item.team_away_name + ' x ' + item.team_home_name)

    card.setAttribute('data-key', index);
    card.querySelector('.team1 img').src = `./src/images/team_shield_${newTeamAwayId}.png`;
    card.querySelector('.team1 p').textContent  = item.team_away_name;
    card.querySelector('.score p:first-of-type').textContent  = item.team_away_score;
    card.querySelector('.score p:last-of-type').textContent  = item.team_home_score;
    card.querySelector('.team2 p').textContent  = item.team_home_name;
    card.querySelector('.team2 img').src = `./src/images/team_shield_${newTeamHomeId}.png`;

    //Preenche os videos na página
    document.querySelector('.cardBody').append(card);
})
}

//Cria os itens do card com os resultados
async function createCardItens(results){

    createData(results.data[round-1].games, round-1);
}

//Faz a requisição dos dados via Axios
async function getResultsAPI(){
    const response = await axios({
        url: "https://sevn-pleno-esportes.deno.dev/",
        method: "GET"
    }).catch(function (error) {
        console.log(error);
    });
    
    return {
        success : response.status === 200,
        data : response.data
    }
}

//Inicializa o processo de requisição dos resultados dos jogos
async function init(){
    const results = await getResultsAPI();
    console.log(results);
    createCardItens(results);
}

init();
