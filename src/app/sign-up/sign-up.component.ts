import { Component, OnInit ,      Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { isNull } from 'util';
import { NgForm, Form, NgModel, FormsModule, } from '@angular/forms';

@Component({
  selector: 'app-sign-up' ,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

public bar2: any;
public bar3: any;
public fs1: any;
public fs2: any;
public fs3: any;
public cool: any;
public errorOccured: any;
public email: string;
public counter: number;
public userName: string;
public mail: string;
public pass: string;
public confirm_pass: string;
public screenName: string;
public birthdate: string;

constructor(private data: DataService , private router: Router) { 
  
}


minDate = new Date(1900, 0, 1);
maxDate = new Date(2012, 0, 1);

/**
   *On initiallizing the sign-up component, a set of parameters are initalized too.
   *these parameters must be initialized only once
   *If user is already signed up, this page will direct him to home
   *@param void
   * @returns void
   */
ngOnInit() {
  if(!isNull(localStorage.getItem('TOKEN')))
    {
      this.router.navigate(['home']);
    }
    else 
    {this.router.navigate(['signup']);}

   this.bar2 =  document.querySelector('.secondProgress');
   this.bar3 =  document.querySelector('.thirdProgress');
   this.fs1=  document.querySelector('.fs1');
   this.fs2=  document.querySelector('.fs2');
   this.fs3 =  document.querySelector('.fs3');
   this.cool =  document.querySelector('.progress');
   this.errorOccured =  document.querySelector('.errorOccured');
   this.counter = 0;
}

/**
   *A simple CSS manipulator function to show/hide/active parameters of the view
   *@param void
   * @returns void
   */
public previousOne (){
  this.bar2.className = 'disabled';
  this.fs2.className = 'hide';
  this.fs1.className = 'show';  
}

/**
   *A simple CSS manipulator function to show/hide/active parameters of the view
   *@param void
   * @returns void
   */
  public secondStep() {
    
  this.bar2.className = 'active';
  this.fs1.className = 'hide';
  this.fs2.className = 'show';  
 }
 
/**
   *Submit function, first it redesign the view.
   *Then wrap some form values in an object 'toSend'.
   *Calls 'redesignDateFormat()' to change the date format.
   *Sends the object to the DataServices
   *@param form {NgForm} 
   *If error does exist or not, the 'whatToShow()' function is called.
   *If no errors does exist, it sends 0 to it
   *If there's an error it sends 1
   *and function 'whatToShow()' handels the situation
   * @returns void
   */

 public Submit(form: NgForm) {
  this.bar3.className = 'active';
  this.fs2.className = 'hide';
  this.fs3.className = 'show';
  //Send data to service
  const user = form.value;
  user.datepicker = this.redesignDateFormat(form.value.datepicker);
  var toSend = { 
    username:user.username, 
    email:user.email ,
    password:user.pass,
    screen_name: user.screenname,
    birth_date: user.datepicker
 }; 
 
  this.data.signUpUser(toSend)
      .subscribe(
       res => {
         console.log(res);
         this.whatToShow(0);
       },
        err => {
          console.log('error: ', err);
          this.whatToShow(1);
        }
    ); 
    
}
/**
   *Takes either 0/1 to show an error/success message at the front view.
   *@param id {number} 
   * @returns void
   */

public whatToShow(id: number) {
  if(id == 0)
  {
    //no error
    this.cool.className = 'show';
    this.errorOccured.className = 'hide';
  }
  else{
    //error
    this.cool.className = 'hide';
    this.errorOccured.className = 'show';
  }
}
/**
   *This function takes a date in a time zone format.
   *Specify the month.
   *then rearrange the date in a suitable string format.
   *@param date {string} 
   * @returns string
   */
 
redesignDateFormat(date: string): string {
  if (!date) {
    return null;
  }
  const dataArray = date.toString();  
  const dataArray2 = dataArray.split(" ",4);
  const month = (dataArray2[1]);
  var monthNum = 0;
  switch(month) { 
    case "Jan": { 
      monthNum = 1;
       break; 
    } 
    case "Feb": { 
      monthNum = 2;
       break; 
    } 
    case "Mar": { 
      monthNum = 3;
       break; 
    } 
    case "Apr": { 
      monthNum = 4;
       break; 
    } 
    case "May": { 
      monthNum = 5;
       break; 
    } 
    case "Jun": { 
      monthNum = 6;
       break; 
    } 
    case "Jul": { 
      monthNum = 7;
       break; 
    } 
    case "Aug": { 
      monthNum = 8;
       break; 
    } 
    case "Sep": { 
      monthNum = 9;
       break; 
    } 
    case "Oct": { 
      monthNum = 10;
       break; 
    } 
    case "Nov": { 
      monthNum = 11;
       break; 
    }  
    default: { 
      monthNum = 12;
      break; 
   } 
 } 
 monthNum = monthNum -1;
  const day = Number(dataArray2[2]);
  const year = Number(dataArray2[3]);
  
 return (new Date(year, monthNum, day)).toLocaleDateString();
}


}
