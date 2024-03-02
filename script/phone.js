  const loadPhone = async (searchText='a',isMore) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
//   console.log(phones);
  displayPhones(phones,isMore);
}

const displayPhones = (phones,isMore) =>{
    // console.log(phones);

      const moreButton = document.getElementById('moreButton');
      if(phones.length > 10 && !isMore){
        moreButton.classList.remove('hidden');
      }
      else{
        moreButton.classList.add('hidden');
      }

    if(!isMore){
      phones = phones.slice(0,9);
    }
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML ='';

    phones.forEach(phone => {
      // console.log(phone);
      const phoneCard = document.createElement('div');
      phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
      phoneCard.innerHTML = `
      <figure><img src=${phone.image} alt="Shoes" /></figure>
      <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
          <button class="btn btn-primary" onclick="showDetels('${phone.slug}')"  >Show Deteles</button>
        </div>
      </div>
      `;
      phoneContainer.appendChild(phoneCard);
    });
    toggleLodingSpiner(false)
}


const handalSarch = (isMore) =>{

  toggleLodingSpiner(true)
  const searchFiled = document.getElementById('search-filed');
  const searchText = searchFiled.value;
  loadPhone(searchText,isMore);
  // console.log(searchText);
  
}


const toggleLodingSpiner = (isloding) =>{

  const lodingSpiner = document.getElementById('spinner');
  if(isloding){
    lodingSpiner.classList.remove('hidden');
  }else{
    lodingSpiner.classList.add('hidden');
  }
}

const handalMoreButton  = () =>{
const moreButton = document.getElementById('moreButton');
handalSarch(true);
}



const showDetels = async (id) =>{
const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
const detels = await res.json();

const data = detels.data;
// console.log(data);
showPhoneDeteles(data);
}


const showPhoneDeteles = (data) =>{
  const phoneName = document.getElementById('deteles-phone-name');
  show_model_deteles.showModal()
  phoneName.innerText = data.name;
  const detelesContainer = document.getElementById('deteles-container');
   detelesContainer.innerHTML = `
    
   <img src="${data.image}" alt="">
   <p class="text-xl font-bold"></p>
   <h3><span class="text-xl font-bold">brand:</span> ${data.brand}</h3>
   <h3><span class="text-xl font-bold">releaseDate:</span>${data.releaseDate} </h3>
   <h3><span class="text-xl font-bold">Id:</span>${data.slug} </h3>
   <h3><span class="text-xl font-bold">displaySize:</span> ${data.mainFeatures.displaySize}</h3>
   <h3><span class="text-xl font-bold">storage:</span> ${data.mainFeatures.storage}</h3>
   <h3><span class="text-xl font-bold">GPS:</span> ${data.others.GPS}</span></h3>
   `

  
}
loadPhone();


