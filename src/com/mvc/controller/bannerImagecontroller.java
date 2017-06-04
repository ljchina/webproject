package com.mvc.controller;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.commons.CommonsMultipartFile;







import com.mvc.enitiy.BannerImage;

import com.mvc.service.bannerImageServcie.BannerImageService;







@Controller
@Scope(value="prototype")//多例模式
@RequestMapping("/admin")
public class bannerImagecontroller {

	@Resource(name="bannerImageServcieImpl")
     private BannerImageService bannerImageService;
	 public bannerImagecontroller() {} 
	 @RequestMapping(value = "/index", method = RequestMethod.GET)  
	    public String adminIndex(Model model) {
		    return "/view/adminlogin/index.jsp";  
	    }
	  
	  @RequestMapping(value = "/BannerList", method = RequestMethod.GET)  
	    public String BannerList(Model model) {
		    List<BannerImage> blist=bannerImageService.queryBanner();
		   for (int i = 0; i < blist.size(); i++) {
			System.out.println(blist.get(i).toString());
		}
		    model.addAttribute("blist",blist);
		    
		    
	        return "/view/adminlogin/BannerList.jsp";  
	    }
	  @RequestMapping(value = "/toBannerupdate", method = RequestMethod.GET)
	  public String Bannerupdate(Model model) {    
	        return "/view/adminlogin/update_banner.jsp";  
	    }
	  
		
	@RequestMapping("/Bannerupdate")
		public String add(BannerImage banner) throws Exception {
		 //  banner.setDescribe(banner.getDescribe().substring(3, banner.getDescribe().length()-10));
			System.out.println(banner.toString());
			//accountService.addAccount(acc);
			return "redirect:/account/list.shtml";
		}
	@RequestMapping("/BannerupdateImage")
	public void addImage(@RequestParam(value = "file", required = false)CommonsMultipartFile file){
		String name=file.getOriginalFilename();
		Calendar now = Calendar.getInstance();
		int moth = now.get(Calendar.MONTH) + 1;
		String pt = now.get(Calendar.YEAR) + "-" + moth + "-" + now.get(Calendar.DAY_OF_MONTH) + "";
		String path1 = "D:\\banner\\" + pt + "\\"+name;//拼接目录
		//System.out.println("file=="+file.toString());
		File dir = new File(path1);
		if (dir.exists()) {
			System.out.println("目标目录已存在！");
			
		}
		if (!path1.endsWith(File.separator))
			path1 = path1 + File.separator;
		// 创建单个目录
		if (dir.mkdirs()) {
			System.out.println("创建目录" + path1 + "成功！");
			
		} else {
			System.out.println("创建目录" + path1 + "成功！");
			
		}
		
		try {
			file.transferTo(dir);
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
  
      
		
		
		 
	   
    }  

}
