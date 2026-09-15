import re, os, sys
G='apps/game'; SP=sys.argv[1]
order=['rng','level','sim','tele','input','render','main']
parts=[]
for m in order:
    s=open(f'{G}/src/{m}.js').read()
    s=re.sub(r'^import .*?;\s*$','',s,flags=re.M)
    s=re.sub(r'^export ','',s,flags=re.M)
    s=re.sub(r"if \('serviceWorker' in navigator\) \{[\s\S]*?\n\}", '', s)
    parts.append(f'/* ---- {m}.js ---- */\n'+s.strip())
js='\n\n'.join(parts)
html=open(f'{G}/index.html').read()
body=html.split('<body>',1)[1].split('</body>',1)[0]
body=body.replace('<script type="module" src="./src/main.js"></script>','').strip()
style=html.split('<style>',1)[1].split('</style>',1)[0]
out=f'<title>Rubble Run</title>\n<style>\nhtml,body{{height:100%}}\n{style}\n</style>\n\n{body}\n\n<script type="module">\n{js}\n</script>\n'
open(os.path.join(SP,'rubble-run.html'),'w').write(out)
print('bundled', len(out), 'bytes')
