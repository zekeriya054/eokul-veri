  
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
    .then(response =>response.text())
    
    .then(html => {
      //console.log('Success:', data);
      var parser = new DOMParser();
			var doc = parser.parseFromString(html, 'text/html');
			//var table=doc.getElementById('Form1');
      var tablolar = doc.getElementById("dgListem"); 
      var satirlar = tablolar.getElementsByTagName("tr");
      for(let j in satirlar) {
         if(j>0) {    
           var satir=satirlar[j].getElementsByTagName('td');
           for(var sutun in satirlar) {
              switch(sutun) {
                case '0': 
                case '1': console.log(satir[sutun].innerText);break;
                case '2': 
                case '3':
                case '4':console.log(satir[sutun].innerText);break;
              }
            }
         }
      }
      
     
	
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
