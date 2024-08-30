import PGSQL from './PGSQL'

const DBS = {
  pgsql: PGSQL
}

const { DB = 'pgsql' } = process.env

export default DBS[DB as keyof typeof DBS]
