import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brandModel/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm:FormGroup ;
  brand: Brand = {id: 0, name: ""};

  constructor(private brandService:BrandService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute) {};

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getByBrandId(params['id']);
    });
    this.createUpdateForm();
  }

  createUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      name:["", Validators.required]
    })
  }

  getByBrandId(id:number){
    this.brandService.getByBrandId(id).subscribe(response=>{
      this.brand = response.data
      this.brandUpdateForm.controls['name'].setValue(this.brand.name)
    })
  }

  update() {
    let brandModel:Brand = Object.assign({id: this.brand.id}, this.brandUpdateForm.value);
    if(this.brandUpdateForm.valid){
      this.brandService.update(brandModel).subscribe(response=>{
        this.toastrService.success("Marka güncellendi.");
      },responseError=>{
        if(responseError.error.Errors.length> 0){
          for(let i = 0; responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Errors[i])
          }
        }
      })
    }
    else{
      this.toastrService.error("Formda boş alanlar mevcut.");
    }
  }

  delete() {
    this.brandService.delete(this.brand).subscribe(response=>{
      this.toastrService.success(response.message);
    })
  }
}
