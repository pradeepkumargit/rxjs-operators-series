import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleMultipleHttpRequestsComponent } from './handle-multiple-http-requests.component';

describe('HandleMultipleHttpRequestsComponent', () => {
  let component: HandleMultipleHttpRequestsComponent;
  let fixture: ComponentFixture<HandleMultipleHttpRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleMultipleHttpRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandleMultipleHttpRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
