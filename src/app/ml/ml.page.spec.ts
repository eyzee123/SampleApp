import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MlPage } from './ml.page';

describe('MlPage', () => {
  let component: MlPage;
  let fixture: ComponentFixture<MlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
