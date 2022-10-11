

/* This "validateReqBodyProps" function checks if the request body properties are valid or not,
   checking if the properties sent from the client meets the requirements like
   types, is-Required, char-lenghts, pure string etc.

   This function is needed to get the client validation errors as an object with keys "errMessage" & "keyProp" => 
   { 
      errMessage: "this is the error message", 
      keyProp: ex. "firstname" or "lastname" etc.
   }.

   Then push this object to the errors array.
*/

/**
 * @param {Request} request
 */
const validateRequestBody = (request) => {
   const reqBody = {
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email,
      password: request.body.password
   }
   //console.log(request.body)

   const errors = [];
   const schema = [
      {
         name: 'First Name',
         propName: "firstname",
         value: reqBody.firstname,
         min_length: 3
      }, {
         name: 'Last Name',
         propName: "lastname",
         value: reqBody.lastname
      }, {
         name: 'Email',
         propName: "email",
         value: reqBody.email
      }, {
         name: 'Password',
         propName: "password",
         value: reqBody.password,
         min_length: 6
      }];

   schema.map(i => {
      if (!i.value) {
         errors.push({
            errMessage: `${i.name} is required, please enter ${i.name}`,
            propName: i.propName
         })
      }
      // check if the firstname and lastname from the request.body contains number, special characters or white spaces (/[\W|\d|\s]/.test(i.value))
      if ((/[\W|\d|\s]/.test(i.value) && i.propName === "firstname") || (/[\W|\d|\s]/.test(i.value) && i.propName === "lastname")) {
         errors.push({
            errMessage: `${i.name} name cannot contain numbers, special characters and white spaces`,
            propName: i.propName
         })
      }

      if ((i.min_length && i.value?.length) && (i.value?.length < i.min_length)) {
         errors.push({
            errMessage: `${i.name} must be atleast ${i.min_length} characters`,
            propName: i.propName
         })
      }
   });

   return errors;
}

module.exports = validateRequestBody;