package com.mvc.dao.bannerImageDao;

import java.util.List;


import com.mvc.enitiy.BannerImage;


public interface BannerImageDao   {
   /**
    * ��ѯ bannerͼƬ
    * @return
    */
	public  List<BannerImage> queryBanner();
	
	
}
