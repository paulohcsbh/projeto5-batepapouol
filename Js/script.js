let mensagens;

buscarMensagens();

function buscarMensagens() {
    const promessa = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );
  
  promessa.then(todasMsg);
}

function todasMsg(resposta) { 
  mensagens = resposta.data;
  renderizarMensagens();
}

function renderizarMensagens() {  
  const ulMsg = document.querySelector(".mensagens");
  ulMsg.innerHTML = "";

  for (let i = 0; i < mensagens.length; i++) {
    if(mensagens[i].type === 'status'){
        ulMsg.innerHTML += `
            <li class="entrou-saiu">                
            <span class="hora">(${mensagens[i].time})</span> <span class="nome">${mensagens[i].from }</span> ${mensagens[i].text }
            </li>   
        `;

    }
    if(mensagens[i].type === 'message'){
        ulMsg.innerHTML += `
            <li class="msg-comum">                
                <span class="hora">(${mensagens[i].time})</span> <span class="nome">${mensagens[i].from }</span> para <span class="nome">${mensagens[i].to }</span>: ${mensagens[i].text }
            </li>   
        `;

    }
    /*if(mensagens[i].type === 'private_message'){
        ulMsg.innerHTML += `
            <li class="reservada">                
            <span class="hora">(${mensagens[i].time})</span> <span class="nome">${mensagens[i].from }</span> reservadamente para <span class="nome">${mensagens[i].to }</span>: ${mensagens[i].text }
            </li>   
        `;

    }*/  
     
  }
  rolar();
}
setInterval(buscarMensagens, 3000);
/*function rolar(){
    let scrollar = document.querySelector('.mensagens');
    scrollar.scrollIntoView({block:'end'});    
}*/


const apelido = (prompt('Digite seu apelido para entrar na sala:')); 
function entrar() {   
              
    const nickName = {
      name: apelido      
    };       
    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/participants", nickName);

    promise.then(buscarMensagens);    
    promise.catch(alertaErro);
  }
  entrar() 

  
  function alertaErro(error) {
      if (error.response.status === 400) {
      alert("Apelido já cadastrado!");
      window.location.reload()
      }
        
        
  }
  function enviando(){    
        const enviarMsg = document.querySelector(".escrevendo").value;
        
        const enviar = {
            from: apelido,
            to: "Todos",
            text: enviarMsg,
            type: "message"
        };     
        
        const promise = axios.post(
          "https://mock-api.driven.com.br/api/v6/uol/messages",
          enviar
        );
        
        promise.then(buscarMensagens);
        promise.catch(erroMsg);              
      }
function erroMsg(erro){
    alert('Você não está logado!');
    window.location.reload()
}

      
  
