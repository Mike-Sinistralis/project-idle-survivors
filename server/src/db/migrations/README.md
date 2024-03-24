## How to create a DB migration script:

1. Make a copy of `migrations/yyyy-mm-dd [Description of what the script does] BT-XXXX.sql`
   Rename it.
  
2. Set the migration_name variable to the name of the migration. 
   This is used to check if the migration has already been applied.
       
3. Add your migration script in the middle.

Note: Migrations are only for upgrading an existing Database to new changes. It should also be feasible to run the
bootstrapper to get a fresh schema, however this will nuke any pre-existing data you have. Ensure to backup
and data or update the Bootstrapper if needed.
 
Also Note: The Migrations Table will not be bootstrapped with entries. The Migrations table will always be bootstrapped
with the time of table initialization, so use that to determine which migrations need applied.
