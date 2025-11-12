'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import css from "./Modal.module.css";
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

const Modal = ({ children, onClose }: Props) => {
  const router = useRouter();

  const close = () => {
    if (onClose) onClose();
    else router.back();
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };
  
  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
