package com.model.userInfo;

import java.sql.Timestamp;

import com.common.vo.BaseVO;

public class UserInfoVO extends BaseVO {
	
	// 사용자 이름
	private String name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	// 계정
	private String account;
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	
	// 비밀번호
	private String password;
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	// 계정등록일
	private Timestamp createdAt;
	public Timestamp getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}
	
	// 마지막 로그인 일
	private Timestamp lastLoginDate;
	public Timestamp getLastLoginDate() {
		return lastLoginDate;
	}
	public void setLastLoginDate(Timestamp lastLoginDate) {
		this.lastLoginDate = lastLoginDate;
	}
	
	
	@Override
	public String toString() {
		return "UserInfoVO [name=" + name + ", account=" + account
				+ ", password=" + password + ", createdAt=" + createdAt
				+ ", lastLoginDate=" + lastLoginDate + "]";
	}
	
}
