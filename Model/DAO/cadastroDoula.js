const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const selectAllCadastradosDoula = async function(){
    try{
        let sql = 'select * from usuario_doula order by id_usuario_doula desc'

        let rsCadastro = await prisma.$queryRawUnSafe(sql)
        return rsCadastro
    } catch (error) {
        console.log(error);

        return false
    }
}

const inserirCadastro = async function(cadastro){
    try {
        let sql
        if(cadastro.foto_doula == null ||
            cadastro.foto_doula == "" ||
            cadastro.foto_doula == undefined) {

                sql = `insert into usuario_doula(
                    nome_doula,
                    sobrenome_doula,
                    email,
                    senha_doula,
                    cpf_doula,
                    sobremim_doula,
                    foto_doula,
                    tempo_de_atuacao
                    ) values (
                        '${cadastro.nome_doula}',
                        '${cadastro.sobrenome_gestante}',
                        '${cadastro.email}',
                        SHA1('${cadastro.senha_doula}') null,
                        '${cadastro.cpf_doula},
                        '${cadastro.sobremim_doula}',
                        '${cadastro.foto_doula}',
                        '${cadastro.tempo_de_atuacao}',
                        null
                      )`  
            }   else {
                sql = `insert into usuario_doula(
                    nome_doula,
                    sobrenome_doula,
                    email,
                    senha_doula,
                    cpf_doula,
                    sobremim_doula,
                    foto_doula,
                    tempo_de_atuacao
                    ) values (
                        '${cadastro.nome_doula}',
                        '${cadastro.sobrenome_gestante}',
                        '${cadastro.email}',
                        SHA1('${cadastro.senha_doula}') null,
                        '${cadastro.cpf_doula},
                        '${cadastro.sobremim_doula}',
                        '${cadastro.foto_doula}',
                        '${cadastro.tempo_de_atuacao}',
                      )`
            }
        }
}

const editarCadastro = async function (cadastro, id_usuario_doula) {
    try {
        let sql

        if (cadastro.foto_doula == null ||
            cadastro.foto_doula == "" ||
            cadastro.foto_doula == undefined)
            {
                sql `update usuario_doula set
                nome_doula = '${cadastro.nome_doula}',
                sobrenome_doula = '${cadastro.sobrenome_doula}',
                email = '${cadastro.email}',
                senha_doula = '${cadastro.senha_doula}',
                cpf_doula = '${cadastro.cpf_doula}',
                sobremim_doula = '${cadastro.sobremim_doula}',
                foto_doula = '${cadastro.foto_doula}',
                tempo_de_atuacao '${cadastro.tempo_de_atuacao}'
                where id = ${id_usuario_doula}`
            } else {
                sql `update usuario_doula set
                nome_doula = '${cadastro.nome_doula}',
                sobrenome_doula = '${cadastro.sobrenome_doula}',
                email = '${cadastro.email}',
                senha_doula = '${cadastro.senha_doula}',
                cpf_doula = '${cadastro.cpf_doula}',
                sobremim_doula = '${cadastro.sobremim_doula}',
                foto_doula = '${cadastro.foto_doula}',
                tempo_de_atuacao '${cadastro.tempo_de_atuacao}'
                where id = ${id_usuario_doula}`
            }

            let result = await prisma.$executeRawUnsafe(sql)

            if (result) {
                return true
            } else {
                return false
            }
    } catch (error) {
        return false
    }

    // let result = await prisma.$executeRawUnsafe(sql)
    // if(result){
    //     return true
    // } else {
    //     return false
    // } catch (error){
    //     console.log(error)

    //     return false
    // }
}

const returnId = async function (){
    try {
        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from usuario_doula limit 1'
        let rsId = await prisma.$queryRawUnSafe(sql)

        return rsId
    } catch (error) {
        return false
    }
}

const selectByIdCadastro = async function (id) {
    try {
        let sql = `select * from usuario_doula where id_usuario_doula = ${id}`

        let rsCadastro = await prisma.$queryRawUnSafe(sql)
        return rsCadastro
    } catch (error) {
        return false
    }
}


module.exports={
    selectAllCadastradosDoula,
    selectByIdCadastro,
    returnId,
    editarCadastro,
    inserirCadastro
}