import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentActivitesComponent } from './recent-activites.component';

describe('RecentActivitesComponent', () => {
  let component: RecentActivitesComponent;
  let fixture: ComponentFixture<RecentActivitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentActivitesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentActivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
