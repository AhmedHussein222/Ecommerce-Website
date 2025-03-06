import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Iproduct } from '../../Models/iproduct';
import { ProductApiService } from '../../Services/product-api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
    imports: [
      ReactiveFormsModule,
      MatSnackBarModule
    ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


products: Iproduct[] =  [] as Iproduct[];
addForm: FormGroup;
show : boolean = true;


@ViewChild('id') id!: ElementRef; 




constructor(
    private productsApi : ProductApiService,
       private dialog: MatDialog,
       private snackBar: MatSnackBar
  ) {

    this.addForm = new FormGroup({
      productName: new FormControl('', [Validators.required])!,
      productImgUrl: new FormControl('', [Validators.required])!,
      productQuantity: new FormControl('', [Validators.required])!,
      productPrice: new FormControl('', [Validators.required])!,
      categoryId: new FormControl('', [Validators.required])!,
  })


   }


  ngOnInit() {
    this.productsApi.getProducts().subscribe({
      next:(data)=>{
        this.products = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
      

  addProduct(){
    this.ngOnInit();

    this.productsApi.addProduct(this.addForm.value).subscribe({
      next:()=>{
        this.showSuccess('Add Product ');
      }
    })
  }

  deleteProduct(id:string){
    this.ngOnInit();
    this.productsApi.deleteProduct(id || "").subscribe({
      next:(data)=>{
      }
    })
  }
  openConfirmDialog(id: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: { message: 'Are you sure you want to delete this item?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(id);
      }

    });
  }
    
  updateProduct(id:string){
    this.productsApi.updateProduct(this.addForm.value ,id).subscribe({
      next:()=>{
        this.showSuccess('Update Product ');

      }
    })
  }


  edit(product: Iproduct){
    this.addForm.patchValue(product);
    this.show = false;
    this.id.nativeElement.value = product.id;
    }


    // sweet alert
    showSuccess(operation: string = '') {
      this.snackBar.open(`${operation}Complete Successfully` , 'close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'success-snackbar'
      });
    }
}