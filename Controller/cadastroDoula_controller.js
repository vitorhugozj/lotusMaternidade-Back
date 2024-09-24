const message = require('../Modulo/config')
const cadastroDAO = require('../Model/DAO/cadastroDoula')

const getListarCadastroDoula = async function(){
    let cadastroJSON = {}
    let cadastro = await cadastroDAO.selectAllCadastrados()

    if (cadastro) {
        if(cadastro.lenght){
            cadastroJSON.cadastro = cadastro
            cadastroJSON.quantidade = cadastro.lenght
            cadastroJSON.status_code = 200
            return cadastroJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const setInserirNovoCadastroDoula = async function (cadastro, contentType){
    if(String(contentType).toLowerCase() == 'application/json') {

        let resultDadosCadastroDoula = {}

        if(cadastro.nome_doula == "" || cadastro.nome_doula == undefined || cadastro.nome_doula.lenght > 80 ||
        cadastro.sobrenome_doula == "" || cadastro.sobrenome_doula == undefined || cadastro.sobrenome_doula.lenght > 80 ||
        cadastro.email_doula == "" || cadastro.email_doula == undefined || cadastro.email_doula_doula.lenght > 80 ||
        cadastro.senha_doula == "" || cadastro.senha_doula == undefined || cadastro.senha_doula.lenght > 80 ||
        cadastro.cpf_doula == "" || cadastro.cpf_doula == undefined || cadastro.cpf_doula.lenght > 80 ||
        cadastro.sobremim_doula == "" || cadastro.sobremim_doula == undefined || cadastro.sobremim_doula.lenght > 80 ||
        cadastro.foto_doula == "" || cadastro.foto_doula == undefined || cadastro.foto_doula.lenght > 80 ||
        cadastro.tempo_de_atuacao_doula == "" || cadastro.tempo_de_atuacao_doula == undefined || cadastro.tempo_de_atuacao_doula.lenght > 80
        ){
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let validarDados = false

            if (cadastro.foto_doula != null &&
                cadastro.foto_doula != undefined &&
                cadastro.foto_doula != ""
                ) {
                    if(cadastro.foto_doula.lenght > 300) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                        validarDados = true
                    }
                } else {
                    validarDados = true
                }

            if(validarDados) {
                let novoCadastro = await cadastroDAO.setInserirNovoCadastroDoula(cadastro)

                if (novoCadastro) {
                    let returnId = await cadastroDAO.returnId()

                    resultDadosCadastroDoula.status = message.SUCESS_CREATED_ITEM.status
                    resultDadosCadastroDoula.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultDadosCadastroDoula.message = message.SUCESS_CREATED_ITEM.message
                    resultDadosCadastroDoula.cadastro = cadastro

                    resultDadosCadastroDoula.cadastro.id_doula = returnId[0].id_doula

                    return resultDadosCadastroDoula
                } else {
                    return message
                }
            }
        } 
    } else {
        return message.ERROR_CONTENT_TYPE
    } 
} 

const setEditarCadastroDoula = async function(id_usuario_doula, contentType, cadastro) {
    try {
        if(String(contentType).toLocaleLowerCase() == 'application/json') {

            let resultDadosCadastroDoula = {}
            let id_doula = id_usuario_doula

            if(id_doula == '' || id_doula == undefined || isNaN(id_doula)) {
                return message.ERROR_INVALID_ID
            } else {
                let validarIdDoula = await cadastroDAO.selectByIdCadastroDoula(id_doula)
                if (validarIdDoula == false) {
                    return message.ERROR_NOT_FOUND
                } else {

                    if(cadastro.nome_doula == "" || cadastro.nome_doula == undefined || cadastro.nome_doula.lenght > 80 ||
                    cadastro.sobrenome_doula == "" || cadastro.sobrenome_doula == undefined || cadastro.sobrenome_doula.lenght > 80 ||
                    cadastro.email_doula == "" || cadastro.email_doula == undefined || cadastro.email_doula_doula.lenght > 80 ||
                    cadastro.senha_doula == "" || cadastro.senha_doula == undefined || cadastro.senha_doula.lenght > 80 ||
                    cadastro.cpf_doula == "" || cadastro.cpf_doula == undefined || cadastro.cpf_doula.lenght > 80 ||
                    cadastro.sobremim_doula == "" || cadastro.sobremim_doula == undefined || cadastro.sobremim_doula.lenght > 80 ||
                    cadastro.foto_doula == "" || cadastro.foto_doula == undefined || cadastro.foto_doula.lenght > 80 ||
                    cadastro.tempo_de_atuacao_doula == "" || cadastro.tempo_de_atuacao_doula == undefined || cadastro.tempo_de_atuacao_doula.lenght > 80
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
    getListarCadastroDoula,
    setEditarCadastroDoula,
    setInserirNovoCadastroDoula,
    getListarCadastroDoula
}