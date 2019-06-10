import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StateService {
 
  array = ["Tunis",
      "Sousse",
      "Touzeur",
      "Nabeul",
      "Kairouan",
      "Gabes",
      "Sfax"
  ];

  constructor() {
   }
    getStateName($key) {
    if ($key == "0")
      return "unknown";
    else{
      return this.array[$key];
    }
  }
}