package com.mvc.service.bannerImageServcieImpl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


import com.mvc.dao.bannerImageDao.BannerImageDao;
import com.mvc.enitiy.BannerImage;

import com.mvc.service.bannerImageServcie.BannerImageService;

@Service
@Transactional(rollbackFor=Exception.class)
public class BannerImageServcieImpl implements BannerImageService {
	@Resource(name="bannerImageDaoImpl")
    private BannerImageDao bannerImageDaoImpl;
	
	@Transactional(readOnly=true,propagation=Propagation.NOT_SUPPORTED)
	public List<BannerImage> queryBanner() {
		// TODO Auto-generated method stub
		System.out.println("ÒµÎñ´¦");
		
		
		return bannerImageDaoImpl.queryBanner();
	}

}
