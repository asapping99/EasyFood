package com.common.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import com.common.vo.BaseVO;

public class AbstractDAO {

	@Autowired
	protected SqlSessionTemplate sqlSession;
     
    protected void printQueryId(String queryId) {
//        if(log.isDebugEnabled()){
//            log.debug("\t QueryId  \t:  " + queryId);
//        }
    }
    
    public Object insert(String queryId, Object params){
        printQueryId(queryId);
        return sqlSession.insert(queryId, params);
    }
     
    public Object update(String queryId, Object params){
        printQueryId(queryId);
        return sqlSession.update(queryId, params);
    }
     
    public Object delete(String queryId, Object params){
        printQueryId(queryId);
        return sqlSession.delete(queryId, params);
    }
    
    public Object delete(String queryId, String id){
    	printQueryId(queryId);
    	return sqlSession.delete(queryId, id);
    }
     
    public Object selectOne(String queryId){
        printQueryId(queryId);
        return sqlSession.selectOne(queryId);
    }
     
    public Object selectOne(String queryId, Object params){
        printQueryId(queryId);
        return sqlSession.selectOne(queryId, params);
    }
     
    @SuppressWarnings("rawtypes")
    public List selectList(String queryId){
        printQueryId(queryId);
        return sqlSession.selectList(queryId);
    }
     
    @SuppressWarnings("rawtypes")
    public List selectList(String queryId, Object params){
        printQueryId(queryId);
        return sqlSession.selectList(queryId,params);
    }

    public void setId(BaseVO obj) {
    	if(StringUtils.isEmpty(obj.getId())) {
    		obj.setId(getPrimaryKey());
    	}
    }
    
    private String getPrimaryKey() {
		StringBuffer sb = new StringBuffer();
		String regex = "abcdefghijklmlopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		long l = System.currentTimeMillis();
		int maxSize = regex.length() - 1;
		int cnt = 0;
		while(l > 0) {
			char k;
			int n = (int) (l % 100);
			if(n > maxSize) {
				n = n - maxSize;
				cnt++;
			}
			k = regex.charAt(n);
			sb.append(k);
			l = l / 100;
		}
		sb.append(cnt);
		return sb.toString();
    }
}
