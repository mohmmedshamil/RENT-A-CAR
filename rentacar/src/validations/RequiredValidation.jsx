export default function RequiredValidation(values) {
  const validate = Object.keys(values.fields);
  let error = {};

  validate.forEach((item) => {
    if (values.fields[item].required && values.fields[item].value === "") {
      // error[item] = `* Required`
      if (values.fields[item].hasOwnProperty("name")) {
        error[item] = `${values.fields[item].name} is required`;
      } else {
        error[item] = `* ${item} is required`;
      }
    } else if (values.fields[item].hasOwnProperty("validate")) {
      const regX = new RegExp(values.fields[item].validate.pattern);
      if (values.fields[item].value) {
        if (!regX.test(values.fields[item].value))
          if (values.fields[item].hasOwnProperty("name")) {
            if(values.fields[item].hasOwnProperty('collegeid')){
              error[item] = "Please enter three letter college code";
              }
              else{
               error[item] = `${values.fields[item].name} is not valid`;
              }
            
          } else {
            error[item] = `${item} is not valid`;
            // error[item] = "Please enter three letter college code1";

            if(values.fields[item].clgcode){
               error[item] = "Please enter three letter college code";
              }
          }
      }
    }
    else if(values.fields[item].clgcode){

    }
  });
  console.log(error);
  return error;
}
