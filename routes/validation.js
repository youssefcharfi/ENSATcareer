const joi =require('@hapi/joi');
const registerValidation= (data) =>{
    const schema= joi.object(  {
        name:joi.string().min(6).required(),
        email:joi.string().min(6).required().email(),
        password:joi.string().min(6).required(),
        niveau:joi.number(),
        filiere:joi.string().min(5),
        isEntreprise:joi.boolean().required(),
        description:joi.string(),
        link:joi.string(),

      
      })  ;
      return schema.validate(data);


}
const loginValidation= (data) =>{
    const schema= joi.object({

        email:joi.string().min(6).required().email(),
        password:joi.string().min(8).required(),
    
    
      } ) ;
      return schema.validate(data);

}
module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;