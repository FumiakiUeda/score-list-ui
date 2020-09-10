// selector初期化
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, []);
});

function addTableRow() {
    var table = document.getElementById('scoreTable');
    var row = table.insertRow(-1);
    var cell = [];
    var len = document.forms[0].length;

    // 1から6宣言
    for (var i = 0; i < 7; i++) {
        cell[i] = row.insertCell(i);
    }

    // 曲名欄
    cell[0].innerHTML = document.forms[0].elements[0].value;
    // 作曲家欄
    cell[1].innerHTML = document.forms[0].elements[1].value;
    // 編曲家欄
    cell[2].innerHTML = document.forms[0].elements[2].value;
    // 出版欄
    cell[3].innerHTML = document.forms[0].elements[4].value;
    // 備考欄
    cell[4].innerHTML = document.forms[0].elements[5].value;
    // パート譜欄
    for (var k = 6; k < len; k++) {
        if (document.forms[0].elements[k].checked) {
            if (k === 6) {
                cell[5].innerHTML = document.forms[0].elements[k].value;
            } else {
                cell[5].innerHTML = cell[5].innerHTML + " " + document.forms[0].elements[k].value;
            }
        }
    }
    // 削除ボタン
    cell[6].innerHTML = '<button class="btn waves-effect waves-light" onclick="deleteTableRow(this);">曲削除</button>';

    // form初期化
    document.forms[0].reset();
}

function deleteTableRow(obj) {
    tr = obj.parentNode.parentNode;
    tr.parentNode.deleteRow(tr.sectionRowIndex);
}

function resetForm() {

}

function tableDownload() {
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);//文字コードをBOM付きUTF-8に指定
    var table = document.getElementById('scoreTable');//id=scoreTableという要素を取得
    var data_csv = "";//ここに文字データとして値を格納していく

    for (var i = 0; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length - 1; j++) {
            data_csv += table.rows[i].cells[j].innerText;//HTML中の表のセル値をdata_csvに格納
            if (j == table.rows[i].cells.length - 2) data_csv += "\n";//行終わりに改行コードを追加
            else data_csv += ",";//セル値の区切り文字として,を追加
        }
    }

    var blob = new Blob([bom, data_csv], { "type": "text/csv" });//data_csvのデータをcsvとしてダウンロードする関数
    if (window.navigator.msSaveBlob) { //IEの場合の処理
        window.navigator.msSaveBlob(blob, "test.csv");
        //window.navigator.msSaveOrOpenBlob(blob, "test.csv");// msSaveOrOpenBlobの場合はファイルを保存せずに開ける
    } else {
        document.getElementById("download").href = window.URL.createObjectURL(blob);
    }

    delete data_csv;//data_csvオブジェクトはもういらないので消去してメモリを開放
}