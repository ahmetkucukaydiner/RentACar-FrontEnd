import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup;

  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {

  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      name:['', Validators.required]
    });
  }

  add(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.add(colorModel).subscribe(response=>{
        this.toastrService.success(response.message,'Başarılı');
      },responseError=>{
        if(responseError.error.Errors.length >0){
          for(let i = 0; responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Errors[i].message,'Doğrulama hatası');
          }
        }
      }
      );
    }else{
      this.toastrService.error('Renk girmediniz','Hata');
    }
  }
}
