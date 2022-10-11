const registerLink = document.getElementById('registerLink');
const loginLink = document.getElementById('loginLink');
const main = document.getElementById('main');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

let formBody = {};

loginForm.style.display = 'none' // hide login form on load

registerLink.addEventListener('click', () => {
   loginForm.style.display = 'none';
   registerForm.style.display = 'block';
   formBody = {}
});

loginLink.addEventListener('click', () => {
   registerForm.style.display = 'none';
   loginForm.style.display = 'block';
   formBody = {}
});

const displayDashBoard = async(accessToken) => {
   try {
      const response = await fetch('http://localhost:5000/getAllUsers', { 
         method: 'get',
         headers: {
            authorization: `Bearer ${accessToken}`
         }
      });
      const data = await response.json();
      console.log(data)
      console.log(response)
   } catch (error) {
      console.log(error)
   }
}

const handleSubmit = async(route) => {
   try {
      const response = await fetch(route, {
         method: 'POST',
         headers: {
            "Content-Type": "application/json; charset=utf-8"
         },
         body: JSON.stringify(formBody)
      });
      const data = await response.json();
      //console.log(data);
      return data;
   } catch (error) {
      console.log(error);
   }
}

[loginForm, registerForm].forEach(i => {
   i.onchange = (e) => {
      const {name, value} = e.target;
      formBody = {
         ...formBody,
         [name]: value
      }
   }

   i.onsubmit = async(e) => {
      e.preventDefault();
      if(i.id === 'registerForm') handleSubmit('http://localhost:5000/registerUser');
      else if(i.id === 'loginForm') {
         const data = await handleSubmit('http://localhost:5000/loginUser');
         if(!data.accessToken && data.map(i => i.err).length) console.log(data);
         else displayDashBoard(data.accessToken);
      }
      else console.log('Something went wrong')
   }
})
