package com.model.userInfo;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("userInfoService")
public class UserInfoServiceImpl implements UserInfoService {

	@Resource(name="userInfoBLO")
	private UserInfoBLO userInfoBLO;

	@Override
	public void login(UserInfoVO userInfo) throws Exception {
		userInfoBLO.login(userInfo);
	}
	
	@Override
	public void create(UserInfoVO userInfo) {
		userInfoBLO.create(userInfo);
	}

	@Override
	public void update(UserInfoVO userInfo) {
		userInfoBLO.update(userInfo);
	}

	@Override
	public void delete(String id) {
		userInfoBLO.delete(id);
	}

}
