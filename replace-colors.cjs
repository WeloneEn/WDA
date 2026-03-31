const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
    { from: /#0a0a0a/g, to: '#f0ece1' },
    { from: /#f4f4f0/g, to: '#111111' },
    { from: /#111(?![0-9a-fA-F])/g, to: '#e0dcd1' }, // old hover bg-[#111] -> bg-[#e0dcd1]
    { from: /text-white/g, to: 'text-[#111111]' },
];

function processDir(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            for (const { from, to } of replacements) {
                if (content.match(from)) {
                    content = content.replace(from, to);
                    modified = true;
                }
            }
            
            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDir(srcDir);
console.log('Color replacement complete.');
