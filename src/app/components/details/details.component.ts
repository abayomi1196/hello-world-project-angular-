import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  private gameId: string = '';
  public game: Game | undefined;

  private routeSub: Subscription | undefined;
  private gameSub: Subscription | undefined;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      this.gameId = params['id'];

      this.getGameDetails(this.gameId);
    });
  }

  getGameDetails(id: string) {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameRes: Game) => {
        this.game = gameRes;
      });
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
