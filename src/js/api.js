//Variáveis globais
let round = 1; //Número do round atual
let newResult = ''; //Dados coletados da API

init();

//Inicializa o processo de requisição dos resultados dos jogos
async function init(){
    const results = await getResultsAPI();

    createCardItens(results);
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

//Passa os dados coletados para a variável global
async function createCardItens(results){
    newResult = results;
    createData(results.data[round-1].games, round-1);
}

//Cria a estrutura do card com os dados
async function createData(result, index){

result.map((item, index) => {
    let card = document.querySelector('.cardModelContainer').cloneNode(true); //Clona o modelo de card
    let newTeamAwayId = item.team_away_id.slice(-1);
    let newTeamHomeId = item.team_home_id.slice(-1);

    //Preenche os dados no modelo
    card.setAttribute('data-key', index);
    document.querySelector('.titles p:last-of-type').textContent  = 'RODADA ' + round;
    card.querySelector('.team1 img').src = `./src/images/team_shield_${newTeamAwayId}.png`;
    card.querySelector('.team1 p').textContent  = item.team_away_name;
    card.querySelector('.score p:first-of-type').textContent  = item.team_away_score;
    card.querySelector('.score p:last-of-type').textContent  = item.team_home_score;
    card.querySelector('.team2 p').textContent  = item.team_home_name;
    card.querySelector('.team2 img').src = `./src/images/team_shield_${newTeamHomeId}.png`;

    //Preenche os dados na página
    document.querySelector('.cardBody').append(card);
})
}

//Botões do slider
const prevButton = document.querySelector(".btnLeft");
const nextButton = document.querySelector(".btnRight");

prevButton.addEventListener("click", () => {
    if (round > 1){
        round--;
        nextButton.classList.remove("btnOpacity");
    }

    round == 1 ? prevButton.classList.add("btnOpacity") : '';
    
    document.querySelector('.cardBody').innerHTML = '';
    document.querySelector('.titles p:last-of-type').textContent  = 'RODADA ' + round;

    createData(newResult.data[round-1].games, round-1);
});

nextButton.addEventListener("click", () => {
    if (round < newResult.data.length){
        round++;
        prevButton.classList.remove("btnOpacity");
    }

    round == newResult.data.length ?  nextButton.classList.add("btnOpacity") : '';

    document.querySelector('.cardBody').innerHTML = '';
    document.querySelector('.titles p:last-of-type').textContent  = 'RODADA ' + round;

    createData(newResult.data[round-1].games, round-1);
});
