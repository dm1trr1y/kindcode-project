import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const API_BASE = 'https://paw-hut.b.goit.study/api';

const refs = {
  backdrop: document.querySelector('.adopt-modal'),
  modal: document.querySelector('.order-modal'),
  closeBtn: document.querySelector('.order-close-modal-btn'),
  form: document.querySelector('.order-form'),
};

let currentPetId = null;

function lockScroll() {
  document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  document.body.style.overflow = '';
}

export function openOrderModal(petId) {
  lockScroll();
  currentPetId = petId;
  refs.backdrop.classList.add('is-open');
}

export function closeOrderModal() {
  refs.backdrop.classList.remove('is-open');
  unlockScroll();
  refs.form.reset();
  currentPetId = null;
}

function onBackdropClick(e) {
  if (e.target === refs.backdrop) closeOrderModal();
  unlockScroll();
}

function onEsc(e) {
  if (e.key === 'Escape' && refs.backdrop.classList.contains('is-open')) {
    closeOrderModal();
    unlockScroll();
  }
}

async function onSubmit(e) {
  e.preventDefault();

  const name = refs.form.elements['order-user-name']?.value.trim();
  const rawPhone = refs.form.elements['order-user-phone']?.value.trim();
  const phone = rawPhone.replace(/\D/g, '');
  const comment = refs.form.elements['order-user-comment']?.value.trim() || '';

  if (!name || !rawPhone) {
    return;
  }

  if (name.length > 32) {
    Swal.fire({
      icon: 'warning',
      title: "Ім'я занадто довге",
      text: 'Макс. 32 символи.',
    });
    return;
  }

  if (comment.length > 500) {
    Swal.fire({
      icon: 'warning',
      title: 'Коментар занадто довгий',
      text: 'Макс. 500 символів.',
    });
    return;
  }

  if (!/^\d{12}$/.test(phone)) {
    Swal.fire({
      icon: 'warning',
      title: 'Невірний телефон',
      text: 'Введіть 12 цифр (наприклад: 380961234568). Без +, дужок і пробілів.',
    });
    return;
  }

  if (!name || !phone) {
    Swal.fire({
      icon: 'warning',
      title: 'Заповніть обов’язкові поля',
      text: "Поля Ім'я та Телефон є обов'язковими.",
    });
    return;
  }

  if (!currentPetId) {
    Swal.fire({
      icon: 'error',
      title: 'Немає id тваринки',
      text: 'Немає id тваринки',
    });
    return;
  }

  const payload = {
    name,
    phone,
    comment,
    animalId: currentPetId,
  };

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
}
