--------------------------------------------------------
--  颇老捞 积己凳 - 老夸老-11岿-08-2015   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table RECIPEINGREDIENT
--------------------------------------------------------

  CREATE TABLE "C##FOOD"."RECIPEINGREDIENT" 
   (	"ID" VARCHAR2(500 BYTE), 
	"RECIPEID" VARCHAR2(500 BYTE), 
	"INGREDIENTID" VARCHAR2(500 BYTE), 
	"SORTORDER" NUMBER
   ) SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  TABLESPACE "TBSGOMHOMEINDEX" ;
--------------------------------------------------------
--  DDL for Index RECIPEINGREDIENT_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "C##FOOD"."RECIPEINGREDIENT_PK" ON "C##FOOD"."RECIPEINGREDIENT" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 
  TABLESPACE "TBSGOMHOMEINDEX" ;
--------------------------------------------------------
--  Constraints for Table RECIPEINGREDIENT
--------------------------------------------------------

  ALTER TABLE "C##FOOD"."RECIPEINGREDIENT" ADD CONSTRAINT "RECIPEINGREDIENT_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 
  TABLESPACE "TBSGOMHOMEINDEX"  ENABLE;
  ALTER TABLE "C##FOOD"."RECIPEINGREDIENT" MODIFY ("INGREDIENTID" NOT NULL ENABLE);
  ALTER TABLE "C##FOOD"."RECIPEINGREDIENT" MODIFY ("RECIPEID" NOT NULL ENABLE);
  ALTER TABLE "C##FOOD"."RECIPEINGREDIENT" MODIFY ("ID" NOT NULL ENABLE);
