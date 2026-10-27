# Wrap the built board into a full standalone page and write it to the repo root (../index.html).
s=open('nfl-edge-board.html').read()
i=s.index('<script>'); head,body=s[:i],s[i:]
j=head.index('</style>')+8
doc='<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-title" content="Edgeline">\n<meta name="apple-mobile-web-app-status-bar-style" content="black">\n<meta name="application-name" content="Edgeline">\n<meta name="theme-color" content="#000000">\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">\n<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">\n<link rel="manifest" href="/manifest.webmanifest">\n'+head[:j]+'\n</head>\n<body>\n'+head[j:]+body+'</body>\n</html>\n'
open('../index.html','w').write(doc)
print('site built',len(doc))
