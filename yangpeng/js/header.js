

/*
  template: `,
			<div class="header" id="header"><header><div class="wrap-header"><div class="main-header"><div id="bgndVideo" class="player mb_YTPlayer isMuted" data-property="{videoURL:mcixldqDIEQ,containment:.main-header,autoPlay:true, mute:true, startAt:10, stopAt:250, opacity:1, addRaster:true, quality:hd1080, optimizeDisplay:true, showControls:false}"></div>	<div class="bg-overlay"><div class="hero-content-wrapper"><div class="hero-content"><h4 class="h-alt hero-subheading wow fadeIn" data-wow-duration="2s" data-wow-delay=".7s" style="visibility: visible; animation-duration: 2s; animation-delay: 0.7s; animation-name: fadeIn;">YangPeng</h4><h1 class="hero-lead wow fadeInLeft" data-wow-duration="1.5s" style="visibility: visible; animation-duration: 1.5s; animation-name: fadeInLeft;">你写的每一行代码，都是你的名片。</h1><a href="single.html" class="button button-skin wow fadeIn" data-wow-duration="2s" data-wow-delay="1s" style="visibility: visible; animation-duration: 2s; animation-delay: 1s; animation-name: fadeIn;">Read More</a></div></div><div id="scroll-page-content"><a href="#page-content" class="scroller"><span class="scroller-text">scroll down</span><div class="scroller-button"><i class="fa fa-angle-double-down"></i></div></a></div></div></div><div id="cssmenu"><ul id="app"> <li class="active"><a href=""><span>aa</span></a></li></ul></div></div></header></div>
		  `,
*/

$(function () {
	
	 new Vue({
		  el: '#app',
		  data () {
			return {
			  info: null
			}
		  },
		  mounted () {
			axios
				.get(common.coluimnApiUrl+'listColuimnById?', {
					params: {
					  parentLevelColumn: '488156dee71f4bea8a296627793598c8',
					  pageSize: '10',
					  pageNumber: '1',
					  statusColumn:'1'
					}
			   })
				.then(response => (this.info = response))
				.catch(function (error) { // 请求失败处理
				console.log(error);
			  });
		  }
		}) 
	
	
	
	
	// 底部footer
	$('#footer').html('');
	var footerHtml = '';
	footerHtml += '<footer id="page-footer">';
		footerHtml += '<div class="wrap-footer">';
			footerHtml += '<div class="zerogrid">';
				footerHtml += '<div class="row">';
					footerHtml += '<div class="sm-2-4 col-footer-1">';
						footerHtml += '<div class="wrap-col">';
							footerHtml += '<h3 class="widget-title">Motto</h3>';
							footerHtml += '<p>你所做的事情，也许暂时看不到结果，但不要灰心或焦虑，你不是没有成长，而是在扎根。</p>';
							footerHtml += '<p>You may not see the result of what you do for a while, but don'+"'"+'t be discouraged or anxious. Instead of not growing up, you are taking root。</p>';
						footerHtml += '</div>';
					footerHtml += '</div>';
					footerHtml += '<div class="sm-1-4 col-footer-2">';
						footerHtml += '<div class="wrap-col">';
							footerHtml += '<h3 class="widget-title">Contact Us</h3>';
							footerHtml += '<p>Call us:</p>';
							footerHtml += '<strong style="font-size: 25px;">185-4515-8921</strong>';
							footerHtml += '<p>Address:</p>';
							footerHtml += '<strong>HeiLongJiang-Harbin-Nangang</strong>';
							footerHtml += '<p>Email:</p>';
							footerHtml += '<strong>yangpeng@yangpeng.net</strong>';
						footerHtml += '</div>';
					footerHtml += '</div>';
					footerHtml += '<div class="sm-1-4 col-footer-3">';
						footerHtml += '<div class="wrap-col">';
							footerHtml += '<h3 class="widget-title">Socials</h3>';
							footerHtml += '<ul class="social-buttons">';
								footerHtml += '<li><a href="#"><i class="fa fa-twitter"></i></a></li>';
								footerHtml += '<li><a href="#"><i class="fa fa-facebook"></i></a></li>';
								footerHtml += '<li><a href="#"><i class="fa fa-linkedin"></i></a></li>';
								footerHtml += '<li><a href="#"><i class="fa fa-pinterest"></i></a></li>';
							footerHtml += '</ul>';
						footerHtml += '</div>';
					footerHtml += '</div>';
				footerHtml += '</div>';
			footerHtml += '</div>';
		footerHtml += '</div>';
		footerHtml += '<div class="bottom-footer">';
			footerHtml += '<div class="copyright">';
				footerHtml += '<div class="zerogrid">';
					footerHtml += '<div class="row">';
						footerHtml += '<div class="sm-1-2">';
						footerHtml += 'Copyright @ - More Templates <a href="#" target="_blank" title="YANGPENG.net">YANGPENG.net</a> - Collect from <a href="#" title="YANGPENG.net" target="_blank">YANGPENG.net</a> </div>';
						footerHtml += '	<span>ICP证：<a href="http://www.beian.miit.gov.cn/">黑ICP备17009757号-2</a></span>';
						footerHtml += '<div class="sm-1-2">';
							footerHtml += '<div id="page-top"><a href="#page-top" class="button button-toTop f-right"><i class="fa fa-angle-double-up"></i></a></div>';
						footerHtml += '</div>';
					footerHtml += '</div>';
				footerHtml += '</div>';
			footerHtml += '</div>';
		footerHtml += '</div>';
	footerHtml += '</footer>';
	$('#footer').append(footerHtml);
})

	
	
	
	
	
	
	
