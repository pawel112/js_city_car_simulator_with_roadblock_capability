function city (size, max, difference, car_size, probability, start_field1, start_field2, end_field1, end_field2)
{
	this.size = size;
	this.max = max;
	this.difference = difference;
	this.car_size = car_size;
	this.probability = probability;
	this.start_field1 = start_field1;
	this.start_field2 = start_field2;
	this.end_field1 = end_field1;
	this.end_field2 = end_field2;
	this.current_field1 = start_field1;
	this.current_field2 = start_field2;
	this.blocked_road = [];
	this.movements = [];
	this.file_graph_text = "";
	this.file_input_data_text = "";

	this.get_size = function()
	{
		return this.size;
	}
	
	this.get_max = function()
	{
		return this.max;
	}
	
	this.get_difference = function()
	{
		return this.difference;
	}
	
	this.get_car_size = function()
	{
		return this.car_size;
	}
	
	this.get_probability = function()
	{
		return this.probability;
	}
	
	this.get_start_field1 = function()
	{
		return this.start_field1;
	}
	
	this.get_start_field2 = function()
	{
		return this.start_field2;
	}
	
	this.get_end_field1 = function()
	{
		return this.end_field1;
	}
	
	this.get_end_field2 = function()
	{
		return this.end_field2;
	}
	
	this.get_current_field1 = function()
	{
		return this.current_field1;
	}
	
	this.get_current_field2 = function()
	{
		return this.current_field2;
	}
	
	this.set_current_field1 = function (new_current_field1)
	{
		this.current_field1 = new_current_field1;
	}
	
	this.set_current_field2 = function (new_current_field2)
	{
		this.current_field2 = new_current_field2;
	}
	
	this.square = function (a, b)
	{
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.rect(difference/2+max/size*a, difference/2+max/size*b, max/size, max/size);
		ctx.strokeStyle = '#000000';
		ctx.stroke();
	}
	
	this.return_if_is_blocked_road = function()
	{
		return Math.random() < this.probability;
	}
	
	this.circle = function (a, b, first)
	{
		var c=document.getElementById("myCanvas");
		var ctx=c.getContext("2d");

		if (first == true)
		{
			ctx.fillStyle = "yellow";
		}
		else
		{
			ctx.fillStyle = "blue";
		}

		ctx.beginPath();
		ctx.arc(difference/2+max/size*a, difference/2+max/size*b, max/size/7, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.strokeStyle = '#000000';
		ctx.stroke();
		ctx.fillStyle = "black";
	}
	
	this.animate_left = function()
	{
		$("img").animate({left: "-="+max/size+"px"}, 2000);
	}

	this.animate_right = function()
	{
		$("img").animate({left: "+="+max/size+"px"}, 2000);
	}

	this.animate_top = function()
	{
		$("img").animate({top: "-="+max/size+"px"}, 2000);
	}

	this.animate_down = function()
	{
		$("img").animate({top: "+="+max/size+"px"}, 2000);
	}
	
	this.add_car = function (a, b, add_x, add_y)
	{
		document.getElementById('car').style.position="absolute";
		document.getElementById('car').style.left = difference/2+max/size*a-car_size/2+add_x+'px';
		document.getElementById('car').style.top = difference/2+max/size*b-car_size/8+add_y+'px';
	}
	
	this.add_text = function (i, j, number)
	{
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		ctx.font = "20px Arial";
		ctx.fillText(number, difference/2+max/size*i, difference/2+max/size*j);
	}
	
	this.draw_city = function()
	{
		for (i = 0; i < size; i++)
		{
			for (j = 0; j < size; j++)
			{
				this.square (i, j);
			}
		}
		
		this.circle (this.get_start_field1(), this.get_start_field2(), false);
		this.circle (this.get_end_field1(), this.get_end_field2(), true);
		
		for (i = 0; i < size+1; i++)
		{
			for (j = 0; j < size+1; j++)
			{
				this.add_text (i, j, this.get_field_number (i, j));
			}
		}
		
		this.add_car (this.get_start_field1(), this.get_start_field2(), 0, 0);
		
	}
	
	/* movements */
	this.add_roads = function()
	{
		//add down movement
		if (this.get_current_field2() != this.get_size())
		{
			var temp = this.get_current_field2();
			temp++;
			
			if (this.return_if_is_blocked_road() == true)
			{
				console.log ("1. Blocked movement: from " + this.get_current_field1() + " : " + this.get_current_field2() + " to " + this.get_current_field1() + " : " + temp);
				this.blocked_road.push(this.get_current_field1());
				this.blocked_road.push(this.get_current_field2());
				this.blocked_road.push(this.get_current_field1());
				this.blocked_road.push(temp);
			}
			else
			{
				console.log ("1. Added movement: from " + this.get_current_field1() + " : " + this.get_current_field2() + " to " + this.get_current_field1() + " : " + temp);
				this.movements.push(this.get_current_field1());
				this.movements.push(temp);
			}
		}

		//add up movement
		if (this.get_current_field2() != 0)
		{
			var temp = this.get_current_field2();
			temp--;
			
			if (this.return_if_is_blocked_road() == true)
			{
				console.log ("2. Blocked movement: from " + this.get_current_field1() + " : " + this.get_current_field2() + " to " + this.get_current_field1() + " : " + temp);
				this.blocked_road.push(this.get_current_field1());
				this.blocked_road.push(this.get_current_field2());
				this.blocked_road.push(this.get_current_field1());
				this.blocked_road.push(temp);
			}
			else
			{
				console.log ("2. Added movement: from " + this.get_current_field1() + " : " + this.get_current_field2() + " to " + this.get_current_field1() + " : " + temp);
				this.movements.push(this.get_current_field1());
				this.movements.push(temp);
			}
		}

		//add right movement
		if (this.get_current_field1() != this.get_size())
		{
			var temp = this.get_current_field1();
			temp++;
			
			if (this.return_if_is_blocked_road() == true)
			{
				console.log ("3. Blocked movement: from " + this.get_current_field1() + " : " + this.get_current_field2() + " to " + temp + " : " + this.get_current_field2());
				this.blocked_road.push(this.get_current_field1());
				this.blocked_road.push(this.get_current_field2());
				this.blocked_road.push(temp);
				this.blocked_road.push(this.get_current_field2());
			}
			else
			{
				console.log ("3. Added movement: from " + this.get_current_field1() + " : " + this.get_current_field2() + " to " + temp + " : " + this.get_current_field2());
				this.movements.push(temp);
				this.movements.push(this.get_current_field2());
			}
		}

		//add left movement
		if (this.get_current_field1() != 0)
		{
			var temp = this.get_current_field1();
			temp--;
			
			if (this.return_if_is_blocked_road() == true)
			{
				console.log ("4. Blocked movement: from " + this.get_current_field1() + " : " + this.get_current_field2() + " to " + temp + " : " + this.get_current_field2());
				this.blocked_road.push(this.get_current_field1());
				this.blocked_road.push(this.get_current_field2());
				this.blocked_road.push(temp);
				this.blocked_road.push(this.get_current_field2());
			}
			else
			{
				console.log ("4. Added movement: from " + this.get_current_field1() + " : " + this.get_current_field2() + " to " + temp + " : " + this.get_current_field2());
				this.movements.push(temp);
				this.movements.push(this.get_current_field2());
			}
		}
	}
	
	this.get_best_road = function()
	{
		if (this.movements.length == 0)
		{
			alert ("No movements.");
			return [-1, -1];
		}
		else if (this.movements.length == 2)
		{
			var x = this.movements[0];
			var y = this.movements[1];
			this.movements = [];
			this.blocked_road = [];
			return [x, y];
		}
		else if (this.movements.length == 4)
		{
			var movement_value1 = Math.abs(this.get_end_field1() - this.movements[0]) + Math.abs (this.get_end_field2() - this.movements[1]);
			var movement_value2 = Math.abs(this.get_end_field1() - this.movements[2]) + Math.abs (this.get_end_field2() - this.movements[3]);
			
			if (movement_value2 < movement_value1)
			{
				var x = this.movements[2];
				var y = this.movements[3];
				this.movements = [];
				this.blocked_road = [];
				return [x, y];
			}
			else
			{
				var x = this.movements[0];
				var y = this.movements[1];
				this.movements = [];
				this.blocked_road = [];
				return [x, y];
			}
		}
		else if (this.movements.length == 6)
		{
			var movement_value1 = Math.abs(this.get_end_field1() - this.movements[0]) + Math.abs (this.get_end_field2() - this.movements[1]);
			var movement_value2 = Math.abs(this.get_end_field1() - this.movements[2]) + Math.abs (this.get_end_field2() - this.movements[3]);
			var movement_value3 = Math.abs(this.get_end_field1() - this.movements[4]) + Math.abs (this.get_end_field2() - this.movements[5]);
			
			if ((movement_value2 < movement_value1) && (movement_value2 < movement_value3))
			{
				var x = this.movements[2];
				var y = this.movements[3];
				this.movements = [];
				this.blocked_road = [];
				return [x, y];
			}
			else if (movement_value3 < movement_value1)
			{
				var x = this.movements[4];
				var y = this.movements[5];
				this.movements = [];
				this.blocked_road = [];
				return [x, y];
			}
			else
			{
				var x = this.movements[0];
				var y = this.movements[1];
				this.movements = [];
				this.blocked_road = [];
				return [x, y];
			}
		}
		else if (this.movements.length == 8)
		{
			var movement_value1 = Math.abs(this.get_end_field1() - this.movements[0]) + Math.abs (this.get_end_field2() - this.movements[1]);
			var movement_value2 = Math.abs(this.get_end_field1() - this.movements[2]) + Math.abs (this.get_end_field2() - this.movements[3]);
			var movement_value3 = Math.abs(this.get_end_field1() - this.movements[4]) + Math.abs (this.get_end_field2() - this.movements[5]);
			var movement_value4 = Math.abs(this.get_end_field1() - this.movements[6]) + Math.abs (this.get_end_field2() - this.movements[7]);
			
			if ((movement_value2 < movement_value1) && (movement_value2 < movement_value3) && (movement_value2 < movement_value4))
			{
				var x = this.movements[2];
				var y = this.movements[3];
				this.movements = [];
				this.blocked_road = [];
				return [x, y];
			}
			else if ((movement_value3 < movement_value1) && (movement_value3 < movement_value4))
			{
				var x = this.movements[4];
				var y = this.movements[5];
				this.movements = [];
				this.blocked_road = [];
				return [x, y];
			}
			else if (movement_value4 < movement_value1)
			{
				var x = this.movements[6];
				var y = this.movements[7];
				this.movements = [];
				this.blocked_road = [];
				return [x, y];
			}
			else
			{
				var x = this.movements[0];
				var y = this.movements[1];
				this.movements = [];
				this.blocked_road = [];
				return [x, y];
			}
		}
		else
		{
			return [-1, -1];
		}
	}
		
	this.do_movement = function(x, y)
	{
		if ((x == -1) || (y == -1))
		{
			return false;
		}
		else
		{
			if (this.get_current_field1() == x)
			{
				if (this.get_current_field2() > y)
				{
					console.log ("Do movement up");
					this.animate_top();
				}
				else
				{
					console.log ("Do movement down");
					this.animate_down();
				}
			}
			else
			{
				if (this.get_current_field1() > x)
				{
					console.log ("Do movement left");
					this.animate_left();
				}
				else
				{
					console.log ("Do movement right");
					this.animate_right();
				}
			}

			console.log ("New fields: " + x + " : " + y);
			this.set_current_field1 (x);
			this.set_current_field2 (y);
			return true;	
		}
	}
	
	this.get_field_number = function (a, b)
	{
		var size = this.get_size();
		size++;
		var temp = 1;
		temp = parseInt (parseInt(temp) + parseInt(a));
		temp = parseInt (parseInt(temp) + parseInt(parseInt(size) * parseInt(b)));
		return parseInt (temp);
	}
	
	this.run_car = function()
	{
		var counter = 1;
		console.log ("New simulation");
		console.log ("Start: "+this.get_start_field1() + " , " + this.get_start_field2());
		console.log ("End: "+this.get_end_field1() + " , " + this.get_end_field2());
		console.log ("Probability: "+this.get_probability());
		console.log ("Size: "+this.get_size() + "x" + this.get_size());
		document.getElementById('text').value = "1. Movement:\n";
		
		var size = this.get_size();
		size++;
		this.file_graph_text += "set terminal png\nset output 'graph.png'\nset title \"route of travel and events\"\nset xlabel \"time unit\"\nset ylabel \"numbers intersections route\\n(next the points are written locked streets)\"\nset xtics 1\nset ytics 1\nset yrange [1:" + Math.pow(size, 2) + "]\n";
		this.file_input_data_text += counter + " " + this.get_field_number (this.get_start_field1(), this.get_start_field2()) + "\n";
		
		
		while (true)
		{
			console.log ("\nNew movements");
			console.log ("Blocked roads: "+this.blocked_road.length);
			console.log ("Current: "+this.get_current_field1() + " , " + this.get_current_field2());
			
			$("#line1").hide();
			$("#line2").hide();
			$("#line3").hide();
			$("#line4").hide();
			
			this.draw_city();
			this.add_roads();

			//add blocked roads
			var point_lenght = 4;

			for (i = 0; i < this.blocked_road.length; i = i+4)
			{
				this.file_graph_text += "set label \"" + this.get_field_number (this.blocked_road[i], this.blocked_road[i+1]) + ";" + this.get_field_number (this.blocked_road[i+2], this.blocked_road[i+3]) + "\" at " + counter + "," + parseInt(Math.pow(size, 2) * point_lenght/4 * 0.85) + " center font \"Symbol,11\"\n";
				point_lenght--;
				document.getElementById('text').value += "Blocked movement: " + this.get_field_number (this.blocked_road[i], this.blocked_road[i+1]) + " - " + this.get_field_number (this.blocked_road[i+2], this.blocked_road[i+3]) + "\n";
			}
			
			var [x, y] = this.get_best_road();
			var result = this.do_movement (x, y);
			counter++;
			
			this.file_input_data_text += counter + " " + this.get_field_number (this.get_current_field1(), this.get_current_field2()) + "\n";
			
			if ((this.get_current_field1() == this.get_end_field1()) && (this.get_current_field2() == this.get_end_field2()))
			{
				alert ("Car reach destination");
				console.log ("Success: car reach destination");
				
				if (counter > 1)
				{
					this.file_graph_text += "set xrange [1:" + counter +"]\n";
				}
				
				this.file_graph_text += "set key font \",1\"\nplot 'input_data.txt' with points pointtype 7 pointsize 2, 'input_data.txt' with lines\nunset output";
				var blob = new Blob([this.file_graph_text], {type: "text/plain;charset=utf-8"});
				saveAs(blob, "graph.txt", true);
				var blob2 = new Blob([this.file_input_data_text], {type: "text/plain;charset=utf-8"});
				saveAs(blob2, "input_data.txt", true);
				break;
			}
			
			if (result == false)
			{
				if (counter > 1)
				{
					this.file_graph_text += "set xrange [1:" + counter +"]\n";
				}
				
				console.log ("Error: no movements");
				this.file_graph_text += "set key font \",1\"\nplot 'input_data.txt' with points pointtype 7 pointsize 2, 'input_data.txt' with lines\nunset output";
				var blob = new Blob([this.file_graph_text], {type: "text/plain;charset=utf-8"});
				saveAs(blob, "graph.txt", true);
				var blob2 = new Blob([this.file_input_data_text], {type: "text/plain;charset=utf-8"});
				saveAs(blob2, "input_data.txt", true);
				break;
			}
			document.getElementById('text').value += "\n\n" + counter + ". Movement:\n";
		}
	}
};