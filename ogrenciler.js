  var theForm=document.getElementById('Form1');
	var siniflar=document.getElementById('Us_SinifSube1_ddlSinifSube');
  var csv= "";
  for(let i=0;i<1;i++){
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
           let row=[];
           var satir=satirlar[j].getElementsByTagName('td');
           for(var sutun in satirlar) {
              switch(sutun) {
              //  case '0': 
                case '1': 
                   row.push(satir[sutun].innerText);
                  //console.log(satir[sutun].innerText);
                  break;
                case '2': 
                case '3':
                case '4':
                  row.push(satir[sutun].innerText);
                 // console.log(satir[sutun].innerText);
                  break;
              }
            }
          text=row.join(",");
          csv+=row+"\r\n";

         }
      }
	    })
    .then(console.log(csv))
    .then(function() {
    var csvFile;
    var downloadLink;
    var filename="ogrenciler.csv";
    // CSV dosyası oluşturduk
    csvFile = new Blob([csv], { type: 'text/csv;charset=utf-8;'});
    // İndirme Linkini oluşturuyoruz.
    downloadLink = document.createElement("a");
    // dosya adını aldık.
    downloadLink.download = filename;
    // linke dosyayı tanımladık.
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Linki gizledik.
    downloadLink.style.display = "none";
    // Body alanına linki ekledik.
    document.body.appendChild(downloadLink);
    // linke tıklattık, dosya indirilecektir.
    downloadLink.click();
})
    .catch((error) => {
      console.error('Error:', error);
    });
 }
