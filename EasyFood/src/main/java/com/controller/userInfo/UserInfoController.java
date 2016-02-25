package com.controller.userInfo;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.model.userInfo.UserInfoService;
import com.model.userInfo.UserInfoVO;

@Controller
@RequestMapping(value = "/userInfo")
public class UserInfoController extends MultiActionController {

	@Resource(name="userInfoService")
    private UserInfoService userInfoService;

	@RequestMapping(value = "login", method = RequestMethod.POST)
    public @ResponseBody UserInfoVO login(@ModelAttribute("userInfo") UserInfoVO userInfo, BindingResult error, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		ModelAndView mv = null;
		try {
			userInfoService.login(userInfo);
//			mv = new ModelAndView();
//			mv.setViewName("main");
		}catch(Exception e) {
			System.out.println(e);
		}
        return userInfo;
    }
	
	@RequestMapping(value = "create", method = RequestMethod.POST)
	public @ResponseBody UserInfoVO create(@ModelAttribute("userInfo") UserInfoVO userInfo, BindingResult error, HttpServletRequest request, HttpServletResponse response) {
		userInfoService.create(userInfo);
		return userInfo;
	}
}
