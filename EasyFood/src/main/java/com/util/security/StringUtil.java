package com.util.security;

public class StringUtil {

	public static boolean isNotNull(String str) {
		if(str != null && str.length() > 0) {
			return true;
		}
		return false;
	}
	
	public static boolean isNull(String str) {
		if(str != null && str.length() > 0) {
			return false;
		}
		return true;
	}
}
