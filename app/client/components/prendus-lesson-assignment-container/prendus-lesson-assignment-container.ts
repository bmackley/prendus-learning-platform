import {State} from '../../typings/state';
import {Assignment} from '../../node_modules/prendus-services/typings/assignment';
import {Action} from '../../typings/action';
import {FirebaseService} from '../../node_modules/prendus-services/services/firebase-service';
import * as Actions from '../../redux/actions';
import {CourseModel} from '../../node_modules/prendus-services/models/course-model';
import {Course} from '../../node_modules/prendus-services/typings/course';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuizModel} from '../../node_modules/prendus-services/models/quiz-model';
import {Quiz} from '../../node_modules/prendus-services/typings/quiz';
import {LessonModel} from '../../node_modules/prendus-services/models/lesson-model';

class PrendusLessonAssignmentContainer {
    public is: string;
    public properties: any;
    public assignments: Assignment[];
    public courseId: string;
    public lessonId: string;
    public action: Action;
    public querySelector: any;
    public lastAssignmentSaved: Assignment;
    public uid: string;
    public course: Course;
    public hasCourseEditAccess: boolean;
    public endpointDomain: string;
    public ltiSecret: string;
    public ltiLink: string;
    public jwt: string;

    beforeRegister() {
        this.is = 'prendus-lesson-assignment-container';
        this.properties = {
            lessonId: {
                type: String
            },
            courseId: {
                type: String
            }
        };
    }

    async ready() {
        await Actions.Actions.checkUserAuth(this);
        this.course = await CourseModel.getById(this.courseId);
        this.action = await Actions.loadLessonAssignments(this.lessonId);
    }

    addAssignmentClick(e: Event) {
        this.action = {
            type: 'SET_LESSON_LAST_ASSIGNMENT_SAVED',
            lessonId: this.lessonId,
            assignment: null
        };
        this.querySelector('#assignmentEditor').open();
    }

    editAssignmentClick(e: any) {
        e.stopPropagation();
        e.preventDefault();

        const item: Assignment = e.model.item;
        this.querySelector(`#assignmentEditor-${item.id}`).open();
    }

    async saveAssignment(e: CustomEvent) {
        Actions.Actions.checkUserAuth(this);
        const assignment: Assignment = e.detail.assignment;
        const assignmentQuiz: Quiz = await getAssignmentQuiz(assignment, this.uid);
        const savedAssignment = await saveAssignment({
            ...assignment,
            uid: this.uid,
            quizId: assignmentQuiz.id
        });
        this.action = {
            type: 'SET_LESSON_LAST_ASSIGNMENT_SAVED',
            lessonId: this.lessonId,
            assignment: savedAssignment
        };
        this.action = await Actions.loadLessonAssignments(this.lessonId);
        await Actions.Actions.loadViewLessonQuizzes(this, this.lessonId);

        //TODO doing this here because I belive GraphQL will fundamentally change the way we do Models
        async function saveAssignment(assignment: Assignment) {
            if (assignment.id) {
                await FirebaseService.set(`assignments/${assignment.id}`, assignment);
                return assignment;
            }
            else {
                const id: string = await FirebaseService.push(`assignments`, assignment);
                const assignmentWithId = {
                    ...assignment,
                    id
                };
                await FirebaseService.set(`assignments/${id}`, assignmentWithId);
                return assignmentWithId
            }
        }

        async function getAssignmentQuiz(assignment: Assignment, uid: string): Promise<Quiz> {
            const assignmentQuiz: Quiz = await QuizModel.getById(assignment.quizId);
            if (assignmentQuiz) {
                return assignmentQuiz;
            }
            else {
                const newQuiz: Quiz = {
                    id: null,
                    uid,
                    title: `${assignment.title} Quiz`,
                    visibility: 'public',
                    quizQuestionSettings: {
                        answerFeedback: true,
                        showAnswer: false,
                        showHint: true,
                        showCode: true,
                        graded: false,
                        showConfidenceLevel: false,
                        allowGeneration: false
                    },
                    questions: {},
                    collaborators: {}
                };

                const newQuizId: string = await QuizModel.createOrUpdate(newQuiz.id, newQuiz);
                await QuizModel.createOrUpdate(newQuizId, {
                    ...newQuiz,
                    id: newQuizId
                });
                await LessonModel.associateQuiz(assignment.lessonId, newQuizId);
                return {
                    ...newQuiz,
                    id: newQuizId
                };
            }
        }
    }

    hasAssignments(assignments: Assignment[]): boolean {
        return assignments ? assignments.length !== 0 : true;
    }

    getAssignmentEditAccess(assignment: Assignment) {
        return assignment.uid === this.uid;
    }

    async getAssignmentLTILinks(e: any): Promise<void> {
        e.stopPropagation();
        e.preventDefault();
      const assignment: Assignment = e.model.item;

      this.endpointDomain = UtilitiesService.getPrendusServerEndpointDomain();
      const courseId: string = this.courseId;
      const jwt: string = this.jwt;
      const LTIRequest = this.querySelector("#getLTIajax");
      LTIRequest.body = {
        courseId,
        jwt
    };
      const request = LTIRequest.generateRequest();
      await request.completes;
      this.ltiSecret = request.response.secret;
      const env = window['PRENDUS_ENV'];
      if (env === 'development') {
        this.ltiLink = `http://localhost:5000/api/lti/assignment/${assignment.id}`;
      } else {
        this.ltiLink = `https://prenduslearning.com/api/lti/assignment/${assignment.id}`;
      }
      this.querySelector('#assignment-lti-link').open();
    }

    stateChange(e: CustomEvent) {
        const state: State = e.detail.state;

        this.assignments = Object.values(state.lessonAssignments[this.lessonId] || {});
        this.lastAssignmentSaved = state.lessonLastAssignmentSaved[this.lessonId];
        this.uid = state.currentUser.metaData.uid;
        this.hasCourseEditAccess = this.course && state.currentUser.metaData.uid === this.course.uid;
        this.jwt = state.jwt;
    }
}

Polymer(PrendusLessonAssignmentContainer);
