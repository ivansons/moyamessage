import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkMessagesFormComponent } from './bulk-messages-form.component';

describe('BulkMessagesFormComponent', () => {
  let component: BulkMessagesFormComponent;
  let fixture: ComponentFixture<BulkMessagesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkMessagesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkMessagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
