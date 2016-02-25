package com.model.userInfo;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("userInfoBLO")
public class UserInfoBLOImpl implements UserInfoBLO {

	@Resource(name="userInfoDAO")
	private UserInfoDAO userInfoDAO;
	
	@Override
	public void login(UserInfoVO userInfo) throws Exception {
		UserInfoVO userInfoVO = userInfoDAO.get(userInfo);
		if(userInfoVO == null) {
			throw new Exception();
		}
	}
	
	@Override
	public void create(UserInfoVO userInfo) {
		userInfoDAO.create(userInfo);
	}

	@Override
	public void update(UserInfoVO userInfo) {
		userInfoDAO.update(userInfo);
	}

	@Override
	public void delete(String id) {
		userInfoDAO.delete(id);
	}

}
