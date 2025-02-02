import { Component, OnInit } from "@angular/core";
import { Kweek } from "../model/kweek";
import { MiniUser } from "../model/mini-user";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-likes-rekweeks-list",
  templateUrl: "./likes-rekweeks-list.component.html",
  styleUrls: [
    "./likes-rekweeks-list.component.css",
    "../reply/reply.component.css",
    "../kweek/kweek.component.css"
  ]
})
export class LikesRekweeksListComponent implements OnInit {
  likers: boolean;
  users: MiniUser[];
  clickedKweek: Kweek;
  constructor(private kweekService: DataService) {}

  ngOnInit() {
    console.log(this.clickedKweek.id);
    if (this.likers) {
      this.kweekService
        .kweekLikers(this.clickedKweek.id)
        .subscribe(likersList => {
          this.users = likersList;
          const str = JSON.stringify(this.users[0], null, 4);
          console.log(str);
          console.log("likers");
        });
    } else {
      this.kweekService
        .kweekRekweekers(this.clickedKweek.id)
        .subscribe(rekweekersList => {
          this.users = rekweekersList;
          console.log("rekweekers");
        });
    }
  }

  // /** Username */
  // username: string;
  // /** User Screen Name => Must be unique */
  // screen_name: string;
  // /** Profile Picture URL */
  // profile_image_url: string;
  // /** If The Authorised User Block That User */
  // blocked: boolean;
}
