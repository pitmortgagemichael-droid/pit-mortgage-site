(function () {
  'use strict';
  const dialog = document.getElementById('quick-contact');
  const form = document.getElementById('quick-form');
  const name = document.getElementById('quick-name');
  const phone = document.getElementById('quick-phone');
  const interest = document.getElementById('quick-interest');
  const error = document.getElementById('quick-error');
  let opener;
  function validPhone(value) {
    return /^[+\d\s()-]+$/.test(value) && /^\d{8,15}$/.test(value.replace(/\D/g, ''));
  }
  document.querySelectorAll('[data-lead]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      opener = button;
      interest.value = button.dataset.lead;
      error.textContent = '';
      phone.removeAttribute('aria-invalid');
      if (typeof dialog.showModal !== 'function') {
        window.showHome('#contact');
        window.goToContact(button.dataset.lead);
        return;
      }
      dialog.showModal();
      name.focus();
    });
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { if (opener) opener.focus(); });
  phone.addEventListener('input', () => { phone.removeAttribute('aria-invalid'); error.textContent = ''; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!name.value.trim()) { error.textContent = '请填写你的称呼。'; name.focus(); return; }
    if (!validPhone(phone.value.trim())) {
      phone.setAttribute('aria-invalid', 'true');
      error.textContent = '请填写有效联系电话（8–15位数字，可包含国家区号）。';
      phone.focus(); return;
    }
    error.textContent = '';
    const message = ['Hi Michael, 我想预约初步咨询。', '', '称呼：' + name.value.trim(), '联系电话：' + phone.value.trim(), '咨询项目：' + interest.value].join('\n');
    window.open('https://wa.me/60174648113?text=' + encodeURIComponent(message), '_blank', 'noopener');
    error.textContent = '请在 WhatsApp 内确认并发送，Michael 才会收到。若未打开，请检查浏览器是否拦截了新窗口。';
  });
})();
