module HabitatPresto.lib {
    import IDialogService = angular.material.IDialogService;
    export class Authentication implements ng.IServiceProvider {
        public $get = [
            'wsHttp',
            'storage',
            '$mdDialog',
            function (wsHttp, storage, $mdDialog: IDialogService): any {
                return new AuthenticationService(wsHttp, storage, $mdDialog);
            }
        ];
    }
    export class AuthenticationService {
        private token = null;
        private user = null;
        private deviceToken = null;

        constructor(
            public wsHttp,
            public storage,
            public $mdDialog
        ) {
            this.token = this.storage.read('token');
            this.deviceToken = this.storage.read('deviceToken');

            if (this.token && !this.user) {
                this.setToken(this.token);
                this.user = this.storage.readObject('auth');
            }

            /*window.setInterval(this.refresh, 5 * 60 * 1000, this);*/
        }

        public setToken(token: string): void {
            this.token = token;
            this.storage.write('token', token);
            this.wsHttp.setToken(token);
        }

        public setDeviceToken(deviceToken: string): void {
            this.storage.write('deviceToken', deviceToken);
            this.deviceToken = deviceToken;
        }

        public getDeviceToken(): void {
            return this.deviceToken;
        }

        public refresh($this): void {
            if ($this.isAuthenticated()) {
                $this.wsHttp.post('refresh_authenticate', {})
                    .then(function (response: any) {
                        console.log("refresh token :" + response.data.data.token);
                        $this.setToken(response.data.data.token);
                    });
            }
        }

        public isAuthenticated() {
            return this.user !== null;
        }

        public login(user: any) {
            this.user = user;
            this.storage.writeObject('auth', user);
        }

        public logout() {
            var params:any = {
                deviceToken: this.storage.read('deviceToken')
            };

            this.wsHttp.post("logout", params)
                .then(function (response: any) {
                    console.log(response)
                })
                .catch(function (response: any) {
                    console.log(response);
                });

            this.token = null;
            this.user = null;
            this.storage.remove('token');
            this.storage.remove('auth');
            this.storage.remove('availableProjects');
            this.storage.remove('acceptedProjects');
            this.wsHttp.setToken(null);
        }

        public getUser(): any {
            return this.user;
        }

        //create notification Service TODO
        public showNotification():any {
            let $this = this;
            let confirm: any = $this.$mdDialog.confirm()
                .title('Nouveau projet disponible')
                .textContent('Voulez vous voir les details du projet ?')
                .ariaLabel('Lucky day')
                .ok('voir')
                .cancel('retour');

            return $this.$mdDialog.show(confirm);
        }
    }
}

angular.module('habitatpresto').provider('authentication', HabitatPresto.lib.Authentication);
