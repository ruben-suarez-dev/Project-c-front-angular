import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { CondominiumContainerComponent } from '../condominium/condominium-container/condominium-container.component';
import { HouseContainerComponent } from '../house/house-container/house-container.component';
import { ApiCallInterceptor } from '../../shared/services/api-call-interceptor.service';
import { SignalServiceService } from '../../shared/services/signal-service.service';
import { CondominiumInterface } from '../../shared/interfaces/condominium.interface';
import { PageName } from '../../shared/enums/page-names.enum';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [CommonModule, CondominiumContainerComponent, HouseContainerComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent implements OnInit, OnDestroy {

  constructor(
    private apiCallService: ApiCallInterceptor,
    private signalService: SignalServiceService
  ) {}

  asideBarCollapse = signal(false);

  currentPage!: PageName; 
  pageName = PageName;

  resizeObservable$: Observable<Event> = new Observable<Event>;
  resizeSubscription$: Subscription = new Subscription;

  ngOnInit() {
    this.currentPage = this.signalService.getCurrentPage;
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        this.resizeObservable$ = fromEvent(window, 'resize')
        this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
          if (window.innerWidth >= 640 && this.asideBarCollapse()) {
            this.showSideBar();
          } else if (window.innerWidth < 640 && !this.asideBarCollapse()) {
            this.showSideBar();
          }
        });
      }
    }, 100);
  }

  showSideBar() {
    let sidebar = document.getElementById('logo-sidebar');
    let sidebarPosition = sidebar?.getBoundingClientRect();
    if (sidebarPosition?.left === 0) {
      this.asideBarCollapse.update((value: boolean) => true);
      sidebar?.style.setProperty("transform", "translateX(-256px)");
    } else {
      this.asideBarCollapse.update((value: boolean) => false);
      sidebar?.style.setProperty("transform", "translateX(0px)");
    }

    console.log('El valor del signal es:', this.asideBarCollapse());
  }

  changeCurrentPage(page: PageName) {
    if (this.currentPage !== page) {
      this.signalService.setCurrentPage = page;
      this.currentPage = this.signalService.getCurrentPage;
    }
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
}
}
