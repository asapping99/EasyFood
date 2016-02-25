package com.test.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.test.dao.TestDAO;

@Service("testService")
public class TestServiceImpl implements TestService {

	@Resource(name="testDAO")
    private TestDAO testDAO;
	
	@Override
	public void selectBaseTest() {
		// TODO Auto-generated method stub
		testDAO.selectBaseTest();
	}

}
