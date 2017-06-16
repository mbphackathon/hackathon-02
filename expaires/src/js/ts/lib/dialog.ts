module HabitatPresto.lib {
    import IDialogService = angular.material.IDialogService;

    export class Dialog implements ng.IServiceProvider {
        public $get = [
            'storage',
            '$mdDialog',
            function (storage, $mdDialog: IDialogService): any {
                return new DialogService(storage, $mdDialog);
            }
        ];
    }
    export class DialogService {
        public isLoading:boolean;

        constructor(
            public storage,
            public $mdDialog
        ) {

        }

        /** GENERAL METHODS **/
        public showAlert(title, message, action = 'Fermer') : any {
            let $this = this;
            $this.hideLoader();
            var alert:any = $this.$mdDialog.alert({
                clickOutsideToClose: false,
                title: title,
                textContent: message,
                ok: action
            });
            return $this.$mdDialog.show(alert).finally(function() {
                alert = $this.$mdDialog.hide();
            });
        }

        public showLoader() : any {
            let $this = this;
            var alert:any = $this.$mdDialog.alert({
                templateUrl: 'html/loader.html'

            });
            return $this.$mdDialog.show(alert);
        }

        public hideLoader() : any {
            let $this = this;
            $this.$mdDialog.hide();
        }
    }
}

angular.module('habitatpresto').provider('dialog', HabitatPresto.lib.Dialog);
