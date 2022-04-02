export function generateContentTXT(fishList:any[]){
    let txt = "";
    for (const fish of fishList) {
        const data = Object.entries(fish);
        let txtPeixe = ``;

        for (const info of data){
            const line = `
                ${info[0]}: ${info[1]}
            `;
            txtPeixe += line;
        }
        txt += txtPeixe + "\n" + "==================================================" + "\n"  
    }
    return txt;
}