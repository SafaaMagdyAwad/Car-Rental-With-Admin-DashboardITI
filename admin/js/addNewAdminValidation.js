document.addEventListener('DOMContentLoaded', function() {
    const addForm = document.getElementById('addForm');
    const usernameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const roleSelect = document.getElementById('role');
    const AddNewAdminBtn = document.getElementById('AddNewAdmin');

    const usernameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const roleError = document.getElementById('roleError');
let admins = JSON.parse(localStorage.getItem("admins"));
let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));


    
  
 
    resetInputValue();
    resetErrors();


    AddNewAdminBtn.addEventListener('click',function() {
        validateForm();

        if (!validateForm()){
            return;
        } else{
            createAdmin(currentUser.role);
            resetInputValue();
             resetErrors();

        }
    });
   
    
    
    function validateForm() {
        let isValid = true;
        
        if (usernameInput.value.length < 3 || usernameInput.value.length > 20) {

            showError(usernameError);
            isValid = false;
        }
        
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            showError(emailError);
            isValid = false;
        }
       
        
        if (passwordInput.value.length < 8) {
            showError(passwordError);
            isValid = false;
        }
       
        
        if (!roleSelect.value) {
            showError(roleError);
            isValid = false;
        }
        
        return isValid;
    }
    
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(element, message ) {
        if (message ) {
            element.innerText =message;
        };
        element.style.display='block';
    }
    function resetInputValue(){
        document.getElementById("name").value = "";
        document.getElementById("email").setAttribute.placeholder = "";
        document.getElementById("password").value = "";
        document.getElementById("role").value = "";

    }
    
    function resetErrors() {
        
        [usernameError, emailError, passwordError, roleError].forEach(el => {
            el.style.display = 'none';
        });
    }
    function isEmailRegistered(email) {
        const admins = JSON.parse(localStorage.getItem('admins')) || [];
        return [...admins].some(admin => admin.email === email);
    }
    
    function isUsernameRegistered(username) {
        const admins = JSON.parse(localStorage.getItem('admins')) || [];
        console.log([...admins].some(admin => admin.name === username));
        return [...admins].some(admin => admin.name  === username);
    }


    // add new admin
function createAdmin(role) {
    if(role == "Superadmin"){
      let id = admins.length;
      let createdAt =new Date().toISOString();
      let new_admin={
        id: id,
        name: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        role: roleSelect.value,
        createdAt: createdAt,
      }
      if (isUsernameRegistered(new_admin.name)) {
        alert('Username already taken');
        showError(usernameError, 'Username already taken');
        return;
        
    }
    if (isEmailRegistered(new_admin.email)) {
        alert('Email already registered');
        showError(emailError, 'Email already registered');
        return;
    }
      // Add the new user to the array
      admins.push(new_admin);
      // Store the updated array back to localStorage
      localStorage.setItem("admins", JSON.stringify(admins));
      // Clear input fields
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("role").value = "";
      alert("User created!");
      
      location.reload();
  
    }else{
      alert("Superadmin only can add ")
    }
  
  }
  
});