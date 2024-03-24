DO $$
DECLARE
  migration_name VARCHAR(255);
BEGIN
  migration_name := -- TODO: 'yyyy-mm-dd [Description of what the script does] BT-XXXX';

	-- (LEAVE THIS AS-IS) Check if this migration has already been applied
  
	IF EXISTS (SELECT 1 FROM public._migrations_log WHERE name = migration_name) THEN
		RAISE NOTICE 'Migration % has already been applied. Skipping.', migration_name;
		RETURN;
	END IF;

	-- 
  -- MIGRATION START
	-- 

  /*
   * How to create a DB migration script:
   * 1. Make a copy of this file and rename it to: 
   *    yyyy-mm-dd [Description of what the script does] BT-XXXX.sql
   *
   * 2. Set the migration_name variable to the name of the migration. 
   *    This is used to check if the migration has already been applied.
   *     
   * 3. Add your migration script statements HERE, in place of this comment.
   */

	-- 
  -- MIGRATION END
	-- 

  -- (LEAVE THIS AS-IS) Insert a record for THIS migration. 
  INSERT INTO public._migrations_log(name, executed_by)
  VALUES (migration_name, current_user); 
END
$$;
