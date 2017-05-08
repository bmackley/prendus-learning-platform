import {StatechangeEvent} from '../../typings/statechange-event';
import {State} from '../../typings/state';
import {Actions} from '../../redux/actions';
import {UtilitiesService} from '../../node_modules/prendus-services/services/utilities-service';
import {QuestionScaffold} from '../../node_modules/prendus-services/typings/question-scaffold';
import {QuestionScaffoldAnswer} from '../../node_modules/prendus-services/typings/question-scaffold-answer';
export class PrendusQuestionScaffoldComments {
  public is: string;
  public properties: any;
  public myIndex: number;
  public selectedIndex: number;
  public questionStem: string;
  public currentQuestionScaffold: QuestionScaffold;
  public querySelector: any;

  beforeRegister(): void {
    this.is = 'prendus-question-scaffold-comments';
    this.properties = {
      myIndex: {
        type: Number
      },
      selectedIndex: {
        type: Number,
        observer: 'disableNext'
      }
    };
  }

  disableNext(): void {
    try {
      if(!!(this.myIndex && this.selectedIndex) && this.myIndex === this.selectedIndex) {
        const isDefined: boolean = UtilitiesService.isDefinedAndNotEmpty([this.querySelector('#comment-zero').value, this.querySelector('#comment-one').value, this.querySelector('#comment-two').value, this.querySelector('#comment-three').value]);
        Actions.setDisabledNext(this, !isDefined);
        if(isDefined) {
          Actions.setQuestionScaffold(this, {
            ...this.currentQuestionScaffold,
            answers: [{
              ...this.currentQuestionScaffold.answers[0],
              comment: this.querySelector('#comment-zero').value
            }, {
              ...this.currentQuestionScaffold.answers[1],
              comment: this.querySelector('#comment-one').value
            }, {
              ...this.currentQuestionScaffold.answers[2],
              comment: this.querySelector('#comment-two').value
            }, {
              ...this.currentQuestionScaffold.answers[3],
              comment: this.querySelector('#comment-three').value
            }]
          });
        }
      }
    } catch(error) {
      console.error(error);
    }

  }


  /**
   * http://stackoverflow.com/questions/14766951/convert-digits-into-words-with-javascript
   */
  number2words(n: number): string {
    var num = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
    var tens = "twenty thirty forty fifty sixty seventy eighty ninety".split(" ");
    if (n < 20) return num[n];
    var digit = n%10;
    if (n < 100) return tens[~~(n/10)-2] + (digit? "-" + num[digit]: "");
    if (n < 1000) return num[~~(n/100)] +" hundred" + (n%100 == 0? "": " " + this.number2words(n%100));
    return this.number2words(~~(n/1000)) + " thousand" + (n%1000 != 0? " " + this.number2words(n%1000): "");
  }

  /**
   * Called for every comment in the dom
   */
  computeId(index: number): string {
    // TODO decide on this one
    const id: string = 'comment-' + this.number2words(index);
    return id;
  }
	mapStateToThis(e: StatechangeEvent): void {
		const state: State = e.detail.state;
    this.currentQuestionScaffold = state.currentQuestionScaffold;
	}
}

Polymer(PrendusQuestionScaffoldComments);
