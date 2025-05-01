$(document).ready(function () {
  $(".clickToAdd").click(function () {
    $(".newAdminData").slideToggle("slow");
  });
});

// Check if admins array exists in localStorage
if (!localStorage.getItem("admins")) {
  const admins = [
    {
      id: 1,
      name: "Ahmed Mohamed",
      email: "ahmed@carrental.com",
      password: "Ahmed@123",
      role: "Superadmin",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Mariam Khalid",
      email: "mariam@carrental.com",
      password: "Mariam@123",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      name: "Ali Hassan",
      email: "ali@carrental.com",
      password: "Ali@12345",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
    {
      id: 4,
      name: "Sara Abdullah",
      email: "sara@carrental.com",
      password: "Sara@123",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
    {
      id: 5,
      name: "Khaled Ibrahim",
      email: "khaled@carrental.com",
      password: "Khaled@123",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
    {
      id: 6,
      name: "Nora Saad",
      email: "nora@carrental.com",
      password: "Nora@1234",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
  ];

  localStorage.setItem("admins", JSON.stringify(admins));
}

// display admins
let admins;
function displayAdmins() {
  if (localStorage.getItem("admins")) {
    admins = JSON.parse(localStorage.getItem("admins"));
    let parent = document.querySelector("tbody");
    let superAdmin_id;
    admins.forEach((admin, index) => {
      if (admin.role === "Superadmin") {
        superAdmin_id = admin.id;
        let t_SuperAdminrow = document.createElement("tr");
        t_SuperAdminrow.className = "table-danger";
        let tr_SuperAdmin = parent.appendChild(t_SuperAdminrow);
        tr_SuperAdmin.innerHTML = `
                  <th scope="row">${admin.id}</th>
                  <td>${admin.name}</td>
                  <td>${admin.email}</td>
                  <td>${admin.password}</td>
                  <td >${admin.role}</td>
                  <td>${admin.createdAt}</td>
                  <td><i class="bi bi-person-x-fill text-danger deleteAdmin" data-id='${admin.id}' data-role='${admin.role}'></td>
            
                  `;
      } else {
        let t_row = document.createElement("tr");
        let tr = parent.appendChild(t_row);
        tr.innerHTML = `
                  <th scope="row">${admin.id}</th>
                  <td>${admin.name}</td>
                  <td>${admin.email}</td>
                  <td>${admin.password}</td>
                  <td >${admin.role}</td>
                  <td>${admin.createdAt}</td>
                  <td><i class="bi bi-person-x-fill text-danger deleteAdmin" data-id='${admin.id}' data-role='${admin.role}' ></i></td>
                  `;
      }
    });
  } else {
    console.log("====================================");
    console.log("no admins in local storage");
    console.log("====================================");
  }
}

// // add new admin
// function createAdmin(role) {
//   if(role == "Superadmin"){
//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const role = document.getElementById("role").value;
//     let id = admins.length;
//     let createdAt =new Date().toISOString();
//     let new_admin={
//       id: id,
//       name: name,
//       email: email,
//       password: password,
//       role: role,
//       createdAt: createdAt,
//     }
//   //   const new_admin = { id,name, email, password,role,createdAt};
//     console.log(new_admin);
//     // Add the new user to the array
//     admins.push(new_admin);
//     // Store the updated array back to localStorage
//     localStorage.setItem("admins", JSON.stringify(admins));
//     // Clear input fields
//     document.getElementById("name").value = "";
//     document.getElementById("email").value = "";
//     document.getElementById("password").value = "";
//     document.getElementById("role").value = "";
//     alert("User created!");
    
//     location.reload();

//   }else{
//     alert("Superadmin only can add ")
//   }

// }

// delete Admin
 function deleteAdmin(currentUser_role ,superAdmin_id , admin_id , role) {

  if (currentUser_role == "Superadmin") {
    let confirmed = confirm("are you sure to delete this admin?");
    if (confirmed == true) {
        let admins = JSON.parse(localStorage.getItem("admins")) || [];
        for (let index = 0; index < admins.length; index++) {
          console.log(admin_id);
          console.log(admins[index].role);
          
            if( superAdmin_id && admins[index].id == admin_id  && admin_id != 1  && role !="Superadmin"){
                admins.splice(index , 1);
                localStorage.setItem("admins" , JSON.stringify(admins));
                location.reload();

                
            }
            
            else if(role =="Superadmin"   ){
              alert("you can't delete super Admin");
              break;
          }

        }
        
    }
    
  } else {
    alert("Superadmin only can delete")
  }
    
}


document.addEventListener("DOMContentLoaded", () => {
  let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  displayAdmins();
  // document.getElementById("AddNewAdmin").addEventListener("click", (event)=>{
  //   validateForm();
  //   if(validateForm()){
  //     createAdmin(currentUser.role )
  //   }
       
// });
  document.querySelectorAll(".deleteAdmin").forEach(element =>{
    element.addEventListener("click" , (event)=>{
        deleteAdmin(currentUser.role,currentUser.id,event.target.dataset.id ,event.target.dataset.role )
        
    });
});
// localStorage.removeItem('admins');


});
