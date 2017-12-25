import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { baseURL } from '../shared/baseurl';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular) { }

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all("leaders").getList();
  }

  getLeader(id: number): Observable<Leader> {
    return this.restangular.one("leaders", id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all("leaders").getList({featured: true}).map(leader => leader[0]);
  }

}
