export default function initSampleGallery() {
  const cards = document.querySelectorAll("[data-sample]");
  if (!window.HTMLDialogElement || !HTMLDialogElement.prototype.showModal) return;

  cards.forEach((card) => {
    const dialog = document.getElementById(card.getAttribute("aria-controls"));
    if (!dialog) return;
    let previousFocus;
    const open = () => {
      if (dialog.open) return;
      previousFocus = document.activeElement;
      dialog.showModal();
      document.body.classList.add("sample-dialog-open");
      dialog.scrollTop = 0;
    };
    card.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      open();
    });
    dialog.querySelector(".sample-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      const bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("sample-dialog-open");
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
    });
    // Existing links to an individual sample still open its details.
    if (window.location.hash === `#${card.dataset.sample}`) open();
  });
}
