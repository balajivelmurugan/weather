import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Weather'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Weather');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('Weather app is running!');
  // });

  it('should call getWeatherReport()', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(app.displayedColumns).toEqual(['cityName', 'weatherDesc', 'temperature']);
    expect(app.locations).toEqual(['London', 'Wales', 'York']);
    app.selectedValue = 'London';
    let buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(app.getWeatherReport()).toHaveBeenCalled();
    })
    //expect(compiled.querySelector('.content span').textContent).toContain('Weather app is running!');
  });
});
