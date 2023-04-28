export default function validation(inputs){
/*     const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const regexPassword= /^(?=\w*\d)\S{6,10}$/;
    const regexNumber = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
 */
const regexImage =/^(ftp|http|https):\/\/[^ "]+$/;
    const errors={};
    
    if (inputs.name.length === 0) {
        errors.name ="Este campo no puede estar vacio"
        
    }
    if (inputs.name.length > 35) {
        errors.name ="Este campo no puede exceder los 35 caracteres"
        
    }
    if (inputs.summary.length === 0) {
        errors.summary ="Este campo no puede estar vacio"
        
    }
    if (inputs.summary.length > 400) {
        errors.summary ="Este campo no puede exceder los 400 caracteres"
        
    }
    if (inputs.heathScore === 0) {
        errors.healthScore ="El indice de comida saludable no puede ser 0"
        
    }

    if (inputs.pap.length === 0) {
        errors.pap ="Este campo no puede estar vacio"
        
    }
    if (inputs.pap.length > 400) {
        errors.pap ="Este campo no puede exceder los 400 caracteres"
        
    }
    if ( !regexImage.test(inputs.image)) {
        errors.image ="Este campo debe ser una url"
        
    }
    if (inputs.diets.length === 0) {
        errors.diets ="Debe haber almenos una dieta registrada"
        
    }

 
   return errors;

}