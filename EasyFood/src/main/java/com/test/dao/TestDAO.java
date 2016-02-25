package com.test.dao;

import org.springframework.stereotype.Repository;

import com.common.dao.AbstractDAO;

@Repository("testDAO")
public class TestDAO extends AbstractDAO {
	 
	public void selectBaseTest() {
		// TODO Auto-generated method stub
//		List list = sqlSession.selectList("test.selectBaseTest");
//		for(int i = 0; i < list.size(); i++) {
//			System.out.println(list.get(i));
//		}
//		Object obj = sqlSession.selectOne("test.selectBaseTest");
//		System.out.println(obj);
	}

}
