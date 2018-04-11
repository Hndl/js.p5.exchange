/*
                    #######
                ###############
              ################### 
            ########        #######
          #####                  ### 
          ###                      ##
          ##                        #
          #                         #
          #            #            #
          ###          #          ## 
           #############        #####
             ###########        #####
                ######## 
          #              #
          ################
          ################
          ################
                      ## 
                       ## 
                     #####
                    ######
                    ##### 
                        
          #              #
          ################    ####
          ################    ####
          ################     ##
              #######
            ############
          ###############
          ##           ###
          #             ##
          #             ##
           ##          #            #
          ###########################
          ###########################
          #
 
*/

var Grid = function(drawAtX, drawAtY, maxCols_,MaxRows_,scale_) {
	this.maxCols = maxCols_;
	this.maxRows = MaxRows_;				
	this.cells = [];
	this.scale = scale_;
	this.xoff = drawAtX;
	this.yoff = drawAtY;
	for (var i = 0 ; i < this.maxCols ; i++){
		for ( var j = 0 ; j < this.maxRows ; j++ ) {
			var c = new Cell ( i, j,this.scale,this.xoff, this.yoff);
			if ( j == 0 & i == 0){
				c.hasCustomerHere();
			}
			this.cells.push ( c );

			
		}
	}

	

};

Grid.prototype.setCustomerNearestExchange = function (n_) {
	this.cells[0].nearestExchangeName = n_;
}

Grid.prototype.showCustomer = function (x_, y_) {
	
};

Grid.prototype.render = function () {
	//this.update();
	//this.render();
};

Grid.prototype.update = function () {
	// ready for when we might need it....
};

Grid.prototype.draw = function (mX_, mY_, exchanges_,mClick_) {

	for (var i = 0 ; i<this.cells.length ; i++ ){
		this.cells[i].draw(mX_, mY_, exchanges_, mClick_);
	}
};

Grid.prototype.getCellAtMouseXY = function( mX_, mY_){
	var tC = null;
	for (var i = 0 ; i<this.cells.length ; i++ ){
		if ( this.cells[i].isHoverOver(mX_,mY_) ) {
			tC = this.cells[i];
			i = this.cells.length;
		}
	}
	return ( tC );
};

/*
     		  ################### 
            ########        #######
          #####                  ### 
          ###                      ##
          ##                        #
          #                         #
          #                         #
           #                      ## 
             #                  #####
               ##               #####
               ##### 
            ########### 
           ##############
          ##     #     ## 
          #      #       #
          #      #       #
          #      #      ##
           #     ########
            ##   ###### 
                 ### 
          #                         #
          ###########################
          ###########################
          ###########################
          #                         #
          ###########################
          ###########################
          ###########################
*/

var Cell = function(x_,y_,scl_, xoff_, yoff_) {
	this.cellX = x_;
	this.cellY = y_;			
	this.scale = scl_;	
	this.xoff = xoff_;
	this.yoff = yoff_;
	this.debug = true;
	this.hasExchange = false;
	this.hasCustomer = false;
	this.isHighlighted = false;
	this.ex = null;
	this.nearestExchangeName = "";
};

Cell.prototype.hasCustomerHere = function ( ) {
	this.hasCustomer = true;
}
Cell.prototype.nearestExchangeName = function ( n_ ) {
	this.nearestExchangeName = n;
}

Cell.prototype.hasExchangeHere = function ( ex_ ) {

	this.hasExchange = ex_ != null;
	this.ex = ex_;
}

Cell.prototype.isExchange = function () {
	return ( this.hasExchange);
}
Cell.prototype.getExchange = function () {
	return ( this.ex);
}

Cell.prototype.render = function () {
	this.update();
	this.draw();
};

Cell.prototype.update = function () {

};

Cell.prototype.isHoverOver = function (usersMouseX_, usersMouseY_ ){
	var x = this.xoff + this.cellX*this.scale;
	var y = this.yoff + this.cellY*this.scale;
	var x1 = x + this.scale;
	var y1 = y + this.scale;
	//console.log("cell:" + this.cellX + ":" + this.cellY  + " -- x:" + x + "y:" + y + " x1:" + x1 + " y1:" + y1 + " mX:" + usersMouseX_ + ":mY" + usersMouseY_);

	return ( usersMouseX_ >= x && usersMouseX_ <= x1 && usersMouseY_ >= y && usersMouseY_ <= y1);
	
}

Cell.prototype.draw = function (usersMouseX_, usersMouseY_ , exchanges_ , mClick_) {
	if ( this.debug ) {
		//this.exchangeLivesHere( exchanges_);

		push();
		translate ( this.xoff+ this.cellX * this.scale , this.yoff + this.cellY * this.scale);
		noFill();
		
		this.isHighlighted = this.isHoverOver(usersMouseX_,usersMouseY_);

		stroke(80,80,80);

		if ( this.hasCustomer ) {
			stroke(100,100,255);
			text("Cust",0+2,0+20);
			text(this.nearestExchangeName,0+2,0+30);
		}

		if ( this.hasExchange ) {
			stroke(100,255,100);
		}

		if ( this.isHighlighted ) {
			stroke(255,100,100);
			if ( mClick_ ){
				stroke(255);	
			}
		}

		strokeWeight(1);
		
		rect(0,0,this.scale, this.scale);
		//text("X:"+ this.cellX + " : Y" + this.cellY,0+10,0+15);
		if ( this.hasExchange ) {
			if ( this.ex != null ){
				text(this.ex.name,0+2,0+30);
				text("dist:" + this.ex.calculateDistance(),0+2,0+20);
			}
		}
		pop();
	}
};


/*
 #                         #
          #                         #
          ###########################
          ###########################
          #              #          #
          #              #          #
          #              #          #
          #              #          #
          #             ###         #
          #            #####        #
          #                         #
          ##                       ##
          #####                 #####
                                     
          #              #
          #             ##
          ###        #####
          # ###    #######
               ########  #
              #######
          # #########
          ######     ### #
          ###          ###
          #              #
               ##### 
            ########### 
           ##############
          ##           ## 
          #              #
          #              #
          #             ##
           #          ###
            ##          
          #                         #
          ###########################
          ###########################
          ###########################
                        #
                        ##
                        ##
          ################
          ###############
          ############ 
             ###
           #######    ##
          #########  #### 
          ##     ##   # ##
          #      ##      #
          ##     #      ##
          ############### 
          ##############
          # 
          
          #              #
          ################
          ################
          ################
                        #
                        ##
                        ##
          ################
          ###############
          ############ 
    ###           ####
  ##   ## ##    ########
 ##      ##### ##########
 #      ##### ###      ###
 #      ####  #          #
 ##    ####   ##        ##
 ##    ###    ####    ####
  ########      #########
   #####         ######  ### 
                          ##
               ##### 
            ########### 
           ##############
          ##     #     ## 
          #      #       #
          #      #       #
          #      #      ##
           #     ########
            ##   ###### 
                 ### 
               */
var Exchange = function(x_,y_, name_) {
	this.x = x_;
	this.y = y_;			
	this.name = name_;	
};

Exchange.prototype.setName = function ( n_ ){
	this.name = n_;
}

Exchange.prototype.calculateDistance = function (distanceFromX_, distanceFromY_){
	// distanceFromX/Y just ignore as we are fixed at 0:0.
	return ( this.x + this.y );
}

Exchange.prototype.whichIsClosest = function ( ex_ ){
	return (   this.calculateDistance() <= ex_.calculateDistance() ? this.name : ex_.name  );
}
