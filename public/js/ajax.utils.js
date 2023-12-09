$(function(){
    let password = $('#password')
    let email = $('#email')
    let loginBtn = $('#login')
    let errorAlert = $('#login_error')
    let serverUrl = `http://212.224.93.159:3000`
    // ======================================search
   
    const getResource = (url, callback) => {
        $.ajax({
            type: 'GET',
            url: url,
            success: function (data) {
                console.log(data);
                callback(null, data);
            },
            error: function () {
                const error = { error: "no data" };
                console.error(error);
                callback(error, null);
            }
        });
    };
    const formating =function (data){
        let totalusers = data.length
        let amount=[]
        let dates = []
        
        for(let i=0;i<totalusers;i++){
             amount.push(data[i].amount)
             let currDate = `${data[i].date}`
             let newDate = new Date(currDate)
             let day = newDate.getDate();
             let month = newDate.getMonth() + 1; // Month is zero-based, so add 1
             let year = newDate.getFullYear();
             let formattedDate = `${day}/${month}/${year}`;
             dates.push(formattedDate)
        }
        let dateIntegerMap = new Map();
        for (let i = 0; i < amount.length; i++) {
             let currentDate = dates[i];
     
             // If the date is not in the map, add it with the current integer
             if (!dateIntegerMap.has(currentDate)) {
                 dateIntegerMap.set(currentDate, amount[i]);
             } else {
                 // If the date is already in the map, add the current integer to the existing sum
                 dateIntegerMap.set(currentDate, dateIntegerMap.get(currentDate) + amount[i]);
             }
         }
         let uniqueDates = Array.from(dateIntegerMap.keys());
         let summedamount = Array.from(dateIntegerMap.values());
        let totalPurchases = amount.reduce((accumulator,currentValue)=>{
         return accumulator+currentValue;
        },0)
        return {dates:uniqueDates, amount:summedamount,purchases:totalPurchases,users:totalusers}
    }
// ===============================================

    const getEmployees = function(){
        $.ajax({
            type:'GET',
            url:`${serverUrl}/api/employees/`,
            success: function(empData){
                $('.loader').hide()

                // console.log(empData)
                let display = $('#empCard')
                let temp
                empData.forEach((val)=>{                  
                    temp = `
                    
                    <ul class="data ">
                        <li>${val.firstName+" "+val.lastName}</li>
                        <li>${'0'+ val.phone}</li>
                        <li>${val.employeeRole}</li>
                        <li class="action">
                            <button  data-bs-toggle="modal" class="UpdatePen" data-empdata=${JSON.stringify(val)} data-bs-target='#updateModal'><i class="bi bi-pen"></i></button>
                            <button  class="deleteEmp" data-delete=${val.id}><i class="bi bi-trash"></i></button>
                        </li>
                       
                    </ul> 
            
                    
                    `
                    
                  
                    

                display.append(temp)

                    // display.html(temp)
                  
                    
                
                })
                $('#search_emp').on('click',function(){
                    let phone = $('#SearchEmp').val().slice(1)
                    console.log(phone)
                    getResource(`${serverUrl}/api/employees/search/${phone}`, function (error, mdata) {
                        if (error) {
                            // Handle error
                            temp = `
                    
                            <ul class="data ">
                                <li>${error}</li>
                                <li>${error}</li>
                                <li>${error}</li>                            
                            </ul> 
                    
                            
                            `
                            $('#empCard').html(temp)
                        } else {
                            // Handle data
                            temp = `
                    
                            <ul class="data ">
                                <li>${mdata.firstName+" "+mdata.lastName}</li>
                                <li>${'0'+ mdata.phone}</li>
                                <li>${mdata.employeeRole}</li>
                                <li class="action">
                                    <button  data-bs-toggle="modal" class="UpdatePen" data-empdata=${JSON.stringify(mdata)} data-bs-target='#updateModal'><i class="bi bi-pen"></i></button>
                                    <button  class="deleteEmp" data-delete=${mdata.id}><i class="bi bi-trash"></i></button>
                                </li>
                            
                            </ul> 
                    
                            
                            `
                            $('#empCard').html(temp)
                            // console.log("Data:", data);
                        }
                    });  
                })
                
                $('.UpdatePen').each(function () {
                    $(this).on('click', function () {
                        // console.log($(this).attr('data-empdata'));
                        const rawData = $(this).attr('data-empdata')
                        // Parse the JSON data
                        const jsonData = JSON.parse(rawData);
                    
                        // Select the form and set values of corresponding input fields
                        const form = $('.updteEmp');
                        form.find('[name="id"]').val(jsonData.id);
                        form.find('[name="email"]').val(jsonData.email);
                        form.find('[name="phone"]').val(jsonData.phone);
                        form.find('[name="employeeType"]').val(jsonData.employeeType);
                        form.find('[name="salary"]').val(jsonData.salary);
                        form.find('[name="employeeRole"]').val(jsonData.employeeRole);
                        form.find('[name="userType"]').val(jsonData.userType);

                    });
                });
                $('.deleteEmp').each(function () {
                    $(this).on('click', function (e) {
                        e.preventDefault()
                        let id = $(this).attr('data-delete')
                        console.log(id)
                        $.ajax({
                            type:'delete',
                            url: `${serverUrl}/api/employees/${id}`,
                            success:function(){
                                let display = $('#empCard')
                                display.html('')
                                getEmployees()
                            }
                            
                        })
              
                    }) 
                }) 
               
                
            }
        })  
        
    }
    // update employees
    const updateForm = $('.updteEmp')
        updateForm.submit(function (e) {
            e.preventDefault();
            let id = updateForm.find('[name="id"]').val();
            console.log(id);
            $.ajax({
                type: 'put',
                url: `${serverUrl}/api/employees/${id}`,
                data: updateForm.serialize(),
                success: function (response) {
                    $('#update_success').addClass('show');
                    let display = $('#empCard')
                    display.html('')
                    getEmployees()
                },
                error: function (err) {
                    $('#update_error').addClass('show');
                }
            });
        });
    
    
    loginBtn.on('click',(e)=>{
        // e.preventDefault()
        if(password.val() == ""){
            e.preventDefault()

            password.addClass('error')
            errorAlert.addClass('show')
        }
        if(email.val() == ""){
            e.preventDefault()

            email.addClass('error')
            errorAlert.addClass('show')

        }
        
    })

    // employees
    let empBtn = $('#employees')
    empBtn.on('click',()=>{
            getEmployees()      
    })
     // update employees
 
    // add employee
    let frm = $('#empForm')
    frm.submit(function(e){
        e.preventDefault()

        $.ajax({
            type:frm.attr('method'),
            url:'${serverUrl}/api/employees/addemployee',
            data:frm.serialize(),
            success:function(response){
                $('#add_success').addClass('show')
                let display = $('#empCard')
                display.html('')
                getEmployees()
            },
            error:function(err){
                $('#add_error').addClass('show')
                
            }
        })
    })
    // update employee
   
    // ====================================================
    // get profiles
    const getProfile = ()=>{
        $.ajax({
            type:'GET',
            url:`${serverUrl}/api/profiles/`,
            success:(data)=>{
                // console.log(data)
               
                data.forEach((e)=>{
                    let temp = `
                    <ul class="data">
                    <li class="others">${e.id}</li>
                    <li class="prof-name">${e.name}</li>
                    <li class="prof-type">${e.type}</li>
                    <li class="others">${e.amount}</li>
                    <li class="others">${e.station}</li>
                    <li class="others">${e.devices}</li>

                </ul>
                `
                $('#profCard').append(temp)
                })
                $('#searchPay').on('click',function(){
                   

                    let code = $('#Search_payment').val().toUpperCase()
                    console.log(code)
                    getResource(`${serverUrl}/api/transactions/${code}`, function (error, e) {
                        if (error) {
                            // Handle error
                            temp = `
                    
                            <ul class="data ">
                                <li>${error}</li>
                                <li>${error}</li>
                                <li>${error}</li>                            
                            </ul> 
                    
                            
                            `
                            $('#trans-card').html(temp)
                        } else {
                            // Handle data
                            temp = `
                    
                            <ul class="data">
                                <li class="others">${e.id}</li>
                                <li class="prof-name">${e.name}</li>
                                <li class="prof-type">${e.type}</li>
                                <li class="others">${e.amount}</li>
                                <li class="others">${e.station}</li>
                                <li class="others">${e.devices}</li>
        
                            </ul>
                    
                            
                            `
                            $('#trans-card').html(temp)
                            // console.log("Data:", data);
                        }
                    });  
                })
            }
        })
        
        
    }
    let profBtn = $('#profiles')
    profBtn.on('click',()=>{
      getProfile()
        
    })
    //  add profiles
    let frmm = $('#profile-form')
    frmm.submit(function(e){
        e.preventDefault()

        $.ajax({
            type:frmm.attr('method'),
            url:'${serverUrl}/api/profiles/addprofile',
            data:frmm.serialize(),
            success:function(response){
                $('#profile_success').addClass('show')
                $('#profCard').html('')
                getProfile();
            },
            error:function(err){
                $('#profile_error').addClass('show')
                
            }
        })
    })

    // fixed clients=======================================================
    let getClients = ()=>{
        
        $.ajax({
            type:'GET',
            url:`${serverUrl}/api/clients/`,
            success:(data)=>{
                // console.log(data)
                $('.loader').hide()

               
                data.forEach((e)=>{
                    
                    let temp = `
                    <div class="client-card">
                    <table class="client-card-header">
                        <tr>
                            <th>Username</th>
                            <td>${e.username}</td>
                        </tr>
                        <tr>
                            <th>Client</th>
                            <td>${e.client}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>${e.phone}</td>
                        </tr>
                        <tr>
                            <th>Location</th>
                            <td>${e.location}</td>
                        </tr>
                        
                        <tr>
                            <th>coordinates</th>
                            <td>${e.coordinates}</td>
                        </tr>
                        <tr>
                            <th>Acc No</th>
                            <td>${e.account}</td>
                        </tr>
                        <tr>
                            <th>Profile</th>
                            <td>${e.profile}</td>
                        </tr>
                        <tr>
                            <th>Billable</th>
                            <td>Ksh.${e.billable}/=</td>
                        </tr>
                        <tr>
                            <th>Wallet</th>
                            <td>Ksh.${e.wallet}/=</td>
                        </tr>
                        <tr>
                            <th>is router ours</th>
                            <td>${e.is_router_ours}</td>
                        </tr>
                        
                        <tr>
                            <th>is receiver ours</th>
                            <td>${e.is_receiver_ours}</td>
                        </tr>
                        <tr>
                            <th>Created</th>
                            <td>${e.created}</td>
                            
                        </tr>
                        <tr>
                            <th>Updated</th>
                            <td>${e.updated}</td>
                        </tr>
                        
                    </table>
            
                    <div class="client-card-actions">
                        <button class="btn btn-primary UpdateClientPen"data-bs-toggle="modal" data-update=${JSON.stringify(e)} data-bs-target='#update-client'><i class="bi bi-pen"> </i></button>
                        <button class="btn btn-secondary deleteclient" data-delete=${e.id} ><i class="bi bi-trash"></i></button>
                        <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#history"><i class="bi bi-clock"></i></button>

                    </div>
                    
                   
                <div class="modal  mt-5" id="history" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog ">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-dark" id="staticBackdropLabel">History</h5>
                                <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="history-card">
                                    <p>RK13NUOO39</p>
                                    <p>2000</p>
                                    <p>date</p>
                                </div>
                        
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                `
                $('#clientCard').append(temp)
                })
                
                $('.UpdateClientPen').each(function () {
                    $(this).on('click', function () {
                        const rawData = $(this).attr('data-update')
            
                        // Parse the JSON data
                        const jsonData = JSON.parse(rawData);
                    
                        // Select the form and set values of corresponding input fields
                        const form = $('.updteClient');
                        form.find('[name="id"]').val(jsonData.id);
                        form.find('[name="username"]').val(jsonData.username);
                        form.find('[name="client"]').val(jsonData.client);
                        form.find('[name="phone"]').val(jsonData.phone);
                        form.find('[name="location"]').val(jsonData.location);
                        form.find('[name="account"]').val(jsonData.account);
                        form.find('[name="profile"]').val(jsonData.profile);
                        form.find('[name="billable"]').val(jsonData.billable);
                        form.find('[name="wallet"]').val(jsonData.wallet);
            
                    });
                });

                $('.deleteclient').each(function () {
                    $(this).on('click', function (e) {
                        e.preventDefault()
                        let id = $(this).attr('data-delete')
                        console.log(id)
                        $.ajax({
                            type:'delete',
                            url: `${serverUrl}/api/clients/${id}`,
                            success:function(){
                                let display = $('#clientCard')
                                display.html('')
                                getClients()
                            }
                            
                        })
              
                    }) 
                }) 
                $('#searchClient').on('click',function(){
                   
                    console.log($('#seachClient').length)
                    let username = $('#clientSearch').val()
                    console.log(username)
                    getResource(`${serverUrl}/api/clients/${username}`, function (error, [e]) {
                        if (error) {
                            // Handle error
                            temp = `
                    
                           <p>${error.error}</p>
                    
                            
                            `
                            $('#trans-card').html(temp)
                        } else {
                            // Handle data
                            let temp = `
                            <div class="client-card">
                            <table class="client-card-header">
                                <tr>
                                    <th>Username</th>
                                    <td>${e.username}</td>
                                </tr>
                                <tr>
                                    <th>Client</th>
                                    <td>${e.client}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>${e.phone}</td>
                                </tr>
                                <tr>
                                    <th>Location</th>
                                    <td>${e.location}</td>
                                </tr>
                                
                                <tr>
                                    <th>coordinates</th>
                                    <td>${e.coordinates}</td>
                                </tr>
                                <tr>
                                    <th>Acc No</th>
                                    <td>${e.account}</td>
                                </tr>
                                <tr>
                                    <th>Profile</th>
                                    <td>${e.profile}</td>
                                </tr>
                                <tr>
                                    <th>Billable</th>
                                    <td>Ksh.${e.billable}/=</td>
                                </tr>
                                <tr>
                                    <th>Wallet</th>
                                    <td>Ksh.${e.wallet}/=</td>
                                </tr>
                                <tr>
                                    <th>is router ours</th>
                                    <td>${e.is_router_ours}</td>
                                </tr>
                                
                                <tr>
                                    <th>is receiver ours</th>
                                    <td>${e.is_receiver_ours}</td>
                                </tr>
                                <tr>
                                    <th>Created</th>
                                    <td>${e.created}</td>
                                    
                                </tr>
                                <tr>
                                    <th>Updated</th>
                                    <td>${e.updated}</td>
                                </tr>
                                
                            </table>
                    
                            <div class="client-card-actions">
                                <button class="btn btn-primary UpdateClientPen"data-bs-toggle="modal" data-update=${JSON.stringify(e)} data-bs-target='#update-client'><i class="bi bi-pen"> </i></button>
                                <button class="btn btn-secondary deleteclient" data-delete=${e.id} ><i class="bi bi-trash"></i></button>
                                <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#history"><i class="bi bi-clock"></i></button>
        
                            </div>
                            
                           
                        <div class="modal  mt-5" id="history" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog ">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title text-dark" id="staticBackdropLabel">History</h5>
                                        <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="history-card">
                                            <p>RK13NUOO39</p>
                                            <p>2000</p>
                                            <p>date</p>
                                        </div>
                                
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        `
                        $('#clientCard').html(temp)
                            // console.log("Data:", data);
                        }
                    });  
                })
            }
            
        })

        
        
    }
  
    $('#customers').on('click',()=>{
        getClients();
    })
    // update client
    const updateClientForm = $('.updteClient')
    updateClientForm.submit(function (e) {
        e.preventDefault();
        let id = updateClientForm.find('[name="id"]').val();
        console.log(id);
        $.ajax({
            type: 'put',
            url: `${serverUrl}/api/clients/${id}`,
            data: updateClientForm.serialize(),
            success: function (response) {
                $('#update_client_success').addClass('show');
                let display = $('#clientCard')
                display.html('')
                getClients()
            },
            error: function (err) {
                $('#update_client_error').addClass('show');
            }
        });
    });

    
// users
let getUClients = ()=>{
    let i = 0
    $.ajax({
        type:'GET',
        url:`${serverUrl}/api/clients/`,
        success:(data)=>{
            $('.loader').hide()

            // console.log(data)
           
            data.forEach((e)=>{
                i++
                let temp = `
                <div class="client-card">
                <table class="client-card-header">
                    <tr>
                        <th>Username</th>
                        <td>${e.username}</td>
                    </tr>
                    <tr>
                        <th>Client</th>
                        <td>${e.client}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>${e.phone}</td>
                    </tr>
                    <tr>
                        <th>Location</th>
                        <td>${e.location}</td>
                    </tr>
                    
                    <tr>
                        <th>coordinates</th>
                        <td>${e.coordinates}</td>
                    </tr>
                    <tr>
                        <th>Acc No</th>
                        <td>${e.account}</td>
                    </tr>
                    <tr>
                        <th>Profile</th>
                        <td>${e.profile}</td>
                    </tr>
                    <tr>
                        <th>Billable</th>
                        <td>Ksh.${e.billable}/=</td>
                    </tr>
                    <tr>
                        <th>Wallet</th>
                        <td>Ksh.${e.wallet}/=</td>
                    </tr>
                    <tr>
                        <th>is router ours</th>
                        <td>${e.is_router_ours}</td>
                    </tr>
                    
                    <tr>
                        <th>is receiver ours</th>
                        <td>${e.is_receiver_ours}</td>
                    </tr>
                    <tr>
                        <th>Created</th>
                        <td>${e.created}</td>
                        
                    </tr>
                    <tr>
                        <th>Updated</th>
                        <td>${e.updated}</td>
                    </tr>
                    
                </table>
        
                <div class="client-card-actions">
                    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#history"><i class="bi bi-clock"></i></button>

                </div>
                
            <div class="modal  mt-5" id="history" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-dark" id="staticBackdropLabel">History</h5>
                            <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="history-card">
                                <p>RK13NUOO39</p>
                                <p>2000</p>
                                <p>date</p>
                            </div>
                    
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `
            $('#clientCard').append(temp)
            })
            $('#searchClient').on('click',function(){
                   
                // console.log($('#seachClient'))
                let username = $('#clientSearch').val()
                console.log(username)
                getResource(`${serverUrl}/api/clients/${username}`, function (error, [e]) {
                    if (error) {
                        // Handle error
                        let temp1 = `
                
                       <p>${error.error}</p>
                
                        
                        `
                        $('#trans-card').html(temp1)
                    } else {
                        // Handle data
                        let temp2 = `
                        <div class="client-card">
                        <table class="client-card-header">
                            <tr>
                                <th>Username</th>
                                <td>${e.username}</td>
                            </tr>
                            <tr>
                                <th>Client</th>
                                <td>${e.client}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>${e.phone}</td>
                            </tr>
                            <tr>
                                <th>Location</th>
                                <td>${e.location}</td>
                            </tr>
                            
                            <tr>
                                <th>coordinates</th>
                                <td>${e.coordinates}</td>
                            </tr>
                            <tr>
                                <th>Acc No</th>
                                <td>${e.account}</td>
                            </tr>
                            <tr>
                                <th>Profile</th>
                                <td>${e.profile}</td>
                            </tr>
                            <tr>
                                <th>Billable</th>
                                <td>Ksh.${e.billable}/=</td>
                            </tr>
                            <tr>
                                <th>Wallet</th>
                                <td>Ksh.${e.wallet}/=</td>
                            </tr>
                            <tr>
                                <th>is router ours</th>
                                <td>${e.is_router_ours}</td>
                            </tr>
                            
                            <tr>
                                <th>is receiver ours</th>
                                <td>${e.is_receiver_ours}</td>
                            </tr>
                            <tr>
                                <th>Created</th>
                                <td>${e.created}</td>
                                
                            </tr>
                            <tr>
                                <th>Updated</th>
                                <td>${e.updated}</td>
                            </tr>
                            
                        </table>
                
                        <div class="client-card-actions">
                         
                            <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#history"><i class="bi bi-clock"></i></button>
    
                        </div>
                        
                       
                    <div class="modal  mt-5" id="history" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog ">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title text-dark" id="staticBackdropLabel">History</h5>
                                    <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="history-card">
                                        <p>RK13NUOO39</p>
                                        <p>2000</p>
                                        <p>date</p>
                                    </div>
                            
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    `
                    $('#clientCard').html(temp2)
                        // console.log("Data:", data);
                    }
                });  
            })
        }
    })
}
$('#FixedClients').on('click',()=>{
    getUClients();
})
    // add clients

    let clientForm= $('#client-form')
    clientForm.submit(function(e){
        e.preventDefault()

        $.ajax({
            type:clientForm.attr('method'),
            url:`${serverUrl}/api/clients/addclient`,
            data:clientForm.serialize(),
            success:function(response){

                $('#client_success').addClass('show')
                $('#clientCard').html('')
                getClients();
            },
            error:function(err){
                $('#client_error').addClass('show')
                
            }
        })
    })
    let clientUForm= $('#client-form-user')
    clientUForm.submit(function(e){
        e.preventDefault()

        $.ajax({
            type:clientUForm.attr('method'),
            url:`${serverUrl}/api/clients/addclient`,
            data:clientUForm.serialize(),
            success:function(response){

                $('#client_success').addClass('show')
                $('#clientCard').html('')
                getUClients();
            },
            error:function(err){
                $('#client_error').addClass('show')
                
            }
        })
    })
    //  update client
    $('#searchPay').on('click',function(){
                   

        let code = $('#Search_payment').val().toUpperCase()
        console.log(code)
        getResource(`${serverUrl}/api/transactions/${code}`, function (error, e) {
            if (error) {
                // Handle error
                temp = `
        
                <ul class="data ">
                    <li>${error}</li>
                    <li>${error}</li>
                    <li>${error}</li>                            
                </ul> 
        
                
                `
                $('#trans-card').html(temp)
            } else {
                // Handle data
                temp = `
        
                <ul class="data">
                    <li class="others">${e.id}</li>
                    <li class="prof-name">${e.name}</li>
                    <li class="prof-type">${e.type}</li>
                    <li class="others">${e.amount}</li>
                    <li class="others">${e.station}</li>
                    <li class="others">${e.devices}</li>

                </ul>
        
                
                `
                $('#trans-card').html(temp)
                // console.log("Data:", data);
            }
        });  
    })
  
    

    // ============================transaction
    let getTransactions = ()=>{
        $.ajax({
            type:'GET',
            url:`${serverUrl}/api/transactions/all`,
            success:(data)=>{
                if($('.loader'))
                    $('.loader').hide()              
                data.forEach((e)=>{
                    let temp = `
                    <ul class="data ">
                        <li>${e.code}</li>
                        <li>${e.phone}</li>
                        <li>${e.amount}</li>
                        <li>${e.date}</li>
                    </ul>
                `
                $('#trans-Card').append(temp)
                })
            }
        })
    }
    $('#purchases').on('click',()=>{
        getTransactions();
    })
    getTransactions()
    let transactionsReload = ()=>{
        $('#trans-Card').html('')
        getTransactions();
    }
   

    // analytics =============================================
    let getAnalytics = ()=>{ 
           
        $.ajax({
            type:'GET',
            url:`${serverUrl}/api/transactions`,
            success:(data)=>{
                
                    let totalusers = formating(data).users
                    let totalPurchases = formating(data).purchases
                    let uniqueDates = formating(data).dates
                    let summedamount = formating(data).amount
                    let finalamount = summedamount
                    let finaldate = uniqueDates
                    if(uniqueDates.length > 5){
                        finalamount=[]
                        finaldate = []
                        for(let i = 0;i<summedamount.length;i+=2){
                            finalamount.push(summedamount[i])
                            finaldate.push(uniqueDates[i])
                        }
                    }
                    
                    
                data.forEach((e)=>{
                    
                    temp = `
                    <div class="org"></div>
                  
                    <div class="analytics">
                    
                    <div class="container analytic">
                        <div class="analytics-header">
                            <h3>Analytics</h3>
                            <form class="controls" method="post"  id="range">
                                <div class="duration-control">
                                    <p>Start Date/from</p>
                                    <input type="date" class="datePicker" name="startDate" required>
                                </div>
                                <div class="today-date">
                                    <p>End Date/to</p>
                                    <input type="date" class="datePicker" name="endDate" required >
                                </div>
                                <button type="submit" class="btn btn-primary range text-white">
                                    <i class="bi bi-search"></i>
                                </button>
                                
                            </form>
                        </div>
                        <div class="analytics-body">
                        <div class="loader2">
                            <div class="loader-image2">
                                <img src="/img/loader.gif" alt="">
                            </div>
                        </div>
                            <div class="overview">
                                <div class="details">
                                    <p>Total Amount</p>
                                    <h3 id="totalAmount">${'Ksh.'+totalPurchases}</h3>
                                </div>
                                <div class="graph">
                                    <img src="/img/green.png" alt="">
                                </div>
                            </div>
                            <div class="overview">
                                <div class="details">
                                    <p>Total Users</p>
                                    <h3 id="totalUsers">${totalusers}</h3>
                                </div>
                                <div class="graph">
                                    <img src="/img/Chart.png" alt="">
                                </div>
                            </div>
                            <div class="overview">
                                <div class="details">
                                    <p>Total Purchases</p>
                                    <h3 id="totalPur">${totalusers}</h3>
                                </div>
                                <div class="graph">
                                    <img src="/img/blue.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="analytics-chart">
                            <div class="loader2">
                                <div class="loader-image2">
                                    <img src="/img/loader.gif" alt="">
                                </div>
                            </div>
                            <canvas id="myChart"></canvas>
                        </div> 
                    
                    </div>
                  </div>
                    `
                    $('#dispAnn').html('')

                    $('#dispAnn').html(temp)
                    $('.loader2').hide()  
                
                })
                const ctx = document.querySelector('#myChart').getContext('2d');
                let gradient =ctx.createLinearGradient(0,0,0,400)
                gradient.addColorStop(0,'rgba(0,88,255,1)')
                gradient.addColorStop(0,'rgba(0,88,255,0.3)')
                let delayed;
                let Display =false
                const labels = finaldate
                const datas = {
                   labels,
                   datasets:[{
                       data:finalamount,
                       label: "Daily Sales",
                       fill:true,
                       backgroundColor:gradient,
                       pointBackgroundColor:'#fff',
                       tension:0.3
                       // borderColor:'#555',
               
               
                   }]
               
               }
               const config = {
                   type:'line',
                   data:datas,
                   options:{
                       responsive:true,
                       maintainAspectRatio: false,
                       grid:{
                           display:Display
               
                       },
                       animation: {
                           onComplete: ()=>{
                               delayed = true
                           },
                           delay: (context)=>{
                               let delay = 0;
                               if(context.type ==="data" && context.mode == "default" && !delayed){
                                   delay = context.dataIndex*300 + context.datasetIndex * 100;
                               }
                               return delay
                           }
                       },
                       scales:{
                           y:{
                               ticks:{
                                    font:{
                                        size:8,
                                    },
                                   callback:function(value){
                                       return 'ksh.' + value + "/="
                                   }
                               }
                           },
                           x:{
                            ticks:{
                                font:{
                                    size:8,
                                }
                            }
                           }
                       }
                   }
                    }
                    const myChart = new Chart(ctx,config)
                    myChart.update()
                    $('.loader').hide()

                    
                    //  ======================================================================
                    // find by range form submission event handler 
                    let rangeForm = $('#range')
                    rangeForm.submit(function(e){
                        e.preventDefault();
                        $('.overview').hide()
                        $('#myChart').hide()
                        $('.loader2').show()

                        $.ajax({
                            type:'POST',
                            url:`${serverUrl}/api/transactions/range`,
                            data:rangeForm.serialize(),
                            success:(data)=>{
                                    let totalusers = formating(data).users
                                    let totalPurchases = formating(data).purchases
                                    let uniqueDates = formating(data).dates
                                    let summedamount = formating(data).amount
                                    console.log(data)
                                
                                    
                                    temp = `
                                            <canvas id="myChart"></canvas>
                                    `
                                    $('.analytics-chart').html(temp)
                                    $('#totalUsers').html(`${totalusers}`)
                                    $('#totalAmount').html(`${'Ksh.'+totalPurchases}`)
                                    $('#totalPur').html(`${totalusers}`)
                               
                                const ctx = document.querySelector('#myChart').getContext('2d');
                                let gradient =ctx.createLinearGradient(0,0,0,400)
                                gradient.addColorStop(0,'rgba(0,88,255,1)')
                                gradient.addColorStop(0,'rgba(0,88,255,0.3)')
                                let delayed;
                                let Display =false
                                const labels = uniqueDates
                                const datas = {
                                    labels,
                                    datasets:[{
                                        data:summedamount,
                                        label: "Daily Sales",
                                        fill:true,
                                        backgroundColor:gradient,
                                        pointBackgroundColor:'#fff',
                                        tension:0.3
                                        // borderColor:'#555',
                                
                                
                                    }]
                                
                                }
                                const config = {
                                    type:'line',
                                    data:datas,
                                    options:{
                                        responsive:true,
                                        grid:{
                                            display:Display
                                
                                        },
                                        animation: {
                                            onComplete: ()=>{
                                                delayed = true
                                            },
                                            delay: (context)=>{
                                                let delay = 0;
                                                if(context.type ==="data" && context.mode == "default" && !delayed){
                                                    delay = context.dataIndex*300 + context.datasetIndex * 100;
                                                }
                                                return delay
                                            }
                                        },
                                        scales:{
                                            y:{
                                                ticks:{
                                                     font:{
                                                         size:8,
                                                     },
                                                    callback:function(value){
                                                        return 'ksh.' + value + "/="
                                                    }
                                                }
                                            },
                                            x:{
                                             ticks:{
                                                 font:{
                                                     size:8,
                                                 }
                                             }
                                            }
                                        }
                                    }
                                    }
                                    const myChart = new Chart(ctx,config)
                                    myChart.update()
                                    $('.loader2').hide()
                                    $('.overview').show()
                                    $('#myChart').show()


                            
                            }
                        })
                        
                    })
                    //  =======================================================================

            }
        })
      
    
    }
    getAnalytics()
    $('#analytics').on('click',()=>{
        getAnalytics();

    })



    let getAnalyticsreload = ()=>{
        $.ajax({
            type:'GET',
            url:`${serverUrl}/api/transactions`,
            success:(data)=>{
                // console.log(data)
               let totalusers = data.length
               let amount=[]
               
               for(let i=0;i<totalusers;i++){
                    amount.push(data[i].amount)
               }
               let totalPurchases = amount.reduce((accumulator,currentValue)=>{
                return accumulator+currentValue;
               },0)
               

               $('#totalAmount').html(`Ksh.${totalPurchases}`)
               $('#totalUsers').html(totalusers)
               $('#totalPur').html(totalusers)
            }
        })
    }
    // setInterval(()=>{
    //     getAnalyticsreload()
    //     transactionsReload()
    // },300000)
   
})

