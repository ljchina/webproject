package com.sfpay.service;

import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import com.sfpay.dao.DAOSupport;
import com.sfpay.entity.Account;

@Service
@Transactional(rollbackFor=Exception.class)
public class AccountServiceBean extends DAOSupport implements AccountService {


	public boolean addAccount(Account entity) throws Exception{
		entity.setAccountId(new Random().nextInt(99999));
		 save(entity);
		 return true;
	}

	public Account getAccount(Long id) throws Exception {
		return find(id);
	}

	@Transactional(readOnly=true,propagation=Propagation.NOT_SUPPORTED)
	public List<Account> getAccounts() throws Exception {
		return getList();
	}

}
