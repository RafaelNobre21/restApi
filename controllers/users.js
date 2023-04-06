const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/User');
const jwt = require(`jsonwebtoken`)

  const registroSchema = Joi.object({
    email:Joi.string().email({minDomainSegments: 2, tlds:{allow: [`com`, `net`, ]}}),
    password:Joi.string().min(6).required()
  })
  
  exports.userRegister = async (req, res) => {
   

  const {email, password} = await registroSchema.validateAsync(req.body)
  if(!email){
   return res.status(422).json({error: "email e necessario"})
  }
 if(!password){
    return res.status(422).json({error: "senha e necessario"})
 }
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(req.body.password, salt);
   
 const user = {
    email:req.body.email,
    password:hashedPassword,
   }
   const existingUser = await User.findOne({email:req.body.email});
   if(existingUser){
       return res.status(409).json({error: "Email ja existe"})
   }
   try {
     await User.create(user)
     res.status(201).json({msg: "Usuario criado com sucesso"})
   } catch (error) {
    console.log(error)
    return res.status(500).json({error: "servidor pifou"})
   }
  }
   exports.userLogin = async (req, res) => {
    
    try {
      const user = await User.findOne({email:req.body.email})
      if(user){
        const check = await bcrypt.compare(req.body.password, user.password)
        if(check) {
          res.status(200).json({msg: "Usuario logado com sucesso"})
        }
       else {
        return res.status(400).json({error: "Senha invalida"})
       }      
      } else {
        return res.status(400).json({error: "Email invalida"})
      }

    } catch (error) {
      console.log(error)
      res.status(500).json({error: error})
    }
  }

  exports.updateUser = async (req, res) => {
    const newPassword = req.body.password
    const id = req.params.id
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
   

    try {
      const user = await User.findById({_id: id})
      if(!user) {
        return res.status(404).json({error: "Email nao foi encontrado"})
      }
      user.password = hashedPassword
      await user.save()
      return res.status(200).json({msg: "Senha alterada com sucesso"})
    
    } catch (error) {
      console.log(error)
      return res.status(500).json({error: "SERVIDOR PIFOU"})
    }
   
  
  
  
  }

  exports.deleteUser = async (req,res) => {
   const id = req.params.id
    try {
      const deleteID = await User.findByIdAndDelete({_id: id})
      if(deleteID) {
        return res.status(200).json({msg: "Usuario foi removido com sucesso"})
      }
      else{
        return res.status(404).json({error: "Usuario nao encontrando"})
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({error: "SERVIDOR PIFOU"})
    }
  }