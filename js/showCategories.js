export function showCategories() {
    let rawCategories = localStorage.getItem("categories");
    let categories = JSON.parse(rawCategories);
    let html = '';
    let categoriesArray = Object.values(categories);
    categoriesArray.forEach(element => {
        html += `
            <input type="checkbox" class="filter cat" name="" id="${element}" value="${element}"> 
            <span>${element}.</span>
        `;
    });
    document.getElementById("typeDiv").innerHTML = html;
}