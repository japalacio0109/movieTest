#!/bin/bash
set -e

db_name=$DB_NAME;
db_host=$DB_HOST;
db_user=$USER_DB;
db_pwd=$PWD_DB;
# Get host:port from parameters list
host="$1";

# Remove first argument from list of parameters (host)
shift
echo $db_host
echo $db_user
echo $db_pwd
until mysql -u$db_user -p$db_pwd -h$db_host -e "quit"; do
  >&2 echo "MySQL is unavailable - sleeping";
  sleep 1
done

>&2 echo "MySQL is up - executing command";
# mysql -u${db_user} -p${db_pwd} -h${db_host} -D${db_name} -e "SELECT count(*) FROM gn_tdoc;"
echo "MySQL: check host ${db_host}...";
data=`mysql -u${db_user} -p${db_pwd} -h${db_host} -D${db_name} -e "SELECT count(*) FROM information_schema.TABLES WHERE (TABLE_SCHEMA = '${db_name}') AND (TABLE_NAME = 'users')" | grep -v "count"`;
echo "MySQL: check host ${db_host} (202 - success)";
if [ $data -gt 0 ]
then
    echo "MySQL: check database data...";
    counter2=`mysql -u${db_user} -p${db_pwd} -h${db_host} -D${db_name} -e "SELECT count(*) FROM users;" | grep -v "count"`;
    echo "MySQL: check database data (202 - success)";
    if [ $counter2 = 0 ]
    then
        echo "MySQL: creating database seeds...";
        bundle exec rake db:seed RAILS_ENV=development;
        echo "MySQL: creating database seeds (202 - success)";
    else
        echo "MySQL: no database changes... (304 - cached result)";
    fi
else
    echo "MySQL: deleting database...";
    bundle exec rake db:drop RAILS_ENV=development;
    echo "MySQL: deleting database (202 - success)";
    echo "MySQL: creating new database environment...";
    bundle exec rake db:setup RAILS_ENV=development;
    echo "MySQL: creating new database environment (202 - success)";
fi

exec "$@"
