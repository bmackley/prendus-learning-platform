export class PrendusBreadCrumbs {
	public is: string;
	public courseId: string;
	public conceptId: string;
	public quizId: string;
	public properties: any;

	beforeRegister(): void {
		this.is = 'prendus-breadcrumbs';
		this.properties = {
			courseId: {
				type: String,
				value: ''
			},
			conceptId: {
				type: String,
				value: ''
			},
			quizId: {
				type: String,
				value: ''
			}
		};
	}

	showQuizLink(courseId: string, conceptId: string, quizId: string): boolean {
		return			courseId !== ''
						&&	conceptId !== ''
						&&	quizId !== '';
	}
}

Polymer(PrendusBreadCrumbs);
