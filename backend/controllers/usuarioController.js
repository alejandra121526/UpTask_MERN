import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
const registrar = async (req, res) =>{  //registro usuario 
    
    //evita los registros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email })
    
    //Alerta de usuario ya existente
    if(existeUsuario) {
        const error = new Error("Usuario ya Existe")
        return res.status(400).json({ msg: error.message })
    }

    try{
        const usuario = new Usuario(req.body)
        usuario.token = generarId()
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado)
    }catch (error) { 
        console.log(error)
    }
};
const autenticar = async (req, res) =>{

        const{email, password} = req.body
        //comprobar si el usuario existe
            const usuario = await Usuario.findOne({email})
            if(!usuario){
                const error = new Error("El Usuario  no existe ")
                return res.status(404).json({msg: error.message})
            }
                 
        // Comprobar si el usuario esta confirmado
        if(!usuario.confirmado){
            const error = new Error("Tu cuenta no ha sido confirmada ")
            return res.status(403).json({msg: error.message})
        }
// comprobar su password 
if (await usuario.comprobarPassword(password)) {
    res.json({
        usuario
    })
}else{
    const error = new Error("el pasword es incorrecto")
    return res.status(403).json({msg: error.message})
}
}




export { registrar, autenticar };