package com.model.userInfo;

import org.springframework.stereotype.Service;

import com.common.dao.AbstractDAO;

@Service("userInfoDAO")
public class UserInfoDAOImpl extends AbstractDAO implements UserInfoDAO {

	@Override
	public UserInfoVO get(UserInfoVO userInfo) {
		return (UserInfoVO)selectOne("userInfo.get", userInfo);
	}
	
	@Override
	public void create(UserInfoVO userInfo) {
		setId(userInfo);
		insert("userInfo.create", userInfo);
	}

	@Override
	public void update(UserInfoVO userInfo) {
		update("userInfo.update", userInfo);
	}

	@Override
	public void delete(String id) {
		delete("userInfo.delete",id);
	}

}
