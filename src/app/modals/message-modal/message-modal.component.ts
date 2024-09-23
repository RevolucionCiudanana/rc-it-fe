import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '@services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit, OnDestroy {
  modalData: any = {};

  private modalSubscription!: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.modalSubscription = this.messageService.modalState.subscribe(data => {
      this.modalData = data;
    });
  }

  onCancelClick(): void {
    this.modalData.onCancel();
    this.messageService.closeModal(false);
  }

  onConfirmClick(): void {
    this.modalData.onConfirm();
    this.messageService.closeModal(true);
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }
}
