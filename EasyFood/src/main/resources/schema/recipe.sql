--------------------------------------------------------
--  颇老捞 积己凳 - 老夸老-11岿-08-2015   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table RECIPE
--------------------------------------------------------

  CREATE TABLE "C##FOOD"."RECIPE" 
   (	"ID" VARCHAR2(500 BYTE), 
	"NAME" VARCHAR2(4000 BYTE), 
	"DESCRIPTON" CLOB, 
	"CATEGORYID" VARCHAR2(500 BYTE), 
	"CREATOR" VARCHAR2(500 BYTE), 
	"CREATEDAT" DATE, 
	"MODIFIEDAT" DATE, 
	"VIEWCOUNT" NUMBER
   ) SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  TABLESPACE "TBSGOMHOMEINDEX" 
 LOB ("DESCRIPTON") STORE AS SECUREFILE (
  TABLESPACE "TBSGOMHOMEINDEX" ENABLE STORAGE IN ROW CHUNK 8192
  NOCACHE LOGGING  NOCOMPRESS  KEEP_DUPLICATES ) ;
--------------------------------------------------------
--  DDL for Index RECIPE_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "C##FOOD"."RECIPE_PK" ON "C##FOOD"."RECIPE" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 
  TABLESPACE "TBSGOMHOMEINDEX" ;
--------------------------------------------------------
--  Constraints for Table RECIPE
--------------------------------------------------------

  ALTER TABLE "C##FOOD"."RECIPE" ADD CONSTRAINT "RECIPE_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 
  TABLESPACE "TBSGOMHOMEINDEX"  ENABLE;
  ALTER TABLE "C##FOOD"."RECIPE" MODIFY ("MODIFIEDAT" NOT NULL ENABLE);
  ALTER TABLE "C##FOOD"."RECIPE" MODIFY ("CREATEDAT" NOT NULL ENABLE);
  ALTER TABLE "C##FOOD"."RECIPE" MODIFY ("CREATOR" NOT NULL ENABLE);
  ALTER TABLE "C##FOOD"."RECIPE" MODIFY ("NAME" NOT NULL ENABLE);
  ALTER TABLE "C##FOOD"."RECIPE" MODIFY ("ID" NOT NULL ENABLE);
