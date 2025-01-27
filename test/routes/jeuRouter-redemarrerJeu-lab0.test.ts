import { assert } from 'console';
import 'jest-extended';
import { Joueur } from '../../src/core/joueur';
import supertest from 'supertest'
import app from '../../src/app';
import { jeuRoutes } from '../../src/routes/jeuRouter';

const request = supertest(app);

let content = ""
beforeAll(async () => {
  const j1 = new Joueur('Joueur1');
  const j2 = new Joueur('Joueur2');
  await request.post('/api/v1/jeu/demarrerJeu').send({ nom: j1.nom});
  await request.post('/api/v1/jeu/demarrerJeu').send({ nom: j2.nom});
});

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  it(`devrait répondre avec succès à appel pour redémarrerJeu`, async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });

  it('devrait rendre 0 pour le nombre de Joueurs', async () => {
      const joueursJSON = jeuRoutes.controleurJeu.joueurs;
      const joueursArray = JSON.parse(joueursJSON);
      expect(joueursArray.length).toBe(0);
    });
});
