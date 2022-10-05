let API_URL = "http://localhost:3000";

function marcarTodos() {
  let todos = document.querySelectorAll('[data-check="acao"]');

  todos.forEach((cadaCheck) => {
    cadaCheck.checked = true;
  });
}

function buscarParaEditar(id) {
  // input_editar_id.value = id;
  fetch(API_URL + "/contatos/" + id)
    .then((res) => res.json())
    .then((dados) => {
      input_editar_id.value = dados.id
      input_editar_Nome.value = dados.Nome;
      input_editar_Telefone.value = dados.Telefone;
      input_editar_Cidade.value = dados.Cidade;
    });
}
function inserir() {
  event.preventDefault();

  let dados = {
    Nome: input_nome.value,
    Numero: parseInt(input_telefone.value),
    Cidade: input_cidade.value
  };
  console.log(dados);
  fetch(API_URL+'/Contatos', {
    method: "POST",
    body: JSON.stringify(dados),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((resposta) => resposta.json())
    .then((resposta) => atualizarLista());
  form_add.reset();
}

function editar() {
  event.preventDefault();

  let dados = {
   Nome: input_editar_nome.value,
   Numero: input_editar_telefone.value,
    Cidade: input_editar_cidade.value
  };
  fetch(API_URL + "/contatos/" + input_editar_id.value, {
    method: "PATCH",
    body: JSON.stringify(dados),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(() => atualizarLista());
  let x = document.querySelector('[data-bs-dismiss="offcanvas"]');
  x.dispatchEvent(new Event("click"));
}

function excluir(id) {
  let resposta = confirm("Você tem certeza?");
  if (resposta !== true) return;
  fetch(API_URL + /contatos/ + id, {
    method: "DELETE",
  });
}

async function excluir(id) {
  let = resposta = confirm("voce tem certeza?");

  if (resposta !== true) {
    return;
  }
  await fetch(API_URL + "/contatos/" + id, {
    method: "DELETE",
  });
  atualizarLista();
}

function atualizarLista() {
  tabela_contatos.innerHTML = "";
  fetch(API_URL + "/contatos")
    .then(function (resposta) {
      return resposta.json();
    })

    .then(function (lista) {
      lista.forEach(function (cadaItem) {
        tabela_contatos.innerHTML += `
            <tr>
                <td> <input data-check="acao" type="checkbox" onclick() ></td>
                <td>${cadaItem.id}</td>
                <td>${cadaItem.Nome}</td>
                <td>${cadaItem.Numero}</td>
                <td>${cadaItem.Cidade}</td>
                <td>
                    <button onclick="buscarParaEditar(${cadaItem.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEditar" class="btn btn-warning btn-sm ">Editar</button>
                    
                    <button onclick="excluir(${cadaItem.id})" class="btn btn btn-danger">Excluir</button>
                </td>
            </tr>
            `;
      });
    });
}

atualizarLista();
