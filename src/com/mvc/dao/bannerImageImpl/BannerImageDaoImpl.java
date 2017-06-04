package com.mvc.dao.bannerImageImpl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.mvc.dao.bannerImageDao.BannerImageDao;

import com.mvc.enitiy.BannerImage;

import com.mvc.mapper.BannerImageMapper;


@Repository
public class BannerImageDaoImpl  implements BannerImageDao {
	@Resource(name="bannerImageMapper")
	private BannerImageMapper bannerImageMapper;
	//private SqlSessionTemplate sqlSessionTemplate;
	public List<BannerImage> queryBanner() {
		// TODO Auto-generated method stub
			
		
	        try {
	        	return (List<BannerImage>) bannerImageMapper.queryBanner();
	        }catch(Exception e){
	        	e.printStackTrace();
	        }
	        finally {
	        	//sqlSessionTemplate.close();
	        }
		   return null;
	}

}
