module HabitatPresto.controller {
    export class Page1 extends HabitatPresto.controller.Base {
        public static $inject = ['$rootScope', '$state', 'wsHttp', '$mdDialog', 'storage'];
        public status: any;
        public level:string;
        public prof:string;
        public score:any;

        constructor(public $rootScope,
                    public $state,
                    public wsHttp,
                    public $mdDialog,
                    public storage) {
            super($rootScope, $state, wsHttp, $mdDialog);
            this.status = {
                'CP': {
                    min: 0,
                    max: 1,
                    prof: "https://www.bordas.com/soutien-scolaire/paris-15e-75015/RPmnvlXZ-marie-pierre-p",
                },
                'CE1': {
                    min: 1,
                    max: 2,
                    prof: "https://www.bordas.com/soutien-scolaire/paris-9e-75009/7X0xvQXR-laurence-m",
                },
                'CE2': {
                    min: 2,
                    max: 3,
                    prof: 'https://www.bordas.com/soutien-scolaire/paris-6e-75006/A35nLVPK-emmanuelle-b',
                },
                'CM1': {
                    min: 3,
                    max: 5,
                    prof: 'https://www.bordas.com/soutien-scolaire/paris-15e-75015/RPZmKR3w-monique-c',
                },
                'CM2': {
                    min: 5,
                    max: 7,
                    prof: 'https://www.bordas.com/soutien-scolaire/levallois-perret-92300/jPrpavBQ-ghyzlane-l',
                },
                '6eme': {
                    min: 7,
                    max: 9,
                    prof: 'https://www.bordas.com/soutien-scolaire/paris-15e-75015/RPZmKR3w-monique-c',
                },
                '5eme': {
                    min: 9,
                    max: 12,
                    prof: 'https://www.bordas.com/soutien-scolaire/paris-18e-75018/M3peMxPb-guillaume-b',
                },
                '4eme': {
                    min: 12,
                    max: 15,
                    prof: 'https://www.bordas.com/soutien-scolaire/champigny-sur-marne-94500/aPeW0jB5-biram-n',
                },
                '3eme': {
                    min: 15,
                    max: 18,
                    prof: 'https://www.bordas.com/soutien-scolaire/paris-13e-75013/LBKNqNXr-lazhar-g',
                },
                '2nde': {
                    min: 18,
                    max: 22,
                    prof: 'https://www.bordas.com/soutien-scolaire/jeufosse-78270/QPoKKaPN-odile-c',
                },
                '1ere': {
                    min: 22,
                    max: 26,
                    prof: 'https://www.bordas.com/soutien-scolaire/paris-15e-75015/z34vG1XO-michele-s',
                },
                'Terminale': {
                    min: 26,
                    max: 30,
                    prof: 'https://www.bordas.com/soutien-scolaire/courbevoie-92400/73jqLxB1-laura-i',
                },
            };

            let note = this.getNote();
            this.score = this.storage.readObject('score');
            console.log(this.score);
            this.level = this.getLevel(note);
            this.prof = this.getProf(this.level);
        }

        public getNote():any{
            let score = this.storage.readObject('score');
            let Note = 0;
            for(let note in score){
                Note += score[note].score;
            }
            return Note;
        }

        public getLevel(note) {
            for (let level in this.status) {
                if (note >= this.status[level].min && note <= this.status[level].max) {
                    return level;
                }
            }
        }

        public getProf(level) {
            return this.status[level].prof;
        }
    }
}
