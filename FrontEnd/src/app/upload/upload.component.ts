/* import { Component } from '@angular/core';
import { UploadService } from './upload.service';


@Component({
  selector: 'app-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.css'],

  
})
export class UploadComponent {
  selectedFile: File | undefined;
  prediction: string | undefined;

  constructor(private uploadService: UploadService) {}
  
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
   

    if (this.selectedFile) {
      this.uploadService.uploadFile(this.selectedFile).subscribe(
        response => {
          this.prediction = response.prediction;
        },
       
        error => {
          console.error('Error uploading file:', error);
        }
      );
    } else {
      console.error('No file selected');
    }
  }
}
 */

import { Component } from '@angular/core';
import { UploadService } from './upload.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.css'],
})
export class UploadComponent {
  selectedFile: File | undefined;
  prediction: string | undefined;

  constructor(private uploadService: UploadService, private modalService: NgbModal) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.uploadService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          this.prediction = response.prediction;
          this.openModal();
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    } else {
      console.error('No file selected');
    }
  }

  openModal(): void {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.prediction = this.prediction;
  }
}

@Component({
  selector: 'app-modal-content',
  template: `
    <div class="modal-header">
      <h2 class="modal-title">Prediction</h2>
      <button type="button" class="close" aria-label="Close" (click)="close()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <h2>Prediction:</h2>
      <p>{{ prediction }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="close()">Close</button>
    </div>
  `,
})
export class ModalContentComponent {
  prediction: string | undefined;
  modalService: any;
  constructor(public activeModal: NgbActiveModal) {}

  close(): void {
    this.activeModal.close();
  }
}