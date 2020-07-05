import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GameService } from './game.service';
import { GameState, Player, Content } from './game-server-types';

describe('GameStateService', () => {
  let httpTestingController: HttpTestingController;
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the correct URL for fetching game state', () => {
    service.fetchGameState().subscribe();

    const req = httpTestingController.expectOne('/game-state');
    req.flush(<GameState>{state: 'DUMMY_STATE', message: null});
    httpTestingController.verify();

    // need to add this because karma otherwise complains
    expect(true).toBeTrue();
  });

  it('should call the correct URL for adding new player', () => {
    service.addNewPlayer('new_player').subscribe();

    const req = httpTestingController.expectOne('/player/add');
    req.flush(<Player>{name: 'new_player-1', uid: '01234567-0123-4567-89ab-0123456789ab'});
    httpTestingController.verify();

    expect(req.request.body).toEqual({name: 'new_player'});
  });

  it('should call the correct URL for submitting content', () => {
    const dummyContent = <Content>{round: 1, content: 'test', originPlayer: 'me'};
    service.submitContent('dummy-uid', dummyContent).subscribe();

    const req = httpTestingController.expectOne('/player/dummy-uid/');
    req.flush('');
    httpTestingController.verify();

    expect(req.request.body).toEqual(dummyContent);
  });

  it('should call the correct URL for retrieving content', () => {
    const dummyContent = <Content>{round: 1, content: 'test', originPlayer: 'me'};
    service.retrieveContent('dummy-uid', 5).subscribe();

    const req = httpTestingController.expectOne('/player/dummy-uid/5/');
    req.flush(dummyContent);
    httpTestingController.verify();

    expect(true).toBeTrue();
  });
});
