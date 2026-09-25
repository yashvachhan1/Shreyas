const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logFile = 'C:\\Users\\BAPS\\.gemini\\antigravity-ide\\brain\\4c27075d-7b98-4064-ae60-75ed06c7ec0e\\.system_generated\\logs\\transcript_full.jsonl';
const targetDir = 'C:\\Users\\BAPS\\school management softwar';

async function recover() {
    const fileStream = fs.createReadStream(logFile);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const fileStates = {};

    for await (const line of rl) {
        if (!line.trim()) continue;
        const entry = JSON.parse(line);
        
        if (entry.tool_calls) {
            for (const call of entry.tool_calls) {
                if (call.name === 'write_to_file') {
                    const fp = call.args.TargetFile.replace(/\\\\/g, '\\');
                    fileStates[fp] = { content: call.args.CodeContent };
                }
            }
        }
        
        if (entry.type === 'TOOL_RESPONSE' && entry.content) {
            try {
                let contentStr = typeof entry.content === 'string' ? entry.content : JSON.stringify(entry.content);
                if (contentStr.includes('File Path: `file:///')) {
                    const match = contentStr.match(/File Path: `file:\/\/\/(.*?)`/);
                    if (match) {
                        let fp = decodeURI(match[1]).replace(/\//g, '\\');
                        const lines = contentStr.split('\n');
                        let codeContent = [];
                        for (const l of lines) {
                            if (l.match(/^\d+:/)) {
                                codeContent.push(l.replace(/^\d+:\s?/, ''));
                            }
                        }
                        if (codeContent.length > 0) {
                            if (!fileStates[fp]) fileStates[fp] = {};
                            fileStates[fp].content = codeContent.join('\n');
                        }
                    }
                }
            } catch (e) { }
        }
    }

    for (const [fp, state] of Object.entries(fileStates)) {
        if (!fp.includes('src')) continue;
        const dir = path.dirname(fp);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(fp, state.content);
        console.log(`Recovered: ${fp}`);
    }
}

recover();
