const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

const selectAllCadastrados = async function(){
try {
    let sql = 'select * from usuario_gestante order by id_usuario_gestante desc'

    let rsCadastro = await prisma.$queryRawUnsafe(sql)
    return rsCadastro

} catch (error) {

    console.log(error);

    return false
}
}

const inserirCadastro = async function(cadastro){
try {
    let sql
    if (cadastro.foto_gestante == null || 
        cadastro.foto_gestante == ""   || 
        cadastro.foto_gestante == undefined) {
        
            sql = `insert into usuario_gestante(
                nome_gestante,
                sobrenome_gestante,
                idade_gestante,
                peso_gestante,
                altura_gestante,
                email_gestante, 
                senha_gestante, 
                foto_gestante
             ) values(
                 '${cadastro.nome_gestante}',
                 '${cadastro.sobrenome_gestante}',
                 '${cadastro.idade_gestante}',
                 '${cadastro.peso_gestante}',
                 '${cadastro.altura_gestante}',
                 '${cadastro.email_gestante}',
                SHA1('${cadastro.senha_gestante}'),
                 null
             )`
         
    } else {
        sql = 
        `insert into usuario_gestante(
            nome_gestante,
            sobrenome_gestante,
            idade_gestante,
            peso_gestante,
            altura_gestante,
            email_gestante, 
            senha_gestante, 
            foto_gestante
         ) values(
             '${cadastro.nome_gestante}',
             '${cadastro.sobrenome_gestante}',
             '${cadastro.idade_gestante}',
             '${cadastro.peso_gestante}',
             '${cadastro.altura_gestante}',
             '${cadastro.email_gestante}',
             SHA1('${cadastro.senha_gestante}'),
             '${cadastro.foto_gestante}'
         )`
     
    }

const editarCadastro = async function (cadastro, id_usuario_gestante) {
    try {

        let sql

        if (cadastro.foto_gestante == null ||
            cadastro.foto_gestante == "" ||
            cadastro.foto_gestante == undefined) 
            {
            
                sql `update usuario_gestante set
                nome_gestante = '${cadastro.nome_gestante}',
                sobrenome_gestante = '${cadastro.sobrenome_gestante}',
                idade_gestante = '${cadastro.idade_gestante}',
                peso_gestante = '${cadastro.peso_gestante}',
                altura_gestante = '${cadastro.altura_gestante}',
                email_gestante = '${cadastro.email_gestante}',
                senha_gestante = '${cadastro.senha_gestante}',
                foto_gestante = null
                where id = ${id_usuario_gestante}`
               
        } else {
            
            sql `update usuario_gestante set
                nome_gestante = '${cadastro.nome_gestante}',
                sobrenome_gestante = '${cadastro.sobrenome_gestante}',
                idade_gestante = '${cadastro.idade_gestante}',
                peso_gestante = '${cadastro.peso_gestante}',
                altura_gestante = '${cadastro.altura_gestante}',
                email_gestante = '${cadastro.email_gestante}',
                senha_gestante = '${cadastro.senha_gestante}',
                foto_gestante = '${cadastro.foto_gestante}'
                where id = ${id_usuario_gestante}`
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
}
   
    let result = await prisma.$executeRawUnsafe(sql)
    if (result) {
        return true
    } else {
        return false
    }
} catch (error) {

    console.log(error);
    

    return false
}
}



const returnId = async function (){

    try {

        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from usuario_gestante limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)
        
        return rsId

    } catch (error) {
        
        return false
    }
  
}

const selectByIdCadastro = async function (id) {
    try {
        let sql = `select * from usuario_gestante where id_usuario_gestante = ${id}`
    
        let rsCadastro = await prisma.$queryRawUnsafe(sql)
        return rsCadastro
    
    } catch (error) {
        return false
    }
    
       
    }

module.exports={
    selectAllCadastrados,
    inserirCadastro,
    returnId,
    selectByIdCadastro,
    editarCadastro

}
