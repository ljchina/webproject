package com.sfpay.action;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import com.sfpay.entity.Account;
import com.sfpay.service.AccountService;

@Controller
@Scope(value="prototype")
@RequestMapping("/account")
public class AccountController {
	
	@Resource(name="accountServiceBean")
	private AccountService accountService;
	
	@RequestMapping("/add")
	public String add(Account acc) throws Exception {
		System.out.println(acc);
		accountService.addAccount(acc);
		return "redirect:/account/list.do";
	}
	
	@RequestMapping("/get")
	public String get(Long id, Model model) throws Exception {
		System.out.println("##ID:" + id);
		model.addAttribute(accountService.getAccount(id));
		return "/show.jsp";
	}
	
	@RequestMapping("/list")
	public String list(Model model) {
		model.addAttribute("list", accountService.getList());
		return "/list.jsp";
	}
	
	@ExceptionHandler(Exception.class)
	public String exception(Exception e, HttpServletRequest request) {
		request.setAttribute("exception", e);
		return "/error.jsp";
	}
}
