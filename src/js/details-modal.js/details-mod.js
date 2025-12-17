import axios from "axios";

function openModal() {
    document.querySelector('.details-modal').classList.add("is-open");
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.querySelector('.details-modal').classList.remove("is-open");
    document.body.style.overflow = '';
}

const refs = {
    img: document.querySelector(".d-m-img"),
    species: document.querySelector(".d-m-species"),
    name: document.querySelector(".d-m-name"),
    age: document.querySelector(".d-m-age"),
    gender: document.querySelector(".d-m-gender"),
    descr: document.querySelector(".d-m-description"),
    health: document.querySelector(".d-m-health"),
    behavior: document.querySelector(".d-m-behavior"),
    close: document.querySelector(".d-m-close"),
    btnSubmit: document.querySelector(".d-m-submit"),
    modal: document.querySelector('.details-modal')
}

// тестовий варіант коду, щоб розібратися як буде працювати відповідь сервера //
const BASE_URL = "https://paw-hut.b.goit.study";
const END_POINT = "/api/animals";
const url = `${BASE_URL}${END_POINT}`;

export async function getAnimal() {
    openModal();
   
    // замість responseData підставити змінну з даними, яку передасть Шоні //
    let responseData;
    try {
        // цей код також тестовий, його прибрати //
        const getData = await axios.get(url);
        responseData = getData.data.animals;
    } catch (err) {
        console.log(err);
    }
    if (!responseData.length) return;
    // звідси починається розмітка, готова до виведення в модалку //
    refs.img.src = responseData[0].image;
    refs.img.alt = responseData[0].name;
    refs.species.textContent = responseData[0].species;
    refs.name.textContent = responseData[0].name;
    refs.age.textContent = responseData[0].age;
    refs.gender.textContent = responseData[0].gender;
    refs.descr.textContent = responseData[0].description;
    refs.health.textContent = responseData[0].healthStatus;
    refs.behavior.textContent = responseData[0].behavior;

    refs.btnSubmit.dataset.petId = responseData[0].id;
}

refs.close.addEventListener('click', e => {
        closeModal();
    });

    document.addEventListener("keydown", e => {
        if (e.key === 'Escape') {
            closeModal();
        };
    });

    refs.modal.addEventListener('click', e => {
    if (e.target === refs.modal) {
        closeModal();
        }
        
    });
       refs.btnSubmit.addEventListener('click', () => {
        const petId = refs.btnSubmit.dataset.petId; 
        openOrderModal(petId);  
        closeModal(); 
       });

getAnimal();