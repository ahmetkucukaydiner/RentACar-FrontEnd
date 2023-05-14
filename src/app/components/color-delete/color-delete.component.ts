import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/colorModel/color';
import { ColorService } from 'src/app/services/colorService/color.service';

@Component({
  selector: 'app-color-delete',
  templateUrl: './color-delete.component.html',
  styleUrls: ['./color-delete.component.css']
})
export class ColorDeleteComponent implements OnInit{

  deletedColor:Color = {id:0, name:""};
  colorDeleteForm:FormGroup
  name:string
  id:number

  constructor(private colorService:ColorService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activatedRouter:ActivatedRoute,
    private router:Router) { }

    ngOnInit(): void {
      this.activatedRouter.params.subscribe(params=>{
        this.id = params['id']
        this.getByColorId(params['id'])
        this.createDeleteForm();
      })
    }

    getByColorId(id:number) {
      this.colorService.getById(id).subscribe(response=>{
        this.deletedColor = response.data
        this.name = this.deletedColor.name
        this.id = this.deletedColor.id
      })
    }

    createDeleteForm() {
      this.colorDeleteForm = this.formBuilder.group({
        name:["", Validators.required]
      })
    }

    delete(color:Color){
      this.colorService.delete(color).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
      }, errorResponse=>{
        if(errorResponse.error.Errors > 0){
          for(let i= 0 ; errorResponse.error.Errors.length; i++){
            this.toastrService.error(errorResponse.error.Errors[i],"Hata");
          }
        }
      })
    }

    backToColorList(){
      this.router.navigate(['/colors'])
    }

}
