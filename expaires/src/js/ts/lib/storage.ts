module HabitatPresto.lib {
    export class StorageProvider implements ng.IServiceProvider {
        public $get = [
            "$log",
            function ($log: ng.ILogService): any {
                return new StorageService($log);
            }
        ];
    }

    export class StorageService {
        constructor(public $log) {
        }

        read(path: string): any {
            // if not in local storage, the string "undefined" is returned (why???)
            var text: string = localStorage.getItem(path);
            if (text === null || typeof text === "undefined" || text === "undefined") {
                return null;
            } else {
                return text;
            }
        }

        readObject<T>(path): T {
            var text: any = this.read(path);
            var data: T;
            try {
                data = <T>JSON.parse(text);
            } catch (error) {
                this.$log.error("LocalStorageService::readObject: can't convert string from local storage to object using JSON.parse(). Error: " + error);
                data = null;
            }
            return data;
        }

        write(path: string, text: string): void {
            localStorage.setItem(path, text);
        }

        writeObject(path: string, data: any): void {
            var text: string = JSON.stringify(data);
            this.write(path, text);
        }

        remove(path: string): void {
            localStorage.removeItem(path);
        }

        clear(): void {
            localStorage.clear();
        }
    }
}

angular.module('habitatpresto').provider('storage', HabitatPresto.lib.StorageProvider);
