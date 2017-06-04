    <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>  
    <%  
    String path = request.getContextPath();  
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";  
    %>  
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">  
    <html>  
    <head>  
    <base href="<%=basePath%>">  
	<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/style.css">
    </head> 
<body>
<nav class="navbar navbar-default navbar-fixed-top">
	<div class="container">
		<div class="navbar-header">
			<a href="index.html" class="navbar-brand logo"><img src="" alt="企业logo" style=""></a>
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
		</div>
		<div class="collapse navbar-collapse" id="navbar-collapse">
			<ul class="nav navbar-nav navbar-right">
				<li ><a href="/SprindMvcDemo/welcome.do"><span class="glyphicon glyphicon-home"></span> 首页</a></li>
				<li class="active"><a href="/SprindMvcDemo/information.do"><span class="glyphicon glyphicon-list"></span> 资讯</a></li>
				<li><a href="/SprindMvcDemo/case.do"><span class="glyphicon glyphicon-fire"></span> 商品</a></li>
				<li><a href="/SprindMvcDemo/about.do"><span class="glyphicon glyphicon-question-sign"></span> 关于我们</a></li>
			
			</ul>	
		</div>
	</div>
</nav>

<div class="jumbotron">
	<div class="container">
		<hgroup>
			<h1>资讯</h1>
			<h4>企业内训的最新动态、资源等...</h4>
		</hgroup>
	</div>
</div>

<div id="information">
	<div class="container">
		<div class="row">
			<div class="col-md-8">
				<div class="container-fluid" style="padding:0;">
					<div class="row info-content">
						<div class="col-md-5 col-sm-5 col-xs-5">
							<img src="img/info1.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7">
							<h4>广电总局发布TVOS2.0 华为阿里参与研发</h4>
							<p class="hidden-xs">TVOS2.0是在TVOS1.0与华为MediaOS及阿里巴巴YunOS融合的基础上，打造的新一代智能电视操作系统。华为主要承担开发工作，内置的电视购物商城由阿里方面负责。</p>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row info-content">
						<div class="col-md-5 col-sm-5 col-xs-5">
							<img src="img/info2.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7">
							<h4>苹果四寸手机为何要配置强大的A9处理器？</h4>
							<p class="hidden-xs">苹果明年初有可能对外发布一款经过升级的四英寸手机，相当于iPhone 5s。该手机将会配置苹果在2015年旗舰手机中采用的A9处理器。配置性能如此强大的应用处理器？</p>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row info-content">
						<div class="col-md-5 col-sm-5 col-xs-5">
							<img src="img/info3.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7">
							<h4>六家互联网公司发声明 抵制流量劫持等违法行为</h4>
							<p class="hidden-xs">六家互联网公司（今日头条、美团大众点评网、360、腾讯、微博、小米科技）发布联合声明，呼吁有关运营商打击流量劫持，重视互联网公司被流量劫持，可能导致的严重后果。</p>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row info-content">
						<div class="col-md-5 col-sm-5 col-xs-5">
							<img src="img/info1.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7">
							<h4>广电总局发布TVOS2.0 华为阿里参与研发</h4>
							<p class="hidden-xs">TVOS2.0是在TVOS1.0与华为MediaOS及阿里巴巴YunOS融合的基础上，打造的新一代智能电视操作系统。华为主要承担开发工作，内置的电视购物商城由阿里方面负责。</p>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row info-content">
						<div class="col-md-5 col-sm-5 col-xs-5">
							<img src="img/info2.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7">
							<h4>苹果四寸手机为何要配置强大的A9处理器？</h4>
							<p class="hidden-xs">苹果明年初有可能对外发布一款经过升级的四英寸手机，相当于iPhone 5s。该手机将会配置苹果在2015年旗舰手机中采用的A9处理器。配置性能如此强大的应用处理器？</p>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row info-content">
						<div class="col-md-5 col-sm-5 col-xs-5">
							<img src="img/info3.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7">
							<h4>六家互联网公司发声明 抵制流量劫持等违法行为</h4>
							<p class="hidden-xs">六家互联网公司（今日头条、美团大众点评网、360、腾讯、微博、小米科技）发布联合声明，呼吁有关运营商打击流量劫持，重视互联网公司被流量劫持，可能导致的严重后果。</p>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row info-content">
						<div class="col-md-5 col-sm-5 col-xs-5">
							<img src="img/info1.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7">
							<h4>广电总局发布TVOS2.0 华为阿里参与研发</h4>
							<p class="hidden-xs">TVOS2.0是在TVOS1.0与华为MediaOS及阿里巴巴YunOS融合的基础上，打造的新一代智能电视操作系统。华为主要承担开发工作，内置的电视购物商城由阿里方面负责。</p>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row info-content">
						<div class="col-md-5 col-sm-5 col-xs-5">
							<img src="img/info2.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7">
							<h4>苹果四寸手机为何要配置强大的A9处理器？</h4>
							<p class="hidden-xs">苹果明年初有可能对外发布一款经过升级的四英寸手机，相当于iPhone 5s。该手机将会配置苹果在2015年旗舰手机中采用的A9处理器。配置性能如此强大的应用处理器？</p>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row info-content">
						<div class="col-md-5 col-sm-5 col-xs-5">
							<img src="img/info3.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7">
							<h4>六家互联网公司发声明 抵制流量劫持等违法行为</h4>
							<p class="hidden-xs">六家互联网公司（今日头条、美团大众点评网、360、腾讯、微博、小米科技）发布联合声明，呼吁有关运营商打击流量劫持，重视互联网公司被流量劫持，可能导致的严重后果。</p>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row info-content">
						<div class="col-md-5 col-sm-5 col-xs-5">
							<img src="img/info1.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7">
							<h4>广电总局发布TVOS2.0 华为阿里参与研发</h4>
							<p class="hidden-xs">TVOS2.0是在TVOS1.0与华为MediaOS及阿里巴巴YunOS融合的基础上，打造的新一代智能电视操作系统。华为主要承担开发工作，内置的电视购物商城由阿里方面负责。</p>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row info-content">
						<div class="col-md-5 col-sm-5 col-xs-5">
							<img src="img/info2.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7">
							<h4>苹果四寸手机为何要配置强大的A9处理器？</h4>
							<p class="hidden-xs">苹果明年初有可能对外发布一款经过升级的四英寸手机，相当于iPhone 5s。该手机将会配置苹果在2015年旗舰手机中采用的A9处理器。配置性能如此强大的应用处理器？</p>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row info-content">
						<div class="col-md-5 col-sm-5 col-xs-5">
							<img src="img/info3.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7">
							<h4>六家互联网公司发声明 抵制流量劫持等违法行为</h4>
							<p class="hidden-xs">六家互联网公司（今日头条、美团大众点评网、360、腾讯、微博、小米科技）发布联合声明，呼吁有关运营商打击流量劫持，重视互联网公司被流量劫持，可能导致的严重后果。</p>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-4 info-right hidden-xs hidden-sm">
				<blockquote>
					<h2>热门资讯</h2>
				</blockquote>
				<div class="container-fluid">
					<div class="row">
						<div class="col-md-5 col-sm-5 col-xs-5" style="margin: 12px 0; padding: 0">
							<img src="img/info2.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7" style="padding-right: 0">
							<h4>苹果四寸手机为何要配置强大的A9处理器？</h4>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row">
						<div class="col-md-5 col-sm-5 col-xs-5" style="margin: 12px 0; padding: 0">
							<img src="img/info1.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7" style="padding-right: 0">
							<h4>广电总局发布TVOS2.0 华为阿里参与研发</h4>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row">
						<div class="col-md-5 col-sm-5 col-xs-5" style="margin: 12px 0; padding: 0">
							<img src="img/info3.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7" style="padding-right: 0">
							<h4>六家互联网公司发声明 抵制流量劫持等违法行为</h4>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row">
						<div class="col-md-5 col-sm-5 col-xs-5" style="margin: 12px 0; padding: 0">
							<img src="img/info2.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7" style="padding-right: 0">
							<h4>苹果四寸手机为何要配置强大的A9处理器？</h4>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row">
						<div class="col-md-5 col-sm-5 col-xs-5" style="margin: 12px 0; padding: 0">
							<img src="img/info1.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7" style="padding-right: 0">
							<h4>广电总局发布TVOS2.0 华为阿里参与研发</h4>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row">
						<div class="col-md-5 col-sm-5 col-xs-5" style="margin: 12px 0; padding: 0">
							<img src="img/info3.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7" style="padding-right: 0">
							<h4>六家互联网公司发声明 抵制流量劫持等违法行为</h4>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row">
						<div class="col-md-5 col-sm-5 col-xs-5" style="margin: 12px 0; padding: 0">
							<img src="img/info2.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7" style="padding-right: 0">
							<h4>苹果四寸手机为何要配置强大的A9处理器？</h4>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row">
						<div class="col-md-5 col-sm-5 col-xs-5" style="margin: 12px 0; padding: 0">
							<img src="img/info1.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7" style="padding-right: 0">
							<h4>广电总局发布TVOS2.0 华为阿里参与研发</h4>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
					<div class="row">
						<div class="col-md-5 col-sm-5 col-xs-5" style="margin: 12px 0; padding: 0">
							<img src="img/info3.jpg" class="img-responsive" alt="">
						</div>
						<div class="col-md-7 col-sm-7 col-xs-7" style="padding-right: 0">
							<h4>六家互联网公司发声明 抵制流量劫持等违法行为</h4>
							<p>admin 15 / 10 / 11</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<footer id="footer">
	<div class="container">
		<p>企业培训 | 合作事宜 | 版权投诉</p>
		<p>苏ICP 备12345678. © 2009-2029 瑞兰德环境科技 </p>
	</div>
</footer>
</body>
</html>