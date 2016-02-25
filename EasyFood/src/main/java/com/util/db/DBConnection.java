package com.util.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class DBConnection {
	
	public DBConnection() {
//		XMLParse.xmlParseMap
	}
	public Connection connection() {
		 try {
			Class.forName(DBParseXML.getConnectionPoolByKey("DriverName"));
			String url = DBParseXML.getConnectionPoolByKey("URL");
			String [] Account = DBParseXML.getConnectionPoolByKey("Account").split("\\|");
			String user = Account[0].split("=")[1];
			String password = Account[1].split("=")[1];
			
			System.out.println("DB 연결 성공!");
			return DriverManager.getConnection(url,user,password);

		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
		
}
