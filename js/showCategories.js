export function showCategories() {
    let rawCategories = localStorage.getItem("categories");
    let categories = JSON.parse(rawCategories);
    
    let html = '';
    

    categories.forEach(element => {
        html += `
            <input type="checkbox" class="filter cat" name="" id="${element.id}" value="${element['category-title']}"> 
            <span>${element['category-title']}.</span>
        `;
    });
    document.getElementById("typeDiv").innerHTML = html;
}

