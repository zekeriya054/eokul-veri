function getProm(v) {
    return new Promise(resolve => {

  		  let theForm = document.getElementById('Form1');
      	theForm.Us_SinifSube1_ddlSinifSube.value=v.value;
      //  console.log(theForm.Us_SinifSube1_ddlSinifSube.value);
        theForm['pageMode'].value = "Listele";
      	let formData = new FormData(theForm);

      	fetch(theForm.action, {
        	method: 'POST', // or 'PUT'
        	headers: {
          //'Content-Type': 'application/json',
        	},
        	body: formData,
      })
        .then(response => response.text())
        .then(html => {
        //  console.log('Success:', data);

          let parser = new DOMParser();
          let doc = parser.parseFromString(html, 'text/html');
          let tablolar = doc.getElementById("dgListem");
         if(tablolar!=null) {
          let satirlar = tablolar.getElementsByTagName("tr");
          for (let j in satirlar) {
            if (j > 0) {
              let row = [];
              let satir = satirlar[j].getElementsByTagName('td');
              for (var sutun in satirlar) {
                switch (sutun) {
                  //  case '0': 
                  case '1':
                    row.push(satir[sutun].innerText);
                   // console.log(satir[sutun].innerText);
                    break;
                  case '2':
                  case '3':
                  case '4':
                    row.push(satir[sutun].innerText);
                   // console.log(satir[sutun].innerText);
                    break;
                }
              }
              text = row.join(",");
              csv += row + "\r\n";

            }
          }
         }
        });
        resolve();
    })
}
let csv='';

function Wait() {
    return new Promise(r => setTimeout(r, 1000))
}


async function createChain() {

    let siniflar = document.getElementById('Us_SinifSube1_ddlSinifSube');
    for (let i=0;i<siniflar.length;i++) {
        await getProm(siniflar[i]);
        await Wait();
    }
}

function createCSV() {
            let csvFile;
            let downloadLink;
            let filename = "ogrenciler.csv";
            // CSV dosyası oluşturduk
            csvFile = new Blob([csv], { type: 'text/csv;charset=windows-1254;' });
            downloadLink = document.createElement("a");
            downloadLink.download = filename;
            downloadLink.href = window.URL.createObjectURL(csvFile);
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.click();
  					alert(filename+ ' dosyası indirildi');
}

await createChain();
await createCSV();
