package com.test.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.test.service.TestService;

@Controller
@RequestMapping(value = "/test")
public class TestController {

	@Resource(name="testService")
    private TestService testService;
     
    @RequestMapping(value = "b", method = RequestMethod.GET)
    public String b() {
        return "b";
    }
    
    @RequestMapping(value = "ta", method = RequestMethod.POST)
    public ModelAndView ta(@RequestParam(value="tInput", required=false) String tInput) {
    	testService.selectBaseTest();
    	System.out.println(tInput);
        ModelAndView mv = new ModelAndView();
        mv.setViewName("ta");
        mv.addObject("message", "Hello Spring MVC");
        return mv;
    }
	
}
