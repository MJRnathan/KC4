// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-footer',
//   templateUrl: './footer.component.html',
//   styleUrls: ['./footer.component.css']
// })
// export class FooterComponent {

// }


import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isModalOpen = false; // State to track modal visibility

  // Method to open the QR code modal
  openQRCode() {
    this.isModalOpen = true;
  }

  // Method to close the QR code modal
  closeQRCode() {
    this.isModalOpen = false;
  }
}


