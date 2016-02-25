package com.util.db;

import org.w3c.dom.NamedNodeMap;

import com.util.xml.XMLConstant;
import com.util.xml.XMLParse;


public interface DBParseXML {
	
	public static String getConnectionPoolByKey(String key) {
		NamedNodeMap map = (NamedNodeMap)XMLParse.xmlParseMap.get(XMLConstant.TAG_CONNECTIONPOOL);
		System.out.println(map.getNamedItem(key).getNodeValue());
		return map.getNamedItem(key).getNodeValue();
	}
}
