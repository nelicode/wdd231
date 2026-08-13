export function openModal(contentHTML) {
    closeModal();
    const modal = document.createElement('div');
    modal.className = 'modal open';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
    <div class="modal-content">
      <span class="close" aria-label="Close modal">&times;</span>
      <div id="modal-body">${contentHTML}</div>
    </div>
  `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    modal.querySelector('.close').addEventListener('click', closeModal);
    document.addEventListener('keydown', handleEsc);
}

export function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
        document.removeEventListener('keydown', handleEsc);
    }
}

function handleEsc(e) {
    if (e.key === 'Escape') closeModal();
}