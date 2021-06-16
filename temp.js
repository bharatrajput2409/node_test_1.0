try {
    let data = [];
    let header = [];
    const sheets = file.SheetNames;
    console.log(file.Sheets[file.SheetNames[0]]["H1"]);
    let col = "";
    let colcount = 0;
    let flag = false;
    let row = 0;
    for (let i = 2; ; i++) {
      if (file.Sheets[file.SheetNames[0]]["A" + i] !== undefined) {
        row++;
      } else {
        break;
      }
    }
    while (true) {
      for (let i = 0; i < 26; i++) {
        let c = col + String.fromCharCode("A".charCodeAt() + i);
        if (file.Sheets[file.SheetNames[0]][c + "1"] === undefined) {
          flag = true;
          break;
        } else {
          colcount++;
          header.push(c);
        }
      }
      col = col + "A";
      if (flag) {
        break;
      }
    }
    let r = 2;
    while (row--) {
      let c = colcount;
      let rowdata = {};
      header.forEach((col) => {
        console.log(file.Sheets[file.SheetNames[0]][col + "1"].v, col + r);
        if (file.Sheets[file.SheetNames[0]][col + r] !== undefined) {
          rowdata[file.Sheets[file.SheetNames[0]][col + "1"].v] =
            file.Sheets[file.SheetNames[0]][col + r].v;
        } else {
          rowdata[file.Sheets[file.SheetNames[0]][col + "1"].v] = "";
        }
      });
      data.push(rowdata);
      r++;
    }
    return res.send(data);
  } catch (err) {
    console.log(err);
    res.send(rest_data);
  }
