package com.sfpay.entity;

import java.io.Serializable;

public class Account implements Serializable {

	private static final long serialVersionUID = -7970848646314840509L;

	private Integer accountId;
	private Integer status;
	private String username;
	private String password;
	private String flag;
	
	@Override
	public String toString() {
		return accountId+"--"+status+"--"+username+"--"+password+"--"+flag;
	}
	
	public Integer getAccountId() {
		return accountId;
	}

	public void setAccountId(Integer accountId) {
		this.accountId = accountId;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}
}
