import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogComponent } from './delete-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;

  beforeEach(async () => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      providers:[  { provide: MatDialogRef, useValue: dialogRefMock },MatDialogRef],
      declarations: [ DeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
