
// Layout Template by datatable.js	
$(document).ready(function () { 
	var driverStatusArr = {
		0 : 'Not Ready',
		1 : 'Ready'
	}

	// Summary Table Section
	function loadMainTable(){	

		

		
		
	function format (rowData){
	
  
		
	//	const  ParentID  = table.row(this).data().id;
		var indexrow = $("table tbody tr:first-child").index();
		
		
		
		// var ParentID  = parseInt(currentrow.getAttribute('row_id'));
		
		
		var rowData = {

				caller: $("#RecordCaller").val(),
				type: $("#RecordType").val(),
				dates: $("#RecordDate").val(),
				remark: $("#RecordRemark").val()
				}




    		return   ( 
	'<h2>  Call Checks Row  </h2>' +
	 '<table id="callcheck" >' + 
 	  '<tr style="background-color: #dddddd">'+
		'<th>Caller:</th>' +
    		'<th> Type : </th>'+
    		'<th> Date : </th>'+
    		'<th> Remark : </th>'+
  	'</tr>'	+	
  	'<tr>' +
    	'<td>' +  rowData.caller + '</td>' +
    	'<td>' +  rowData.type + '</td>'+
    	'<td>' +  rowData.dates + ' </td>'+
    	'<td>' +  rowData.remark + '</td>'+
  	'</tr>' +
	'</table>'



		)};
	// close format function


	// start Summary Table 
		var currentrow;
		var table = $("#EmpTable").DataTable({
			dom: "Bfrtip",
			ajax: {
				type : "POST",
				url :"api/ajax/fetch/summary",
				dataType : "json",
			},
			select: false ,
			orderFixed: [ 0, 'asc' ],
			targets: 'no-sort',
			bSort: false,
			order: [],
			searchable: false,
			pageLength: 25,
			bDestroy: true,
			destory: true,
			createdRow: function (row, data, ) {
				$(row).attr('row_id',data.id);
				if(data.blinking == 1){
					$(row).addClass("blinking");
				}
			},
			dataSrc: "data",
			"columns": [
				{
           			 className:'details-control',
            		         orderable:true,
            			 data:"'Record_ID'.attr('row_id')",
            			 defaultContent:'<i class="caret right icon"></i>'
       				}, {

					title: "#",
					data: "id",
					render: (data, type, row, meta) => (meta.row + 1)
				}, {
                			title: "Driver",
        			        data: "driver",
				}, {
					title: "Status",
					data: "status",
					render: (data, type, row, meta) => driverStatusArr[data]
				}, {
					title: "Origin",
					data: "origin",
				},{
					title: "Vehicle",
					data: "vehicle",
				},{ 
					title: "SITE",
					data: "site",
				},{
					title: "Trip Site Start",
					data: "tripsite_start",
				},{
					title: "Trip Site End",
					data: "tripsite_end",
				},{
					title: "Trip Return Start",
					data: "tripreturn_start",
				},{ 
					title: "Trip Return End",	      
					data: "tripreturn_end",
				},{ 
					title: "Remarks",
					data: "remark",
				}, {
					title: "Action",
					data: null,
					defaultContent: '<button class="update hidden"><i class="user plus icon"></i></button>' +
		    		    			'<button class="edit"   style="margin-left: 3px" ><i class="edit outline icon"></i></button>' +
		    		    			'<button class="delete" style="margin-left: 3px"><i class="trash alternate icon"></i></button>' +
		    		   			'<button class="cancle hidden"  style="margin-left: 3px"><i class="minus circle icon"></i></button>' +
		   		    			'<button class="archive" style="margin-left: 3px"><i class="archive icon"></i></button>' +
							'<button class="callcheck" style="margin-left: 3px"><i class="phone icon"></i></button>'
				}],
			columnDefs: [
				{ "width": "1%" , "targets": 0 },
				{ "width": "12%", "targets": 1 },
				{ "width": "12%", "targets": 2 },
				{ "width": "11%", "targets": 3 },
				{ "width": "12%", "targets": 4 },
				{ "width": "12%", "targets": 5 },
				{ "width": "12%", "targets": 6 },
				{ "width": "12%", "targets": 7 },
				{ "width": "12%", "targets": 8 },
				{ "width": "12%", "targets": 9 },    
				{ "width": "12%", "targets": 10},
				{ "width": "12%", "targets": 11},
				{ "width": "12%", "targets": 12},
				]
		});	
		// End Table #EmpTable

	// Start Child row Table 
	$('#EmpTable tbody').on('click', 'td.details-control', function () {
		console.log(this);
  	
 		 var tr = $(this).closest('tr');
  		 var row = table.row(tr);
  		 var ParentID  = (table.row(this).data().id);
  	  	// var ParentID  = table.row(this).data().id;



  		console.log("Child row function is Working");
  		console.log("Parent ID Variable:  " +  ParentID );
  		console.log("Parent id for MainTable = " + table.row( this ).data().id); 
  		console.log( table.row(this).data().id);
			
			

		if (row.child.isShown()) {
   	 // This row is already open - close it
    			row.child.hide();
			tr.removeClass('shown');
  		} else {
   	 // Open this row
    		row.child(format(row.data())).show(); 
		tr.addClass('shown');	
			


		
		
		var data= {

				record_id: ParentID,
				caller: $("#RecordCaller").val(),
				type: $("#RecordType").val(),
				dates: $("#RecordDate").val(),
				remark: $("#RecordRemark").val()
				}
			
		$.post({         
 			type : "POST",
			url :"api/ajax/fetch/callchecks",	
		 	dataType : "json",
			contentType: "application/json; charset=utf-8",
    			data : JSON.stringify(data),
	// validate 
			 dataSrc: "data",
            			"columns": [
            			{
                		title:"#",
                		data: "caller",
            			}, {
                		title: "TYPE",
                		data: "type"
            			}, {
                		title: "DATE",
                		data: "dates"
				},{
				title: "Remark",
				data:"remark"
				}],
			success: function(data) {
				console.log(' fectch /callchecks is working !!!!!!!! ') 
			},
			error: function(xhr) { 
				console.log('error' + data ) 
			},
		})
		
		
		
	}
		});
// Close child row Table
			
		// open and  close modal in click 	
		function call_btn(e){
			currentrow = this.parentElement.parentElement;
			$('#myModal2').modal('show');
			console.log(" Modal Callchecks is Working " + $(this).indexrow )
	}
	$(document).on("click",".callcheck",call_btn);

		$('#closeModalBtn2').click(function() {
    			$('#myModal2').modal('hide');
		});


		
		
		
		
	$('#myModal2').on('click' , '#saveModalBtn2' , function() {

	
		console.log("callcheck btn is working yessssssssssssssssssssssssssssss")
		console.log(this);
		console.log(currentrow);

  		 //var ParentID  = (table.row(currentrow).data().id);
  		 var ParentID  = parseInt(currentrow.getAttribute('row_id'));
		console.log('ParentID: ' + ParentID);

		var index = $("table tbody tr:last-child").index();
		var data = {
				record_id: ParentID,
				caller: $("#RecordCaller").val(),
				type: $("#RecordType").val(),
				dates: $("#RecordDate").val(),
				remark: $("#RecordRemark").val()
			};	
		$.post({         
 			type : "POST",
			url :"api/ajax/add/callchecks",	
		 	dataType : "json",
			contentType: "application/json; charset=utf-8",
    			data : JSON.stringify(data),
	// validate 
			success: function(data) {
				console.log(' add/callchecks is working !@#$% ') 
			},
			error: function(xhr) { 
				console.log('error' + data ) 
			},
		})

  // Clear input fields after adding the row
	});








		
		
		
		
		
		

};
// End loadMainTable Functions  add/update .. 





	// Function hide specific tables on the page 
	function hideTables(){
		$('#ArchiveTable').parents('div.dataTables_wrapper').first().hide();
		$('#EmpTable').parents('div.dataTables_wrapper').first().hide();
		//$('#CallCheckTable').parents('div.dataTables_wrapper').first().hide();
	}


	// Call function to load Main Table 
	loadMainTable();
	// Call function to load Archive Table 
	//loadArchiveTable();	
	// Call function to load Callcheck  Table 
//	loadCallCheck();



	


	// Hide the Table with ID 'ArchiveTable
	$('#ArchiveTable').parents('div.dataTables_wrapper').first().hide();
	
	$('#CallCheckTable').parents('div.dataTables_wrapper').first().hide();
	
	// Iterate through 'driverstatus' array and appends options
	$.each(driverStatusArr, function(k, v){
		$("#driverStatus").append( new Option(v, k) )
	});
	$("#DriverList").on('change', function() {
		$("#Origin").text($(this).find("option:selected").attr("origin"));
	});

	var _temp = 0;
	$.post("api/ajax/fetch/driverList", function (data, status){
		$.each(data, function() {
			$.each(this, function(k, v) {
				var opt = new Option(v.name, v.id)
				opt.setAttribute("origin", v.origin)
				$("#DriverList").append( opt )
				if( _temp == 0 ){
					_temp = 1
					$("#Origin").text(v.origin)
				}
			});
		});
	});


	// Send Post request to fetch the list of vehicleList from api 
	$.post("api/ajax/fetch/vehicleList", function (data, status){
		$.each(data.data, function() {
			$.each(this, function(k ,v) {
				$("#VehicleList").append( new Option(v, k) )
			});
		});
	});

	// Send Post request to fetch the list of siteList  from api 
	$.post("api/ajax/fetch/siteList", function (data, status){
		data.data.forEach(function(row){
			$("#SiteList").append( new Option(row.name, row.id) )
		})
	});



	// Initialize the modal
	$(".modal").modal();
	$("#openModalButton").click(function () {

		if( $(this).attr("addRecord") == "true"){
			$("#myModal2").modal("show");
		} else {
			$("#myModal").modal("show");
		}

	});
	

	// Close the modal when the close button is clicked
	$("#saveModalButton").on('click' , function () {
		$("#myModal").modal('hide');

		
	});
	$("#saveModalBtn2").on('click' , function () {
		$("#myModal2").modal('hide');
	});

	$("#cancel_btn").click( function () { $("#mypopup").modal('hide'); }) 
	$("#closeModalButton").click( function () { $("#myModal").modal('hide'); });
	$("#closeModalButton2").click( function () { $("#myModal2").modal('hide'); });
		
	




	var page = 0;
	$("#switchTable").click( function () {
		hideTables();
		if($(this).attr("goBack") == "true"){
			$(this).html('<i class=" history icon"></i> History');
			$(this).attr("goBack","false");
			$("#openModalButton").attr("addRecord","false");
			$("#openModalButton").html(' <i class=" plus icon"></i> Add New </button>');
			$('#EmpTable').parents('div.dataTables_wrapper').first().show();
			page = 0;
		} else {
			if( page == 0 ){
				$(this).html('<i class=" file alternate icon"></i> return  </button>');
				$('#ArchiveTable').parents('div.dataTables_wrapper').first().show();
			} else {
				$(this).html('<i class=" history icon"></i> History </button>');
				$('#EmpTable').parents('div.dataTables_wrapper').first().show();
			}
			page = page == 0
		}
	});





	// Append table with add row form on add new button click
	$(".add-new").click(function () {
		$(this).attr("disabled", "disabled");
		var index = $("table tbody tr:last-child").index();
		var data = {
			driver: $("#DriverList").val(),
			status: $("#driverStatus").val(),
			vehicle: $("#VehicleList").val(),
			site: $("#SiteList").val(),
			tripsite_start: $("#tripSiteStart").val(),
			tripsite_end: $("#tripSiteEnd").val(),
			tripreturn_start: $("#tripReturnStart").val(),
			tripreturn_end: $("#tripReturnEnd").val(),
			remark: $("#remarks").val(),
			//caller: $("#RecordCaller").val(),
		//	dates: $("#RecordDate").val(),
		//	type: $("#RecordType").val(),
		//	remark: $("#RecordRemark").val()

		};	
		$.post({         
 			type : "POST",
			url :"api/ajax/add/summary",	
		 	dataType : "json",
			contentType: "application/json; charset=utf-8",
    			data : JSON.stringify(data),
	// validate 
			success: function(data) {
			},
			error: function(xhr) { 
				console.log('error' + data ) 
			},
			function (data) {
				$("#openModalButton").html(data);
				$("#myModal").modal("hide");
				$("#openModalButton").show();
			}
		})

              // generate row auto
		//$('table').DataTable().ajax.reload();
	   
  // Clear input fields after adding the row
	});



	$("#delete_btn").click( function () { 
		if($(this).text() == 'Delete'){
			delete_data();
		} else {
			archive_data();
		}
	});
	$('#mypopup').on('hidden.bs.modal', function () {
 	 	$("#mypopup").attr("action_id","");
	});

	var ErrorMessages = {
       	 	'ORA-02292': ''
	};

	function getMsg(msg){
        	var _res = msg;
        	$.each(ErrorMessages, function (i, v){
                	if(msg.startsWith(i)){
                        	_res = v;
                       	 	return true;
                	}
        	});
        	return _res;
	}
	function archive_data(){
		var data = {
			id: $("#mypopup").attr("action_id")
		}
		$.post({
			type: "POST",
			url: "api/ajax/update/archive",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(data),
			
			success: function (data) {
					if(data.result == 'error'){
						errorMessage(getMsg(data.msg));
					} else {
						$("#mypopup").modal("hide");
						$('table').DataTable().ajax.reload();
					}
				},
			error: function (xhr) {
					console.log('Error: ' + data);	
				},
			});
	}

	function delete_data() { 
		var data = {
			id : $("#mypopup").attr("action_id")
		};
		$.post({         
			type : "POST",
			url :"api/ajax/delete/summary",	
		 	dataType : "json",
    			contentType: "application/json; charset=utf-8",
    			data : JSON.stringify(data),	
	// validate 
			success: function(data) {
				if(data.result == 'error'){
                        		errorMessage(getMsg(data.msg));
                 		} else {
                        		$("#mypopup").modal("hide");
                       		 	$('table').DataTable().ajax.reload();
                 		}
			},
			error: function(xhr) { 
				console.log('error' + data ) 
			},
			function (data) {
				$("#openModalButton").html(data);
				$("#openModalButton").show();
			}
		})
	}
	$(document).on("click",".delete",function () {
        	var id = $(this).parents("tr").attr("row_id");
       		$("#mypopup").modal("hide");
        	$("#mypopup").attr("action_id",id);
        	$("#mypopup").find(".title").html('<i class="trash alternate icon"></i> Delete');
        	$("#mypopup").find(".description").html('Are you sure you want to delete this item?')
        	$("#delete_btn").removeClass('hidden');
		$("#delete_btn").text("Delete");
        	$("#cancel_btn").text('Cancle');
        	$("#mypopup").modal("show");
	});
	$(document).on("click",".archive",function () {
		var id = $(this).parents("tr").attr("row_id");
		$("#mypopup").modal("hide");
		$("#mypopup").attr("action_id",id);
		$("#mypopup").find(".title").html('<i class="archive icon"> Archive');
		$("#mypopup").find('.description').html('Are you sure you want to move this item to Archive?');
		$("#delete_btn").removeClass("hidden");
		$("#delete_btn").text("Archive");
		$("#cancel_btn").text("Cancle");
		$("#mypopup").modal("show");
	});
	function errorMessage(msg){
        	$("#mypopup").modal("hide");
        	$("#mypopup").find(".title").html('');
        	$("#mypopup").find(".description").html(msg);
        	$("#delete_btn").addClass('hidden');
        	$("#cancel_btn").text('OK');
        	$("#mypopup").modal("show");
	}
	function update_data(e) {
		var data = {
			id: $(this).parents("tr").attr("row_id"),
			status: $("#status").val(),
			origin:  $("#origin").val(),
			remark: $("#remark").val(),
			tripSiteStart: $("#tripSiteStart").val(),
			tripSiteEnd: $("#tripSiteEnd").val(),
			tripReturnStart: $("#tripReturnStart").val(),
			tripReturnEnd: $("#tripReturnEnd").val()
		};
		$.post({
			type: "POST",
			url: "api/ajax/update/summary",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(data),
			success: function(response) {
				$('table').DataTable().ajax.reload();
			},
			error: function() {
				console.log('Error updating data');
			}
		});
	}
	$(document).on("click", ".update", update_data);

   
	function clear_data(e){
		$(this).parents("table").find("input, select").each( function (i) {
			$(this).parents("td").html($(this).attr("oldValue"));
		});
		$(this).parents("table").find(".editing").find(".edit, .delete, .archive").removeClass("hidden");
		$(this).parents("table").find(".editing").find(".update, .cancle").addClass("hidden");
		$(this).parents("table").find(".editing").removeClass("editing");
	}
	$(document).on("click",".cancle",clear_data);


// Edit row on edit button click
	$(document).on("click", ".edit", function (e) {
		e.stopImmediatePropagation();
		$(this).parents("table").find("input, select").each( function (i) {
                        $(this).parents("td").html($(this).attr("oldValue"));
                });
                $(this).parents("table").find(".editing").find(".edit, .delete, .archive").removeClass("hidden");
                $(this).parents("table").find(".editing").find(".update, .cancle").addClass("hidden");
                $(this).parents("table").find(".editing").removeClass("editing");

// Looking for all rows except the last one
		$(this)
			.parents("tr")
			.find("td:not(:last-child)")
			.each(function (i) {
      // Initialize idname
				var idname = 0;
				var text = $(this).text();
				var _value = '';
				if (i == 11 ) {
					idname = "remark";
				} else if (i == 3) {
					options = ''
					_id = text
					$.each( driverStatusArr, function (k, v){
						selected = ''
						if( _id == v ){ selected = 'selected' }
						options = options + '<option  value="' + k + '"'+ selected +'>' + v +  '</option>'
					});
					$(this).html('<select id="status" oldValue="'+ _id  +'" >' + options +'</select>')
					return true;
				} else if ( i == 7 ){
					if( text != '' ){
						const _arr = text.replaceAll('/','-').replace(', ','T').split('-');
						_value = _arr[2].split('T')[0] + "-" + _arr[0] + "-"  +_arr[1] + "T" + _arr[2].split('T')[1]
					}
					$(this).html('<input type="datetime-local" style="width:100%" id="tripSiteStart" oldValue="' + text +'" value="' + _value + '"/>');
					return true;

                                } else if ( i == 8 ){
					if( text !== ''){
                                        	const _arr = text.replaceAll('/','-').replace(', ','T').split('-');
                                        	_value = _arr[2].split('T')[0] + "-" + _arr[0] + "-"  +_arr[1] + "T" + _arr[2].split('T')[1]
					}
                                        $(this).html('<input type="datetime-local" style="width:100%" id="tripSiteEnd" oldValue="' + text +'" value="' + _value + '"/>');
                                        return true;
                                } else if ( i == 9 ){
					if( text != '' ){
                                        	const _arr = text.replaceAll('/','-').replace(', ','T').split('-');
                                        	_value = _arr[2].split('T')[0] + "-" + _arr[0] + "-"  +_arr[1] + "T" + _arr[2].split('T')[1]
					}
                                        $(this).html('<input type="datetime-local" style="width:100%" id="tripReturnStart" oldValue="' + text +'" value="' + _value + '"/>');
                                        return true;
                                } else if ( i == 10 ){
					if( text != '' ){
                                        	const _arr = text.replaceAll('/','-').replace(', ','T').split('-');
                                        	_value = _arr[2].split('T')[0] + "-" + _arr[0] + "-"  +_arr[1] + "T" + _arr[2].split('T')[1]
					}
                                        $(this).html('<input type="datetime-local" style="width:100%" id="tripReturnEnd" oldValue="' + text +'" value="' + _value + '"/>');
                                        return true;
				} else {
					return true;
				}

      // Replace the content of each cell with an input field
				$(this).html('<input type="text" id="' + idname + '" style="width:100%"  oldValue="'+ $(this).text() +'" value="' + $(this).text() + '">');
			});

  // Toggle visibility of the add and edit buttons for the row
  //$(this).parents("tr").find(".add, .edit").toggle();
		$(this).parents("tr").find(".update, .cancle").removeClass("hidden");
		$(this).parents("tr").find(".edit, .delete, .archive").addClass("hidden");
		$(this).parents("tr").addClass("editing");
  // Disable the add-new button
		$(".add-new").attr("disabled", "disabled");

	});
});