# rnm

Recursively copy files and folders in the specified path.

# Install

```
git clone https://github.com/0777144/rcp && cd rcp
npm install && npm link
```

# Usage

```bash
rcp -p source target      # only print files would be copied
rcp -v source target      # verbose
rcp source target ./dir   # rename files in dir
rcp source target         # equal rcp source target ./
```

# Options

```bash

  Usage: rcp [options] source target [./path]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -p, --print    Show how the files would be copied, but don't actually do anything.
    -v, --verbose  Print additional information about the operations (not) executed.

```
