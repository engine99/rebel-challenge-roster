import { rejects } from 'assert';
import { isArray } from 'class-validator';
import request from 'supertest';
import App from '../app'
import { Artist } from '../interfaces/artists.interface'

const elton = {
  name: "Elton John",
  rate: 0.4,
  streams: 3
} as Artist;


afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Artists', () => {
  
  let app: App;

  beforeAll( ()=>{
    app = new App();
    return app.connect();
  });

  
  describe('[GET] /', () => {
    it('response statusCode 200 / ', (done) => {
      request(app.getServer()).get('/artists').expect(200).end(done);
    });
  });
  
  
  describe('Create update read delete', () => {
    
    let newid = 0;
    
    it('creates', (done) => {
      request(app.getServer()).post('/artists').expect(201).end((err, res)=> {
        newid = res.body;
        done()
      });
    });

    it('Rejects malformed update 1', (done) => {
      request(app.getServer()).put(`/artists/${newid}`).send({name:'Len', rate: 0.0}).expect(400).end(done);
    });
    
    it('Rejects malformed update 2', (done) => {
      request(app.getServer()).put(`/artists/${newid}`).send({name:'Len', rate: 0.0, streams: 0.4}).expect(400).end(done);
    });

    it('updates', (done) => {
      request(app.getServer()).put(`/artists/${newid}`).send(elton).expect(200).end(done);
    });

    it('reads', (done) => {
      request(app.getServer()).get(`/artists`)
        .expect(200).expect(res => {expect(res.body).toEqual(
          expect.arrayContaining(
            [expect.objectContaining({_id:newid, ...elton})])
          );
        }).end(done)
    });

    it('deletes', (done) => {
      request(app.getServer()).delete(`/artists/${newid}`).send().expect(200, '1').end(done)
    });

  });



  afterAll( async ()=> {
    await app.disconnect();
  })
});
