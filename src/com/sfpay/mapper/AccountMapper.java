package com.sfpay.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.sfpay.entity.Account;

public interface AccountMapper extends SqlMapper {
	
	public List<Account> getAllAccount();
	
	public Account getAccount();
	
	public Account getAccountById(Long id);
	
	public Account getAccountByNames(String spring);
	
	public Account getAccountByName(String name);
	
	public void addAccount(Account account);
	
	public void editAccount(Account account);
	
	public void removeAccount(Long id);
}
