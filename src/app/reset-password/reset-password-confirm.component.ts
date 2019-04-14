import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-confirm-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class confirmPassword implements OnInit {
    public confirmCode: any;
    constructor(private data: DataService,private router: Router , private route: ActivatedRoute) {
    }
    ngOnInit() {
        this.confirmCode  = this.route.snapshot.paramMap.get("code");
       
       // this.confirmCode = JSON.stringify(this.confirmCode);
      //  console.log(this.confirmCode);
       //save token at header
        localStorage.setItem('TOKEN', this.confirmCode);

    }
/**
 * sendPassword
 */
public sendPassword(form: NgForm) {
  var toSend = { 
    password: form.value.pass
 }; 
 
  this.data.sendPass(toSend)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('TOKEN', res.token);
        this.router.navigate(['/']);
      },
      err => console.log('error: ', err)
  );
  }

}
