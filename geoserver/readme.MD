## GeoServer implementation
The JavaScrip for Routs WFS must be built using NPM.

```bash
# Install dependencies
npm install

# Dev build, with watcher.
npm run dev

# Prod build.
npm run build
```

## Generate GeoJSON from API result
### Setup (Linux)
To build a new GeoJSON a python virual environment must be created, and dependencies must be installed by running the following commands.

```bash
python3 -m venv venv
chmod +x venv/bin/activat
source venv/bin/activate

pip install -r requriements.txt
```

### Build
```bash
python3 jsonToGeojson.py
```