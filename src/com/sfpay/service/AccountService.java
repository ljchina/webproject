package com.sfpay.service;

import java.util.List;
import com.sfpay.dao.DAO;
import com.sfpay.entity.Account;

public interface AccountService extends DAO{

	public boolean addAccount(Account entity) throws Exception;
	
	public Account getAccount(Long id) throws Exception;
	
	public List<Account> getAccounts() throws Exception;
}
