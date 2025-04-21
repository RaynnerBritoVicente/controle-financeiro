import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa"; //importando icone do react-icons


const EditTransac = ({ transac }) => {
  const [valor, setValor] = useState(transac.valor);

  const editarValor = async e => {
    e.preventDefault();
    try {
      const body = { valor };
      const response = await fetch(
        `http://localhost:5000/transac/${transac.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
      <>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${transac.id}`}>
          <FaEdit />
          </button>

          <div class="modal" id={`id${transac.id}`} onClick={() => setValor(transac.valor)} >
          <div class="modal-dialog">
              <div class="modal-content">

              <div class="modal-header">
                  <h4 class="modal-title">Editar Transação</h4>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={() => setValor(transac.valor)}></button>
              </div>

              <div class="modal-body">
                  <input type="number" className='form-control' value={valor} onChange={(e) => setValor(e.target.value)} />
              </div>

              <div class="modal-footer">
                  <button type="button" class="btn btn-warning" data-bs-dismiss="modal" onClick={e => editarValor(e)} >Editar</button>
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() => setValor(transac.valor)}>Fechar</button>
              </div>

              </div>
          </div>
          </div>
      </>
  )
}

export default EditTransac