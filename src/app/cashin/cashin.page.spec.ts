import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CashinPage } from './cashin.page';

describe('CashinPage', () => {
  let component: CashinPage;
  let fixture: ComponentFixture<CashinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CashinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
