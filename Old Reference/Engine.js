Control = {
	
	blockPositions: {},
	blockStyle: {},
	sites: {},
	dropdown: false,
	page: "",
	lIn: {},
	blockIndex: {},
	
	cleanLogin: function(){
		currentBlock = "block0";
		currentSite = "Site1";
		siteCount = 0;
		blockCount = 0;
		fromPage = false;
		gsAPI.loggedIn = false;
	},
	
	buildSiteList: function(){
		console.log("building ");
		var ad = $('.addImageTemplate').html();

		$('.sitePreviews').empty();
		$('.sitePreviews').append(ad);
	
		for (var i = 0; i < siteCount; i++){
			if (Control.sites["Site"+(i+1)]!="null"){
				try{
				var d = $('.spTemplate').html();
				$('.sitePreviews').append(d);
				$('.sitePreviews').find('#cp0').attr('id', 'cp'+(i+1));
				$('.sitePreviews').find('#st0').attr('id', 'st'+(i+1));
				$('.sitePreviews').find('#sv0').attr('id', 'Site'+(i+1));
				$('.sitePreviews').find('#fb0').attr('id', 'fb'+(i+1));
				$('.sitePreviews').find('#fb'+(i+1)).attr('href', 'https://losite.co');
				
				$('#cp'+(i+1)).html(Control.sites["Site"+(i+1)].code.html);
				$('#st'+(i+1)).html(Control.sites["Site"+(i+1)].name);
		    		
		    		$('#cp'+(i+1)).css("width", $('.builtSite').width());
		    		$('#cp'+(i+1)).css("height", $('.builtSite').height());
		    		
				for (var j = 0; j<Control.sites["Site"+(i+1)].code.blocks; j++){
					try{
					$('.containPrev').find('#block'+(j+1)).css(
						{
								top:Control.sites["Site"+(i+1)].code.blockPositions["block"+(j+1)].top,
								left:Control.sites["Site"+(i+1)].code.blockPositions["block"+(j+1)].left,
								width:Control.sites["Site"+(i+1)].code.blockPositions["block"+(j+1)].width,
								height:Control.sites["Site"+(i+1)].code.blockPositions["block"+(j+1)].height

					});
					}
					catch(err){
								
							}
							
				}
			}
			catch(e){}
			//FB.XFBML.parse($('.sitePreviews').find('#fb'+(i+1)), function(){});
			}
			
		}
		
	},
	
	philFunctions: function(){
		$('.TermsandConditions').live('click',function(){
			$('.logReg').show();
			$('.TCText').show();
     $('.PrivacyText').hide();
     $('.ContactOptions').hide();
	 $('.SettingsOptions').hide();
		});
		
	$('.TermsPopupBG').live('click',function(){
			$('.logReg').hide();
			$('.TCText').hide();
     $('.PrivacyText').hide();
     $('.ContactOptions').hide();
	 $('.SettingsOptions').hide();
		});
		
		
		$('.Privacy').live('click',function(){
			$('.logReg').show();
			$('.PrivacyText').show();
     $('.TCText').hide();
     $('.ContactOptions').hide();
	 $('.SettingsOptions').hide();
		});
		$('.Contact').live('click',function(){
			$('.logReg').show();
			$('.ContactOptions').show();
     $('.PrivacyText').hide();
     $('.TCText').hide();
	 $('.SettingsOptions').hide();
		});
		
		$('.Settings').live('click',function(){
			$('.SettingsOptions').show();
			$('.logReg').show();
     $('.PrivacyText').hide();
     $('.TCText').hide();
     $('.ContactOptions').hide();
		});
	},
	
	screenSlide: function(){
		$('.siteView').live('click', function(){
			localStorage.setItem("lIn", JSON.stringify(Control.lIn));
			localStorage.setItem("sites", JSON.stringify(Control.sites));
			localStorage.setItem("siteSelect", this.id);
			localStorage.setItem("oldPage", "mySites");
			localStorage.setItem("siteCount", siteCount);
			//localStorage.lIn = JSON.stringify(Control.lIn);
			//localStorage.sites = JSON.stringify(Control.sites);
			//localStorage.siteSelect = this.id;
			//localStorage.oldPage = "mySites";
			//localStorage.siteCount = JSON.stringify(siteCount);
			window.location.href = "createPage.html";
		});
		
		$('.mySitesList').live('click', function(){
			if (this.id != "addNewSite"){
				currentSite = $(this).html();
				currentBlock = "block0";
				blockCount = 0;
				$('.preBlock').show();
				$('.blockList').empty();
				//$('.previewContainer').html('<iframe id="prev" src="./templates/blankTemplate/index.html" width="100%" height="100%"></iframe>');
				gsAPI.loadSite();
			}
			else{
				// possibly save site and load new one
				siteCount++;
				currentSite = "Site"+siteCount;
				currentBlock = "block0";
				blockCount = 0;
				
				$('.preBlock').show();
				$('.blockList').empty();
				$('.previewContainer').html('<iframe id="prev" src="./templates/blankTemplate/index.html" width="100%" height="100%"></iframe>');
			}
			$('.mySites').empty();
			var ex = '<div class="mySitesTitle">My Sites</div>';
			$('.mySites').html(ex);
		});
		$('.mySitesTitleR').live('click', function(){
			localStorage.setItem("lIn", JSON.stringify(Control.lIn));
			localStorage.setItem("sites", JSON.stringify(Control.sites));
			localStorage.setItem("siteSelect", "xx");
			localStorage.setItem("oldPage", "createPage");
			localStorage.setItem("siteCount", siteCount);
			//localStorage.lIn = JSON.stringify(Control.lIn);
			//localStorage.sites = JSON.stringify(Control.sites);
			//localStorage.siteSelect = "xx";
			//localStorage.oldPage = "createPage";
			//localStorage.siteCount = JSON.stringify(siteCount);
			window.location.href = "mySites.html";
		});
		$('.mySitesTitle').live('click', function(){
			$('.mySites').empty();
			var ex = '<div class="mySitesTitle">My Sites</div>';
			$('.mySites').html(ex);
			
			if (!Control.dropdown){
				for (var i = 0; i< siteCount; i++){
					if (Control.sites["Site"+(i+1)]!="null"){
						var newSite = "<div class='mySitesList'>Site"+(i+1)+"</div>";
						$('.mySites').append(newSite);
					}
				}
					var newSite = "<div class='mySitesList' id='addNewSite' style='opacity: .6;'>+ add site +</div>";
					$('.mySites').append(newSite);
					Control.dropdown = true;
			}
			else{
				Control.dropdown = false;
			}
			
		});
		$('.logInOut').live('click', function(){
			if (!gsAPI.loggedIn){
				$('.signUp').show();
       			$('.signUpBG').show();
			}
			else{
				gsAPI.loggedIn = false;
				$('.logInOut').html ("Login / Signup");
			}			
		});
		$('.LoginButton').live('click', function(){
			var user = $('.loginUsername').val();
			var pass = $('.loginPassword').val();
			if ((user != "")&&(pass != "")){
				gsAPI.Login(user, pass);
			}
		});
		$('.RegisterButton').live('click', function(){
			var name = $('.regName').val();
			var user = $('.regUsername').val();
			var email = $('.regEmail').val();
			var pass = $('.regPass').val();
			var confirm = $('.regConfirm').val();
			if ((user != "")&&(pass != "")&&(email != "")&&(confirm != "")&&(name != "")){
				if (pass == confirm){
					gsAPI.Register(name, user, email, pass);
				}
				else {
					console.log("user pass not same");
				}
			}
			else {
					console.log("fill in all");
				}
		});
		$('.saveSite').live('click', function(){
			if (gsAPI.loggedIn){
				var htmlDump = $('#prev').contents().find("body").html();
				for (var i = 0; i < blockCount ; i++){
					var blockID = "block"+(i+1);
					
					if (blockID in Control.blockStyle){
						var width = $('#prev').contents().find('#'+blockID).width();
						var pageWidth = $('#prev').contents().width();
						var widthP = ((width/pageWidth)*100)+'%';
					
						var height = $('#prev').contents().find('#'+blockID).height();
						var pageHeight = $('#prev').contents().height();
						var heightP = ((height/pageHeight)*100)+'%';
					
						var left = $('#prev').contents().find('#'+blockID).position().left;
						var pageLeft = $('#prev').contents().width();
						var leftP = ((left/pageLeft)*100)+'%';
					
						var top = $('#prev').contents().find('#'+blockID).position().top;
						var pageTop = $('#prev').contents().height();
						var topP = ((top/pageTop)*100)+'%';
					
					Control.blockPositions[blockID] = {width: widthP, height: heightP, left: leftP, top: topP};
					
					//console.log(Control.blockPositions[blockID]);
					
					//$('#prev').contents().find(blockID).css("width", ((width/pageWidth)*100)+'%');
					//console.log(width/pageWidth + " wide " + width);
					}
					
				}
				//console.log(Control.blockPositions);
				gsAPI.saveCurrentSite(htmlDump, Control.blockPositions);
			}
			else{
				$('.logReg').show();
			}
		});
		$('.loadSite').live('click', function(){
			if (gsAPI.loggedIn){
				gsAPI.loadSite();
				//console.log("hahahaha " + htmlDump)
			}
			else{
				$('.logReg').show();
			}
			
		});
		
		//BACKGROUND BLOCK LISTENERS
		$('.bgImageInput').live('keyup', function(){
			
			$('#prev').contents().find('html').css('background-image', "url("+$('.bgImageInput').val()+")");
		});
		$('.colorBG').live('click', function(){
			//var cB = '#'+currentBlock;
			Control.blockStyle[currentBlock]["bgColor"] = $(this).css("background-color");
			console.log(Control.blockStyle);
			$('#prev').contents().find('html').css('background-color', $(this).css("background-color"));
		});
		$('.bgStyle').live('click', function(){
			if (this.id=="fixedBG"){
			//	$('#prev').contents().find('html').css('background-image', "url("+$('.bgImageInput').val()+")");
				$('#prev').contents().find('html').css('background', 'url('+$(".bgImageInput").val()+')center center fixed');
				$('#prev').contents().find('html').css('background-size', 'cover');
				$('#prev').contents().find('html').css('background-repeat', 'no-repeat');
			}
			else if (this.id=="repeatBG"){
				//$('#prev').contents().find('html').css('background', "url("+$('.bgImageInput').val()+")");
				$('#prev').contents().find('html').css('background', 'url('+$(".bgImageInput").val()+')top left');
				$('#prev').contents().find('html').css('background-size', 'auto');
				$('#prev').contents().find('html').css('background-repeat', 'repeat');
			}
			else{
				
			}
		});
		
		//ADD CONTENT BLOCK LISTENERS
		$('.grid').live('click', function(){
			if ($(this).html()=="No"){
				$(this).css('background-color', '#f00');
				$(this).html("Yes");
				Control.blockStyle[currentBlock]["grid"] = "Yes";
			
				gridOnOff = true;
				if ($('.gridInput').val()!=""){
					gSize = $('.gridInput').val();
					Control.blockStyle[currentBlock]["gridSize"] = gSize;
			
				}
				document.getElementById('prev').contentWindow.createGrid(gSize);
			}
			else{
				gridOnOff = false;
				$(this).css('background-color', '#000');
				$(this).html("No");
				Control.blockStyle[currentBlock]["grid"] = "No";
			
				document.getElementById('prev').contentWindow.gridOff();
			}
		});
		$('.addLink').live('click', function(){
			var cB = '#'+currentBlock;
			var widthP = '<a href="http://'+$('.linkInput').val()+'" target="_blank" style="width:100%;height:100%;position: absolute;left: 0px;top:0px;"></a>';
			Control.blockStyle[currentBlock]["link"] = widthP;
			console.log(Control.blockStyle);
			
			$('#prev').contents().find(cB).append(widthP);
		});
		$('.layerInput').live('keyup', function(){
			var cB = '#'+currentBlock;
			var widthP = $('.layerInput').val();
			Control.blockStyle[currentBlock]["layer"] = widthP;
			console.log(Control.blockStyle);
			var wP = widthP;
			$('#prev').contents().find(cB).css('z-index', wP);
		});
		$('.opacityInput').live('keyup', function(){
			var cB = '#'+currentBlock;
			var widthP = $('.opacityInput').val();
			Control.blockStyle[currentBlock]["opacity"] = widthP;
			console.log(Control.blockStyle);
			var wP = widthP;
			$('#prev').contents().find(cB).css('opacity', wP);
		});
		$('.borderInput').live('keyup', function(){
			var cB = '#'+currentBlock;
			var widthP = $('.borderInput').val();
			Control.blockStyle[currentBlock]["borderWidth"] = widthP;
			console.log(Control.blockStyle);
			var wP = widthP+'px';
			$('#prev').contents().find(cB).css('border-width', wP);
		});
		$('.borderRInput').live('keyup', function(){
			var cB = '#'+currentBlock;
			var widthP = $('.borderRInput').val();
			Control.blockStyle[currentBlock]["borderRadius"] = widthP;
			console.log(Control.blockStyle);
			var wP = widthP+'px';
			$('#prev').contents().find(cB).css('border-radius', wP);
		});
		$('.colorBlockSmallBorder').live('click', function(){
			var cB = '#'+currentBlock;
			Control.blockStyle[currentBlock]["borderColor"] = $(this).css("background-color");
			console.log(Control.blockStyle);
			$('#prev').contents().find(cB).css('border-color', $(this).css("background-color"));
		});
		$('.fontInput').live('keyup', function(){
			var cB = '#'+currentBlock;
			var widthP = $('.fontInput').val();
			Control.blockStyle[currentBlock]["fontSize"] = widthP;
			console.log(Control.blockStyle);
			
			var wP = widthP+'px';
			$('#prev').contents().find(cB).css('font-size', wP);
		});
		
		$('.widthInput').live('keyup', function(){
			var cB = '#'+currentBlock;
			var widthP = $('.widthInput').val();
			if (widthP > 100){widthP = 100;}
			if (widthP < 0){widthP = 0;}
			Control.blockStyle[currentBlock]["width"] = widthP;
			console.log(Control.blockStyle);
			var wP = widthP+'%';
			$('#prev').contents().find(cB).css('width', wP);
		});
		$('.heightInput').live('keyup', function(){
			var cB = '#'+currentBlock;
			var widthP = $('.heightInput').val();
			if (widthP > 100){widthP = 100;}
			if (widthP < 0){widthP = 0;}
			Control.blockStyle[currentBlock]["height"] = widthP;
			console.log(Control.blockStyle);
			var wP = widthP+'%';
			$('#prev').contents().find(cB).css('height', wP);
		});
		$('.PwidthInput').live('keyup', function(){
			var cB = '#'+currentBlock;
			var widthP = $('.PwidthInput').val();
			//if (widthP > 100){widthP = 100;}
			if (widthP < 0){widthP = 0;}
			Control.blockStyle[currentBlock]["Pagewidth"] = widthP;
			console.log(widthP);
			var wP = widthP+'%';
			$('#prev').contents().find('html').css('width', wP);
			$('#prev').contents().find('html').css('max-width', wP);
		});
		$('.PheightInput').live('keyup', function(){
			var cB = '#'+currentBlock;
			var widthP = $('.PheightInput').val();
			//if (widthP > 100){widthP = 100;}
			if (widthP < 0){widthP = 0;}
			Control.blockStyle[currentBlock]["Pageheight"] = widthP;
			console.log(widthP);
			var wP = widthP+'%';
			$('#prev').contents().find('html').css('height', wP);
			$('#prev').contents().find('html').css('max-height', wP);
		});
		
		$('.addFB').live('click', function(){
			var cB = '#'+currentBlock;
			photoLib = $('.facebookContentInput').val();
			Control.blockStyle[currentBlock]["fb"] = photoLib;
			console.log(Control.blockStyle);
			console.log(cB)
			document.getElementById('prev').contentWindow.fbAlbumDump(photoLib, cB);
        	
		});
		$('.twitterContentInput').live('keyup', function(){
			console.log("hdhdhdhd")
			var cB = '#'+currentBlock;
			photoLib = $('.twitterContentInput').val();
			Control.blockStyle[currentBlock]["twitter"] = photoLib;
			console.log(Control.blockStyle);
			//$('#prev').contents().find('.twonk').html(photoLib);
			$('#prev').contents().find(cB).html(photoLib);
			
			//document.getElementById('prev').contentWindow.twat(document,"script","twitter-wjs");
        	
		});
		
		$('.audioContentInput').live('keyup', function(){
			var cB = '#'+currentBlock;
			var v = $('.audioContentInput').val();
			Control.blockStyle[currentBlock]["audio"] = v;
			console.log(Control.blockStyle);
			v = v.replace(/(height=")\d+(")/g, "height='100%'");
			console.log("reg ex? " + v);
			//var tune = '<iframe width="100%" height="100%" src="'+v+'" scrolling="no" frameborder="no"></iframe>';
			$('#prev').contents().find(cB).html(v);
		});
		
		$('.imageContentInput').live('keyup', function(){
			var cB = '#'+currentBlock;
			console.log("asdadsdavvvvvvvv "+$('.imageContentInput').val());
			Control.blockStyle[currentBlock]["image"] = $('.imageContentInput').val();
			console.log(Control.blockStyle);
			$('#prev').contents().find(cB).css('background-image', "url("+$('.imageContentInput').val()+")");
			$('#prev').contents().find(cB).css('background-size', '100% 100%');
		});
		
		$('.textContentInput').live('keyup', function(){
			var cB = '#'+currentBlock;
			Control.blockStyle[currentBlock]["text"] = $('.textContentInput').val();
			console.log(Control.blockStyle);
			$('#prev').contents().find(cB).html($('.textContentInput').val());
		});
		$('.videoContentInput').live('keyup', function(){
			var cB = '#'+currentBlock;
			var v = $('.videoContentInput').val();
			Control.blockStyle[currentBlock]["video"] = v;
			console.log(Control.blockStyle);
			var vid = "";
			if (v.indexOf("embed")<0){
				v = v.replace("https://www.youtube.com/watch?v=", "//www.youtube.com/embed/");
				console.log("veee " + v)
			vid = '<iframe width="100%" height="100%" src="'+v+'" frameborder="0" allowfullscreen></iframe>';
			}
			else{
				v = v.replace(/(height=")\d+(")/g, "height='100%'");
				v = v.replace(/(width=")\d+(")/g, "width='100%'");
				vid = v;
			}
			
			
			
			$('#prev').contents().find(cB).html(vid);
		});
		$('.deleteSite').live('click', function(){
			Control.sites[currentSite] = null;
			gsAPI.deleteSite();
			
		});
		$('.deleteBlock').live('click', function(){
			//first ask for verification
			console.log(Control.blockStyle)
			var cB = '#'+currentBlock;
			$('#prev').contents().find(cB).remove();
			delete Control.blockPositions[currentBlock];
			delete Control.blockStyle[currentBlock];
			
			console.log(Control.blockStyle)
			
			$('.blockList').empty();
		    		var lastActiveBlock = "";
		    		//console.log("blocks " + response.scriptData.data[0][currentSite].code.blocks);
		    		for(var i = 1; i <= blockCount; i++){
		    			var blockID = "block"+i;
		    			try{
		    				var blockButton = '<div class="blockListing" id="'+blockID+'">'+Control.blockStyle[blockID]["blockName"]+'</div>';
							$('.blockList').append(blockButton);
							lastActiveBlock = blockID;
		    			}
		    			catch(err){}
		    			
		    		}
		    		//blockCount--;
		    		currentBlock = lastActiveBlock;
		    		$('#'+currentBlock).trigger('click');
			
		});
		$('.blockListing').live('click', function(){
			currentBlock = this.id;
			var cB = '#'+currentBlock;
			console.log(currentBlock)
			console.log(Control.blockStyle[currentBlock]["blockName"])
			try{
				$('.blockNameTop').html(Control.blockStyle[currentBlock]["blockName"]);
				$('#'+currentBlock).html(Control.blockStyle[currentBlock]["blockName"]);
				$('.blockNameInput').val(currentBlock);
			}
			catch(e){
				$('.blockNameTop').html(currentBlock);
				$('#'+currentBlock).html(currentBlock);
				$('.blockNameInput').val(currentBlock);
			}
			try{
				$('.heightInput').val(Control.blockStyle[currentBlock]["height"]);
			}
			catch(e){}
			try{
				$('.widthInput').val(Control.blockStyle[currentBlock]["width"]);
			}
			catch(e){}
			try{
				$('.PheightInput').val(Control.blockStyle[currentBlock]["Pageheight"]);
			}
			catch(e){}
			try{
				$('.PwidthInput').val(Control.blockStyle[currentBlock]["Pagewidth"]);
			}
			catch(e){}
			try{
				$('.borderInput').val(Control.blockStyle[currentBlock]["borderWidth"]);
			}
			catch(e){}
			try{
				$('.borderRInput').val(Control.blockStyle[currentBlock]["borderRadius"]);
			}
			catch(e){}
			try{
				$('.layerInput').val(Control.blockStyle[currentBlock]["layer"]);
			}
			catch(e){}
			try{
				$('.opacityInput').val(Control.blockStyle[currentBlock]["opacity"]);
			}
			catch(e){}
			try{
				$('.fontInput').val(Control.blockStyle[currentBlock]["fontSize"]);
			}
			catch(e){}
			try{
				$('.textContentInput').val(Control.blockStyle[currentBlock]["text"]);
			}
			catch(e){}
			try{
				$('.videoContentInput').val(Control.blockStyle[currentBlock]["video"]);
			}
			catch(e){}
			try{
				$('.imageContentInput').val(Control.blockStyle[currentBlock]["image"]);
			}
			catch(e){}		
			try{
				$('.audioContentInput').val(Control.blockStyle[currentBlock]["audio"]);
			}
			catch(e){}
			try{
				$('.facebookContentInput').val(Control.blockStyle[currentBlock]["fb"]);
			}
			catch(e){}
			try{
				$('.twitterContentInput').val(Control.blockStyle[currentBlock]["twitter"]);
			}
			catch(e){}				
			
			$('.blockListing').css('-webkit-box-shadow', '0px 0px 0px 0px #FF324E');
			$('.blockListing').css('-box-shadow', '0px 0px 0px 0px #FF324E');
			
			$(this).css('-webkit-box-shadow', '2px 2px 2px 4px #FF324E');
			$(this).css('-box-shadow', '2px 2px 2px 4px #FF324E');
			
			$('#prev').contents().find('.newBlock').css('-webkit-box-shadow', '0px 0px 0px 0px #FF324E');
			$('#prev').contents().find('.newBlock').css('-box-shadow', '0px 0px 0px 0px #FF324E');
			$('#prev').contents().find(cB).css('-webkit-box-shadow', '2px 2px 2px 4px #FF324E');
			$('#prev').contents().find(cB).css('-box-shadow', '2px 2px 2px 4px #FF324E');
		});
		$('.blockNameInput').live('keyup', function(){
			$('.blockNameTop').html($(this).val());
			$('#'+currentBlock).html($(this).val());
			Control.blockStyle[currentBlock]["blockName"] = $(this).val();
			console.log(Control.blockStyle[currentBlock]["blockName"]);
		});
		$('.preBlock').live('click', function(){
			if (gsAPI.loggedIn){
				$('.addBlock').trigger('click');
				$(this).hide();
			}
			else{
				$('.logReg').show();
			}
			
		});
		
		$('.addBlock').live('click', function(){
			if (gsAPI.loggedIn){
				$('.preBlock').hide();
				var f = $('#prev');
				blockCount++;
				if (siteCount == 0){
					siteCount = 1;
				}
				var blockID = "block"+blockCount;
				
				Control.blockStyle[blockID]= {height: 0, width: 0, bgColor: '#fff', borderRadius:0, borderWidth:0, borderColor:0, layer: 1, opacity: 1, link: ""};
				Control.blockStyle[blockID]["blockName"] = blockID;
				var newB = '<div class="newBlock" id="'+blockID+'" style="left:10px; top: 10px; position: absolute;"></div>';
				$('#prev').contents().find('body').append(newB);
				
				//document.getElementById('prev').contentWindow.dragger();
				
				var blockButton = '<div class="blockListing" id="'+blockID+'">'+blockID+'</div>';
				$('.blockList').append(blockButton);
				$('#'+blockID).trigger('click');
				
			}
			else{
				$('.logReg').show();
			}
			
		});
		
		$('.fullScreen').live('click', function(){
			
			if ($('.fullScreen').html()=="fullscreen"){

				$('.previewSite').css({'z-index':1000, 'opacity':.95});
				$('.fullScreen').html("minimize");
				$('.previewSite').animate(
					{
						width: "100%",
						height: "100%",
						top: "0",
						left: "0"
					}, 500, function(){
						if (gridOnOff){
							document.getElementById('prev').contentWindow.createGrid(gSize);
						}
					}
				);
			}
			else{
				$('.previewSite').css({'z-index':4, 'opacity':.85});
				$('.fullScreen').html("fullscreen");
	
				$('.previewSite').animate(
					{
						width: "60%",
						height: "86%",
						top: "7%",
						left: "38%"
					}, 500, function(){
						if (gridOnOff){
							document.getElementById('prev').contentWindow.createGrid(gSize);
						}
					}
				);	
			}
		});
		$(window).resize(function() {
			if (gridOnOff){
				document.getElementById('prev').contentWindow.createGrid(gSize);
			}
		});
		$('.contentType').live('mouseover', function(){
			//console.log($(this).css("color"))
			if ($(this).css("color")!="rgb(255, 0, 0)"){
				$(this).css("color", "#444");
			}
			
		});
		
		$('.fontPick').live('click', function(){
			var cB = '#'+currentBlock;
			console.log(fonts[$(this).html()] + " " + $(this).html())
			Control.blockStyle[currentBlock]["font"] = fonts[$(this).html()];
			console.log(Control.blockStyle);
			$('#prev').contents().find(cB).css('font-family', fonts[$(this).html()]);
		});
		
		$('.contentType').live('mouseout', function(){
			if ($(this).css("color")!="rgb(255, 0, 0)"){
				$(this).css("color", "#000");
			}
		});
		$('.colorBlockSmallBG').live('click', function(){
			var cB = '#'+currentBlock;
			Control.blockStyle[currentBlock]["bgColor"] = $(this).css("background-color");
			console.log(Control.blockStyle);
			$('#prev').contents().find(cB).css('background-color', $(this).css("background-color"));
		});
		$('.colorBlockSmall').live('click', function(){
			var cB = '#'+currentBlock;
			Control.blockStyle[currentBlock]["color"] = $(this).css("background-color");
			console.log(Control.blockStyle);
			$('#prev').contents().find(cB).css('color', $(this).css("background-color"));
		});
		$('.contentType').live('click', function(){
			
			$('.textContent').hide();
		     $('.videoContent').hide();
		     $('.audioContent').hide();
		     $('.facebookContent').hide();
		     $('.twitterContent').hide();
		     $('.imageContent').hide();
			
			$('.contentType').css("color", "#000");
			$(this).css("color", "#f00");
			//console.log($(this).css("color"))
			
			if (this.id =="textType"){
				Control.blockStyle[currentBlock]["contentType"] = "textType";
			console.log(Control.blockStyle);
				 $('.textContent').show();
			}
			else if (this.id =="videoType"){
				Control.blockStyle[currentBlock]["contentType"] = "videoType";
			console.log(Control.blockStyle);
				 $('.videoContent').show();
			}
			else if (this.id =="musicType"){
				Control.blockStyle[currentBlock]["contentType"] = "musicType";
			console.log(Control.blockStyle);
				 $('.audioContent').show();
			}
			else if (this.id =="imageType"){
				Control.blockStyle[currentBlock]["contentType"] = "imageType";
			console.log(Control.blockStyle);
				 $('.imageContent').show();
			}
			else if (this.id =="facebookType"){
				Control.blockStyle[currentBlock]["contentType"] = "facebookType";
			console.log(Control.blockStyle);
				 $('.facebookContent').show();
			}
			else if (this.id =="twitterType"){
				Control.blockStyle[currentBlock]["contentType"] = "twitterType";
			console.log(Control.blockStyle);
				 $('.twitterContent').show();
			}
		});
		
		$('.num').live('mouseover', function(){
			$(this).css('background-color', '#C0D9D9');
		});
		$('.num').live('mouseout', function(){
			$(this).css('background-color', '#2B384E');
		});
		
		$('.num1').live('mouseover', function(){
			$(this).css('background-color', '#C0D9D9');
		});
		$('.num1').live('mouseout', function(){
			$(this).css('background-color', '#A4C9C9');
		});
		
		$('#arrow-left').live('mouseover', function(){
			$(this).css('border-right', '40px solid #C0D9D9');
		});
		$('#arrow-left').live('mouseout', function(){
			$(this).css('border-right', '40px solid #A4C9C9');
		});
		
		$('#arrow-right').live('mouseover', function(){
			$(this).css('border-left', '40px solid #C0D9D9');
		});
		$('#arrow-right').live('mouseout', function(){
			$(this).css('border-left', '40px solid #A4C9C9');
		});
		
		$('#arrow-left').live('click', function(){
			var posS = $('.designs').css('margin-left');
			var pos = parseInt(posS.substr(0, posS.length-2));
			if (pos > -200){
				$('.designs').animate({
					'margin-left': 0
				}, 250);
			}
			else{
				$('.designs').animate({
					'margin-left': (pos+200)
				}, 250);
			}
		
		});
		
		
		$('#arrow-right').live('click', function(){
			var posS = $('.designs').css('margin-left');
			var pos = parseInt(posS.substr(0, posS.length-2));
			console.log("pos" + pos + "w " + (($('.designs').width()-100)*-1));
			if (pos > (($('.designs').width()-600)*-1)){
				$('.designs').animate({
					'margin-left': (pos-200)
				}, 250);
			}
			else{
				
			}
		});
		
		
				
		$('.navButton').live('click', function(){
			var thisID = this.id;
			$('.sC').animate({opacity: 0}, 200, function(){
				$('.sC').hide();
				//console.log("ididi " + $(this).id)
				if (thisID == "n1"){
					$('.screen1').show();
					$('.screen1').animate({opacity:1}, 200);
				}
				else if(thisID == "n2"){
					$('.screen4').show();
					$('.screen4').animate({opacity:1}, 200);
				}
			});
		});
		
		$('.stepNumber').live('click', function(){
			var thisID = $(this).html();
			$('.sC').animate({opacity: 0}, 200, function(){
				$('.sC').hide();
				//console.log("ididi " + $(this).id)
				if (thisID == "1"){
					$('.screen1').show();
					$('.screen1').animate({opacity:1}, 200);
				}
				else if(thisID == "2"){
					$('.screen2').show();
					$('.screen2').animate({opacity:1}, 200);
				}
				else if(thisID == "3"){
					$('.screen3').show();
					$('.screen3').animate({opacity:1}, 200);
				}
			});
		});
		
		$('.start').live('click', function(){
			$('.sC').animate({opacity: 0}, 200, function(){
				$('.sC').hide();
				$('.screenView').animate({
					width: "100%",
					height: "100%",
					left: "0%",
					top: "0%"
				}, 250);
				$('.part1').animate({opacity:0}, 200, function(){
					$('.part1').hide();
					window.location.href = "createPage.html"
				});
			});
		});
		
		
		
		$('.colorBlock').live('click', function(){
			console.log('click');
			//$('#prev').contents().find('.c1').hide();
			
			$('#prev').contents().find('.c1').css('background-color', colors[this.id][0]);
			$('#prev').contents().find('.c2').css('background-color', colors[this.id][1]);
			$('#prev').contents().find('.c3').css('background-color', colors[this.id][2]);
			
			selections["colors"] = this.id;
			
			//$('#step1').css('background-color', '#F3FF59');
			//$('#step1').css('color', '#000');
			
			if (!step1){
				$('.progressLine').animate({
					width: ($(document).width()*.15)+$('.progressLine').width()
				}, 200);
			step1 = true;
			}
			
		});
		
		$('.designBlock').live('click', function(){
			$('.previewContainer').empty();
			$('.previewContainer').html(designs[this.id]);
			selections["design"] = this.id;
			
			//$('#step2').css('background-color', '#F3FF59');
			//$('#step2').css('color', '#000');
			if (!step2){
				$('.progressLine').animate({
					width: ($(document).width()*.15)+$('.progressLine').width()
				}, 200);	
				step2 = true;
			}
			
		});
		
		$('.timelineBlock').live('click', function(){
			$('.timelineBlock').css('color', '#fff');
			if (step1){	$('#step1').css('color', '#000'); $('#step1').css('background-color', '#F3FF59');}
			if (step2){	$('#step2').css('color', '#000');$('#step2').css('background-color', '#F3FF59');}
			if (step3){	$('#step3').css('color', '#000');$('#step3').css('background-color', '#F3FF59');}
			if (step4){	$('#step4').css('color', '#000');$('#step4').css('background-color', '#F3FF59');}
			$(this).css('color', '#FF324E');
			
		
			if (this.id == "chooseTemplate"){
				ScreenNumber = 1;
				$('.selectColor').css('-webkit-box-shadow', '2px 2px 2px 4px #FF324E');
				$('.selectColor').css('-box-shadow', '2px 2px 2px 4px #FF324E');
				$('.selectDesign').css('-webkit-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.selectDeign').css('-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.previewSite').css('-webkit-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.previewSite').css('-box-shadow', '0px 0px 0px 0px #FF324E');
				
				if (screenNumber >= 2){
					/*
					$('.previewSite').animate({
						width: "60%",
						left: "33%",
						top: "9%",
						height: "55%"
					}, 250)	;
					*/
					$('.selectColor').animate({opacity: .85}, 200);
					$('.selectDesign').animate({opacity: .85}, 200);
					
					
					$('.addContent').animate({
						left: "-60%"
					}, 250, function(){
						$('.addContent').hide();
					
					});
					$('.addDetails').animate({
						left: "-60%"
					}, 250, function(){
						$('.addDetails').hide();
					});
					
					screenNumber = 1;
				}
			}
			else if (this.id == "chooseTemplate"){
				
				$('.selectColor').css('-webkit-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.selectColor').css('-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.selectDesign').css('-webkit-box-shadow', '2px 2px 2px 4px #FF324E');
				$('.selectDeign').css('-box-shadow', '2px 2px 2px 4px #FF324E');
				$('.previewSite').css('-webkit-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.previewSite').css('-box-shadow', '0px 0px 0px 0px #FF324E');
				
				if (screenNumber >= 2){
					/*
					$('.previewSite').animate({
						width: "60%",
						left: "33%",
						top: "9%",
						height: "55%"
					}, 250)	;
					*/
					$('.selectColor').animate({opacity: .85}, 200);
					$('.selectDesign').animate({opacity: .85}, 200);
					
					
					$('.addContent').animate({
						left: "-60%"
					}, 250, function(){
						$('.addContent').hide();
					});
					$('.addDetails').animate({
						left: "-60%"
					}, 250, function(){
						$('.addDetails').hide();
					});
					
					screenNumber = 1;
				}
			}
			else if (this.id == "uploadContent"){
				
				$('.selectColor').css('-webkit-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.selectColor').css('-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.selectDesign').css('-webkit-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.selectDeign').css('-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.previewSite').css('-webkit-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.previewSite').css('-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.addContent').css('-webkit-box-shadow', '2px 2px 2px 4px #FF324E');
				$('.addContent').css('-box-shadow', '2px 2px 2px 4px #FF324E');
				
				if (screenNumber != 2){
					/*
					$('.previewSite').animate({
						width: "53%",
						left: "45%",
						top: "9%",
						height: "77%"
					}, 250)	;
					*/
					$('.selectColor').animate({opacity: 0}, 200);
					$('.selectDesign').animate({opacity: 0}, 200);
					
					$('.addContent').show();
					$('.addContent').animate({
						opacity: ".7",
						left: "3%"
					}, 250);
					$('.addDetails').animate({
						left: "-60%"
					}, 250, function(){
						$('.addDetails').hide();
					});
					
					screenNumber = 2;
				}			
			}
			else if (this.id == "step4"){
				$('.selectColor').css('-webkit-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.selectColor').css('-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.selectDesign').css('-webkit-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.selectDeign').css('-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.previewSite').css('-webkit-box-shadow', '2px 2px 2px 4px #FF324E');
				$('.previewSite').css('-box-shadow', '2px 2px 2px 4px #FF324E');
				$('.addContent').css('-webkit-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.addContent').css('-box-shadow', '0px 0px 0px 0px #FF324E');
			}
			else if (this.id == "goLive"){
				
				$('.selectColor').css('-webkit-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.selectColor').css('-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.selectDesign').css('-webkit-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.selectDeign').css('-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.previewSite').css('-webkit-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.previewSite').css('-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.addContent').css('-webkit-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.addContent').css('-box-shadow', '0px 0px 0px 0px #FF324E');
				$('.addDetails').css('-webkit-box-shadow', '2px 2px 2px 4px #FF324E');
				$('.addDetails').css('-box-shadow', '2px 2px 2px 4px #FF324E');
				
				var htmlDump = $('#prev').contents().find("html").html();
				console.log ("dumping contents " + htmlDump);
				
				if (screenNumber == 1){
					/*
					$('.previewSite').animate({
						width: "53%",
						left: "45%",
						top: "9%",
						height: "77%"
					}, 250)	;
					*/
					$('.selectColor').animate({opacity: 0}, 200);
					$('.selectDesign').animate({opacity: 0}, 200);
					
					$('.addDetails').show();
					$('.addDetails').animate({
						left: "3%"
					}, 250);
					
					screenNumber = 3;
				}		
				else if (screenNumber == 2){
					/*
					$('.previewSite').animate({
						width: "53%",
						left: "45%",
						top: "9%",
						height: "77%"
					}, 250)	;
					*/
					$('.addContent').animate({opacity: 0}, 200);
					//$('.selectDesign').animate({opacity: 0}, 200);
					
					$('.addDetails').show();
					$('.addDetails').animate({
						left: "3%"
					}, 250);
					
					screenNumber = 3;
				}		
			}
		});
		
		$('#title').live('keyup', function(){
			content["title"] = $('#title').val();
			$('#prev').contents().find('.mainTitle').html(content["title"]);
		});
		$('#siteName').live('keyup', function(){
			content["siteName"] = $('#siteName').val();
			$('#prev').contents().find('.siteName').html(content["siteName"]);
		});
		$('#siteText').live('keyup', function(){
			content["siteText"] = $('#siteText').val();
			$('#prev').contents().find('.siteText').html(content["siteText"]);
		});
		$('#siteTag').live('keyup', function(){
			content["siteTag"] = $('#siteTag').val();
			$('#prev').contents().find('.siteTag').html(content["siteTag"]);
		});
		$('#customerName').live('keyup', function(){
			content["customerName"] = $('#customerName').val();
			//$('#prev').contents().find('.siteTag').html(content["siteTag"]);
		});
		$('#customerEmail').live('keyup', function(){
			content["customerEmail"] = $('#customerEmail').val();
			$('#customMSG').val(content["customerEmail"]);
			console.log($('#customMSG').val() + "vvvvz" + content["customerEmail"])
			//$('#prev').contents().find('.siteTag').html(content["siteTag"]);
		});
		$('#customerContact').live('keyup', function(){
			content["customerContact"] = $('#customerContact').val();
			//$('#prev').contents().find('.siteTag').html(content["siteTag"]);
		});
	}
};



var content = [];
content["title"] = "";
content["siteText"] = "";
content["siteName"] = "";
content["siteTag"] = "";

var step1 = false;
var step2 = false;
var step3 = false;
var step4 = false;

var screenNumber = 1;

var colors = [];
colors["cb1"] = ["#987", "#fff", "#FF1900"];
colors["cb2"] = ["#FFB0A3", "#fff", "#55aee3"];
colors["cb3"] = ["#A144FF", "#fff", "#FFB0A3"];
colors["cb4"] = ["#3DFF74", "#A144FF", "#55aee3"];
colors["cb5"] = ["#4CFCFF", "#fff", "#55aee3"];
colors["cb6"] = ["#55aee3", "#3DFF74", "#55aee3"];

var designs = [];
designs["db1"] = '<iframe id="prev" src="./templates/blankTemplate/index.html" width="100%" height="150%"></iframe>';
designs["db2"] = '<iframe id="prev" src="./templates/DeadlyCakes/index.html" width="100%" height="150%"></iframe>';
designs["db3"] = '<iframe id="prev" src="./templates/Andreas/index.html" width="100%" height="150%"></iframe>';
designs["db4"] = '<iframe id="prev" src="./templates/drag/test.html" width="100%" height="150%"></iframe>';

var selections = [];

var currentBlock = "block0";
var currentSite = "Site1";
var siteCount = 0;
var blockCount = 0;
var fromPage = false;

var fonts = [];

var gSize = 50;
var gridOnOff = false;

fonts["Noto Sans"] = "'Noto Sans', sans-serif";
fonts["Lato"] = "'Lato', sans-serif";
fonts["Asset"] = "'Asset', cursive";
fonts["Poiret One"] = "'Poiret One', cursive";
fonts["Armata"] = "'Armata', sans-serif";
fonts["Arimo"] = "'Arimo', sans-serif";
fonts["Emblema One"] = "'Emblema One', cursive";
fonts["Limelight"] = "'Limelight', cursive";
fonts["Vollkorn"] = "'Vollkorn', serif";
fonts["Merriweather Sans"] = "'Merriweather Sans', sans-serif";
fonts["Rock Salt"] = "'Rock Salt', cursive";
