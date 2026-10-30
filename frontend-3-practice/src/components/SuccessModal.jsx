import { useEffect, useRef, useState } from 'react';

export default function SuccessModal({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  return (
    <dialog className={`success-modal ${isClosing ? 'closing' : ''}`} ref={dialogRef}>
      <div className="modal-content">
        <h2 className="modal-title">Вы записаны!</h2>
        <p className="modal-desc">Отлично! Ваша запись подтверждена.<br/>Ждём вас! Будет стильно.</p>
        <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={handleClose}>
          На главную
        </button>
      </div>
    </dialog>
  );
}
