// Função para pegar o parâmetro da URL
function getProjectParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get('project'); // ex: 'legendary-motosport'
}

// Função principal
async function loadProject() {
    const projectName = getProjectParam();
    if(!projectName) return;

    // Carrega o JSON
    const response = await fetch('../scripts/projects.json'); // caminho do seu JSON
    const data = await response.json();

    const project = data[projectName];
    if(!project) return;

    // Preencher o HTML
    document.querySelector('#project_details h1').innerText = project.titulo;
    document.querySelector('#project_details p').innerHTML = project.detalhes + '<br>' + project.detalhes2;
    document.querySelector('#project_finalization p').innerText = project.consideracoes;
    document.querySelector('#project_link a').href = project.link;
    // Preencher logo
    document.querySelector('#project_details img').src = project.logo;
    document.querySelector('#project_details img').alt = project.titulo + " logo";


    // Preencher imagens
    const imgElements = document.querySelectorAll('#project_imgs img');
    project.imagens.forEach((imgSrc, index) => {
        if(imgElements[index]) {
            imgElements[index].src = imgSrc;
        }
    });
}

// Rodar ao carregar a página
window.addEventListener('DOMContentLoaded', loadProject);