package com.mvc.enitiy;




public class BannerImage {
	
    @Override
	public String toString() {
		return "BannerImage [imageId=" + imageId + ", url=" + url + ", link="
				+ link + ", title=" + title + ", typeId=" + typeId
				+ ", seriesNum=" + seriesNum + ", describe=" + describe + "]";
	}
	private  String imageId;
    private  String url;
    private  String link;
    private  String title;
    private  String typeId;
    private  String seriesNum;//≈≈–Ú
    private  String describe;
	public String getImageId() {
		return imageId;
	}
	public void setIMAGE_ID(String imgId) {
		this.imageId = imgId;
	}
	public String getURL() {
		return url;
	
	}
	public void setIMAGE_URL(String url) {
		this.url = url;
	}
	public String getLink() {
		return link;
	}
	public void setLINK_ADDRESS(String link) {
		this.link = link;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getTypeId() {
		return typeId;
	}
	public void setType_Id(String typeId) {
		this.typeId = typeId;
	}
	public String getSeriesNum() {
		return seriesNum;
	}
	public void setSeries_Number(String seriesNum) {
		this.seriesNum = seriesNum;
	}
	public String getDescribe() {
		return describe;
	}
	public void setDescribe(String describe) {
		this.describe = describe;
	}
    
    
	
	
	
}




