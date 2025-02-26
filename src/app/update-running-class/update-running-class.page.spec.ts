import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateRunningClassPage } from './update-running-class.page';

describe('UpdateRunningClassPage', () => {
  let component: UpdateRunningClassPage;
  let fixture: ComponentFixture<UpdateRunningClassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRunningClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
