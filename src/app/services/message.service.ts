import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private modalSubject = new Subject<any>();
    modalState = this.modalSubject.asObservable();

    openModal(
        status: 'info' | 'warning' | 'success' | 'error',
        titleModal: string,
        text: string,
        cancelText?: string,
        confirmText?: string,
        onCancel?: () => void,
        onConfirm?: () => void
    ) {
        this.modalSubject.next({
            status,
            titleModal,
            text,
            cancelText: cancelText || 'Cancel',
            confirmText: confirmText || 'Confirm',
            onCancel: onCancel || (() => { }),
            onConfirm: onConfirm || (() => { }),
            open: true
        });
    }

    closeModal(result: boolean) {
        this.modalSubject.next({ open: false, result });
    }
}
