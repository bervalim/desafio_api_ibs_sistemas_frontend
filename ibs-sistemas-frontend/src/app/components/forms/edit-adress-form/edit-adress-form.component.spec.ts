import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdressFormComponent } from './edit-adress-form.component';

describe('EditAdressFormComponent', () => {
  let component: EditAdressFormComponent;
  let fixture: ComponentFixture<EditAdressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAdressFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAdressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
