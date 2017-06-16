module HabitatPresto.lib {
    import IDialogService = angular.material.IDialogService;
    export class WsHttpProvider implements ng.IServiceProvider {
        public $get = [
            '$http',
            '$mdDialog',
            'dialog',
            '$state',
            function ($http: ng.IHttpService, $mdDialog: IDialogService, dialog, $state): any {
                return new WsHttpService($http, $mdDialog, dialog, $state);
            }
        ];
    }

    export class WsHttpService {
        private token = null;
        public online:boolean;

        public CONFIG: ng.IRequestShortcutConfig = {
            headers: {
                "Content-Type": "application/json",
                "Version": "1.0.0"
            }
        };

        public ROOT = "http://www.habitatpresto.com/api/member/";

        constructor(public $http, public $mdDialog, public dialog, public $state) {
            this.setOnline(true);
        }

        private getConfig(): any {
            var config = this.CONFIG;
            if (this.token !== null) {
                config.headers['Authorization'] = 'bearer '+ this.token;
            }
            return config;
        }

        public setToken(token: string): void {
            this.token = token;
        }

        public post(route: string, data: any): any {
            let $this = this;
            if ($this.online){
                return $this.$http.post(this.ROOT + route, JSON.stringify(data), $this.getConfig())
            } else {
                $this.$state.go('home');
                return $this.dialog.showAlert("Erreur", "Erreur reseau. Veuillez verifier votre connexion internet");
            }
        }

        public get(route: string): any {
            let $this = this;
            if ($this.online) {
                return $this.$http.get(this.ROOT + route, $this.getConfig())
            } else {
                $this.$state.go('home');
                return $this.dialog.showAlert("Erreur", "Erreur reseau. Veuillez verifier votre connexion internet");
            }
        }

        public setOnline(bool:boolean){
            this.online = bool;
        }

        public isOnline(){
            return this.online;
        }
    }
}

angular.module('habitatpresto').provider('wsHttp', HabitatPresto.lib.WsHttpProvider);