package com.test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.annotation.Resource;

import com.model.userInfo.UserInfoDAO;
import com.model.userInfo.UserInfoVO;
import com.util.db.DBConnection;
import com.util.xml.XMLParse;

public class TestSource {

	private Connection conn = null;
	private PreparedStatement st = null;
	private ResultSet rs = null;
	
	@Resource(name="userInfoDAO")
	private UserInfoDAO userInfoDAO;
	
	protected void initialize() {
		XMLParse.execute();
		DBConnection dbConn = new DBConnection();
		conn = dbConn.connection();
	}
	
	public void execute() {
		try {
			UserInfoVO userInfo = new UserInfoVO();
			userInfo.setName("조윤정");
			userInfo.setAccount("dbswod1004");
			userInfo.setPassword("11");
			userInfoDAO.create(userInfo);
		} catch(Exception e) {
			System.out.println("에러");
		}
	}
	
	protected void run() {
		
	}
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		TestSource testSource = new TestSource();
		testSource.execute();
	}

}
