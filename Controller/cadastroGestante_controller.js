const message = require('../Modulo/config')
const cadastroDAO = require('../Model/DAO/cadastroGestante')

const getListarCadastro = async function(){
let cadastroJSON= {}

let cadastro = await cadastroDAO.selectAllCadastrados()

if (cadastro) {

    if (cadastro.length) {
        cadastroJSON.cadastro = cadastro
        cadastroJSON.quantidade = cadastro.length
        cadastroJSON.status_code = 200
        return cadastroJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
    
} else {
    return message.ERROR_INTERNAL_SERVER_DB
}
}

const setInserirNovoCadastro = async function(cadastro, contentType){
try {
 
    if (String(contentType).toLowerCase() == 'application/json') {

        let resultDadosCadastro = {}


        if (cadastro.nome_gestante== "" || cadastro.nome_gestante == undefined || cadastro.nome_gestante.length > 80 ||
            cadastro.sobrenome_gestante == "" || cadastro.sobrenome_gestante == undefined || cadastro.sobrenome_gestante.length > 80||
            cadastro.idade_gestante == "" || cadastro.idade_gestante == undefined  ||
            cadastro.peso_gestante == "" || cadastro.peso_gestante == undefined || cadastro.peso_gestante.length > 10 ||
            cadastro.altura_gestante == "" || cadastro.altura_gestante == undefined || cadastro.altura_gestante.length > 10 ||
            cadastro.email_gestante == "" || cadastro.email_gestante == undefined || cadastro.email_gestante.length > 254 ||
            cadastro.senha_gestante == "" || cadastro.senha_gestante == undefined || cadastro.senha_gestante.length > 40 
        ) {

            return message.ERROR_REQUIRED_FIELDS 

        } else {

            let validarDados = false

            if (cadastro.foto_gestante != null &&
                cadastro.foto_gestante != undefined &&
                cadastro.foto_gestante != ""
            ) {
                if (cadastro.foto_gestante.length > 300) {

                    return message.ERROR_REQUIRED_FIELDS
                } else {
                    validarDados = true 
                }
            } else {
                validarDados = true 
            }

            if (validarDados) {


                let novoCadastro = await cadastroDAO.inserirCadastro(cadastro)

                if (novoCadastro) {
                    let returnId = await cadastroDAO.returnId()

                    resultDadosCadastro.status = message.SUCESS_CREATED_ITEM.status
                    resultDadosCadastro.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultDadosCadastro.message = message.SUCESS_CREATED_ITEM.message
                    resultDadosCadastro.cadastro = cadastro                  

                    resultDadosCadastro.cadastro.id = returnId[0].id

                    return resultDadosCadastro 

                } else {


                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        }
    } else {
        return message.ERROR_CONTENT_TYPE 
    }
        
    } catch (error) {
        console.log(error);
        

        return message.ERROR_INTERNAL_SERVER
    }
}

const setEditarCadastro = async function(id_usuario_gestante,contentType,cadastro) {
    
    try {
        
        if (String(contentType).toLocaleLowerCase() == 'application/json') {
            
            let resultDadosCadastro = {}
            let id_gestante = id_usuario_gestante

            if (id_gestante == '' || id_gestante == undefined || isNaN(id_gestante)) {
                
                return message.ERROR_INVALID_ID
            } else {
                let validarId = await cadastroDAO.selectByIdCadastro(id_gestante)

                if (validarId == false) {
                    
                    return message.ERROR_NOT_FOUND
                } else {
                    
                    if (cadastro.nome_gestante == "" || cadastro.nome_gestante == undefined || cadastro.nome_gestante.length > 80 ||
                        cadastro.sobrenome_gestante == "" || cadastro.sobrenome_gestante == undefined || cadastro.sobrenome_gestante.length > 80 ||
                        cadastro.idade_gestante == "" || cadastro.idade_gestante == undefined || cadastro.idade_gestante.length > 3 ||
                        cadastro.peso_gestante == "" || cadastro.peso_gestante == undefined || cadastro.peso_gestante.length > 10 ||
                        cadastro.altura_gestante == "" || cadastro.altura_gestante == undefined || cadastro.altura_gestante.length > 10 ||
                        cadastro.email_gestante == "" || cadastro.email_gestante == undefined || cadastro.email_gestante.length > 254 ||
                        cadastro.senha_gestante == "" || cadastro.senha_gestante == undefined || cadastro.senha_gestante.length > 40
                    ) {
                        
                    } else {
                        
                    }
                }
            }
        } else {
           return message.ERROR_CONTENT_TYPE 
        }
    } catch (error) {
        
    }
}

module.exports={
    getListarCadastro,
    setInserirNovoCadastro
}