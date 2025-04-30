export function checkDropDate(bookedCars , cars){
    let currentdate = new Date();
    /* console.log(currentdate);
    let date1 = new Date('2025-04-29:02:18')
    console.log(date1)
    console.log(currentdate > date1) */
    console.log(bookedCars);
    //sorting data of booked cars according to date
    let sortedBooked = [...bookedCars].sort((a,b)=>{
        let dateA = new Date(a['drop-date']+":"+a['drop-time']);
        let dateB = new Date(b['drop-date']+":"+b['drop-time']);
        if(dateA > dateB){
            return 1;
        }else if(dateA < dateB){
            return -1;
        }else{
            return 0;
        }
    });

    console.log(sortedBooked);


    //turn status of confirmed items to finished
    /* bookedCars.forEach(element => {
        let temp = element['drop-date'] +":" + element['drop-time'];
        let dropDate = new Date(temp);
        //console.log(dropDate);
        if (currentdate > dropDate && element.status == "confirmed") {
            //return availability to true
            cars.forEach(car=>{
                if(car.id == element['car-id']){
                    car.avilable = true;
                }
            })
        }else if (currentdate < dropDate && element.status == "confirmed") {
            //return availability to true
            confirmedArr.push(element);
        }
    }); */

    for (let index = 0; index < sortedBooked.length; index++) {

        let temp = sortedBooked[index]['drop-date'] +":" + sortedBooked[index]['drop-time'];
        let tempPick = sortedBooked[index]['pick-up-date'] +":" + sortedBooked[index]['pick-up-time'];
        let dropDate = new Date(temp);
        let pickDate = new Date(tempPick);
        //console.log(dropDate);
        if (currentdate > dropDate && sortedBooked[index].status == "confirmed") {
            //return availability to true
            cars.forEach(car=>{
                if(car.id == sortedBooked[index]['car-id']){
                    car.avilable = true;
                }
            })
        }else if (currentdate < pickDate && sortedBooked[index].status == "confirmed") {
            //return availability to true
            cars.forEach(car=>{
                if(car.id == sortedBooked[index]['car-id']){
                    car.avilable = true;
                }
            })
        }else if (currentdate > pickDate && currentdate < dropDate && sortedBooked[index].status == "confirmed") {
            //return availability to true
            cars.forEach(car=>{
                if(car.id == sortedBooked[index]['car-id']){
                    car.avilable = false;
                }
            })
        }
        
    }

    
    
    localStorage.setItem("cars" , JSON.stringify(cars));
}