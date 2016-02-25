package com.model.userInfo;

public interface UserInfoBLO {

	void login(UserInfoVO userInfo) throws Exception;
	void create(UserInfoVO userInfo);
	void update(UserInfoVO userInfo);
	void delete(String id);

}
