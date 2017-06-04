package com.mvc.rest;  
  
import org.springframework.stereotype.Controller;  
import org.springframework.ui.ModelMap;  
import org.springframework.web.bind.annotation.PathVariable;  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.bind.annotation.RequestMethod;  
import org.springframework.web.servlet.ModelAndView;  

import com.mvc.service.bannerImageServcie.BannerImageService;

@Controller  
public class RestConstroller {  
	private  BannerImageService bannerImageservcie;
    public RestConstroller() {}  
    /*@RequestMapping(value = "/login/{user}", method = RequestMethod.GET)  
    public ModelAndView myMethod(HttpServletRequest request,HttpServletResponse response,   
            @PathVariable("user") String user, ModelMap modelMap) throws Exception {  
        modelMap.put("loginUser", user);  
        return new ModelAndView("/login/hello", modelMap);  
    }  */
    @RequestMapping(value = "/welcome", method = RequestMethod.GET)  
    public String registPost() {  
    	
        return "/view/welcome.jsp";  
    }
    
  
    @RequestMapping(value = "/information", method = RequestMethod.GET)  
    public String information() {  
    	
        return "/view/information.jsp";  
    }
    @RequestMapping(value = "/case", method = RequestMethod.GET)  
    public String Case() {  
    	
        return "/view/case.jsp";  
    }
    @RequestMapping(value = "/about", method = RequestMethod.GET)  
    public String about() {  
    	
        return "/view/about.jsp";  
    }
    
    @RequestMapping(value = "/my-profile", method = RequestMethod.GET)  
    public String myProfile() {  
    	
        return "/view/adminlogin/my-profile.jsp";  
    }
    @RequestMapping(value = "/admin", method = RequestMethod.GET)  
    public String admin() {  
    	
        return "/view/adminlogin/index.jsp";  
    } 
    public String newUser() {  
    	
        return "/view/adminlogin/new-user.jsp";  
    }
    @RequestMapping(value = "/stats", method = RequestMethod.GET)  
    public String stats() {  
    	
        return "/view/adminlogin/stats.jsp";  
    }
    @RequestMapping(value = "/user-stats", method = RequestMethod.GET)  
    public String userstats() {  
    	
        return "/view/adminlogin/user-stats.jsp";  
    }
    @RequestMapping(value = "/users", method = RequestMethod.GET)  
    public String users() {  
    	
        return "/view/adminlogin/users.jsp";  
    }
    @RequestMapping(value = "/new-role", method = RequestMethod.GET)  
    public String newrole() {  
    	
        return "/view/adminlogin/new-role.jsp";  
    }
    @RequestMapping(value = "/roles", method = RequestMethod.GET)  
    public String roles() {  
    	
        return "/view/adminlogin/roles.jsp";  
    }
    @RequestMapping(value = "/visitor-stats", method = RequestMethod.GET)  
    public String visitorstats() {  
    	
        return "/view/adminlogin/visitor-stats.jsp";  
    }
}