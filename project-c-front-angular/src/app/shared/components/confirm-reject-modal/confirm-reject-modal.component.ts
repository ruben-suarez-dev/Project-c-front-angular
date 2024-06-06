import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-reject-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-reject-modal.component.html',
  styleUrl: './confirm-reject-modal.component.scss'
})
export class ConfirmRejectModalComponent {

  @Input() title!: string;
  @Input() message!: string;
  @Input() confirmButton!: string;
  @Input() rejectButton!: string;

  @Output() cancelAction = new EventEmitter<void>();
  @Output() confirmAction = new EventEmitter<void>();

  cancel() {
    this.cancelAction.emit();
  }

  confirm() {
    this.confirmAction.emit();
  }

}
