package com.model.userInfo;


public interface UserInfoDAO {

	UserInfoVO get(UserInfoVO userInfo);
	void create(UserInfoVO userInfo);
	void update(UserInfoVO userInfo);
	void delete(String id);
	
}
