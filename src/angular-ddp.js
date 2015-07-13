import DDPProvider from './ddp-provider';
import DDPCollectionService from './ddp-collection-service';

export default angular.module('angular-ddp', [])
    .provider('DDP', DDPProvider)
    .service('DDPCollection', DDPCollectionService);
