const run = (sql: any, db: { run: (arg0: any, arg1: (err: any) => void) => void }) => {
  return new Promise<void>((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

export default run;
