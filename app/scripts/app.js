var client;
//const iparam=require("../../config/iparams.json");
init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', renderText);
}

async function renderText() {
  const textElement = document.getElementById('apptext');
  /* const textElement1=document.getElementById('apptext1');
  const textElement2=document.getElementById('apptext2'); */
  const img=document.getElementById('avt');

  const contactData = await client.data.get('contact');
  console.log(contactData.contact);
  
  //"<%= console.log(DateTime.Now.ToString()) %>";
  
  document.getElementById('qt').onsubmit=async (e)=>
  {
    /* client = await app.initialized();
    client.events.on('app.activated', renderText); */
    e.preventDefault()
    console.log(document.getElementById('sub').value);
    console.log(document.getElementById('des').value);

    const Ticket_url="https://<%= iparam.freshdesk_subdomain %>.freshdesk.com/api/v2/tickets";
    
    
    const ticketDetails = {
      email: contactData.contact.email,
      subject: document.getElementById('sub').value,
      priority: 3,
      description: document.getElementById('des').value,
      status: 2,
    };
    const options = {
      headers: {
        "Authorization": "Basic <%= encode(iparam.freshdesk_api_key) %>",
        "Content-Type": "application/json",
      },
      body:JSON.stringify(ticketDetails),
      method:'POST'
    }
    await client.request.post(Ticket_url,options);
    client.interface.trigger("showNotify", {
      type: 'success',
      message: 'Ticket created successfully',
    });
    //e.preventDefault();
  }
  
  //api/v2/tickets

  textElement.innerHTML =`Create a ticket for ${contactData.contact.name} swiftly here`;
  /* textElement1.innerHTML=`${contactData.contact.email}`;
  textElement2.innerHTML=`${contactData.contact.address}`; */
  img.src=`${contactData.contact.avatar.thumb_url}`

}
