import { Component, OnInit, Input, EventEmitter, ViewChild } from '@angular/core';
import { MzModalComponent, MzBaseModal } from 'ngx-materialize';
declare var $: any;
@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.sass']
})
export class AuthDialogComponent extends MzBaseModal {
  @Input('auth-mode') authMode: 'Login' | 'Sign Up' = 'Login';

  @ViewChild('bottomSheetModal', { static: false }) modal: MzModalComponent;

  public modalOptions: Materialize.ModalOptions = {
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    // ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
    //   alert('Ready');
    //   console.log(modal, trigger);
    // },
    // complete: () => { alert('Closed'); } // Callback for Modal close
  };
  
  openDialog(mode: 'Login' | 'Sign Up' = 'Login') {
    this.authMode = mode;
    this.modal.openModal();
  }

  closeDialog() {
    this.modal.closeModal();
  }


  onLoginFormResult(e) {


    if (e.signedIn){
      this.closeDialog();
    } else {
      alert(e.err.json().errors[0]);
    }
  }

  onRegisterFormResult(e) {
    if (e.signedUp) {
      this.closeDialog();
    } else {
      alert(e.err.json().errors.full_messages[0]);
    }
  }

  isLoginMode() { return this.authMode === 'Login'; }
  isRegisterMode() { return this.authMode === 'Sign Up'; }

}
