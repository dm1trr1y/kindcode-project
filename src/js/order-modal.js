import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const API_BASE = 'https://paw-hut.b.goit.study/api';

const refs = {
  backdrop: document.querySelector('.adopt-modal'),
  modal: document.querySelector('.order-modal'),
  closeBtn: document.querySelector('.order-close-modal-btn'),
  form: document.querySelector('.order-form'),
  errorNameBox: document.querySelector('.error-name-msg-box'),
  errorNumberBox: document.querySelector('.error-number-msg-box'),
  errorCommentBox: document.querySelector('.error-comment-msg-box'),
};

let currentPetId = null;
let prevBodyOverflow = '';
let lockCount = 0;

function lockScroll() {
  lockCount++;
  prevBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = '';
  }
}

export function openOrderModal(petId) {
  currentPetId = petId;
  refs.backdrop.classList.add('is-open');
  lockScroll();
}

export function closeOrderModal() {
  refs.backdrop.classList.remove('is-open');
  unlockScroll();
  refs.form.reset();
  refs.errorCommentBox.innerHTML = '';
  refs.errorNameBox.innerHTML = '';
  refs.errorNumberBox.innerHTML = '';
  currentPetId = null;
}

function onBackdropClick(e) {
  if (e.target === refs.backdrop) closeOrderModal();
}

function onEsc(e) {
  if (e.key === 'Escape' && refs.backdrop.classList.contains('is-open')) {
    closeOrderModal();
  }
}

async function onSubmit(e) {
  e.preventDefault();
  const name = refs.form.elements['order-user-name']?.value.trim();
  const rawPhone = refs.form.elements['order-user-phone']?.value.trim();
  const phone = rawPhone.replace(/\D/g, '');
  const userComment =
    refs.form.elements['order-user-comment']?.value.trim() || '';
  let comment = '';
  let isValid = true;

  if (!name) {
    refs.errorNameBox.innerHTML = 'Будь ласка, введіть ваше імʼя.';
    isValid = false;
  } else {
    refs.errorNameBox.innerHTML = '';
  }

  if (name.length > 32) {
    refs.errorNameBox.innerHTML = 'Імʼя занадто довге. Макс. 32 символи.';
    isValid = false;
  } else {
    refs.errorNameBox.innerHTML = '';
  }

  if (userComment.length > 500) {
    refs.errorCommentBox.innerHTML =
      'Коментар занадто довгий. Макс. 500 символів.';
    isValid = false;
  } else {
    refs.errorCommentBox.innerHTML = '';
  }
  if (!phone) {
    refs.errorNumberBox.innerHTML = 'Будь ласка, введіть ваш номер телефону.';
    isValid = false;
  } else {
    refs.errorNumberBox.innerHTML = '';
  }

  if (!/^[0-9]{12}$/.test(phone)) {
    refs.errorNumberBox.innerHTML =
      'Невірний номер телефону. Введіть номер у форматі +380961234568.';
    isValid = false;
  } else {
    refs.errorNumberBox.innerHTML = '';
  }

  if (!name && !phone) {
    refs.errorNameBox.innerHTML = 'Будь ласка, заповніть всі обовʼязкові поля.';
    refs.errorNumberBox.innerHTML =
      'Будь ласка, заповніть всі обовʼязкові поля.';
    isValid = false;
  }

  if (!currentPetId) {
    Swal.fire({
      icon: 'error',
      title: 'Немає id тваринки',
      text: 'Немає id тваринки яке передається з модального вікна.',
    });
    return;
  }
  if (!userComment) {
    comment = '#без коментаря';
  } else {
    comment = userComment;
  }

  const payload = {
    name,
    phone,
    comment,
    animalId: currentPetId,
  };
  if (!isValid) {
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let msg = 'Помилка запиту. Спробуйте ще раз.';
      try {
        const errData = await res.json();
        msg = errData?.message || msg;
      } catch {}
      throw new Error(msg);
    }

    Swal.fire({
      icon: 'success',
      title: 'Заявку надіслано ✅',
      text: 'Наш менеджер зв’яжеться з вами.',
    });

    closeOrderModal();
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Не вдалося надіслати заявку',
      text: err.message,
    });
  }
}

export function initOrderModal() {
  if (!refs.backdrop || !refs.modal || !refs.closeBtn || !refs.form) return;

  refs.closeBtn.addEventListener('click', closeOrderModal);
  refs.backdrop.addEventListener('click', onBackdropClick);
  window.addEventListener('keydown', onEsc);
  refs.form.addEventListener('submit', onSubmit);
  if (refs.backdrop.classList.contains('is-open')) {
    lockScroll();
  }
}
