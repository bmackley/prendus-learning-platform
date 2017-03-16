import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';

class PrendusCourseRouter {
  public is: string;
  public selected: number;
  public courseId: string;
  public properties: any;
  public observers: string[];
  public querySelector: any;

  beforeRegister(): void {
      this.is = 'prendus-course-router';
      this.observers = [
        '_routeChanged(route.*)'
      ];
  }

  _routeChanged(routeObject: any): void {
		const backdrop: any = document.querySelector('iron-overlay-backdrop');
		if(backdrop && backdrop.close) backdrop.close();
    const route: string = routeObject.value.path;
    if(!route) {
      return;
    }
    const baseRoute: string = route.split('/')[1];
    switch(baseRoute) {
      case 'home': {
        UtilitiesService.importElement(this, 'components/prendus-course-homepage/prendus-course-homepage.html', 'course-homepage');
        break;
      }

      case 'view': {
        UtilitiesService.importElement(this, 'components/prendus-course-view/prendus-course-view.html', 'course-view');
        break;
      }

      case 'edit-quiz': {
        UtilitiesService.importElement(this, 'components/prendus-quiz-editor/prendus-quiz-editor.html', 'edit-quiz');
				const editQuizElement = this.querySelector('#edit-quiz');
				// manually reinitialize the quiz editor every time the view
				if(editQuizElement && editQuizElement.setQuizData) editQuizElement.setQuizData(editQuizElement.quizId);
        break;
      }

      case 'view-quiz': {
        UtilitiesService.importElement(this, 'components/prendus-view-quiz-router/prendus-view-quiz-router.html', 'view-quiz');
        break;
      }

      case 'view-video': {
        UtilitiesService.importElement(this, 'components/prendus-view-video-router/prendus-view-video-router.html', 'view-video');
        break;
      }

      case 'edit-question': {
        UtilitiesService.importElement(this, 'components/prendus-edit-question-router/prendus-edit-question-router.html', 'edit-question');
        break;
      }
      default: break;
    }
  }
}

Polymer(PrendusCourseRouter);
