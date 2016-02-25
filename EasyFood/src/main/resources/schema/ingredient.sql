--------------------------------------------------------
--  颇老捞 积己凳 - 老夸老-11岿-08-2015   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table INGREDIENT
--------------------------------------------------------

  CREATE TABLE "C##FOOD"."INGREDIENT" 
   (	"ID" VARCHAR2(500 BYTE), 
	"NAME" VARCHAR2(4000 BYTE)
   ) SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  TABLESPACE "TBSGOMHOMEINDEX" ;
--------------------------------------------------------
--  DDL for Index INGREDIENT_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "C##FOOD"."INGREDIENT_PK" ON "C##FOOD"."INGREDIENT" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 
  TABLESPACE "TBSGOMHOMEINDEX" ;
--------------------------------------------------------
--  Constraints for Table INGREDIENT
--------------------------------------------------------

  ALTER TABLE "C##FOOD"."INGREDIENT" ADD CONSTRAINT "INGREDIENT_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 
  TABLESPACE "TBSGOMHOMEINDEX"  ENABLE;
  ALTER TABLE "C##FOOD"."INGREDIENT" MODIFY ("NAME" NOT NULL ENABLE);
  ALTER TABLE "C##FOOD"."INGREDIENT" MODIFY ("ID" NOT NULL ENABLE);
