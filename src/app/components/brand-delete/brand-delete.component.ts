import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brandModel/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css']
})
export class BrandDeleteComponent implements OnInit {

  deletedBrand: Brand = {id:0, name:""};
  brandDeleteForm : FormGroup
  name:string
  id:number

  constructor(private brandService:BrandService,
    private toastrService:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder
    ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.id=params['id']
      this.getByBrandId(params['id'])
      this.createDeleteForm();
    })
  }

  createDeleteForm() {
    this.brandDeleteForm = this.formBuilder.group({
      name:["", Validators.required]
    })
  }

  getByBrandId(id:number){
    this.brandService.getByBrandId(id).subscribe(response=>{
      this.deletedBrand = response.data
      this.name = this.deletedBrand.name,
      this.id = this.deletedBrand.id
    })
  }

  delete(brand:Brand) {
    this.brandService.delete(brand).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı");
    }, errorResponse=>{
      this.toastrService.error(errorResponse.error.message, "Başarısız!")
    })
  }

  backToBrandList() {
    this.router.navigate(['/brands/'])
  }

}
