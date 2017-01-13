import {Actions} from '../../redux/actions';
class PrendusCourseRouter {
  public is: string;
  public selected: number;
  public courseId: string;
  public properties: any;
  public observers: string[];
  public querySelector: any;

  beforeRegister() {
      this.is = 'prendus-course-router';
      this.observers = [
        '_routeChanged(route.*)'
      ];
  }

  _routeChanged(routeObject: any): void {
    const route: string = routeObject.value.path;
    if(!route) {
      return;
    }
    const baseRoute: string = route.split('/')[1];
    switch(baseRoute) {
      case 'home': {
        this.importElement('components/prendus-course-homepage/prendus-course-homepage.html', 'course-homepage');
        break;
      }

      case 'view': {
        this.importElement('components/prendus-course-view/prendus-course-view.html', 'course-view');
        break;
      }

      case 'edit-quiz': {
        this.importElement('components/prendus-edit-quiz-router/prendus-edit-quiz-router.html', 'edit-quiz');
        break;
      }

      case 'view-quiz': {
        this.importElement('components/prendus-view-quiz-router/prendus-view-quiz-router.html', 'view-quiz');
        break;
      }

      case 'view-video': {
        this.importElement('components/prendus-view-video-router/prendus-view-video-router.html', 'view-video');
        break;
      }

      case 'edit-question': {
        this.importElement('components/prendus-edit-question-router/prendus-edit-question-router.html', 'edit-question');
        break;
      }
      default: break;
    }
  }

  importElement(path: string, id: string): void {
    if(!Polymer.isInstance(this.querySelector(`#${id}`))) {
      Polymer.Base.importHref(
        path,
        () => {
          //success
        }, () => {
          //failure
          throw new Error("Importing element failed");
        });

    }
  }
}

Polymer(PrendusCourseRouter);
