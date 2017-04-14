function user_input()
{
	this.size_field = -1;
	this.probability = -1;
	this.start_field1 = -1;
	this.start_field2 = -1;
	this.end_field1 = -1;
	this.end_field2 = -1;
	this.current_field1 = -1;
	this.current_field2 = -1;
	
	this.get_size_field = function()
	{
		return this.size_field;
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
	
	this.isInteger = function (value)
	{
		return value%1 == 0;
	}
	
	this.get_datas = function()
	{
		for (i=0; i<1; )
		{
			this.size_field = prompt("Please enter board size:", "");
			if ((this.size_field != null) && (this.size_field > 0) && (this.isInteger (this.size_field) == true))
			{
				i++;
			}
		}

		for (i=0; i<1; )
		{
			this.probability = prompt("Please enter probability of close road:", "");
			if ((this.probability != null) && (this.probability >= 0) && (this.probability <= 1))
			{
				i++;
			}
		}

		for (i=0; i<1; )
		{
			this.start_field1 = prompt("Please enter X start field:", "");
			if ((this.start_field1 != null) && (this.start_field1 >= 0) && (this.isInteger (this.start_field1) == true) && (this.start_field1 <= this.size_field))
			{
				i++;
			}
		}

		for (i=0; i<1; )
		{
			this.start_field2 = prompt("Please enter Y start field:", "");
			if ((this.start_field2 != null) && (this.start_field2 >= 0) && (this.isInteger (this.start_field2) == true) && (this.start_field2 <= this.size_field))
			{
				i++;
			}
		}

		for (i=0; i<1; )
		{
			this.end_field1 = prompt("Please enter X end field:", "");
			if ((this.end_field1 != null) && (this.end_field1 >= 0) && (this.isInteger (this.end_field1) == true) && (this.end_field1 <= this.size_field))
			{
				i++;
			}
		}

		for (i=0; i<1; )
		{
			this.end_field2 = prompt("Please enter Y end field:", "");
			if ((this.end_field2 != null) && (this.end_field2 >= 0) && (this.isInteger (this.end_field2) == true) && (this.end_field2 <= this.size_field))
			{
				i++;
			}
		}
		this.current_field1 = this.start_field1;
		this.current_field2 = this.start_field2;
		
		document.getElementById('car').style.visibility='visible';
	}
}