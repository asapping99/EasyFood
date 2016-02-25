--------------------------------------------------------
--  파일이 생성됨 - 화요일-12월-01-2015   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table COOKINGMETHOD
--------------------------------------------------------

  CREATE TABLE "C##FOOD"."COOKINGMETHOD" 
   (	"ID" VARCHAR2(500 BYTE), 
	"RECIPEID" VARCHAR2(500 BYTE), 
	"DESCRIPTION" CLOB, 
	"SORTORDER" NUMBER
   ) SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  TABLESPACE "TBSGOMHOMEINDEX" 
 LOB ("DESCRIPTION") STORE AS SECUREFILE (
  TABLESPACE "TBSGOMHOMEINDEX" ENABLE STORAGE IN ROW CHUNK 8192
  NOCACHE LOGGING  NOCOMPRESS  KEEP_DUPLICATES ) ;
--------------------------------------------------------
--  DDL for Index COOKINGMETHOD_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "C##FOOD"."COOKINGMETHOD_PK" ON "C##FOOD"."COOKINGMETHOD" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 
  TABLESPACE "TBSGOMHOMEINDEX" ;
--------------------------------------------------------
--  DDL for Index COOKINGMETHOD_INDEX1
--------------------------------------------------------

  CREATE INDEX "C##FOOD"."COOKINGMETHOD_INDEX1" ON "C##FOOD"."COOKINGMETHOD" ("RECIPEID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "TBSGOMHOMEINDEX" ;
--------------------------------------------------------
--  Constraints for Table COOKINGMETHOD
--------------------------------------------------------

  ALTER TABLE "C##FOOD"."COOKINGMETHOD" ADD CONSTRAINT "COOKINGMETHOD_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 
  TABLESPACE "TBSGOMHOMEINDEX"  ENABLE;
  ALTER TABLE "C##FOOD"."COOKINGMETHOD" MODIFY ("DESCRIPTION" NOT NULL ENABLE);
  ALTER TABLE "C##FOOD"."COOKINGMETHOD" MODIFY ("RECIPEID" NOT NULL ENABLE);
  ALTER TABLE "C##FOOD"."COOKINGMETHOD" MODIFY ("ID" NOT NULL ENABLE);
