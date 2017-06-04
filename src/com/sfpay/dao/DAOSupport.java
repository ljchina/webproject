package com.sfpay.dao;

import java.util.List;

import javax.annotation.Resource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import com.sfpay.entity.Account;
import com.sfpay.mapper.AccountMapper;



@Repository
@Transactional(rollbackFor=Exception.class)
public  class DAOSupport implements  DAO {
	
	@Resource(name="accountMapper")
	private AccountMapper accountMapper;
	
	public void delete(Long entity_id) throws Exception{
		delete(new Long[]{entity_id});
	}

	public  void delete(Long[] entity_ids) throws Exception{
		for(Long id:entity_ids){
			accountMapper.removeAccount(id);
		}
	}

	@Transactional(readOnly=true,propagation=Propagation.NOT_SUPPORTED)
	public Account find(Long entity_id) {
		return accountMapper.getAccountById(entity_id);
	}

	public void save(Account entity) throws Exception{
		accountMapper.addAccount(entity);
	}

	public void update(Account entity) throws Exception{
		accountMapper.editAccount(entity);
	}
	
	public List<Account> getList(){
		return (List<Account>) accountMapper.getAllAccount();
	}

}
