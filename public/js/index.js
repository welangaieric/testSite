window.addEventListener('DOMContentLoaded',()=>{
const tbtn = $('#togglebtn')
const nav =document.querySelector('header')
const control = document.querySelectorAll('.d-box')
const activeLinks = document.querySelectorAll('.links')
tbtn.on('click',()=>{
    nav.classList.toggle('active')
})
control.forEach((e)=>{
    e.addEventListener('click',(el)=>{
        el.classList.toggle('active-cont')
    })
})
activeLinks.forEach((e)=>{
    e.addEventListener('click',function(el){
       
    })
})

// animations
const elements = document.querySelectorAll('.data')
elements.forEach((e)=>e.classList.add('animate'))



// display elements
let display = document.querySelector('.wrapper')

let analytics = document.querySelector('.analytics')
let employees = document.querySelector('.employees')
let purchases = document.querySelector('.payments')
let profiles = document.querySelector('.profiles')
let help = document.querySelector('.help')
let expiry = document.querySelector('.expiry')
let container = document.querySelector('.container')

let customers = document.querySelector('.customers')
let inbox = document.querySelector('.inbox')

// display buttons
let analyticsBtn = document.querySelector('#analytics')
let employeesBtn = document.querySelector('#employees')
let purchasesBtn = document.querySelector('#purchases')
let profilesBtn = document.querySelector('#profiles')
let helpBtn = document.querySelector('#help')
let expiryBtn = document.querySelector('#FixedClients')
let customersBtn = document.querySelector('#customers')
let inboxBtn = document.querySelector('#inbox')
let temp
// display function 
const displayToDOM = function(el){
    display.innerHTML=el
}
if(analyticsBtn){
    analyticsBtn.addEventListener('click',()=>{
        temp = `
        <div class="loader">
        <div class="loader-image">
            <img src="/img/loader.gif" alt="">
        </div>
    </div>`
    //     <div class="org"></div>
      
    //     <div class="analytics">
        
    //     <div class="container analytic">
    //         <div class="analytics-header">
    //             <h3>Analytics</h3>
    //             <div class="controls">
    //                 <div class="duration-control">
    //                     <div class="d-box" id="daily">Daily</div>
    //                     <div class="d-box" id="weekly">Weekly</div>
    //                     <div class="d-box"id = "monthy">Monthly</div>
    //                 </div>
    //                 <div class="today-date">
    //                     <i class="bi bi-calendar-event"></i> <p>Jan, 2023 - Dec, 2023</p>
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="analytics-body">
    //             <div class="overview">
    //                 <div class="details animate">
    //                     <p>Total Amount</p>
    //                     <h3>Ksh.670,000</h3>
    //                 </div>
    //                 <div class="graph animate">
    //                     <img src="/img/green.png" alt="">
    //                 </div>
    //             </div>
    //             <div class="overview">
    //                 <div class="details animate">
    //                     <p>Total Users</p>
    //                     <h3>7950</h3>
    //                 </div>
    //                 <div class="graph animate">
    //                     <img src="/img/Chart.png" alt="">
    //                 </div>
    //             </div>
    //             <div class="overview">
    //                 <div class="details animate">
    //                     <p>Total Purchases</p>
    //                     <h3>3137</h3>
    //                 </div>
    //                 <div class="graph animate">
    //                     <img src="/img/blue.png" alt="">
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="analytics-chart">
    //             <canvas id="myChart"></canvas>
    //         </div> 
        
    //     </div>
    //   </div>
    //     `
        display.innerHTML = temp
      })
      employeesBtn.addEventListener('click',()=>{
       
        
        
          temp = `
          <div class="loader">
          <div class="loader-image">
              <img src="/img/loader.gif" alt="">
          </div>
        </div>
          <div class="org"></div>
      
          <div class="employees">
              <div class="container purchases">
                  
                      <div class="payments-header">
                          <h3>Employees</h3>
                          <button class="btn bg-primary text-white" data-bs-toggle="modal" data-bs-target="#add-employee"><i class="bi bi-plus"></i> Add</button>
      
                          <div class="search-bar">
                              <input type="text" class="search" id="SearchEmp"  placeholder="search number">
                              <i class="bi bi-search" id="search_emp"></i>
                              
                          </div>
                      </div>
                      <div class="payment-card">
                          <ul class="header">
                              <li >Emp Name</li>
                              <li>Number</li>
                              <li>Role</li>
                              <li>Actions</li>
                          </ul>
                          <div class="data-card" id="empCard">
                              
                          </div>
                      </div>
      
              </div>
          </div>
          `
         
          display.innerHTML = temp
        

      })
}

purchasesBtn.addEventListener('click',()=>{ 
    temp = `
    <div class="loader">
    <div class="loader-image">
        <img src="/img/loader.gif" alt="">
    </div>
    </div>
    <div class="org"></div>
    <div class="payments">
    <div class="container purchases">
        <div class="payments-header">
            <h3>Purchases</h3>
          
        </div>
        <div class="payment-card">
            <ul class="header">
                <li >Ref Code</li>
                <li>Number</li>
                <li>Amount</li>
                <li>Time</li>
            </ul>
            <div class="data-card" id="trans-Card">
               
            </div>

        </div>

    </div>
</div>
    `
    display.innerHTML = temp
})
profilesBtn.addEventListener('click',()=>{
    temp = `
    <div class="loader">
    <div class="loader-image">
        <img src="/img/loader.gif" alt="">
    </div>
    </div>
    <div class="org"></div>
    <div class="payments">
   

        <div class="container purchases">
            <div class="payments-header">
                <h3>Profile</h3>
                <button class="btn bg-primary text-white" data-bs-toggle="modal" data-bs-target="#add-profile"><i class="bi bi-plus"></i> Add</button>
                
                
            </div>
        
            <div class="payment-card">
                <ul class="header">
                    <li class="others" >id</li>
                    <li class="prof-name">Name</li>
                    <li class="prof-type">Type</li>
                    <li class="others">Amount</li>
                    <li class="others">Station</li>
                    <li class="others">Devices</li>
                </ul>
                <div class="data-card" id="profCard">
                    
                </div>
    
            </div>
            
    
        </div>
    </div>
    `
    display.innerHTML = temp
})
if(customersBtn){
    customersBtn.addEventListener('click',()=>{
        temp = `
        <div class="loader">
            <div class="loader-image">
                <img src="/img/loader.gif" alt="">
            </div>
        </div>
        <div class="org"></div>
        <div class="fixed-clients">
            <div class="container fixed">
                <div class="payments-header">
                    <h4>Fixed Clients</h4>
                    <button class="btn bg-primary text-white" data-bs-toggle="modal" data-bs-target="#fixed-clients"><i class="bi bi-plus"></i> Add</button>
                    <div class="search-bar">
                    <input type="text" class="search" id="clientSearch" placeholder="search">
                    <i class="bi bi-search" id="searchClient"></i>
                        
                    </div>
                </div>
                <div class="clients" id="clientCard">
                   
                
                </div>
    
            </div>
        </div>
        `
        display.innerHTML = temp
       
    })
}
if (expiryBtn){
    expiryBtn.addEventListener('click',()=>{
        temp = `
        <div class="loader">
            <div class="loader-image">
                <img src="/img/loader.gif" alt="">
            </div>
        </div>
        <div class="org"></div>
        <div class="fixed-clients">
            <div class="container fixed">
                <div class="payments-header">
                    <h4>Fixed Clients</h4>
                    <button class="btn bg-primary text-white" data-bs-toggle="modal" data-bs-target="#fixed-clients"><i class="bi bi-plus"></i> Add</button>
                    <div class="search-bar">
                        <input type="text" class="search" id="clientSearch" placeholder="search">
                        <i class="bi bi-search" id="searchClient"></i>
                        
                    </div>
                </div>
                <div class="clients" id="clientCard">
                   
                
                </div>
    
            </div>
        </div>
        `
        display.innerHTML = temp
       
    })
}

helpBtn.addEventListener('click',()=>
    {
        temp = `
        <div class="org ">
                
        </div>
        <div class="coming-soon">
            <div class="container">
                <div class="image animate">
                    <img src="/img/comingsoon.png" alt="">
                </div>
    
            </div>
            <h4 class="animate">This feature will be Available soon</h4>
    
        </div>
        
        `
        display.innerHTML =temp
    }
)
inboxBtn.addEventListener('click',()=>{
    temp = `
    <div class="org">
            
    </div>
    <div class="coming-soon">
        <div class="container">
            <div class="image animate">
                <img src="/img/comingsoon.png" alt="">
            </div>

        </div>
        <h4 class="animate">This feature will be Available soon</h4>

    </div>
    
    `
    display.innerHTML =temp
})


// ?chart

})