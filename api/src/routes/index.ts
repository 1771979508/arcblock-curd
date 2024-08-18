import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import path from 'path';
import sqlite3 from 'sqlite3';
import run from '../libs/utils';

const dbPath = path.resolve(__dirname, '../db/web3-sqlite3');

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.use('/getUser', (req, res) => {
  const userId = req.query.id;
  const db = new sqlite3.Database(dbPath);
  db.all(`select * from users where id = ${userId}`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    const resObj = {
      code: 0,
      data: rows,
      message: '查询成功',
    };
    res.json(resObj);
  });
  db.close();
});

// Create a new user
router.use('/editUser', async (req, res) => {
  if (!req.body.name || req.body.name === '') {
    res.status(400).send({ error: 'ユーザー名が指定されていません。' });
  } else {
    const db = new sqlite3.Database(dbPath);
    const { id = '', name = '', email = '', phone = '' } = req.body;
    try {
      const sql = `update "main"."users" set "name" = '${name}', "email" = '${email}', phone = '${phone}' where "id" = ${id}`;
      await run(sql, db);
      const resObj = {
        code: 0,
        data: true,
        message: '更新成功',
      };
      res.status(201).json(resObj);
    } catch (e) {
      res.status(500).json({ error: e });
    }

    db.close();
  }
});

export default router;
