import { Component } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-retratos',
  templateUrl: './retratos.component.html',
  styleUrl: './retratos.component.css'
})
export class RetratosComponent {

  url="https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg";

  onSelect(event){
    if(event.target.files[0])
{
   let reader = new FileReader();
   reader.readAsDataURL(event.target.files[0]);
   reader.onload = (event:any)=>{
    this.url = event.target.result;
   }

  }
  }
}
