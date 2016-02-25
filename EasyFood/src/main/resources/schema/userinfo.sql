--------------------------------------------------------
--  颇老捞 积己凳 - 老夸老-11岿-08-2015   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table USERINFO
--------------------------------------------------------

  CREATE TABLE "C##FOOD"."USERINFO" 
   (	"ID" VARCHAR2(500 BYTE), 
	"NAME" VARCHAR2(300 BYTE), 
	"ACCOUNT" VARCHAR2(300 BYTE), 
	"PASSWORD" VARCHAR2(500 BYTE), 
	"CREATEDAT" DATE, 
	"LASTLOGINDATE" DATE
   ) SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  TABLESPACE "TBSGOMHOMEINDEX" ;
--------------------------------------------------------
--  DDL for Index USERINFO_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "C##FOOD"."USERINFO_PK" ON "C##FOOD"."USERINFO" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 
  TABLESPACE "TBSGOMHOMEINDEX" ;
--------------------------------------------------------
--  DDL for Index INDEX1
--------------------------------------------------------

  CREATE INDEX "C##FOOD"."INDEX1" ON "C##FOOD"."USERINFO" ("ACCOUNT") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  TABLESPACE "TBSGOMHOMEINDEX" ;
--------------------------------------------------------
--  Constraints for Table USERINFO
--------------------------------------------------------

  ALTER TABLE "C##FOOD"."USERINFO" ADD CONSTRAINT "USERINFO_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 
  TABLESPACE "TBSGOMHOMEINDEX"  ENABLE;
  ALTER TABLE "C##FOOD"."USERINFO" MODIFY ("CREATEDAT" NOT NULL ENABLE);
  ALTER TABLE "C##FOOD"."USERINFO" MODIFY ("PASSWORD" NOT NULL ENABLE);
  ALTER TABLE "C##FOOD"."USERINFO" MODIFY ("ACCOUNT" NOT NULL ENABLE);
  ALTER TABLE "C##FOOD"."USERINFO" MODIFY ("NAME" NOT NULL ENABLE);
  ALTER TABLE "C##FOOD"."USERINFO" MODIFY ("ID" NOT NULL ENABLE);
