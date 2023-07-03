/**
 * ロード時の初期化処理
 */
window.onload = () => {
    //起動方法の表示
    document.querySelector('#is-electron').innerText = isElectron();
    //ボタンのハンドラ設定
    document.querySelector('#file-read-button').onclick = onFileReadButton;
    document.querySelector('#file-write-button').onclick = onFileWriteButton;
}

/**
 * Electronの実行中か、ブラウザでhtmlを開いたか
 */
function isElectron() {
    const params = new URLSearchParams(window.location.search);
    return params.get('isElectron') !== null;
}

/**
 * 読み込みボタン
 */
async function onFileReadButton() {
    const pickerOpts = {
        types: [
            {
                accept: {'text/*': ['.txt', '.json']},
                description: 'テキストファイル',
            },
        ],
        excludeAcceptAllOption: true,
        multiple: false,
    };
    try {
        const fileHandles = await window.showOpenFilePicker(pickerOpts);
        for (var handle of fileHandles) {
            const file = await handle.getFile();
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function () {
                document.querySelector('#file-read-result').value = reader.result;
            };
            reader.onerror = function () {
                document.querySelector('#file-read-result').innerText = `ERROR: ${reader.error}`;
            };
        }
    } catch (e) {
        console.log('onFileReadButton', e);
    }
}

/**
 * 保存ボタン
 */
async function onFileWriteButton() {
    const text = document.querySelector('#file-read-result').value;
    if (isElectron()) {
        //electron環境ではcreateWritable()がアクセス拒否されるので回避策を使う
        download(text);
    } else {
        chooseAndWriteToFile(text);
    }
}

/**
 * ファイルピッカーを開いてテキストを保存する。（Electron用回避策）
 */
function download(text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'data.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

/**
 * ファイルピッカーを開いてテキストを保存する。
 */
async function chooseAndWriteToFile(text) {
    const opts = {
        types: [
            {
                accept: {'text/*': ['.txt', '.json']},
                description: 'テキストファイル',
            },
        ],
    };
    try {
        const fileHandle = await window.showSaveFilePicker(opts);
        writeFile(fileHandle, text);
    } catch (e) {
        console.log('chooseAndWriteToFile', e);
    }
}

/**
 * ファイルハンドルにデータを書き込む
 */
async function writeFile(fileHandle, data) {
    try {
        const writable = await fileHandle.createWritable();
        await writable.write(data);
        await writable.close();
    } catch (e) {
        console.log('writeFile', e);
    }
}
