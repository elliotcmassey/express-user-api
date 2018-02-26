const assert = require('assert');
const request = require('supertest');
const chai = require('chai');
const app = require('../src/app.js').default;

const { expect } = chai;

describe('User routes', () => {
  describe('Endpoint: GET /users', () => {
    it('application should return array of users and 200 response', (done) => {
      request(app).get('/users')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('Endpoint: POST /users', () => {
    it('Application should create new user and return 200', (done) => {
      const newUser = {
        email: `newtestuser-${Math.random()}@example.com`,
        forename: 'New forename',
        surname: 'New surname',
      };
      request(app).post('/users')
        .send(newUser)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          done();
        });
    });

    it('Application should return 403 forbidden if same email address is used', (done) => {
      const newUser = {
        email: 'test@example.com',
        forename: 'New forename',
        surname: 'New surname',
      };
      request(app).post('/users')
        .send(newUser)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(403)
        .end((err, res) => {
          if (err) throw err;
          done();
        });
    });

    it('Application should return 422 if any of the inputs are invalid', (done) => {
      const newUser = {
        email: 'newtestuserexample.com',
        forename: 'New forename',
        surname: 'New surname',
      };
      request(app).post('/users')
        .send(newUser)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(422)
        .end((err, res) => {
          if (err) throw err;
          done();
        });
    });
  });

  describe('Endpoint: GET /users/:id', () => {
    it('Should return an object of a user with 200 response', (done) => {
      request(app).get('/users/1')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });

    it('If invalid parameter, return 422', (done) => {
      request(app).get('/users/NaN')
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          done();
        });
    });

    it('If user cannot be found, return 404 Not Found', (done) => {
      request(app).get('/users/12341')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });

  describe('Endpoint: PUT /users/:id', () => {
    it('Updating a user should return successful 204', (done) => {
      const updatedUser = {
        email: 'test.updated@example.com',
        forename: 'Updated forename',
        surname: 'Updated surname',
      };
      request(app).put('/users/2')
        .send(updatedUser)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(204);
          done();
        });
    });

    it('Should return 422 if any of the inputs are invalid', (done) => {
      const updatedUser = {
        email: 'newtestuserexample.com',
        forename: 'New forename',
        surname: 'New surname',
      };
      request(app).put('/users/2')
        .send(updatedUser)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(422)
        .end((err, res) => {
          if (err) throw err;
          done();
        });
    });

    it('If user to be updated doesn\'t exist, return 404', (done) => {
      const updatedUser = {
        email: 'newtestuser@example.com',
        forename: 'New forename',
        surname: 'New surname',
      };
      request(app).put('/users/1231232')
        .send(updatedUser)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(404)
        .end((err) => {
          if (err) throw err;
          done();
        });
    });
  });

  describe('Endpoint: DELETE /users/:id', () => {
    it('Deleting a user should return successful 204', (done) => {
      request(app).delete('/users/2')
        .end((err, res) => {
          expect(res.statusCode).to.equal(204);
          done();
        });
    });

    it('If invalid parameter, return 422', (done) => {
      request(app).delete('/users/NaN')
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          done();
        });
    });

    it('If user cannot be found, return 404 Not Found', (done) => {
      request(app).delete('/users/12341')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });
});
