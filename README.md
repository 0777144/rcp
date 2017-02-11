# rnm

Recursively copy files and folders in the specified path.

# Install

```
git clone https://github.com/0777144/rcp && cd rcp
npm install && npm link
```

# Usage

```bash
rcp -p oldname newname      # only print files would be renamed
rcp -v oldname newname      # verbose
rcp oldname newname ./dir   # rename files in dir
rcp oldname newname         # equal rcp oldname newname ./
```
