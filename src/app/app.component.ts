import { Component } from '@angular/core';
//import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder,  Validators, FormArray } from '@angular/forms';
import { InfoService } from './service/info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Form handling';


  
/**
 *   userform=new FormGroup(
    {
      name:new FormControl(''),
      email:new FormControl(''),
      phone:new FormControl(''),
      address:new FormGroup(
        {
          street:new FormControl(''),
          city: new FormControl(''),
          state: new FormControl(''),
          zip: new FormControl('')
            }
      )
    }
  )
 */

userform=this.fb.group(
  {
    name:['',Validators.required],
    email:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]{3,6}@[a-z]{3,6}.[a-z]{3,3}')]],
    phone:['',Validators.required],
    address:this.fb.group({
      street: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      zip: ['',Validators.required]
    }),

   
    addSkills:this.fb.array([
      this.fb.control('',Validators.required)
    ])
  
  })

  constructor(private fb:FormBuilder, private is:InfoService){}

  

  get addSkills()
{
  return this.userform.get('addSkills') as FormArray;
}
  addSkill()
{
  this.addSkills.push(this.fb.control(''));
}

  onSubmit(userform:any)
  {
    
    this.is.postInfo(this.userform.value);
    console.log(this.userform.value);
    this.userform.reset();
    this.userform.patchValue({
      name: 'Nancy',
      email:'nancy@gmail.com',
      address: {
        street: '123 Drew Street'
      }
    });

  }
}
