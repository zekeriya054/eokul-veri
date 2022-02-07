  
  var theForm=document.getElementById('Form1');
	var siniflar=document.getElementById('Us_SinifSube1_ddlSinifSube');
  for(let i=0;i<siniflar.length;i++){
    theForm.Us_SinifSube1_ddlSinifSube.value=siniflar[i].value;
    theForm['pageMode'].value="Listele";
    var formData = new FormData(theForm);
    
    fetch(theForm.action, {
      method: 'POST', // or 'PUT'
      headers: {
        //'Content-Type': 'application/json',
      },
      body: formData,
    })
    .then(response => response)
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
    /*
    var xhr = new XMLHttpRequest();	
    xhr.open('POST', theForm.action);
    xhr.responseType="document";
    xhr.send(formData);
    xhr.onload = function() {
      if (xhr.status != 200) { // analyze HTTP status of the response
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
      } else { // show the result
        alert(`Done, got ${xhr.response.length} bytes`); // response is the server response
      }
    };*/
}
