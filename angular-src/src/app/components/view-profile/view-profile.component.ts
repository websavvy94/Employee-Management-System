import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { AuthService } from '../../services/auth.service';
// import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import "rxjs/add/operator/do";
import 'rxjs/add/operator/map';

const URL = 'http://localhost:3000/users/uploadImage';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  user: Object;
  tempUser: Object;
  editableF: Boolean;
  selectedFile: File = null;

  // public uploader:FileUploader = new FileUploader({
  //   url: URL, 
  //   itemAlias: 'photo'
  // });

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private http: Http,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.user = this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
        
      },
      err => {
        console.log(err);
        return false;
      }
    );
    this.editableF = true;

    // this.uploader.onBeforeUploadItem = (fileItem: any) => {
    //   // fileItem.formData.push( { user: this.user } );
    //   // console.log(fileItem);
    //  };

    // this.uploader.onAfterAddingFile = (file)=> { 
    //   file.withCredentials = false;
    //   // console.log(file);
    // };

    // this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
    //   // console.log("ImageUpload:uploaded:", item, status, response);
    //   this.flashMessages.show('profile photo was uploaded successfully', {cssClass: 'alert-success', timeout: 3000});
    // };
  }

  editProfile(user) {
    this.editableF = false;
    this.tempUser = user;
  }

  saveProfile(user) {
    if(!this.validateService.validatePhone(user.phone)) {
      this.flashMessages.show("Please input correct phone number like a sample one", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.updateUser(user).subscribe(data => {
      if(data.success){
        this.flashMessages.show('User`s profile was updated successfully', {cssClass: 'alert-success', timeout: 3000});
        window.location.reload();
      } else {
        this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        window.location.reload();
      }
    });
  }

  cancelEdit(user) {
    // this.user = this.tempUser;
    window.location.reload();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    
    //get the total amount of files attached to the file input.
    let fileCount: number = inputEl.files.length;
    
    //create a new fromdata instance
    let formData = new FormData();
    
    //check if the filecount is greater than zero, to be sure a file was selected.
    if (fileCount > 0) { // a file was selected
      
        //append the key name 'photo' with the first file in the element
        formData.append('photo', inputEl.files.item(0), "user.png");
        //call the angular http method
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
        this.http.post(URL, formData).map((res:Response) => res.json()).subscribe(
        //map the success function and alert the response
          (success) => {
              alert(success._body);
          },
          (error) => {
            // alert(error);
          }
        )
    }
  }



    // const fd = new FormData();
    // fd.append('image', this.selectedFile, this.selectedFile.name);
    // this.http.post('http://localhost:3000/users/uploadImage', fd)
    // .subscribe(res => {
    //   console.log(res);
    // });

}
