import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/colorModel/color';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm: FormGroup;
  color: Color = { id: 0, name: '' };
  name: string;
  id: number;

  constructor(
    private colorService: ColorService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.id = params["id"]
      this.getByColorId(params['id'])
      this.createUpdateFrom();
    })
  }

  createUpdateFrom() {
    this.colorUpdateForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  getByColorId(id:number){
    this.colorService.getById(id).subscribe(response=>{
      this.color = response.data;
      this.name = this.color.name;
      this.id = this.color.id;
    })
  }

  update() {
    let colorModel:Color = Object.assign({id:this.color.id}, this.colorUpdateForm.value);

    if(this.colorUpdateForm.valid){
      this.colorService.update(colorModel).subscribe(response=>{
        this.toastrService.success(response.message);
      }, responseError=>{
        if(responseError.error.Errors.length> 0){
          for(let i=0; responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Errors[i]);
          }
        }
      })
    }
  }

  backToColorList() {
    this.router.navigate(['colors']);
  }
}
